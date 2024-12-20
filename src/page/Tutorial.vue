<script>
/* eslint-disable vue/multi-word-component-names */
import {  computed } from 'vue';
import NotFound from '@/page/NotFound.vue';
import Cookies from 'universal-cookie'; // universal-cookie import

export default {
  name: 'Tutorial',
  data(){
    return{
      author : "user123",
      title : "",
      tags: {
        tag1 : "",
        tag2 : "",
        tag3 : "",
      },
      emotion : "",
      emotionItems: [
        { text: "😁 I feel good", value: "1" },
        { text: "😂 Oh, That's so funny", value: "2" },
        { text: "😫 What should I do?!", value: "3" },
        { text: "😒 unpleasant, boring", value: "4" },
        { text: "😤 How dare you", value: "5" },
        { text: "😡 Angry", value: "6" },
        { text: "🤯 I wanna get outta here...", value: "7" },
        { text: "💖 Love", value: "8" },
        { text: "🤕 Not in a good condition", value: "9" },
        { text: "💙 I feel blue", value: "10" }
      ],
      content : "" ,
      hidden : true
    };
  },
  mounted() {
    const cookies = new Cookies();
    const userData = cookies.get("userData");
    if(!userData){
      console.log('path:'/'');
      // this.$router.push("/");
    }
  },
  methods: {
    saveDiary(){
      console.log("Diary saved");
    },
  },
  setup() {
  const currentView = computed(() => {
    const routes = {
      '/notFound': NotFound,
    };
    const currentPath = window.location.hash.slice(1) || '/';
    return routes[currentPath] || NotFound;
  });

  return {
    currentView,
  };
}
}
</script>

<template>
  <div class="tutorial">
    <div class="tutorial_content">
      <div class="diaryTuto">
        <div class="tutorial_container">
          <form>
            <div class="tutorialTitle">

            </div>
            <div class="tutorial_noDalle">
              <div class="section0">
                <div>오늘 날짜 :  </div>
              </div>
              <div class="section01">
                <div>
                  <div  v-tooltip="' ID가 자동 입력됩니다.'">
                    <label for="author">작성자&nbsp;&nbsp;&nbsp;</label>
                  <input type="text" class="author" id="author" name="author" :value="author" placeholder=""  readonly :disabled="false"/>
                  </div>
                  <div  v-tooltip="' 제목을 입력해주세요.'">
                   <div class="titleSc">
                    <label for="title">제목&nbsp;&nbsp;&nbsp;</label>
                    <input type="text" class="title" id="title" name="title" :value="title" placeholder="" readonly :disabled="false"/>
                   </div>
                  </div>
                </div>
              </div>
              <!--section2-->
              <div class="section2">
                <div class="text">
                  <div  v-tooltip="'일기의 핵심 키워드 3개를 각각 적어주세요.'">
                    <span>오늘의 감정을 태그로 입력하세요.</span>
                  </div>
                </div>
                <div class="tags">
                   <div  v-tooltip="'text1'">>
                    <input type="text" id="tag1" name="tag1" v-model="tags.tag1" placeholder="tag1" disabled/>

                    <input type="text" id="tag2" name="tag2" v-model="tags.tag2" placeholder="tag2" disabled/>

                    <input type="text" id="tag3" name="tag3" v-model="tags.tag3" placeholder="tag3" disabled/>
                   </div>
                  <!-- <button type="button" class="aiButton">
                     <div  v-tooltip="'사진이 생성되는 동안 일기를 작성할 수  없습니다.'">
                      <span>AI 이미지 생성</span>
                     </div>
                  </button> -->
                </div>
              </div>
              <!--section3-->
              <div class="section3">
                <div class="text">
                 <div  v-tooltip="'일기의 대표되는 감정을 선택해주세요.'">
                      <span>감정지수를 선택하세요.</span>
                    </div>
                </div>
                <div class="selectBox">
                  <v-select
                  v-model="emotion"
                  :items="emotionItems"
                  item-title="text"
                  item-value="value"
                  label="오늘의 감정지수는?"
                  class="emotion"
                  id="emotion"
                  required
                  ></v-select>
                </div>
              </div>
              <!--section4-->
              <div class="section4">
                <div class="text">
                  <div  v-tooltip="' 아래에서 일기의 본문을 작성해주세요.'">
                      <span>본문</span>
                  </div>
                </div>
                <textarea v-model="content" rows="3" class="content" name="content" id="content" disabled></textarea>
              </div>
              <!--section05-->
              <div class="section05">
                <div  v-tooltip="'일기를 다른 사람에게 공유할지를 선택해주세요.'">
                      <span>🔎</span>
                </div>
                    <select v-model="hidden" id="hidden" required>
                      <option value="true">
                        숨기기
                      </option>
                      <option value="false">
                        보여주기
                      </option>
                    </select>
                    <div>
                      <button class="saveDiary_button" type="button" @click="saveDiary">일기장완료</button>
                    </div>
              </div>

              <!--diaryTuto-dalle-->
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tutorial{
    width: 100%;
    min-width: 25em;
    margin: 0 auto;
    border-radius: 0.625em;
    overflow: hidden;
}

.tutorial_container {
    height: 100%;
    height: 75%;
    top: 1.875em;
    right: 0;
    bottom: 33.75em;
    left: 3.75em;
    background-size: 30px 30px;
  }

  .diaryTuto {
    padding-top: 1.5em;
    width: 100%;
    height: 100%;
    z-index: 9999;
    font-size: 2vmin;
  }

  .diaryTuto input,
  textarea,
  button {
    border-radius: 0.3125em;
    background: #eee7db;
    border: 0 solid black;
    font-size: 0.9375em;
  }
  .tutorial_container {
    margin: 0;
    height: 100%;
    display: flex;
  }

  .tutorialTitle {
    font-size: 2rem;
    text-align: center;
    font-weight: bold;

  }
  .tutorialTitle {
    box-shadow: inset 0 -23px 0 #e89b3d;
    display: inline;
  }

  .tutorial_container form {
    width: 100%;
    height: 100%;
  }
  .titleSc{
    padding-top:2rem;
  }
  .tutorial_noDalle {
    width: 65%;
    height: 100%;
    margin: 0em;
    float: left;
  }
  .tutorial_noDalle input,
  select,
  button,
  option {
    height: 1.875em;
  }

  .tutorial_container input:focus {
    outline: 2px solid #c1ab86;
    transition: 0.1s;
  }


  .tutorial_noDalle .section0 {
    width: 100%;
    display: flex;
    flex-direction: row;
    margin-bottom: 0.9375em;
  }
  .tutorial_noDalle .section01 {
    margin-top: 0.125em;
    width: 100%;
    display: flex;
    flex-direction: row;
    margin-bottom: 0.9375em;
  }

  .tutorial_noDalle .section01 input {
    width: 40%;
    text-align: center;
  }

 .tutorial_noDalle .section1 input:hover {
    transition: 0.3s;
    opacity: 1;
    outline: 2px solid #c1ab86;
    width: 42%;
  }

 .tutorial_noDalle .section2 {
    width: 100%;
    margin-bottom: 0.625em;
  }
 .tutorial_noDalle .section2 .tags {
    padding-top: 0.625em;
    width: 95%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }
 .tutorial_noDalle .section2 input {
    text-align: center;
    width: 25%;
    margin: 0.3125em;
    caret-color: #604e2e;
  }
 .tutorial_noDalle .section2 input:hover {
    transition: 0.3s;
    opacity: 1;
    outline: 2px solid #c1ab86;
    width: 27%;
  }
 .tutorial_noDalle .section2 button {
    width: 25%;
    margin: 0.3125em;
    height: 2em;
    background: #c1ab86;
  }
 .tutorial_noDalle .section2 button:hover {
    transition: 0.3s;
    opacity: 1;
    background: #604e2e;
    color: white;
    width: 30%;
  }
 .tutorial_noDalle .section3 {
    display: flex;
    flex-direction: column;
    margin-bottom: 1.25em;
  }
 .tutorial_noDalle .section3 .text {
    margin-bottom: 0.625em;
  }
 .tutorial_noDalle .section3 select {
    margin-left: 0.625em;
    border-radius: 0.25em;
    border: 1px solid #c1ab86;
    outline: 0 none;
    text-align: center;
    width: 35%;
    height: 2.5em;
  }

 .tutorial_noDalle .section3 .selectBox .v-select {
    background: transparent;
    outline: 0 none;
    padding: 0 5px;
    position: relative;
    z-index: 3;
  }
 .tutorial_noDalle .section3 .selectBox .v-select option {
    color: #c1ab86;
    padding: 0.1875em 0;
    font-size: 1em;
    border-radius: 0.25em;
    text-align: center;
  }
 .tutorial_noDalle .section3 .selectBox .icoArrow {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
    width: 2.1875em;
    height: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
  }

 .tutorial_noDalle .section3 .selectBox .icoArrow img {
    width: 50%;
    transition: 0.3s;
  }

 .tutorial_noDalle .section3 .selectBox .v-select:focus + .icoArrow img {
    transform: rotate(180deg);
  }

 .tutorial_noDalle .section4 {
    display: flex;
    flex-direction: column;
    margin-bottom: 1.25em;
    margin-left: 0.3125em;
    width: 95%;
    height: 50%;
  }
 .tutorial_noDalle .section4 .text {
    margin-bottom: 0.625em;
  }
 .tutorial_noDalle .section4 textarea {
    width: 100%;
    height: 100%;
    padding: 0.625em;
    font-size: 1.25em;
    overflow: auto;
    resize: vertical;
  }
 .tutorial_noDalle .section4 textarea:focus {
    outline: 2px solid #c1ab86;
  }
.section05{
  padding-bottom : 2rem;
}
 .tutorial_noDalle .section5 {
    width: 95%;
    display: flex;
    flex-direction: row;
    margin-bottom: 1.25em;
    margin-left: 0.3125em;
  }
 .tutorial_noDalle .section5 .text {
    margin-bottom: 0.625em;
  }

 .tutorial_noDalle .section5 select {
    width: 35%;
    height: 2.5em;
    margin-left: 0.625em;
    border-radius: 0.25em;
    border: 1px solid #c1ab86;
    outline: 0 none;
    text-align: center;
    margin-right: 0.3125em;
  }

 .tutorial_noDalle .section5 button {
    width: 35%;
    margin-right: 0.3125em;
    text-align: center;
  }

 .tutorial_noDalle .section5 button:hover {
    width: 40%;
    opacity: 1;
    background: #604e2e;
    color: white;
    transition: 0.3s;
  }

  .saveDiary_button{
  width: 100%; /* 버튼이 컨테이너에 맞춰짐 */
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.saveDiary_button:hover{
  background-color: #357abd;

}
</style>
