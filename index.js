/**
 * @author Aman Abhishek
 */
const fs = require('fs');
let helper = require ('./helper/helper');

let fileName = process.argv.splice(2)[0];


let start = (file) => {
   let fileContent = fs.readFileSync(__dirname + '/' + file);
   helper.loadCommands(fileContent.toString());
}

start(fileName);