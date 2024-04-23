
// HTML이 아니라 컴포넌트를 만드는 공간
// 주석처리 방법 : {/* */}
// input도 단일태그로는 안되므로 닫아줘야함 /

let hello = "hello";
let clickHanlder = function(e){
    e.preventDefault();
    console.log("클릭쓰~");
}
let calc = function(){
    return <section>
            <h1>리액트 계산기</h1>
            <form>
                <fieldset>
                    <legend>계산기 입력폼</legend>
                    <div>
                        <label>x:</label>
                        <input dir="rtl" name="x" value="0"/>
                        <label>y:</label>
                        <input dir="rtl" name="y" value="0"/>
                        <span>{hello}</span>
                        <span class="calc" v-text="x+y"></span>
                    </div>
                    <hr/>
                    <div>
                        <input type="submit" value="초기화"/>
                        <input onClick={clickHanlder} type="submit" value="계산하기"/>
                    </div>
                </fieldset>
            </form>
        </section>
}

ReactDOM.render(calc
    // <section>
    //     <h1>리액트 계산기</h1>
    //     <form>
    //         <fieldset>
    //             <legend>계산기 입력폼</legend>
    //             <div>
    //                 <label>x:</label>
    //                 <input dir="rtl" name="x" value="0"/>
    //                 <label>y:</label>
    //                 <input dir="rtl" name="y" value="0"/>
    //                 <span>{hello}</span>
    //                 <span class="calc" v-text="x+y"></span>
    //             </div>
    //             <hr/>
    //             <div>
    //                 <input type="submit" value="초기화"/>
    //                 <input onClick={clickHanlder} type="submit" value="계산하기"/>
    //             </div>
    //         </fieldset>
    //     </form>
    // </section>
, document.querySelector("#root")
);