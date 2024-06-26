// import asdf, {test2} from './module1.js';
import asdf, {test2} from 'gm';
// as로 중복되는 함수 이름에 별칭을 지어줌
import aaaa, {test2 as bbbb} from './mudule2.js';
// Module
{
    // export default는 중괄호로 뽀개기 해서 받을 수 없고, 따로 꺼내줘야함
    // export 함수는 이름을 그대로 써야 꺼내올 수 있음
    asdf();
    test2();
    // aaaa();
    // bbbb();

    let rand = 1;
    if(rand==1){
        import("./module1.js")
        .then(({default:test1, test2})=>{
            test1();
            test2();
            console.log("~~~");
        });
        // default 함수는 이름이 아니라 default라는 이름으로 가져올 수 있기 때문에
        // 따로 별칭을 지어주거나 default로 호출해야 부를 수 있음
        // import("./module1.js")
        // .then((m1)=>{
        //     m1.default();
        //     m1.test2();
        //     console.log("~~~");
        // });
        // import("./module1.js")
        // .then(({test2})=>{
        //     test2();
        // });
    }
}


// Promise => 성공, 실패에 대한 이벤트 처리 로직을 분리하게 해주는 객체
{
    // 비동기 처리 함수 4 : 서비스 함수 예
    class MenuRepository{

        findAllPromise(){
            // await 걸면 response, 안걸면 promise 객체 리턴
            // response에서 값을 꺼내야 합...합 고.
            return fetch("/api/menus");

            // return new Promise((resolve)=>{
                
            //     const xhr = new XMLHttpRequest();
            //     xhr.withCredentials = true;

            //     xhr.onload = function(){
            //         const list = JSON.parse(this.responseText);
            //         resolve(list);
            //     }

            //     const url = `http://localhost:8082/api/menus`;
            //     const method = "GET";

            //     xhr.open(method, url);
            //     xhr.send();
            // });
        };

        findAll(resolve){
            const xhr = new XMLHttpRequest();
            xhr.withCredentials = true;

            xhr.onload = function(){
                const list = JSON.parse(this.responseText);
                resolve(list);
            }

            const url = `http://localhost:8082/api/menus`;
            const method = "GET";

            xhr.open(method, url);
            xhr.send();
        }

    }

    // 함수 안에서 결과를 받고자 하는 짧은 비동기일 경우에 async, await 사용하는 것도 좋은 것 같다.
    async function printList(){
        let repository = new MenuRepository();
        let response = await repository.findAllPromise();
        // let list = await response.json();
        let list = response.json().then(list=>list);
        console.log("printList = ", await list);
    }

    printList();
    
    let repository = new MenuRepository();

    // promise call method 1 : to seperate
    let promise = repository.findAllPromise();

    // 연속된 어떤 절차가 있다면, then으로 추가/삭제 하는 것도 좋은 것 같다.
    // 이때, 어떠한 기능이 추가적으로 필요하다면 then function을 추가하면 되므로 코드수정을 하지 않아도 되네.
    promise
    .then(response=>{
        return response.json();
    })
    .then(list=>{
        console.log("response list = ", list);
        return list[0]
    })
    .then(menu=>menu.korName)
    .then(korName=>{console.log("korName = ", korName)});

    // promise 안 쓴 콜백 방식
    repository.findAll((list)=>{
        console.log(list);
    });

    // 비동기 처리 함수 2 : Promise 방식의 비동기 처리함수
    function delayedPrint1(value){

        const promise = new Promise((resolve, reject)=>{

            let rand = Math.floor(Math.random()*2000)+1000;
    
            setTimeout(function(){
                console.log(value);
                resolve();
            }, rand);

        });
        
        return promise;
    }

    let pr = delayedPrint1("hahahahah");
    pr.then( ()=>{console.log("prited after");});

    // 비동기 처리 함수 3 : async와 await를 이용한 동기식 호출이 가능하게 하기

    (async ()=>{
        await delayedPrint1("마기다려라 ㅋ");
        console.log("넵~~");
    })();


    // 비동기 처리 함수 1 :  콜백 방식의 비동기 처리함수
    function delayedPrint(value, resolve){
        
        let rand = Math.floor(Math.random()*2000)+1000;
        console.log("rand = ", rand);

        setTimeout(function(){
            console.log(value);
            resolve();
        }, rand);
    }

    // 호출하는 쪽의 콜백함수 중첩이 너무너무 복잡허다,,,
    // Promise를 써볼까나??^^
    // delayedPrint("Hello~", ()=>{console.log("prited after");});
    

}

// Iterator, Generator
{
    //Generator를 이용한 Iterator 구현방법
    class Exam{
        constructor(){
            this.kor=10;
            this.eng=20;
            this.math=30;
        }
        *[Symbol.iterator](){
            yield this.kor;
            yield this.eng;
            yield this.math;
        }

        // return 내부의 function은 this가 윈도우이므로, 전역으로 this를 받아줘야 사용 가능
        entries(){
            let [kor, eng, math] = this;
            return {
                *[Symbol.iterator](){
                   yield ["kor", kor];
                   yield ["eng", eng];
                   yield ["math", math];
                }
            };
        }
    }

    let exam = new Exam();
    for(let [k,v] of exam.entries())
        console.log("ㅋ밸류 = ",k,v);


    for(let n of exam)
        console.log("gen = ",n);
    
    // Itertator를 객체변수에 적용하여 function을 만들어 주는 방법
    let iter = {kor:1, eng:2};
    iter[Symbol.iterator] = function* (){
        yield this.kor;
        yield this.eng;
    }

    for(let n of iter)
        console.log("iter = ",n);



    //Iterator를 활용해서 매땅헤딩 ㄱ
    // class Exam{
    //     constructor(){
    //         this.kor=10;
    //         this.eng=20;
    //         this.math=30;
    //         this.current = 0;
    //     }
    //     // Symbol.iterator를 return 받는 객체여야 iterator 기능을 사용할 수 있음.
    //     [Symbol.iterator](){
    //         return this;
    //     }
    //     next(){
    //         this.current++;
    //         switch(this.current){
    //             case 1 : return {done:false, value:this.kor};
    //             case 2 : return {done:false, value:this.eng};
    //             case 3 : return {done:false, value:this.math};
    //             case 4 : return {done:true, value:-1};
    //          }
    //     };
    // }
    // let exam = new Exam();
    // for(let n of exam)
    //     console.log("it =",n);
    // console.log(exam.next());
    // console.log(exam.next());
    // console.log(exam.next());

}

//Set, List, Map Collection
{
    //map = 임시객체를 만들 때 주로 사용
    let map = new Map();
    map.set("id", 1);
    map.set("title", "Hello");

    // 인덱스를 찾을 필요가 없을때 forEach
    // callback 말고 람다식 쓰는이유 : 콜백은 쌓여서 부하를 일으킴
    // ===================================
    map.forEach((v, k)=>{
        console.log("과거의 잔재... forEach = ",k, v);    
    });


    // 뽀개기 미쳣스
    // ===================================
    for(let [k,v] of map.entries())
        console.log("옴맴매", k, v);

    for(var k of map.keys())
        console.log(k," = ", map.get(k));
    console.log(map.entries());
    console.log("맵출력");

    // ===========================================================
    // let set = new Set();
    let set = new Set([3,4,2,2,3,4,5,6,6,3,2,7]);
    // console.log(set.size);
    
    // set.delete(2);
    // console.log(set.size);
    
    // set.add(10);
    // console.log(set.size);
    
    // set.clear();
    // console.log(set.size);

    // map, array, set 나열하는 for of <- 컬렉션과 함께 나옴.
    // iterator를 구현해야함 -> 객체도 iterator를 구현한다면 for of 사용 가능
    for(let n of set)
        console.log("n of set = ",n);

}

// Symbol + Computed Property
// Symbol = Standard Built-in objects
// 카메라(client, controller)가 정의(interface)하고 렌즈(Imp)가 구현함
// 약속을 정의하는 함수는 Symbol 변수로 정의함. (key를 변수화해서 사용하는 원리)
// 개체를 구현하는 곳에서 정해주고, 내부에서만 사용해주고 밖에서는 메소드로 실행하는게 바람직할듯
{

    class NoticeService{
        static getList = Symbol();
        static getById = Symbol();
    }

    // const getList = Symbol();
    console.log("typeof getList = ",typeof NoticeService.getList);

    class NoticeServiceImp{
        [NoticeService.getList](){
            return "hehehe i am symbol";
        }
    }

    class NoticeController{
        
        constructor(){
            this.service = new NoticeServiceImp();
        }

        printList(){
            return this.service[NoticeService.getList]();
        }

    }

    let controller = new NoticeController();
    console.log("printList = ",controller.printList());
}
// Inheritance
// js는 형식으로 변수선언하지 않고 var, let, const로만 선언할 수 있기 때문에
// 다형성을 지원하지 않음. 그러나 ... 희한하게 지원을 하긴 한다. = Symbol
{
    class Exam{
        #kor
        #eng
        #math;
        
        // 개체 내부에서 필드에 #을 붙여 밖에서 사용x, 내부에서만 사용가능
        constructor(kor=2,eng=0,math=0){
            this.#kor = kor;
            this.eng = eng;
            this.math = math;
        }
        get kor(){
            return this.#kor;
        }
        set kor(value){
            this.#kor = value;
        }
        // private method = #total()
        total(){
            return this.kor+this.eng+this.math;
        }
    }

    // 상속
    class NewlecExam extends Exam{
        #com
        constructor(com=3){
            // 상속시 무조건 부모의 super()를 구현해줘야함
            super();
            this.#com = com;
        }
        // 오버라이드하지 않았을때도 this는 부모것을 잘 찾아옴
        total(){
            return super.total()+this.#com;
        }
        thisAvg(){
            console.log("뉴렉토탈",this.total());
            return this.total() / 4;
        }
        superAvg(){
            console.log("이그잼토탈",super.total());
            return super.total()/ 4;
        }
    }
    console.log("NewlecExam().total() = ",new NewlecExam().total());
    console.log("NewlecExam().thisAvg() = ",new NewlecExam().thisAvg());
    console.log("NewlecExam().superAvg() = ",new NewlecExam().superAvg());

}

// Class
{
    class Exam{

        static #staticVariable;

        static{
            this.#staticVariable = 30;
        }
        static get staticVariable(){
            return Exam.#staticVariable;
        }
        constructor(kor=0, eng=0, math=0){
            this.kor = kor;
            this.eng = eng;
            this.math = math;
        }

        total(){
            return this.kor + this.eng + this.math;
        }
    }
    
    function createExam(){
        return class Exam{
            //class안에서만 사용할 수 있는 변수: 앞에 # 적어줘야 됨.
            #kor
            #eng;
            #math;

            constructor(kor=0, eng=0, math=0){
                this.#kor = kor;
                this.#eng = eng;
                this.#math = math;
            }

            // getkor(){
            //     return this.#kor;
            // }
            get kor(){
                return this.#kor;
            }
            set kor(value){
                this.#kor = value;
            }
    
            total(){
                return this.#kor + this.#eng + this.#math;
            }
        }
    }
    // 변수로 객체를 만드는 괴상함. 쓰지말.......
    let ExamClass = createExam();
    let examclass = new ExamClass(10,40,30);
    console.log(`examclass.total(): ${examclass.total()}`);
    
    // getter setter 사용방식
    // console.log(`getKor(): ${examclass.getkor()}`);
    examclass.kor++; //get kor() 쓴거임.
    console.log(`get kor(): ${examclass.kor}`);
    
    let exam = new Exam(10,20,30);
    console.log(`class Exam total() : ${exam.total()}`);
    console.log(`typeof Exam : ${typeof Exam}`);
    console.log(`typeof exam : ${typeof exam}`);
    
    // static 사용하기
    // 객체를 통한게 아니라 개체명을 통해서 사용할 수 있어야 하는 것이 포인트!
    // console.log(`Exam.#staticVariable: ${Exam.getStaticVariable()}`);
    console.log(`Exam.#staticVariable: ${Exam.staticVariable}`);

}

{
    // 타입정의가 안돼... 그래서 생성자를 return하게 만들어~
    function createExam(){

        return class Exam{
            #kor
            #eng
            #math;
            
            // 개체 내부에서 필드에 #을 붙여 밖에서 사용x, 내부에서만 사용가능
            constructor(kor=2,eng=0,math=0){
                this.#kor = kor;
                this.eng = eng;
                this.math = math;
            }
            get kor(){
                return this.#kor;
            }
            set kor(value){
                this.#kor = value;
            }
            // private method = #total()
            total(){
                return this.kor+this.eng+this.math;
            }
        }
    }
    //strict모드 = 중복변수x
    // 변수로 객체를 만드는 괴상한 코드,, 누더기자바스크립트 누크립트
    let ExamClass = createExam();
    let exam = new ExamClass();
    console.log("ExamClass total : ",exam.total());
    exam.kor++;
    // let kor = exam.kor;
    // kor++;
    console.log(exam.kor);
    // console.log(kor);

}

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
                // console.log(this.x, this.y);
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