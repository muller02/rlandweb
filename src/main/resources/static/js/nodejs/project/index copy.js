console.log("헬로");
const http = require("http");
const server = http.createServer((req, res)=>{
    console.log(req.url);
    console.log("헤헷헷");
    // res.write("왓왓왓????");
    res.end("왓왓왓????");
}).listen(82);

// server.on("request", ()=>{
//     console.log("헤헷헷");
// });
// server.listen(82);