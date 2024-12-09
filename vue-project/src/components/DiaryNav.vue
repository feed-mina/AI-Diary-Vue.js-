<template>
     
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/notFound">잘못된 링크</RouterLink>
        <RouterLink to="/componentA">componentA</RouterLink>
        <RouterLink to="/componentB">componentB</RouterLink>
        <RouterLink to="/componentC">componentC</RouterLink>
        <RouterLink to="/tutorial">tutorial</RouterLink>
        <RouterLink to="/signin">signin</RouterLink>
        <RouterLink to="/signup">signup</RouterLink>
        <RouterLink to="/kakaoLogin">kakaoLogin</RouterLink>
        <RouterLink to="/loginNew">loginNew</RouterLink>
        <RouterLink to="/diaryView">diaryView</RouterLink>
        <RouterLink to="/diaryWriting">diaryWriting</RouterLink> 
      </nav>
</template>
  
  <script>
export default {
    name: "DiaryNav",
  };
  </script>
  
  <style scoped>
  .navbar {
    background-color: #444;
    padding: 10px 20px;
  }
  .navbar ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: space-around;
  }
  .navbar li a {
    color: white;
    text-decoration: none;
    font-weight: bold;
  }
  .navbar li a:hover {
    text-decoration: underline;
  }
  


  .nav {
    background-color: #333;
    padding: 10px;
  }
  .nav ul {
    list-style: none;
    display: flex;
    justify-content: center;
    margin: 0;
    padding: 0;
  }
  .nav li {
    margin: 0 15px;
  }
  .nav a {
    color: white;
    text-decoration: none;
    font-size: 16px;
  }
  .nav a:hover {
    text-decoration: underline;
  }

  </style>
   