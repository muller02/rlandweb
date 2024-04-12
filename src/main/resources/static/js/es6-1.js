let exam = {kor:20, eng:30, math:40}; //완댜님 : target
console.log("target, kor : ", exam.kor);

const handler = {
    get(target, prop, receiver) {
        if(prop === "kor")
            return "어쩔";
        
        // return target[prop];
        return Reflect.get(...arguments);
    },
};

let proxy = new Proxy(exam, handler);
console.log("proxy, kor : ", proxy.kor);
console.log("proxy, eng : ", proxy.eng);