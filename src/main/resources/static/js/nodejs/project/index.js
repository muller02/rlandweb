const express = require("express");
const path = require("path");
const ejs = require("ejs");

const server = express();

server.set("views", path.join(__dirname, "views"));
server.set("view engine", "ejs");
server.use(express.static(path.join(__dirname, "public")));


server.listen(82);

server
.route("/index")
.get((req,res)=>{
    res.render("index.ejs", {test:"Hello"});
})

// server.use("/index", (req, res)=>{

// })