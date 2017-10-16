#!/usr/bin/env node
const { exec } = require('child_process');
var compiler = new (require('markto')),
  fs = require('fs'),
  twig = require('twig'),
  csv = require('csv');

// var buildings = require('./medium.json');
var buildings = {};
// console.log(buildings[' ( WESTCOTT    ) ']);
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
  // console.log(buildings);
  fs.writeFileSync('./medium.json', JSON.stringify(buildings));
  // console.log(buildings[' (RUBY DIAMOND    ) ']);
  // // buildings = Object.keys(buildings).map((key)=>{
  // //     var keys = buildings[key].map((e,i)=>"'"+e[0]+"'").join(',');
  // //     var values = buildings[key].map((e,i)=>e[1]).join(',');
  // //
  // //     return {key:key, data: buildings[key], keys:keys, values  };
  // // });
  // twig.renderFile('./plot.twig', {buildings:buildings}, (err, res) => {
  //   fs.writeFileSync('./output.m', res, 'UTF8');
  // });
  // var template = twig({data:fs.readFileSync('plot.twig')});
  // var res = template.render();
  // compiler.renderFile('./template.m',{buildings:buildings}).then((res)=>{
  //   compiler.renderFile('./test.xml',{buildings:buildings}).then((res)=>{
  //     fs.writeFileSync('./output.m', res);
  //   },console.error);
  // }, console.error);

});
