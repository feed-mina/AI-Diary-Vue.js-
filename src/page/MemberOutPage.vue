<script>
import {ref, onMounted} from "vue";
import {useRouter} from "vue-router";
import Cookies from "universal-cookie";
import axios from "axios";

export default {
  name: 'MemberOutPage', 
  setup(){
    const router = useRouter();
    const cookies = new Cookies(); 

    const isMemberOutPg = ref(true);   

    // 로그인 입력 데이터
    const memberOutData = ref({
      userId:"",
      password : "", 
    });
    const errorWarning = ref({
      userId:  false,
      password:  false,
    });
    const idErrorMessage = ref("");
    const passwordErrorMessage = ref("");
    
    // const idValid = ref(true);
    // const passwordValid = ref(true);
    const showPassword = ref(false);
    const togglePasswordVisibility = () =>{
      showPassword.value = !showPassword.value;
    }
    // 로그인 상태 확인 후 리다이렉트
    onMounted(() => {
      const userData = cookies.get("userData");
      if(!userData){
        console.log("로그인 필요");
        memberOutData.value = {
          userId : "",
          password : "",
        };
        router.push("/memberOut");
      }  else{
        router.push("/diary/common");
      }
    });

    const handleMemberOutData = (event) =>{
      memberOutData.value[event.target.name] = event.target.value;
    };
 

    const onClickMemberOutButton = async() => {
      console.log("로그인 데이터 :", memberOutData.value);
      if(!memberOutData.value.userId){
        alert("아이디를 입력해주세요.");
        return;
      }

      if(!memberOutData.value.password){
        alert("비밀번호를 입력해주세요.");
        return;
      }

      try {
    // API 호출 및 응답 처리
        const jwtToken = await sendMemberOutData();
        console.log("로그인 성공, JWT:", jwtToken);

        // JWT 토큰을 쿠키 또는 localStorage에 저장
        cookies.set("jwt", jwtToken, { path: "/" });
        localStorage.setItem("userId", memberOutData.value.userId);
        alert("로그인을 완료했습니다.");
      router.push("/diary/common").then(() => {
        location.reload(); // 새로고침
      });  

      } catch (error) {
        // 에러 처리
        console.error("로그인 실패:", error);
        alert(error.response?.data?.message || "로그인에 실패했습니다.");
      }
    };


    // 로그인 API 호출
    const sendMemberOutData = async () => {
      try {
        const response = await axios.post("http://localhost:8080/api/auth/non-user", memberOutData.value);
        return response.data; // 응답 데이터를 반환합니다.
      } catch (error) {
        console.error("API 호출 실패:", error.response?.data || error.message);
        throw error; // 예외를 던져서 상위에서 처리하도록 합니다.
      }
};


    

    return{
      isMemberOutPg,
      memberOutData, 
      errorWarning,
      showPassword,
      handleMemberOutData,
      idErrorMessage,
      passwordErrorMessage,
      togglePasswordVisibility,
      onClickMemberOutButton
    };

   },
};
</script>

<template>
<div class="memberOutPage">
  <div id="memberOut_form" class="memberOut_form">
       <!--회원탈퇴 페이지 -->
       <main>
   <header class="sc-3e13c255-0 gwUtMK">
      <button class="prevBtn" title="이전 페이지" type="button">
         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" direction="right" class="sc-34bc1965-0 eAIvBe">
            <rect width="24" height="24"></rect>
            <!-- <path d="M8 3L16.2929 11.2929C16.6262 11.6262 16.7929 11.7929 16.7929 12C16.7929 12.2071 16.6262 12.3738 16.2929 12.7071L8 21" stroke="#1c1c1e" stroke-width="1.6" stroke-linecap="round"></path> -->
         </svg>
      </button>
      <!-- <h1>회원 탈퇴</h1> -->
   </header>
   <div class="sc-3e13c255-1 ctrbmY"></div>
   <div class="sc-ceed69bd-0 VpfJj">
      <section>
         <h2 class="sc-ceed69bd-1 iATcQ">불편함이 있으셨나요?</h2>
         <p class="sc-ceed69bd-2 fBhHYS">아래 방법을 통해 해결하실 수 있습니다.</p>
         
         <div class="sc-ceed69bd-3 isFuqM">
<!--           
          <button type="button" class="base__ButtonRoot-sc-206d6909-0 dhVHxS button___StyledButtonBase3-sc-43279e9a-2 jCkVaj">이메일 수신거부</button>
          
          <button type="button" class="base__ButtonRoot-sc-206d6909-0 dhVHxS button___StyledButtonBase3-sc-43279e9a-2 jCkVaj">SMS 수신거부</button>
           -->
          <button type="button" class="base__ButtonRoot-sc-206d6909-0 dhVHxS button___StyledButtonBase3-sc-43279e9a-2 jCkVaj">개인정보 수정</button>
          
          <button type="button" class="base__ButtonRoot-sc-206d6909-0 dhVHxS button___StyledButtonBase3-sc-43279e9a-2 jCkVaj">비밀번호 변경</button></div>
      </section>
      <div role="separator" aria-orientation="horizontal" class="divider__Divider-sc-b8ad0d88-0 IAFTP"></div>
<!-- 
      <section>
         <h2 class="sc-ceed69bd-1 iATcQ">탈퇴하면 아래 혜택이 모두 사라져요.</h2>

         <div class="sc-b53b0099-0 cyJDtp">
            <div class="sc-b53b0099-1 jMfhZe">
              <span>보유포인트</span>
              <span class="sc-b53b0099-2 bAASHO">즉시 소멸</span>
              <span class="sc-b53b0099-3 dLyBXk">0P</span>
            </div>
            
            <div class="sc-b53b0099-1 jMfhZe">
              <span>보유 쿠폰</span>
              <span class="sc-b53b0099-2 bAASHO">즉시 소멸</span>
              <span class="sc-b53b0099-3 dLyBXk">0매</span>
            </div> 
         </div>

      </section>
       -->
      <div role="separator" aria-orientation="horizontal" class="divider__Divider-sc-b8ad0d88-0 IAFTP"></div>
      <section>
         <h2 class="sc-ceed69bd-1 iATcQ">꼭 확인해 주세요.</h2>
         <ul class="sc-ceed69bd-4 hzNdZv">
            <li class="sc-ceed69bd-5 edlgNH">적립금과 혜택은 모두 소멸되며 재가입시 복구되지 않습니다.</li>
            <li class="sc-ceed69bd-5 edlgNH">상품리뷰, 1:1문의에 등록된 게시물은 탈퇴 후에도 유지됩니다. <br>삭제를 원하는 경우, 먼저 해당 게시글을 삭제하신 후 탈퇴해 주세요.</li>
            <li class="sc-ceed69bd-5 edlgNH">관계법령에 따른 주문번호는 탈퇴 후 5년간 보존됩니다.</li>
            <li class="sc-ceed69bd-5 edlgNH">5년간 기존 아이디를 재사용 하실 수 없으며 7일이내 동일명의의 본인인증이 불가합니다.</li>
         </ul>
      </section>
      <section>
         <label gap="8" class="checkbox__Label-sc-38383938-0 dYWOUq">
            <div class="checkbox-base__CheckboxBaseRoot-sc-d272e4ac-0 khGpkv">
               <input variant="square" class="checkbox-base__CheckboxSquareInput-sc-d272e4ac-2 gtPPqU" type="checkbox">
               <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="checkbox-base__CheckboxSquareIcon-sc-d272e4ac-1 coMdzT">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M14.3602 3.38688C14.764 3.78449 14.769 4.43415 14.3714 4.83793L7.14188 12.1797C6.74835 12.5793 6.10314 12.5772 5.71223 12.175L1.62326 7.96766C1.22831 7.56128 1.23758 6.91167 1.64396 6.51672C2.05034 6.12177 2.69995 6.13104 3.0949 6.53742L6.43429 9.97346L12.9092 3.39806C13.3068 2.99428 13.9564 2.98927 14.3602 3.38688Z" fill="currentColor"></path>
               </svg>
            </div>
            <p class="text__Text-sc-365491ba-0 fsklAP">위 사항을 모두 확인했습니다.</p>
         </label>
      </section>
      <div class="sc-eda81c26-0 inayCG">
        <button type="button" class="base__ButtonRoot-sc-206d6909-0 dhVHxS button___StyledButtonBase3-sc-43279e9a-2 jCkVaj">
          더 써볼래요
        </button>
        <button type="button" disabled="" class="base__ButtonRoot-sc-206d6909-0 dhVHxS button___StyledButtonBase2-sc-43279e9a-1 blROEa">
          탈퇴 하기
        </button>
      </div>
   </div>
</main>
<!-- 회원탈퇴 페이지-->
   </div>
</div>
</template>

<style scoped> 

/* 
.memberOutPage {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    background-color: #f8f9fa;
    padding: 8rem;
    flex-direction: column;
}
.memberOut_form{
    display: flex;
    height: 100%;
    width: 100%;
    padding: 5rem;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    justify-content: flex-start;
    flex-direction: column;
    margin-bottom: 1.5rem; 
  margin-bottom: 1.5rem;  
} */
.khGpkv {
    position: relative;
    display: flex
;
    align-items: center;
    justify-content: center;
}
.gwUtMK {
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    display: flex
;
    justify-content: center;
    align-items: center;
    height: 5rem;
    background: var(--int-gray0);
}

.ctrbmY {
    height: 5rem;
}
.VpfJj {
    margin-left: 1rem;
    padding-bottom: 8rem;
}
.iATcQ {
    color: var(--int-gray900);
    font-size: 1.8rem;
    line-height: 1.5;
    font-weight: 700;
}
.isFuqM {
    display: flex
;
    flex-wrap: wrap;
    gap: 1.2rem 0.8rem;
}
.isFuqM button {
    width: calc(50% - 0.4rem);
    padding: 1.2rem 0px;
    box-sizing: border-box;
    border-radius: 1.2rem;
    font-size: 1.6rem;
    line-height: 1.5;
    font-weight: 700;
    color: var(--int-gray900);
    cursor: pointer;
}
.IAFTP {
    flex-grow: 1;
    flex-shrink: 1;
    height: 8px;
    background-color: rgb(240, 244, 244);
}
.iATcQ {
    color: var(--int-gray900);
    font-size: 1.8rem;
    line-height: 1.5;
    font-weight: 700;
}
.cyJDtp {
    display: flex;
    flex-direction: column;
    margin-top: 1.8rem;
    padding: 0.4rem 1.6rem;
    border: 0.1rem solid var(--int-gray400);
    border-radius: 1.2rem;
}
.IAFTP {
    flex-grow: 1;
    flex-shrink: 1;
    height: 8px;
    background-color: rgb(240, 244, 244);
}

.dYWOUq {
  padding-top: 2rem;
    display: inline-flex;
    align-items: center;
    gap: 8px;
}
.khGpkv {
    position: relative;
    display: flex ;
    align-items: center;
    justify-content: center;
}
.coMdzT {
    position: absolute;
    inset: 0px;
    margin: auto;
    pointer-events: none;
    color: var(--int-gray0);
    opacity: 0;
    width: 14px;
    height: 14px;
}
.fsklAP {
    box-sizing: border-box;
    line-height: 1.5;
    letter-spacing: 0px;
    overflow-wrap: break-word;
    white-space: pre-line;
    word-break: normal;
    color: var(--int-gray900);
    font-size: 1.6rem;
    font-weight: 700;
}
.inayCG {
    /* position: fixed; */
    right: 0px;
    bottom: 0px;
    left: 0px;
    z-index: var(--int-zindex-floating);
    display: flex
;
    gap: 1rem;
    width: 100%;
    height: var(--floating-button-height);
    padding: 1.6rem 2rem;
    background-color: var(--int-gray0);
    box-sizing: border-box;
}
.inayCG > button, .inayCG > div {
    flex: 1 1 50%;
}
 
.jCkVaj {
    color: var(--int-gray900);
    background-color: var(--int-gray0);
    border: 1px solid var(--int-gray500);
}
.dhVHxS:disabled {
    color: var(--int-gray0);
    background: var(--int-gray500);
    border-color: transparent;
}
.inayCG > button, .inayCG > div {
    flex: 1 1 50%;
}
















.coMdzT {
    position: absolute;
    inset: 0px;
    margin: auto;
    pointer-events: none;
    color: var(--int-gray0);
    opacity: 0;
    width: 14px;
    height: 14px;
}
.memberOut_form_box{
    height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
}
.memberOut-label{
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
} 

.memberOut_form-input{
  width: 100%; /* 필드 너비가 컨테이너에 맞춰짐 */
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 0.5rem;
  box-sizing: border-box;
}

.memberOut_form-input:focus{
  border: 1px solid #4a90e2;
  outline: none;

}

.memberOut_form_button{
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

.memberOut_form_button:hover{
  background-color: #357abd;

}
.memberOut_form-oo{
  font-size: 0.9rem;
  color: red;
  margin-top: 0.5rem;
}
 
</style>