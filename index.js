#!/usr/bin/env node
/*
  This will take in a csv file called powerout.csv, in the current directory
  and output to output.m in the current directory. This
  output file can be run in matlab.
  The template file can be found under template.twig
*/

var fs = require('fs'),
  twig = require('twig'),
  csv = require('csv');

var buildings = {};
csv.parse(fs.readFileSync('./powerout.csv'), function(err, data){
  data.forEach((row,x)=>{
    var keys = row.map((e)=>e[0]);
    var values = row.map((e)=>e[1]);
    if(buildings[row[1]]){
      buildings[row[1]].push({name:row[0],value:row[13]});
    } else {
      buildings[row[1]] = [{name:row[0], value:row[13]}];
    }
  });
  var format = Object.keys(buildings).map((key)=>{
    var temp = buildings[key];
    var labels = [];
    var amount = [];
    var isNotZero = false;
    var name = key.replace(/\s{2,}/g,'');
    var filename = name.replace(/\s/g,'_').replace(/\//g, '_');
    temp.forEach((e)=>{
      labels.push(e.name.replace(/_/g,'\\_'));
      amount.push(e.value.replace('%',''));
      if(parseInt(e.value) != 0) isNotZero = true;
    });
    return {
      name: name,
      filename: filename,
      labels:labels,
      amount: amount,
      isNotZero: isNotZero
    };
  });
  twig.renderFile('./template.twig', {buildings:format}, (err, res) => {
    fs.writeFileSync('./output.m', res, 'UTF8');
  });
});
