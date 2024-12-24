<script>
import { ref } from 'vue'; // 사용하지 않는 reactive, onMounted 삭제

import router from "@/router";
import axios from "axios";
import { onMounted } from "vue";
import Cookies from "universal-cookie";

// import port from "@/data/port.json";

export default {
  name: 'SignupPage',
  setup(){
    // 쿠키 객체 생성
    const cookies = new Cookies();
    const signUpData =  ref({
      emailPrefix:"",
      emailDomain:"",
      customDomain:"",
      userId:"",
      password:"",
      rePassword:"",
      email:"",
      name:"",
      phone:{
        first:"",
        middle:"",
        last:"",
      }
    });

    const errorWarning = ref({
      userId:  false,
      password:  false,
      rePassword:  false,
      email : false,
      name:  false,
      phone: false,
    });
    const emailErrorMessage = ref("");
    const idErrorMessage = ref("");
    const passwordErrorMessage = ref("");
    const nameErrorMessage = ref("");
    const phoneErrorMessage = ref("");

    const idValid = ref(true);
    const passwordValid = ref(true);
    const rePasswordValid = ref(true);
    const nameValid = ref(true);
    const emailValid = ref(true);
    const phoneValid = ref(true);

    const showPassword = ref(false);
    const showRePassword = ref(false);
    const togglePasswordVisibility = () =>{
      showPassword.value = !showPassword.value;
    }
    const toggleRePasswordVisibility = () =>{
      showRePassword.value = !showRePassword.value;
    }

    // 컴포넌트가 로드될 때 오늘 날짜 자동 설정
    onMounted(() =>{
      const userData = cookies.get("userData");
      console.log('cookies.get("userData',cookies.get("userData"));
      if (!userData) {
    console.log("사용자가 로그인되어 있지 않음");
    // router.push("/"); // 필요하지 않다면 삭제
       } else {
        router.push("/diary/common");
      }
       });

    const checkId = (id) => {
      const idExp = /^[a-zA-Z0-9]{5,15}$/; // 정규식 검증
      idValid.value = idExp.test(id); // 정규식 검증

      idErrorMessage.value = idValid.value? "" : "아이디는 5~15자의 영문 대소문자와 숫자만 허용됩니다.";
      errorWarning.value.id = !idValid.value;

    };

    const checkPassword = (password) => {
      const PaswrordExp = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$^&*]{8,}$/; // 최소 8자, 문자, 숫자, 특수문자 포함
      passwordValid.value = PaswrordExp.test(password);
      passwordErrorMessage.value = passwordErrorMessage.value ? "" : "비밀번호는 영어, 숫자, 특수문자를 포함하여 8 자리 이상으로 설정해 주세요."
        errorWarning.value.password = !passwordValid.value;
      }

    const checkRePassword = (rePassword) =>{
      rePasswordValid.value = rePassword === signUpData.value.password;
      errorWarning.value.rePassword = !rePassword.value;
      passwordErrorMessage.value = rePasswordValid.value ? "" : "비밀번호가 일치하지 않습니다.";
      errorWarning.value.rePassword = !rePasswordValid.value;
    }

    const checkName = async(name)=>{
      const regNameExp = /^[가-힣a-zA-Z\s]{2,20}$/; // 2~20자, 한글 영문 이름 허용 (띄어쑤기 포함)
      nameValid.value = regNameExp.test(name);
      nameErrorMessage.value = nameValid.value ? "" : "이름은 2~20자의 한글 또는 영문만 가능합니다."
        errorWarning.value.name = !nameValid.value;
      }

    const checkEmail = async (email) => {
      let fullEmail = "";
      if(signUpData.value.emailDomain === "custom"){
        fullEmail = `${signUpData.value.emailPrefix}@${signUpData.value.customDomain}`;
      } else{
        fullEmail = `${signUpData.value.emailPrefix}@${signUpData.value.emailDomain}`;
      }
      const regEmailExp =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
      emailValid.value = regEmailExp.test(fullEmail);

      if(!emailValid.value){
        emailErrorMessage.value = "유효하지 않는 이메일형식입니다.";
      }else{
        emailValid.value = "";
      }
      errorWarning.value.name = !emailValid.value;
      signUpData.value.email = fullEmail;
    }

     
    const validatePhone = () => {
      const { first, middle, last } = signUpData.value.phone;
      if (first.length === 3 && middle.length === 4 && last.length === 4) {
        phoneValid.value = true;
        phoneErrorMessage.value = "";
      } else {
        phoneValid.value = false;
        phoneErrorMessage.value = "휴대폰 번호를 정확히 입력해주세요.";
      }
      errorWarning.value.phone = !phoneValid.value;
    };
    const handlePhoneInput = (field) => {
      // 숫자만 입력 가능하도록 필터링
      signUpData.value.phone[field] = signUpData.value.phone[field].replace(/[^0-9]/g, "");
      validatePhone();
    };
    const handleIdChange = (event) =>{
      checkId(event.target.value);
    }

    const handlePasswordChange = (event) =>{
      checkPassword(event.target.value);
    }
    const handleEmailChange = () => {
      checkEmail();
    };


    const handleRePasswordChange = (event) => {
      const rePassword = event.target.value;
      signUpData.value.rePassword  = rePassword;
      checkRePassword(rePassword);
    }

    const handleNameChange = (event) =>{
      const name = event.target.value;
      signUpData.value.name = name; // 데이터 갱신
      checkName(event.target.name);
    }



    // 데이터 저장(localStorage)
    const signUpDataToSave = {
      email : signUpData.value.email,
      password: signUpData.value.password,
      name : signUpData.value.name,
    };

    const isSignUpDataValid = () =>{
      console.log("유효성 검사");
      return idValid.value   && passwordValid.value && rePasswordValid.value   &&   nameValid.value;
    }

// 회원가입 데이터 전송
const sendSignUpData = async () => {
  try {
    const response = await axios.post("http://localhost:8080/api/auth/register", signUpData.value);

    // 성공 처리
    localStorage.setItem("signUpDataToSave", JSON.stringify(signUpDataToSave));
    alert("회원가입이 완료되었습니다! (임시저장)");
    console.log("회원가입 데이터:", signUpDataToSave);

    return response.data; // 필요 시 반환
  } catch (error) {
    console.error("API 호출 실패", error);
    alert("회원가입에 실패했습니다. 다시 시도해주세요.");
  }
};

// 회원가입 버튼 클릭 핸들러
const onClickSignUpButton = async () => {
  console.log("회원가입 데이터:", signUpData.value);

  // 유효성 검사
  if (!isSignUpDataValid()) {
    alert("빠진 정보 없이 적어주세요.");
    return;
  }

  // 데이터 전송
  await sendSignUpData();
};

    return{
      signUpData,
      errorWarning,
      idErrorMessage,
      passwordErrorMessage,
      nameErrorMessage,
      emailErrorMessage,
      passwordValid,
      rePasswordValid,
      showPassword,
      showRePassword,
      togglePasswordVisibility,
      toggleRePasswordVisibility,
      handleIdChange,
      handleEmailChange,
      handlePasswordChange,
      handleRePasswordChange,
      handleNameChange,
      onClickSignUpButton,
      sendSignUpData, 
      phoneErrorMessage,
      handlePhoneInput
    }

  }
};
</script>

<template>

<div class="signupPage">
  <div class="signUp_form">
    <form @submit.prevent="onClickSignUpButton">

    <!--ID-->
    <div class="signUp-session">
      <div class="signUp-label">
        <label for="id" class="form-label">ID</label>
      </div>
      <div>
        <input size="30" type="text"  v-model="signUpData.userId" @input="handleIdChange" class="signUp_form-input" name="userId" id="userId"/>
        <div class="signUp_form-oo" :style="{ color: errorWarning.userId ? 'red' : 'black' }">
          {{ idErrorMessage }}
        </div>
      </div>
     </div>

    <!--선택박스 사용해서 이메일 종류 선택이랑 input으로 직접입력하기 기능 -->
      <!-- 이메일 -->
      <div class="signUp-session">
        <div class="signUp-label">
          <label for="email" class="form-label">Emaill</label>
        </div>
      <div>
      <div style="display:flex; gap: 10px; align-items: center;">
        <!--이메일 앞부분-->
        <input size="20"  type="text" v-model="signUpData.emailPrefix" @input="handleEmailChange" class="signUp_form-input" name="email" id="email" aria-describedby="emailHelp"/>
        <span>@</span>
        <!--이메일 도메인 선택-->
        <select v-model="signUpData.emailDomain" @change="handleEmailChange" class="signUp_form-input">
          <option value="" disabled selected>직접입력</option>
          <option value="naver.com">naver.com</option>
          <option value="gmail.com">gmail.com</option>
          <option value="nate.com">nate.com</option>
          <option value="hanmail.net">hanmail.net</option>
          <option value="daum.net">daum.net</option>
          <option value="custon">직접입력</option>
        </select>
   
        <input size="30"  type="email" v-if="signUpData.emailDomain === 'custom'" v-model="signUpData.customDomain" @input="handleEmailChange" class="signUp_form-input" name="email" id="email" placeholder="도메인 입력" aria-describedby="emailHelp"/>
        <div class="signUp_form-oo" :style="{ color: errorWarning.email ? 'red' : 'black' }">
          {{ emailErrorMessage }}
        </div>
      </div>
    </div>
    </div>
    <!--패스워드-->
    <div class="signUp-session">
      <div class="signUp-label">
        <label  for="password" class="form-label">Password</label>
      </div>
      <div>
        <input size="30" :type="showPassword ? 'text' : 'password'" v-model="signUpData.password" @input="handlePasswordChange" class="signUp_form-input" name="password"  id="password"/>
        <button type="button" @click="togglePasswordVisibility">
          {{  showPassword ? '숨기기' : '보기' }}
        </button>
      <div class="signUp_form-oo" v-if="errorWarning.password" :style="{ color: errorWarning.password ? 'red' : 'black' }">
        {{ passwordErrorMessage }}
    </div>
  </div>
  </div>
    <!--re패스워드-->
    <div class="signUp-session">
      <div class="signUp-label">
      <label for="rePassword" class="form-label">Repassword</label>
     </div>
      <div>
      <input size="30" :type="showRePassword ? 'text' : 'password'" v-model="signUpData.rePassword" @input="handleRePasswordChange" class="signUp_form-input" name="rePassword" id="rePassword" placeholder="비밀번호를 한 번 더 입력해 주세요.">
      <button type="button" @click="toggleRePasswordVisibility">
        {{  showRePassword ? '숨기기' : '보기' }}
      </button>
      <div class="signUp_form-oo">
        <div v-if="errorWarning.rePassword"  :style="{ color: errorWarning.rePassword ? 'red' : 'black' }">
          비밀번호가 일치하지 않습니다.
          {{ passwordErrorMessage }}
        </div>
      </div>
      </div>
    </div>
    <!--핸드폰 번호 3글자 +`-`+4글자  +`-`+4글자--->
    <div class="signUp-session">
  <div class="signUp-label">
    <label for="phone" class="form-label">휴대전화 *</label>
  </div>
  <div style="display: flex; gap: 10px;">
    <!-- 첫 번째 입력 필드 -->
    <input
      type="text"
      v-model="signUpData.phone.first"
      maxlength="3"
      placeholder="010"
      @input="handlePhoneInput('first')"
      class="signUp_form-input phone-input"
    />
    <!-- 두 번째 입력 필드 -->
    <input
      type="text"
      v-model="signUpData.phone.middle"
      maxlength="4"
      placeholder="1234"
      @input="handlePhoneInput('middle')"
      class="signUp_form-input phone-input"
    />
    <!-- 세 번째 입력 필드 -->
    <input
      type="text"
      v-model="signUpData.phone.last"
      maxlength="4"
      placeholder="5678"
      @input="handlePhoneInput('last')"
      class="signUp_form-input phone-input"
    />
  </div>
  <div class="signUp_form-oo" :style="{ color: errorWarning.phone ? 'red' : 'black' }">
    {{ phoneErrorMessage }}
  </div>
</div>

    <!--이름-->
    <div class="signUp-session">
      <div class="signUp-label">
        <label for="name" class="form-label">Name</label>
      </div>
      <div>
        <input size="30" type="text"   v-model="signUpData.name" @input="handleNameChange" class="signUp_form-input" name="name" id="name" placeholder="이름을 입력해 주세요."/>
      <div class="signUp_form-oo">
        <div v-if="errorWarning.name"  :style="{ color: errorWarning.name ? 'red' : 'black' }">

          {{ nameErrorMessage }}
        </div>
      </div>

      </div>
    </div>
    <!-- -->
     <button type="button" @click="onClickSignUpButton"  class="signup_form_button">
      회원가입
     </button>
    </form>
  </div>
</div>
</template>

<style scoped>
.phone-input {
  width: 80px; /* 각 입력 필드 너비 */
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 0.5rem;
  text-align: center;
}

.phone-input:focus {
  border: 1px solid #4a90e2;
  outline: none;
}

.temp {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 화면 전체 높이를 채움 */
  background-color: #f8f9fa; /* 배경색 */
}

.signUp-session{
  display: flex;
  flex-direction: column; /* 수직 정렬 */
  margin-bottom: 1.5rem; /* 필드 간 여백 */
}
.signUp-label{
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}
.signUp_form{
  width: 90%; /* 화면 크기 따라 자동 조정 */
  max-width: 500px; /* 최대 너비 설정 */
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 10px;
  margin: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.signUp_form-input{
  width: 100%; /* 필드 너비가 컨테이너에 맞춰짐 */
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 0.5rem;
  box-sizing: border-box;
}

.signUp_form-input:focus{
  border: 1px solid #4a90e2;
  outline: none;

}

.signup_form_button{
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

.signup_form_button:hover{
  background-color: #357abd;

}
.signUp_form-oo{
  font-size: 0.9rem;
  color: red;
  margin-top: 0.5rem;
}
</style>
