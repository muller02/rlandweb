const connect = require("connect");
const path = require("path");
const serverStatic = require("server-static");

const app = connect();


app.use(serverStatic(path.join(__dirname, "public")));

app.use("/index",(req, res)=>{
    res.end("index page");
});

app.use("/menu/list",(req, res)=>{
    res.end("munu list page");
});

app.listen(82);

console.log("82포트 시작");