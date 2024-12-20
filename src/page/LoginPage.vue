<script>
import {ref, onMounted} from "vue";
import {useRouter} from "vue-router";
import Cookies from "universal-cookie";
import axios from "axios";

export default {
  name: 'LoginPage',
  setup(){
    const router = useRouter();
    const cookies = new Cookies();

    const isLoginPg = ref(true);

    // 로그인 입력 데이터
    const loginData = ref({
      userId:"",
      password : "",
    });
    const errorWarning = ref({
      userId:  false,
      password:  false,
    });
    const idErrorMessage = ref("");
    const passwordErrorMessage = ref("");
    const showPassword = ref(false);

    const togglePasswordVisibility = () =>{
      showPassword.value = !showPassword.value;
    }
    // 로그인 상태 확인 후 리다이렉트
    onMounted(() => {
      const userData = cookies.get("userData");
      if(userData){
        router.push("/login");
      }
    });



    const handleLoginButton = async() => {
      // const userData = cookies.get("userData");
      console.log("로그인 데이터 :", loginData.value);
      if(!loginData.value.userId){
        alert("아이디를 입력해주세요.");
        idErrorMessage.value ="아이디를 입력해주세요.";
        return;
      }

      if(!loginData.value.password){
        alert("비밀번호를 입력해주세요.");
        idErrorMessage.value="비밀번호를 입력해주세요.";
        return;
      }
      try{
        const response = await sendLoginData();

        // 응답 데이터 확인
        if (response && response.data) {
          cookies.set("userData", response.data, { path: "/" }); // 쿠키에 저장
          router.push("/diary/common"); // 성공 시 리다이렉션
        } else {
          console.error("로그인 응답이 올바르지 않습니다:", response);
          alert("로그인에 실패했습니다. 다시 시도해주세요.");
        }
      } catch(error){
        if (error.response?.data?.fail) {
          console.error("로그인 실패:", error.response.data.fail);
          alert(error.response.data.message || "로그인에 실패했습니다.");
        } else {
          console.error("서버 오류 발생:", error);
          alert("서버와의 통신 중 오류가 발생했습니다.");
        }
      }
    };

    // 로그인 API 호출


// 로그인 API 호출
const sendLoginData = async () => {
  try {
    const response = await axios.post("http://localhost:8080/api/auth/login", {
    userId: loginData.value.userId,
    password: loginData.value.password,
  });
    localStorage.setItem('token', response.data.token); // JWT 토큰 저장
    alert('로그인 성공');
  } catch (error) {
    console.error('로그인 실패:', error.response.data);
    alert('로그인 실패');
  }
};


    return{
      isLoginPg,
      loginData,
      errorWarning,
      showPassword,
      idErrorMessage,
      passwordErrorMessage,
      togglePasswordVisibility,
      handleLoginButton
    };

   },
};
</script>

<template>
<div class="loginPage">
  <div id="login_form" class="login_form">
      <!--로그인 또는 회원가입 폼 렌더링-->
          <!--로그인 폼-->
          <form>

          <!--ID-->
          <div class="login-session">
            <div class="login-label">
              <label for="userId" class="form-label">ID</label>
            </div>
            <div>
              <input size="30" type="text"  v-model="loginData.userId" @input="handleIdChange" class="login_form-input" name="userId" id="userId"/>
              <div class="login_form-oo" :style="{ color: errorWarning.userId ? 'red' : 'black' }">
                {{ idErrorMessage }}
              </div>
            </div>
          </div>


        <!--패스워드-->
        <div class="login-session">
          <div class="login-label">
            <label  for="password" class="form-label">Password</label>
          </div>
          <div>
            <input size="30" :type="showPassword ? 'text' : 'password'" v-model="loginData.password" @input="handlePasswordChange" class="login_form-input" name="password"  id="password"/>
            <button type="button" @click="togglePasswordVisibility">
              {{  showPassword ? '숨기기' : '보기' }}
            </button>
          <div class="login_form-oo" v-if="errorWarning.password" :style="{ color: errorWarning.password ? 'red' : 'black' }">
            {{ passwordErrorMessage }}
        </div>
      </div>
      </div>

      <!-- 로그인 버튼 -->
      <div>
        <button type="button" @click="handleLoginButton" class="login_form_button">로그인</button>
      </div>
    </form>
   </div>
</div>
</template>

<style scoped>


.loginPage {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50%; /* 화면 전체 높이를 채움 */
  background-color: #f8f9fa; /* 배경색 */
}
.login_form{
  width: 90%; /* 화면 크기 따라 자동 조정 */
  max-width: 500px; /* 최대 너비 설정 */
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 10px;
  margin: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

}

.login-session{
  display: flex;
  flex-direction: column; /* 수직 정렬 */
  margin-bottom: 1.5rem; /* 필드 간 여백 */
}
.login-label{
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.login_form-input{
  width: 100%; /* 필드 너비가 컨테이너에 맞춰짐 */
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 0.5rem;
  box-sizing: border-box;
}

.login_form-input:focus{
  border: 1px solid #4a90e2;
  outline: none;

}

.login_form_button{
  width: 100%; /* 버튼이 컨테이너에 맞춰짐 */
  background-color: #4a90e2;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login_form_button:hover{
  background-color: #357abd;

}
.login_form-oo{
  font-size: 0.9rem;
  color: red;
  margin-top: 0.5rem;
}

</style>
