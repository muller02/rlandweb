window.addEventListener("load", function(){

    const section = this.document.querySelector("#form-section");
    const xInput = section.querySelector("input[name='x']");
    const yInput = section.querySelector("input[name='y']");
    const initSubmit = section.querySelector("input[value='초기화']");
    const calcSubmit = section.querySelector("input[value='계산하기']");
    const calcSpan = section.querySelector(".calc");

    let x = 3;
    let y = 5;

    xInput.value = x;
    yInput.value = y;

    initSubmit.onclick = (e)=>{
        e.preventDefault();
        xInput.value = 0;
        yInput.value = 0;
        calcSpan.textContent = 0;
    };
    
    calcSubmit.onclick = (e)=>{
        e.preventDefault();
        let x = Number(xInput.value);
        let y = Number(yInput.value);
        // let x = parseInt(xInput.value);
        // let y = parseInt(yInput.value);
        // calcSpan.textContent = x + y;
        calcSpan.innerText = x + y;
    };
})