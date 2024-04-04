

function InputFileList(input){
    this.input = input;
    this.dt = new DataTransfer();
};

InputFileList.prototype = {
    add:function(file){
        console.log("this.input.files = ",this.input.files);

        for(var inputFile of this.input.files){
            this.dt.items.add(inputFile);
            console.log("파일리스트 for문 도는 동안 = ",inputFile);
        }
            
        this.dt.items.add(file);

        this.input.files = this.dt.files;              
    }
};


window.addEventListener("load", function(){

    var regForm = this.document.querySelector("#reg-form");
    var imgInput = regForm.querySelector(".img-input");
    var previewPanel = regForm.querySelector(".preview-panel");
    var imgLabel = regForm.querySelector(".img-label");


      // 전역변수로 생성
  var inputFileList = new InputFileList(imgInput);

  imgLabel.ondrop= function(e){

      e.stopPropagation();
      e.preventDefault();

      var file = e.dataTransfer.files[0];

    //   console.log("데이터 트랜스퍼 몇개 담겻는가 = ",e.dataTransfer.files);

      // 생성한 후에 file add 하고 출력
      inputFileList.add(file);
    //   console.log(file);

      if(file.type.indexOf("image/") != 0){
          alert("이미지만 첨부 가능합니다.");
          return;
      };

      if(file.size > 1000*1024){
          alert("크기는 100KB 이하만 업로드 할 수 있습니다.");
          return;
      };

      var reader = new FileReader();
      
      reader.onload = function(e){
          // console.log(e.target.result);
          var img = document.createElement("img");
          img.src=e.target.result;
          
          previewPanel.append(img);

          //렌더리이이이잉~~~~
          setTimeout( ()=> {
              img.classList.add("slide-in");
              //10밀리세컨
          }, 10);
         
      };

      // dataTransfer.items.add(file);
      reader.readAsDataURL(file);
      
      // imgInput.files = dataTransfer.files;

      console.log("imgInput 온드랍 = ",imgInput.files);
      
  };
    
    // imgLabel.ondragenter = function(e){
    //     console.log("엔터~");
    // };
    // imgLabel.ondragleave = function(e){
    //     console.log("리브~");
    //     imgLabel.classList.remove("valid");
    //     imgLabel.classList.remove("invalid");
    // };
    imgLabel.ondragover = function(e){
        e.stopPropagation();
        e.preventDefault();
        // console.log("ㅇㅂ~");

        var valid = e.dataTransfer &&
                    e.dataTransfer.types &&
                    e.dataTransfer.types.indexOf("Files") >=0;

        if(valid)
            imgLabel.classList.add("valid");
        else
            imgLabel.classList.add("invalid");

    };


    imgInput.oninput = function(e){
        // for(var key in imgInput.files[0])
        //     console.log(key, " : ", imgInput.files[0][key]);
        
        //타입, 사이즈  제약 걸기
        var count = imgInput.files.length;
        console.log(count);
        var file = imgInput.files[count-1];
        // console.log("imgInput.files[count-1] = ", file);
        // console.log("imgInput 온인풋 = ",imgInput.files);

        if(file.type.indexOf("image/") != 0){
            alert("이미지만 첨부 가능합니다.");
            return;
        };

        if(file.size > 1000*1024){
            alert("크기는 100KB 이하만 업로드 할 수 있습니다.");
            return;
        };

        var reader = new FileReader();
        
        reader.onload = function(e){
            // console.log(e.target.result);
            var img = document.createElement("img");
            img.src=e.target.result;
            
            previewPanel.append(img);

            //렌더리이이이잉~~~~
            setTimeout( ()=> {
                img.classList.add("slide-in");
                //10밀리세컨
            }, 10);
           
        };

        reader.readAsDataURL(file);
    };
});
