/**
 * @author Aman Abhishek
 */
const fs = require('fs');
let helper = require ('./helper/helper');

let fileName = process.argv.splice(2)[0];

/**
 * @method start
 * @param {*} file
 * @description This starts the execution of script 
 *              To run the file enter below command in CLI
 *              node index.js input.txt
 *              input.txt can be replaced with any other text file name with the commands.
 *  
 */

let start = (file) => {
   let fileContent = fs.readFileSync(__dirname + '/' + file);
   helper.loadCommands(fileContent.toString());
}

start(fileName);