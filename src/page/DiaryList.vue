<template>
  <div class="diaryList">
    <h1>일기장</h1>
    <div class="diaryList_content">
      <main class="diaryOtherList">
        <div v-if="diaries.length > 0">
          <div v-for="(it, index) in diaries" :key="it.diaryId" class="diary-post" @click="viewDiary(it.diaryId)">
            <header>
              <h3>
                {{ it.author || '익명' }}
              </h3>
              <span>
                &nbsp;{{ it.title ? it.title.substring(0, 10) : '제목 없음' }}...
              </span>
              <time class="published" :dateTime="it.regDt">
                {{ new Date(it.regDt || it.date).toLocaleDateString() }}
              </time>
            </header>
            <p>{{ it.content ? it.content.substring(0, 50) : '내용 없음' }}</p>
          </div>
        </div>
        <div v-else>아직 게시글이 없습니다.</div>
      </main>
      <!-- 페이지네이션 -->
      <div class="pagination" v-if="page.total > page.pageSize">
        <button
          v-for="p in Math.ceil(page.total / page.pageSize)"
          :key="p"
          :class="{ active: p === page.pageNo }"
          @click="onClickPagination(p)"
        >
          {{ p }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import Cookies from 'universal-cookie';

export default {
  name: 'DiaryList',
  setup() {
    const router = useRouter();
    const cookies = new Cookies();
    const jwtToken = cookies.get('jwt')?.jwt;

    const diaryList = ref([]);
    const diaries = ref([]);

    const page = ref({
      pageNo: 1,
      pageSize: 5, // 한 페이지당 5개의 일기
      total: 0,
    });

    const getDiaryList = async (userId, pageNo) => {
      try {
        const response = await axios.get('http://localhost:8080/api/diary/viewDiaryList', {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            'Content-Type': 'application/json',
          },
          params: {
            userId: userId,
            pageNo: pageNo,
            pageSize: page.value.pageSize,
          },
        });

        const { list, total, pageSize, pageNum } = response.data.diaryList;
        diaries.value = list;
        page.value = {
          pageNo: pageNum,
          pageSize: pageSize,
          total: total,
        };
      } catch (error) {
        console.error('Error fetching diary list: ', error);
        router.push('/');
      }
    };

    const onClickPagination = async (newPage) => {
      page.value.pageNo = newPage;
      const userId = localStorage.getItem('userId');
      await getDiaryList(userId, newPage);
    };

    const viewDiary = (diaryId) => {
      router.push(`/diary/${diaryId}`);
    };

    onMounted(() => {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        router.push('/');
      } else {
        getDiaryList(userId, page.value.pageNo);
      }
    });

    return {
      diaries,
      diaryList,
      page,
      onClickPagination,
      viewDiary,
    };
  },
};
</script>

<style scoped>
.diaryList {
  width: 100%;
  min-width: 400px;
  margin: 0 auto;
  border-radius: 2em;
  overflow: hidden;
}

.diaryList_content {
  width: 97%;
  background: linear-gradient(transparent, transparent 28px, #eee7db 28px);
  background-size: 30px 30px;
  display: flex;
  flex-direction: column;
}

.diaryOtherList {
  padding: 1.875em;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: flex-start;
}
.diary-post {
  flex: 1 1 calc(100% - 2em);
  max-width: calc(100% - 2em);
  background: #ffffff;
  border: solid 1px #c1ab86;
  border-radius: 0.25em;
  padding: 1.5em;
  margin: 1em;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  box-sizing: border-box; /* 박스 크기를 유지 */
  display: flex;
  flex-direction: column; /* 내용 정렬 */
  justify-content: space-between; /* 공간 확보 */
  height: 15em; /* 고정 높이 설정 */
}

.diary-post:hover {
  transform: scale(1.05);
}

.diary-post header h3 {
  font-size: 1.2em;
  margin-bottom: 0.5em;
  text-align: center; /* 제목 중앙 정렬 */
}

.diary-post header span {
  font-size: 1em;
  display: block;
  margin-top: 0.5em;
  text-align: center; /* 부제목 중앙 정렬 */
}

.diary-post p {
  font-size: 1em;
  line-height: 1.5em;
  text-align: left; /* 내용 왼쪽 정렬 */
  margin-top: auto; /* 아래로 밀기 */
  white-space: nowrap; /* 내용 길게 표시 방지 */
  overflow: hidden;
  text-overflow: ellipsis;
}
.pagination {
  margin-top: 1em;
  display: flex;
  justify-content: center;
}

.pagination button {
  margin: 0.5em;
  padding: 0.5em 1em;
  border: none;
  background-color: #c1ab86;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

.pagination button.active {
  background-color: #805a3b;
}

.pagination button:hover {
  background-color: #a8835b;
}

/* 
@media screen and (min-width: 600px) {
  .diary-post {
    flex: 1 1 calc(50% - 2em);
    max-width: calc(50% - 2em);
  }
}

@media screen and (min-width: 900px) {
  .diary-post {
    flex: 1 1 calc(33.333% - 2em);
    max-width: calc(33.333% - 2em);
  }
} */

</style>
