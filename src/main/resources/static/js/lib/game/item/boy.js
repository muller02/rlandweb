export default class Boy{
    #x
    #y
    #w
    #h
    #img
    #moveIndex
    #moveDelayCount
    #dirIndex
    #vx
    #vy
    #dx
    #dy

    constructor(){

        this.#img = new Image();
        this.#img.src = "./res/boy.png";
        this.#w = this.#img.width/3;
        this.#h = this.#img.height/4;
        this.#moveIndex = 1;
        this.#dirIndex = 2;
        this.#x = 100;
        this.#y = 100;
        this.#vx = 0;
        this.#vy = 0;
        this.#moveDelayCount = 10;
        this.#dx = this.#x;
        this.#dy = this.#y;

    };

    //=========== 애니메이션을 위한 필수 메소드 ==============
    draw(ctx){
        let mi = this.#moveIndex;
        let di = this.#dirIndex;
        let w = this.#w;
        let h = this.#h;
        let sx = w*mi;
        let sy = h*di;
        // let sx = this.#x+(w*mi);
        // let sy = this.#y+(h*di);
        
        let dx = this.#x-w/2.2;
        let dy = this.#y-h/1.2;

        ctx.drawImage(this.#img,     
            //source
            sx,sy,w,h,

            //dest
            dx,dy,w,h
        )
    }

    update(){
        this.#x += this.#vx;
        this.#y += this.#vy;
        

        // 소수점이 점점 소실되기때문에 처음의 목표점과 달라짐
        // 목표를 점으로 보지않고 목표 범위로 보고 처리해야함
        if(Math.floor(this.#x) == this.#dx
        || Math.floor(this.#y) == this.#dy){
            this.#vx = 0;
            this.#vy = 0;
            this.#dirIndex = 2;
            this.#moveIndex = 1; // 멈춤이미지
            // this.#moveDelayCount = 10;
        }else{
            if(this.#moveDelayCount-- == 0){
                this.#moveIndex = this.#moveIndex == 0 ? 2 : 0;
                this.#moveDelayCount = 10;
            }
                
        }

    }

    // =========== 행위 =============================
    move(x, y){
        // this.#x = x;
        // this.#y = y;

        let w = x - this.#x;
        let h = y - this.#y;

        console.log(this.#x, this.#y);
        console.log(w, h);
        console.log("============================");

        // 캐릭터 방향 결정하기
        if(Math.abs( w ) > Math.abs( h ))
            this.#dirIndex = ( w < 0 ) ? 3 : 1;
        else
            this.#dirIndex = ( h < 0 ) ? 0 : 2;

        // ㅋㅋ 진ㅉㅏ웃김 캐릭터 11시방향 발사
        // let d = Math.sqrt(x*x+y*y);
        let d = Math.sqrt(w*w+h*h);

        this.#vx = w/d;
        this.#vy = h/d;
        this.#dx = x;
        this.#dy = y;

    };

    moveBy(x, y){

    }
};
