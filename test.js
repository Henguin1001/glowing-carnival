var fs = require('fs'),
  twig = require('twig'),
  csv = require('csv');

var buildings = require('./medium.json');
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
twig.renderFile('./plot.twig', {buildings:format}, (err, res) => {
  fs.writeFileSync('./output.m', res, 'UTF8');
});
