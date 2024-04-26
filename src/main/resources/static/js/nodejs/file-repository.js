const fs = require('fs');
function findAll(path, {typeName, fileName}){

    let fileList = [];

    if(typeName){
        
        fileList = fs.readdirSync(path);
        let listFiltered = fileList.filter((fileName)=>fileName.endsWith(".js"));
        return listFiltered;
    }
    return fileList;
}

exports.findAll = findAll;