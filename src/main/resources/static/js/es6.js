// Arrow Function
{
    {
        let arr = [2,3,4,5,1,2,3];
        arr.sort((a,b)=>a-b);
        console.log(arr);
        arr.sort((a,b)=>b-a);
        console.log(arr);
    }
    {
        let arr = [[2,3],[4,5,1],[1,3]];
        arr.sort((a,b)=>a[0]-b[0]);
        console.log(arr);
        // arr.sort((a,b)=>b[0]-a[0]);
        // console.log(arr);
    }
    // 함수와 람다식의 차이점
    // 1. this, super 가 없다 ( 생성자 또는 멤버 메소드로 사용될 수 없다. )
    // 2. arguments 콜렉션이 없다. ( 함수 모듈로 사용될 수 없다. 함수 지역화가 안된다. = 코드를 나누는 역할자로 사용하지 않는다. )
    // 3. new.target이 없다. ( new 연산자로 생성할 수 없다. )

    {
        let exam = {
            kor:20,
            eng:10,
            total:()=>{
                console.log(this.x, this.y);
                return this.kor+this.eng;
            },
            // total2:function(){
            //     console.log("오우~");
            // },
            // avg:()=>{
            //     console.log("잉");
            //     console.log("잉", total2());
            //     console.log("잉", this.total());
            // }
        };
        // this가 있다는 말은 total() 메소드를 호출할 때 exam을 this로 받는다는 것을 말함.
        // Arrow Function은 exam을 못 받음.
        // 따라서 total() 메소드의 연산은 undefined+undefined가 되어서 NaN이 된다.
        console.log("람다식?? =",exam.total());

        // 일반 함수로 사용할 수 있나??
        // this를 사용할 일이 없고 객체와 상관없다면 깔끔하고 더 좋네~~
        // this 사용하기 전의 고전적인 함수 구현을 하는 것 같아서 순수한 함수가 필요할 땐 이걸 쓰자 ^^
        {
            // arguments 배열은 없지만 rest parameters 별칭을 써서 받으면 됨 !!
            let add = (a, b, ...args)=>{
                console.log("람다 add args length = ",args.length);
                return a+b;
            };
            console.log("람다 add 1,2,3 = ",add(1,2,3));
        }
        // 함수를 Arrow Function으로 바꿀 수 있나?
        {
            let exam = {
                kor:20,
                eng:10,
                total:()=>{console.log("람다 total= ",this.kor, this)},
                delayedPrint(){ // exam.delayedPrint() -> this => exam

                    // 함수만 호출했기 때문에 this = window
                    // exam인 this를 주고 싶다면 .bind(this)를 통해 this => exam
                    // let kor = this.kor;
                    setTimeout(function(){
                        console.log("딜레이 펑션일 때.......", this.kor);
                    }, 3000);
                    setTimeout(function(){
                        console.log("딜레이 펑션에 this 바인딩했을 때.......", this.kor, this);
                    }.bind(this), 3000);
                    setTimeout(()=>{
                        console.log("딜레이 람다일 때.......", this.kor, this);
                    }, 3000);

                    // let f1 = function() {
                    //     console.log(this);
                    //     console.log("옝????");
                    // }
                },
            };
            exam.delayedPrint();
            exam.total();
            

            let f1 = function(){};
            // 1. f1(); this => window
            // 2. exam.f1(); this => exam
            // 3. f1().apply(exam); this => exam


            let total =  function(){
                return this.kor + this.eng;
            };

            // total에서의 this => window
            console.log("total = ", total());

            // 1 방법 : apply에서의 this => exam
            // this 외에 인자를 더 전달해야할 때 배열로 전달해야함
            // apply(this로 들어갈 객체, [a, b])
            console.log("apply = ", total.apply(exam));

            // 2 방법 : call에서의 this => 던져준 객체
            // this 외에 인자를 더 전달해야할 때 나열해주면 됨
            // call(this로 들어갈 객체, a, b)
            console.log("call = ", total.call({kor:100, eng:90}));

            // 3 방법 : bind 
            let aa = {
                name:"자장면",
                closeCallback(){
                    console.log("name = ", this.name);
                }
            };
            
            // aa.closeCallback은 함수만 전달할 뿐 aa를 함께 전달하지 않는다.
            // let bb =  aa.closeCallback();
            // 함수에 .bind(this) 해주어야 this를 갖는다.
            let bb =  aa.closeCallback.bind(aa);
            
            bb();

        }
        
        
    }

}

// Default value
{
    // function add(x, y=10, z){
    //     console.log("add = ",x,y,z);
    // }
    function getCount(){
        return 3;
    }

    // 값을 리턴받는 함수도, 같은 매개변수도 인자의 기본값으로 설정할 수 있다.
    function add(x, y=10, z=getCount(), a=z+1){
        console.log("length = ",arguments.length);
        console.log("add = ",x,y,z,a);

        console.log("인자값 바꾸기 전",
                    x == arguments[0],
                    x === arguments[0],
                    y == arguments[1],
                    y === arguments[1],
                    typeof arguments[1]
                );
        x=60;
        y=11;
        console.log("인자값 바꾼 후",
                    x == arguments[0],
                    x === arguments[0],
                    y == arguments[1],
                    y === arguments[1],
                );
    }

    // null은 값으로 인식??
    // add(10, null, 30);
    // add(10, undefined, 30);

    // arguments는 진짜로 메소드 호출 시 받은 인자 개수만 세어줌
    // 메소드에서 정의한 기본값은 받은 인자로 쳐주지 않음 !
    add(10);
    // add(10, 30);
    // add(undefined);
}

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

    let arr1 = [2,3,4];
    // let arr2 = [5, 6, ...arr1];
    // let arr3 = {"kor":[2,3,4], "eng":3};
    // let arr2 = [5, 6, ...arr3["kor"]];
    // console.log(arr3["kor"]);
    let arr2 = [5, 6, ...arr1];

    console.log("arr2 = ",arr2);

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