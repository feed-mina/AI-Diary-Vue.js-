<template>
  <div class="nav-wrap">
    <nav>
      <div class="post-it-nav1">
        <button class="diary-nav1" @click="navigateTo('/')">Home</button>
        <button class="diary-nav3" @click="navigateTo('/diary/tutorial')">튜토리얼</button>
        <button class="login-nav" v-if="!isLoggedIn" @click="navigateTo('/login')">로그인</button>
        <button class="signup-nav" v-if="!isLoggedIn" @click="navigateTo('/signup')">가입하기</button>
      </div>
      <div class="post-it-nav2" v-if="isLoggedIn">
        <button class="diary-nav2" @click="navigateTo('/diary/write')">일기장쓰기</button>
        <button class="diary-nav4" @click="navigateTo('/diary/common')">일기장리스트</button>
        <button class="diary-nav4" @click="logout">로그아웃</button>
      </div>
    </nav>
  </div>
</template>

<script>
import Cookies from 'universal-cookie';
export default {
  name: "DiaryNav",
  data() {
    return {
      kakaoOauthUri: import.meta.env.VITE_KAKAO_OAUTH_URI || "",
    };
  },
  computed: {
    isLoggedIn() {
      return !!this.$cookies.get("userData");
    },
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
    logout() {
      localStorage.removeItem("token");
      alert("로그아웃되었습니다.");
      this.$cookies.remove("userData");
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.nav-wrap {
  width: 30vw;
  height: 100%;
  background-color: #f4f4f4;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  padding: 1rem;
  z-index: 10;
}

.post-it-nav1,
.post-it-nav2 {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.post-it-nav2 {
  margin-top: 1rem;
}

button {
  width: 200px;
  height: 60px;
  font-size: 1.1rem;
  font-weight: bold;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
}

button:hover {
  transform: scale(1.05);
}

.diary-nav1 {
  background: linear-gradient(145deg, #89e73e, #73c234);
  box-shadow: 5px 5px 0px #7acd37, -5px -5px 0px #86e33d;
}

.diary-nav2 {
  background: linear-gradient(145deg, #fe676f, #d5565e);
}

.diary-nav3 {
  background: linear-gradient(145deg, #c841f7, #a837d0);
  box-shadow: 5px 5px 0px #b23adb, -5px -5px 0px #c440f3;
}

.diary-nav4 {
  background: linear-gradient(145deg, #5897f7, #4a7fd0);
  box-shadow: 5px 5px 0px #4e86db, -5px -5px 0px #5694f3;
}

.login-nav {
  background: #7e8c79;
  box-shadow: 5px 5px 0px #172c08;
}

.signup-nav {
  background: #a5778f;
  box-shadow: 5px 5px 0px #4f2116;
}
</style>
