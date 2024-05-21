const chatWindow = document.querySelector("#chat-window");
const connButton = chatWindow.querySelector(".btn-conn");
const textInput = chatWindow.querySelector("input[name='message']");
const nameInput = chatWindow.querySelector(".input-name");
const ul = chatWindow.querySelector("ul");
const sendBtn = chatWindow.querySelector(".send");

const TYPE_CONNECT = 1;
const TYPE_MESSAGE = 2;

let sock = null;

connButton.onclick=function(){
    sock = new WebSocket("ws://192.168.0.54:8080/chat");
    // sock = new WebSocket("ws://192.168.0.75:8082/chat");
    // sock = new WebSocket("ws://localhost:8082/chat");
    sock.onopen = (e) => {
        let name = nameInput.value;
        // JSON 으로 작성
        let data = {type:TYPE_CONNECT, content:name};

        // 객체로 전달할 수 없으므로 문자열 파싱
        sock.send(JSON.parse(data));

        let li = `<li>서버에 연결되었습니다.</li>`;
        ul.insertAdjacentHTML("beforeend", li);
        textInput.disabled=false;
    };
    sock.onclose = () => {};
    sock.onmessage = (e) => {
        let li = `<li>${e.data}</li>`;
        ul.insertAdjacentHTML("beforeend", li);
    };
}

sendBtn.onclick=function(){
    if(!sock)
        return;

    let text = textInput.value;
    sock.send(text);
    textInput.value="";
}