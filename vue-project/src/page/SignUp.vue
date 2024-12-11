<script>
import router from "@/router";
import axios from "axios";
import { onMounted } from "vue";
import {useCookies} from "vue3-cookies";

import port from "@/data/port.json";

export default {
  name: 'SignUp', // 다중 단어 이름으로 변경
  setup(){
    const { cookies } = useCookies();
    const signUpData =  ref({
      id:"",
      password:"",
      rePassword:"",
      email:"",
      name:"",
    });

    const errorWarning = ref({
      id:  false,
      password:  false,
      rePassword:  false,
      email : false,
      name:  false,
    });
    const emailErrorMessage = ref("");
    const passwordValid = ref(true);
    const rePasswordValid = ref(true);

    onMounted(() =>{
      if(!cookies.get("userData")){
        signUpData.value = {
          id:"",
          password:"",
          rePassword:"",
          email:"",
          name:"",
        };
        router.push("/");
      } else {
        router.push("/diary/common");
      }
    });

    const checkEmail = async(email) =>{
      const regExp =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
      if(regExp.text(email)){
        try{
          const res  = await axios.get(`${port.url}/user/${email}/findEmail`);
          emailErrorMessage.value="존재하지 않는 이메일입니다.";
        }catch(e){
          emailErrorMessage="";
          errorWarning.value.email=false;
        }
      }else{
          emailErrorMessage.value="유효하지 ㅇ낳는 이메일입니다."
        }


      // const regExp  = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z]*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z]*\.[a-zA-Z]{2,3}$/;
    }

  }
};
</script>

<template>

<div class="signUp">
  <div class="signUp_form">
    <form @submit.prevent="onClickSignUpButton">
      
    <!--ID-->
    <div>
      <div>
        <label for="id" class="form-label">ID</label>
      </div>
      <div>
        <input size="30" type="text"  v-model="signUpData.id" @input="handleIdChange" class="signUp_form-input" name="id" id="id"/>
      </div>
     </div>

      <!-- 이메일 -->
    <div>
      <div>
        <label for="email" class="form-label">Emaill</label>
      </div>
      <div>
        <input size="30"  type="email" v-model="signUpData.email" @input="handleEmailChange" class="signup_form-input" name="email" id="email" aria-describedby="emailHelp"/>
        <div class="signUp_form-oo" :style="{ color: errorWarning.email ? 'red' : 'black' }">
          {{ emailErrorMessage }}
        </div>
      </div>
    </div>
    <!--패스워드-->
    <div>
      <div>
        <label  for="password" class="form-label">Password</label>
      </div>
      <div>
        <input size="30" yype="password" v-model="signUpData.password" @input="handlePasswordChange" class="signUp_form-input" name="password"  id="password"/>
      </div>
      <div class="signUp_form-oo" >
        <div v-if="!passwordValid" :style="{ color: errorWarning.email ? 'red' : 'black' }">
        8~16자 영문 대 소문자, 숫자, <br/> 특수문자를 사용하세요.
       </div>
      <div>        
      </div>
    </div>
  </div>
    <!--re패스워드-->
    <div>
     <div>
      <label for="rePassword" class="form-label">rePassword</label>
     </div>
      <div>
      <input size="30" type="password" v-model="signUpData.rePassword" @input="handleRepasswordChange" class="=signUp_form-input" name="rePassword" id="rePassword"/>
      </div> 
      <div class="signUp_form-oo">
        <div v-if="!rePasswordValid"  :style="{ color: errorWarning.email ? 'red' : 'black' }">
          비밀번호가 일치하지 않습니다. 
        </div>
      </div>
    </div>
    <!--이름-->
    <div>
      <div>
        <label for="name" class="form-label">Name</label>
      </div>
      <div>
        <input size="30" type="text"   v-model="signUpData.name" @input="handleNameChange" class="signUp_form-input" name="name" id="name"/>
      </div>
    </div>
     <button type="button" @click="oonClickSignUpButton" class="signup_form-button">
      회원가입
     </button>
    </form>
  </div>
</div>
</template>
