<script>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import Datepicker from '@vuepic/vue-datepicker'; // 캘린더 라이브러리를 가져옵니다.
import '@vuepic/vue-datepicker/dist/main.css'; // 캘린더 스타일을 추가합니다.
export default {
  name: 'DiaryWriting',
  components: {
    Datepicker, // 캘린더 컴포넌트를 등록합니다.
  },
  setup() {
    const router = useRouter();

    const selectedDate = ref(''); // 선택된 날짜를 저장할 변수입니다.


    // 날짜가 선택되었을 때 호출되는 함수
    const handleDateChange = (date) => {
      selectedDate.value = date; // 선택한 날짜를 저장합니다.
      diaryContent.value.date = date; // 선택된 날짜를 diaryContent.date에 저장
    };
    // 반응형 상태
    const diaryContent = ref({
      date : '',
      author: '',
      title: '',
      tags: { tag1: '', tag2: '', tag3: '' }, // 초기화된 tags
      emotion: '',
      content: '',
      hidden: true,
    });

    const emotionItems = [
      { text: "😁 I feel good", value: "1" },
      { text: "😂 Oh, That's so funny", value: "2" },
      { text: "😫 What should I do?!", value: "3" },
      { text: "😒 unpleasant, boring", value: "4" },
      { text: "😤 How dare you", value: "5" },
      { text: "😡 Angry", value: "6" },
      { text: "🤯 I wanna get outta here...", value: "7" },
      { text: "💖 Love", value: "8" },
      { text: "🤕 Not in a good condition", value: "9" },
      { text: "💙 I feel blue", value: "10" },
    ];

    // 일기 저장 버튼 핸들러
    const handleSaveDiaryButton = async () => {
      if (!diaryContent.value.author || !diaryContent.value.title) {
        alert('작성자와 제목을 입력해주세요.');
        return;
      }

      try {
        const response = await axios.post('http://localhost:8080/api/diary', diaryContent.value);
        alert('일기가 성공적으로 저장되었습니다!');
        console.log('Diary saved:', response.data);
        router.push('/diary/home');
      } catch (error) {
        console.error('Failed to save diary:', error);
        alert('일기 저장에 실패했습니다. 다시 시도해주세요.');
      }
    };

    return {
      selectedDate,
      handleDateChange,
      diaryContent,
      emotionItems,
      handleSaveDiaryButton,
    };
  },
};
</script>
<template>
  <div class="diaryWriting">
    <div class="diaryWriting_content">
      <div class="diaryTuto">
        <div class="diaryWriting_container">
          <form>
            <div class="diaryWriting_noDalle">
              <div class="section0">
                <div>

    <h1>날짜 선택하기</h1>
    <!-- 캘린더 컴포넌트 -->

    <Datepicker
      v-model="diaryContent.date"
      :format="'YYYY-MM-DD'"
      :auto-apply="true"
      :locale="{ months: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'] }"
    />
    <!-- 선택한 날짜 출력 -->
    <div v-if="diaryContent.date" class="selected-date">
      선택된 날짜: {{ diaryContent.date }}
    </div>
  </div>
              </div>
              <div class="section01">
                <div>
                  <div>
                    <label for="author">작성자&nbsp;&nbsp;&nbsp;</label>
                  <input type="text" class="author" id="author" name="author" v-model="diaryContent.author"  placeholder="" />
                  </div>
                  <div class="titleSc">
                    <label for="title">제목&nbsp;&nbsp;&nbsp;</label>
                  <input type="text" class="title" id="title" name="title" v-model="diaryContent.title"  placeholder=""/>

                  </div>
                </div>
              </div>
              <!--section2-->
              <div class="section2">
                <div class="text">
                    <span>오늘의 감정을 태그로 입력하세요.</span>
                </div>
                <div class="tags">
                  <input type="text" id="tag1" name="tag1" v-model="diaryContent.tags.tag1" placeholder="tag1" />
<input type="text" id="tag2" name="tag2" v-model="diaryContent.tags.tag2" placeholder="tag2" />
<input type="text" id="tag3" name="tag3" v-model="diaryContent.tags.tag3" placeholder="tag3" />

                </div>
              </div>
              <!--section3-->
              <div class="section3">
                <div class="text">
                      <span>감정지수를 선택하세요.</span>
                </div>
                <div class="selectBox">
                  <v-select
                  v-model="diaryContent.emotion"
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
                      <span>본문</span>
                </div>
                <textarea v-model="diaryContent.content" rows="3" class="content" name="content" id="content" ></textarea>
              </div>
              <!--section05-->
              <div class="section05">
                      <span>🔎</span>
                    <select v-model="diaryContent.hidden">
          <option :value="true">숨기기</option>
          <option :value="false">보이기</option>
                    </select>
              </div>

              <!--diaryTuto-dalle-->
            </div>
              <!-- 일기저장하기 -->
                <div>
                  <button type="button" @click="handleSaveDiaryButton" class="diary_form_button">저장하기</button>
                </div>
                </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.diaryWriting{
  width: 100%;
    min-width: 25em;
    height: 100%;
    margin: 0 auto;
    border-radius: 0.625em;
    overflow: hidden;
}

.diaryWriting_content {
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
  .diaryWriting_container {
    /* border: 1px solid #00fa9a; */
    margin: 0;
    width: 100%;
    height: 100%;
    display: flex;
  }

  .titleSc{
    padding-top:2rem;
  }
  .diaryWritingTitle {
    font-size: 2rem;
    text-align: center;
    font-weight: bold;

  }
  .diaryWritingTitle {
    box-shadow: inset 0 -23px 0 #e89b3d;
    display: inline;
  }

  .diaryWriting_container form {
    width: 100%;
    height: 100%;
  }
  .diaryWriting_noDalle {
    width: 65%;
    height: 100%;
    margin: 0em;
    float: left;
  }
  .diaryWriting_noDalle input,
  select,
  button,
  option {
    height: 1.875em;
  }

  .diaryWriting_container input:focus {
    outline: 2px solid #c1ab86;
    transition: 0.1s;
  }


  .diaryWriting_noDalle .section0 {
    width: 100%;
    display: flex;
    flex-direction: row;
    margin-bottom: 0.9375em;
  }
  .diaryWriting_noDalle .section01 {
    margin-top: 0.125em;
    width: 100%;
    display: flex;
    flex-direction: row;
    margin-bottom: 0.9375em;
  }

  .diaryWriting_noDalle .section01 input {
    width: 40%;
    text-align: center;
  }

 .diaryWriting_noDalle .section1 input:hover {
    transition: 0.3s;
    opacity: 1;
    outline: 2px solid #c1ab86;
    width: 42%;
  }

 .diaryWriting_noDalle .section2 {
    width: 100%;
    margin-bottom: 0.625em;
  }
 .diaryWriting_noDalle .section2 .tags {
    padding-top: 0.625em;
    width: 95%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }
 .diaryWriting_noDalle .section2 input {
    text-align: center;
    width: 25%;
    margin: 0.3125em;
    caret-color: #604e2e;
  }
 .diaryWriting_noDalle .section2 input:hover {
    transition: 0.3s;
    opacity: 1;
    outline: 2px solid #c1ab86;
    width: 27%;
  }
 .diaryWriting_noDalle .section2 button {
    width: 25%;
    margin: 0.3125em;
    height: 2em;
    background: #c1ab86;
  }
 .diaryWriting_noDalle .section2 button:hover {
    transition: 0.3s;
    opacity: 1;
    background: #604e2e;
    color: white;
    width: 30%;
  }
 .diaryWriting_noDalle .section3 {
    display: flex;
    flex-direction: column;
    margin-bottom: 1.25em;
  }
 .diaryWriting_noDalle .section3 .text {
    margin-bottom: 0.625em;
  }
 .diaryWriting_noDalle .section3 select {
    margin-left: 0.625em;
    border-radius: 0.25em;
    border: 1px solid #c1ab86;
    outline: 0 none;
    text-align: center;
    width: 35%;
    height: 2.5em;
  }

 .diaryWriting_noDalle .section3 .selectBox .v-select {
    background: transparent;
    outline: 0 none;
    padding: 0 5px;
    position: relative;
    z-index: 3;
  }
 .diaryWriting_noDalle .section3 .selectBox .v-select option {
    color: #c1ab86;
    padding: 0.1875em 0;
    font-size: 1em;
    border-radius: 0.25em;
    text-align: center;
  }
 .diaryWriting_noDalle .section3 .selectBox .icoArrow {
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

 .diaryWriting_noDalle .section3 .selectBox .icoArrow img {
    width: 50%;
    transition: 0.3s;
  }

 .diaryWriting_noDalle .section3 .selectBox .v-select:focus + .icoArrow img {
    transform: rotate(180deg);
  }

 .diaryWriting_noDalle .section4 {
    display: flex;
    flex-direction: column;
    margin-bottom: 1.25em;
    margin-left: 0.3125em;
    width: 95%;
    height: 50%;
  }
 .diaryWriting_noDalle .section4 .text {
    margin-bottom: 0.625em;
  }
 .diaryWriting_noDalle .section4 textarea {
    width: 100%;
    height: 100%;
    padding: 0.625em;
    font-size: 1.25em;
    overflow: auto;
    resize: vertical;
  }
 .diaryWriting_noDalle .section4 textarea:focus {
    outline: 2px solid #c1ab86;
  }

 .diaryWriting_noDalle .section5 {
    width: 95%;
    display: flex;
    flex-direction: row;
    margin-bottom: 1.25em;
    margin-left: 0.3125em;
  }
 .diaryWriting_noDalle .section5 .text {
    margin-bottom: 0.625em;
  }

 .diaryWriting_noDalle .section5 select {
    width: 35%;
    height: 2.5em;
    margin-left: 0.625em;
    border-radius: 0.25em;
    border: 1px solid #c1ab86;
    outline: 0 none;
    text-align: center;
    margin-right: 0.3125em;
  }

 .diaryWriting_noDalle .section5 button {
    width: 35%;
    margin-right: 0.3125em;
    text-align: center;
  }

 .diaryWriting_noDalle .section5 button:hover {
    width: 40%;
    opacity: 1;
    background: #604e2e;
    color: white;
    transition: 0.3s;
  }

  .diary_form_button{
  width: 100%; /* 버튼이 컨테이너에 맞춰짐 */
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.diary_form_button:hover{
  background-color: #357abd;

}
</style>
