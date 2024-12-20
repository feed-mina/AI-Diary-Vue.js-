import Cookies from 'universal-cookie';

export default {
  install(app) {
    const cookies = new Cookies(); // Cookies 인스턴스 생성
    app.config.globalProperties.$cookies = cookies; // 전역 속성으로 등록
  },
};
