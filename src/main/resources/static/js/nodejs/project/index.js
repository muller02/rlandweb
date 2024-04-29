const express = require("express");

const server = express();
server.listen(82);

server
.route("/index")
.get((req,res)=>{
    
})

// server.use("/index", (req, res)=>{

// })