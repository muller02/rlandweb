// default 오브젝트
export default{
    data() {
      return {
        x:3,
        y:4,
        result:0
      }
    },
    methods:{
      calcSubmigHandler(){
          console.log("눌렀다~~");
          this.result = this.x+this.y;
      }
    },
    template:
      `
      <section id="form-section">
        <h1>Vue 계산기</h1>
        <form>
            <fieldset>
                <legend>계산기 입력폼</legend>
                <div>
                    <label>x:</label>
                    <!-- 2way => v-model ( value는 빼야함 ) -->
                    <input dir="rtl" name="x" v-model.number.trim="x">
                    <!-- 1way => v-bind -->
                    <!-- <input dir="rtl" name="x" v-bind:value="x"> -->
                    <label>y:</label>
                    <input dir="rtl" name="y" v-model.number="y">
                    <!-- <input dir="rtl" name="y" :value="y"> -->
                    <span>=</span>
                    <span class="calc" v-text="result"></span>
                    <span class="calc">{{x+y}}</span>
                    <!-- <span class="calc">{{x+y}}</span> -->
                </div>
                <hr>
                <div>
                    <input type="submit" value="초기화">
                    <input type="submit" value="계산하기" @click.prevent="calcSubmigHandler">
                </div>
            </fieldset>
        </form>
    </section>

      `
  }