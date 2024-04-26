const fs = require('fs');

let newlec = require("newlec-hello");
let repository = require("./file-repository.js");

newlec.hello();

let dirList = repository.findAll("../",{
                                typeName:".js"
                            });

// let csv = dirList.join();
// fs.writeFileSync("./foldList.txt", csv);