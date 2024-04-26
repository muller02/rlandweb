console.log("Hello NodeJS");

let repository = require("./file-repository.js");
console.log(repository.findAll("./",{
    typeName:".js"
}));