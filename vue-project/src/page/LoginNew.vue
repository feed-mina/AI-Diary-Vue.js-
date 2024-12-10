<script>
import {ref, onMounted} from "vue";
import {useRouter} from "vue-router";
import Cookies from "universal-cookie";
export default {
  name: 'LoginNew', 
  setup(){
    const router = useRouter();
    const cookies = new Cookies(); // 쿠키 객체 생성

    // 로그인 페이지 및 회원가입 페이지 상태 
    const isLoginPg = ref(true); // 로그인 페이지 여부
    const isSignUpPg = ref(false); // 회원가입 페이지 여부

    // 로그인 입력 데이터
    const signInData = ref({
      id:"",
      password : "", 
    });
    // 회원가입  입력 데이터
    const signUpData = ref({
          id:"",
          email : "",
          password : "",
          rePassword: "",
          name:"",
        });

    // 로그인 입력 핸들러 
    const onChangeSignInData = (e) =>{
      signInData.value[e.target.name] = e.target.value;
    };

    // 회원가입 입력 핸들러 
    const onChangeSignUpData = (e) =>{
      signUpData.value[e.target.name] = e.target.value;
    };

    // 로그인 상태 확인 후 리다이렉트
    onMounted(() => {
      const userData = cookies.get("userData");
      if(!userData){
        console.log("로그인 필요");
        router.push("/");
      }  else{
        router.push("/diary/common");
      }
    });

    return{
      isLoginPg,
      isSignUpPg,
      signInData,
      signUpData,
      onChangeSignInData,
      onChangeSignUpData,
    };

   },
};
</script>

<template>
<div class="loginNew">
  <div id="wrapper" class="wrapper">
    <div id="temp" class="temp">
      <h1>LoginNew</h1>
      <div id="LoginNewFixedKV" class="login-new-fixed-kv">
        <div id="RabbitKv" class="rabbit-kv">
          <h3>LOGO삽입</h3>
        </div>
        <div id="AiDiaryBox" class="ai-diary-box">
          <div class="ai-text">ai-diary</div>
          <div class="bottom-three-lines"></div>
          <div class="bottom-three-lines"></div>
          <div class="bottom-three-lines"></div>
        </div>
      </div>

      <!--로그인 또는 회원가입 폼 렌더링-->
      <div class="login_main">
        <div v-if="isLoginPg">
          <!--로그인 폼-->
          <form>
            로그인
            <input type="id" name="id" placeholder="ID" v-model="signInData.id"/>
            <input type="password" name="password" placeholder="password" v-model="signInData.password"/>
            <button type="submit">Sign In</button>
          </form>
        </div>
        <div v-else-if="isSignUpPg">
          회원가입
       <!--회원가입 폼-->
          <form>
            <input type="id" name="id" placeholder="ID" v-model="signUpData.id"/>
            <input type="password" name="password" placeholder="password" v-model="signUpData.password"/>
            <input type="password" name="rePassword" placeholder="Re-enter Password" v-model="signUpData.rePassword"/>
            <input type="email" name="email" placeholder="Email" v-model="signUpData.email"/>
            <input type="name" name="name" placeholder="Name" v-model="signUpData.name"/>
            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>

      <div class="diary-handle-container-2"></div>
      <div class="diary-handle-container-3"></div>
    </div>
  </div>
</div>
</template>

<style scoped>
.wrapper {
  background: #836a54;
  box-shadow: inset 5px 5px 8px #735d4a, inset -5px -5px 8px #93775e;
  position: relative;
  margin-left: -1.9em;
  padding: 0;
  bottom: 0%;
  width: 100%;
  height: 100%;
  border-radius: 0 3rem 0 0;
}

.temp {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.rabbit-kv {
  position: absolute;
  z-index: 9999;
  width: 10vmin;
  margin-top: 0.1vmin;
  margin-left: -1.875vmin;
}

.login-new-fixed-kv {
  width: 50%;
  height: 50%;
  display: flex;
  flex-direction: column;
}

.ai-diary-box {
  margin-top: 5vmin;
  width: 100%;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.ai-text {
  width: 100%;
  height: 22vmin;
  font-size: 10vmin;
  font-weight: bold;
  background: #d9d9d9;
  box-shadow: inset 5px 5px 10px #bbbbbb, inset -5px -5px 10px #f7f7f7;
  text-align: center;
}

.bottom-three-lines {
  margin-top: 0.625em;
  width: 100%;
  height: 3%;
  background-color: #d9d9d9;
}

.diary-handle-container-2 {
  position: absolute;
  width: 30vmin;
  height: 23vmin;
  margin-top: 40vmin;
  right: 0;
  background: #774a20;
  border-radius: 3.125em 0em 0em 3.125em;
  z-index: 9999;
}

.diary-handle-container-3 {
  position: absolute;
  width: 25vmin;
  height: 23vmin;
  margin-top: 40vmin;
  right: -2.0625em;
  background: #5f462f;
  z-index: 9995;
}
</style>