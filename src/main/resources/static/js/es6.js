//Rest Parameters & Spread Operater
{
    // args라는 별칭으로 변수로 받은 인자를 제외한 나머지 인자들을 받아줌
    function sum(n1, n2, ...args){
        for(let arg of args)
            console.log(arg);
        return n1+n2;
    }

    // console.log("sum = ", sum(1,2));
    // console.log("sum = ", sum(1,2,3,3,4,5,53));
    let kors = [20, 40, 20];
    // spread myself
    console.log("sum = ", sum(kors[0],kors[1],kors[2]));
    // spread auto
    console.log("sum = ", sum(...kors));
}
// 이전 출력
{
    // arguments 객체에 받은 인자들이 배열 인덱스로 저장됨
    // 받은 모든 인자들이 저장되므로 내가 실제 몇개를 변수로 받았는지 개수를 계산해야함
    function sum(n1, n2, /*...args*/){
        // 나머지 출력
        let length = arguments.length-2;
        for(let i = 0 ; i < length ; i++)
            console.log(arguments[i+2]);
        return n1+n2;
    }

    // console.log("sum = ", sum(1,2));
    // console.log("sum = ", sum(1,2,3,3,4,5,53));
}

//Advanced JSON #1 Array Destructuring
{
    // let kor1, kor2, kor3 = [10,20,30];
    // undefined undefined (3) [10, 20, 30]
    // console.log(kor1, kor2, kor3);
    
    // 자리만 보장해주면 빼고 받을 수 있다.
    // let [kor1, /*kor2*/, kor3] = [10,20,30];

    // let [kor1, kor2, kor3] = [10,20,30];

    let arr = [10,20,50];
    let [kor1, , kor3] = arr;
    arr[0] = 11;
    // Array는 그냥 다시 대입해주면 됨.
    [kor1, , kor3] = arr;

    console.log(kor1, /*kor2,*/ kor3);

    //swap
    let x = 3;
    let y = 7;
    console.log(x, y);

    // 이전의 방식
    // let t = x;
    // x = y;
    // y = t;

    [x,y, z=100] = [y,x];
    console.log(x, y);
    //z는 전역변수 (window)가 됨!
    console.log("z", window.z);

}


//Advanced JSON #4-2 Object Destructuring : aliasing, matching, changing, ...
{
    let exam = {kor:20, eng:30, math:40, student:{id:1, name:'홍길동'}};
    let {kor, student:{name:studentName}} = exam;

    console.log(kor, studentName);
}

//Advanced JSON #4-1 Object Destructuring : aliasing, matching, changing, ...
{
    function print({ kor, eng:english/*, math*/, com=90 }){

        let total = kor+english/*+math*/;
        
        
        console.log(kor, english, total);
        console.log("com = ",com);
    }
    print({ kor:10, eng:20, math:30/*, com:10*/ });
    
    let exam1 = { kor:20, eng:30 };
    let { kor, eng } = exam1;
    exam1.kor++;
    exam1.eng+=2;
    console.log("바꾸기 전 = ",exam1, kor, eng);

    // {}는 let 없이 사용할 수 없으므로 ()로 감싸 like eval
    ({ kor, eng } = exam1);
    // {}에 넣어서 출력하면 객체로 출력됨 => js에서 변수는 객체이기때문..~~
    console.log("바꾼 후 = ",exam1, { kor, eng });
    
}


//Advanced JSON #4 Object Destructuring
{
    //destructuring = 뽀개기
    // function print(exam){
        // 이것은 안 좋은 예...엽기적.
    function print({kor, eng, math}){

        // 하나하나 변수 선언해서 사용할 필요가 없다.
        // { }은 object에서 값을 받아 넣어준다는 의미

        // let {kor, eng, math} = exam;
        
        let total = kor+eng+math;
        
        console.log(kor, eng, total);
    }
    print({kor:10, eng:20, math:30});
}


//Advanced JSON #3 Computed Property
{
    let col = "kor";
    let eng = 40;
    let math = 100;

    let exam = {
        [col]:30, 
        eng, 
        math,
        total(){
            return this.kor+this.eng+this.math
        }
    };

    console.log(exam.kor, exam.eng, exam.math, exam.total());
}
{
    let col = "kor";
    let eng = 40;
    let math = 100;

    let exam = {
        [col+1]:30, 
        eng, 
        math,
        total(){
            return this.kor1+this.eng+this.math
        }
    };

    console.log(exam.kor1, exam.eng, exam.math, exam.total());
}





// Adevanced JSON #2 function
{
    let kor = 30;
    let eng = 40;
    let math = 100;

    // 이전 방식
    // let exam = {
    //     kor:kor,
    //     eng:eng,
    //     math:math,
    //     total:function(){}
    // };

    let exam = {
        kor, 
        eng, 
        math,
        total(){
            return this.kor+this.eng+this.math
        }
    };

    console.log(exam.kor, exam.eng, exam.math, exam.total());
}