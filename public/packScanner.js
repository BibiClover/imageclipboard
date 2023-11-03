//Scans the packs folder and save it as a js file
//Use "node packScanner.js" in termninal to run (needs node to be installed first) 
var fs = require('fs')
var list_packs = fs.readdirSync('./packs')
console.log(list_packs)
fs.writeFileSync("./packs.js", "let packs = " + JSON.stringify(list_packs))