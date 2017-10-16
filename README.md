# MATLAB Pie Chart Template
This is a program to create a lot of pie charts using matlab
and twig

# Getting Started
This uses nodejs so that must be installed. Once you have the repository
run an npm install to download the dependencies
```
npm install
```
To run the program in the terminal
```
node index.js
```
This will take the `powerout.csv` as an input and output to the `output.m`
(Note: the csv file should have no headings, just the data)
# Modifying
There is a high level template called `template.twig`, using the
Twig templating language on MATLAB code. Inside the body block the
matlab code can be modified and it will run for every building in the list.
