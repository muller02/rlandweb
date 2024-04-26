const fs = require('fs');
function findAll(path, {typeName, fileName}){

    let fileList = [];

    if(typeName){
        
        let list = fs
        .readdirSync(path, {withFileTypes:true})
        .filter((dirent)=>dirent.isDirectory())
        .map((folder)=>folder.name);
        // .filter((fileName)=>fileName.endsWith(".js"))
        // .map((fileName)=>fileName.replace(".js", ".vs"))
        // .reduce((pre, curItem)=>pre+curItem.length, 0);

        // fileList = fs.readdirSync(path);
        // let listFiltered = fileList.filter((fileName)=>fileName.endsWith(".js"));
        // let listMapped = listFiltered.map((fileName)=>fileName.replace(".js", ".vs"));
        // return listMapped;
        return list;
    }
    return fileList;
}

exports.findAll = findAll;