<script>
import { ref, reactive, computed, watchEffect, onMounted } from 'vue';
import { debounce } from 'vue-debounce';
import { shuffle as _shuffle } from 'lodash-es';
import { marked } from 'marked';
import DemoGrid from './Grid.vue';
import Home from '@/page/Home.vue';
import About from '@/page/About.vue';
import NotFound from '@/page/NotFound.vue';
import ComponentA from '@/components/ComponentA.vue';
import ComponentB from '@/components/ComponentB.vue';
import ComponentC from '@/components/ComponentC.vue'
import TreeItem from '@/TreeItem.vue';
import Modal from '@/Modal.vue'; 

// import DiaryNone from './page/DiaryNone'
// import DiaryWriting from './page/DiaryWriting'
// import kakaoLogin from './page/KakaoLogin'
// import Tutorial from './page/Tutorial'
// import DiaryView from './page/DiaryView'
export default{
  components :{
    ComponentA,
    ComponentB,
    ComponentC,
    Home,
    About,
    NotFound,
    TreeItem,
    Modal,
    DemoGrid
  },

  setup(){

/** 라우터 튜토리얼 */
const routes = {
  '/': Home,
  '/about': About, 
  '/NotFound' : NotFound,

};


const currentPath = ref(window.location.hash);
const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || NotFound;
});

/** 상태 관리 */
const groceryList = ref([
  { id: 0, text: '야채' },
  { id: 1, text: '치즈' },
  { id: 2, text: '아무거나' },
]);

const text = ref('Edit me');
const checked = ref(true);
const checkedNames = ref(['Jack']);
const picked = ref('One');
const selected = ref('A');
const multiSelected = ref(['A']);
const message = ref('Hello');
const isRed = ref(true);
const color = ref('green');
const show = ref(true);
const list = ref([1, 2, 3]);

/** 상태 변경 함수 */
const toggleRed = () => (isRed.value = !isRed.value);
const toggleColor = () => (color.value = color.value === 'green' ? 'blue' : 'green');
const reverseMessage = () => (message.value = message.value.split('').reverse().join(''));
const notify = () => alert('Navigation was prevented.');

/** Markdown 편집기 */
const input = ref('# hello');
const output = computed(() => marked(input.value));
const update = debounce((e) => (input.value = e.target.value), 100);

/** 데이터 가져오기 */
const API_URL = 'https://api.github.com/repos/vuejs/core/commits?per_page=3&sha=';
const branches = ['main', 'v2-compat'];
const currentBranch = ref(branches[0]);
const commits = ref([]);
// 에러 메시지 저장
const error = ref(null);


watchEffect(async () => {
  try {
    // 브랜치에 따라 API URL 설정
    const url = `${API_URL}${currentBranch.value}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API 호출 실패: ${response.status} - ${response.statusText}`);
    }

    // JSON 데이터 가져오기
    commits.value = await response.json();
  } catch (err) {
    console.error('Error fetching commits:', err);
    error.value = err.message; // 에러 메시지 저장
    commits.value = []; // 실패 시 빈 배열로 설정
  }
});

const truncate = (v) => {
  const newline = v.indexOf('\n');
  return newline > 0 ? v.slice(0, newline) : v;
};

const formatDate = (v) => v.replace(/T|Z/g, '');

/** 정렬과 필터가 있는 그리드 */
const searchQuery = ref('');
const gridColumns = ['name', 'power'];
const gridData = [
  { name: 'Chuck Norris', power: Infinity },
  { name: 'Bruce Lee', power: 9000 },
  { name: 'Jackie Chan', power: 7000 },
  { name: 'Jet Li', power: 8000 },
];

/** Tree 뷰 */
const treeData = ref({
  name: 'My Tree',
  children: [
    { name: 'hello' },
    { name: 'world' },
    {
      name: 'child folder',
      children: [{ name: 'hello' }, { name: 'world' }],
    },
  ],
});

/** 모달 컴포넌트 */
const showModal = ref(false);
const msg = ref('Hello World!');

/** 트랜지션으로 리스트 구현 */
const getInitialItems = () => [1, 2, 3, 4, 5];
const items = ref(getInitialItems());
let id = items.value.length + 1;

const insert = () => {
  let i = Math.round(Math.random() * items.value.length);
  items.value.splice(i, 0, id++);
};

const reset = () => {
  items.value = getInitialItems();
  id = items.value.length + 1;
};

const shuffle = () => (items.value = _shuffle(items.value));
const remove = (item) => {
  const i = items.value.indexOf(item);
  if (i > -1) items.value.splice(i, 1);
};

/** TodoMVC */
const STORAGE_KEY = 'vue-todomvc';
const filters = {
  all: (todoSample) => todoSample,
  active: (todoSample) => todoSample.filter((todo) => !todo.completed),
  completed: (todoSample) => todoSample.filter((todo) => todo.completed),
};

const todoSample = ref(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'));
const visibility = ref('all');
const editedTodo = ref();

const filteredTodoSample = computed(() => filters[visibility.value](todoSample.value));
const remainingSample = computed(() => filters.active(todoSample.value).length);

watchEffect(() => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todoSample.value));
});

const toggleAll = (e) => {
  todoSample.value.forEach((todo) => (todo.completed = e.target.checked));
};

const todos = ref([]);
const newTodo = ref("");
const addTodo = () => {
  const value = newTodo.value.trim();
  if (value) {
    todos.value.push({ 
        id: Date.now(), 
        title: value, 
        completed: false 
      });
      newTodo.value = '';
};

}
const removeTodoSample = (todo) => {
  todos.value.splice(todoSample.value.indexOf(todo), 1);
};

const removeTodo2 = (todo) =>{
  todos.value = todos.value.filter((t)=> t.id !== todo.id);
};

const removeCompleted = () =>{
  todos.value = todos.value.filter((todo)=> !todo.completed);
};

const filteredTodos = computed(()=>todos.value);
const remaining = computed(() => todos.value.filter((todo) => !tldl.completed));

const editTodo = (todo) => {
  beforeEditCache = todo.title;
  editedTodo.value = todo;
};

const cancelEdit = (todo) => {
  editedTodo.value = null;
  todo.title = beforeEditCache;
};

const doneEdit = (todo) => {
  if (editedTodo.value) {
    editedTodo.value = null;
    todo.title = todo.title.trim();
    if (!todo.title) removeTodo(todo);
  }
}; 

onMounted(() => {
  window.addEventListener('hashchange', () => {
    currentPath.value = window.location.hash;
  });
});

return {
  multiSelected,
      list, groceryList, text, checked, checkedNames, picked, selected, currentView, showModal,  msg, todos, insert, reset, shuffle, remove, filteredTodoSample, remaining, removeCompleted, remainingSample, toggleAll,branches, commits, newTodo, addTodo, filteredTodos, editTodo, show, reverseMessage, notify, toggleRed, toggleColor, truncate, formatDate, searchQuery, gridColumns, gridData, treeData, output, update,show
    };
}, 
}
</script> 

<template>
  <v-app> 
  <v-container>
    <v-row>
    <!--컴포넌트와 스토어-->
    <v-col cols="12" md="6" class="component_storeSection">
      <v-card outlined>
      <v-card-title>컴포넌트와 스토어 튜터리얼</v-card-title>
        <v-card-text>
          <ComponentA />
          <ComponentB />
        </v-card-text>
      </v-card>
    </v-col>
    <!--라우터 튜터리얼-->
    <v-col class="routeSection">
      <v-card outlined>
        <v-card-title>라우터 튜터리얼</v-card-title>
       <v-card-text>
        <v-btn href="#/" color="primary" text>Home</v-btn> |
        <v-btn href="#/about">About</v-btn> |
        <v-btn href="#/non-existent-path">잘못된 링크</v-btn>
        <v-component :is="currentView" /> 
       </v-card-text>
      </v-card>
    </v-col>
  </v-row>
      <!-- Form 바인딩 -->
 
  <v-row>
    <v-col cols="12" md="6">
      <v-card outlined>
          <v-card-text>
            <v-text-field v-model="text" label="텍스트 입력하기" outlined/>
            <v-checkbox v-model="checked" label="체크박스"/>
            <v-checkbox-group v-model="checkedNames" column>
            <v-checkbox label="Jack" value="Jack"/>
            <v-checkbox label="john" value="john"/>
            <v-checkbox label="Mike" value="Mike"/>
            </v-checkbox-group>

            <v-radio-group v-model="picked">
              <v-radio label="One" value="One" />
              <v-radio label="Two" value="Two" />
            </v-radio-group>

            <v-select v-model="selected" :items="['A','B','C']" label="셀렉트 박스" outlined/>
            <v-select v-model="multiSelected" :items="['A','B','C']" label="Multi Select" multiple outlined/>
          </v-card-text>
      </v-card>
    </v-col>
  </v-row>
  <!--데이터가져오기-->
  <v-row>
    <v-col>
      <v-card outlined>
        <v-card-title>데이터 가져오기</v-card-title>
          <v-card-text>
            <v-radio-group>
            <v-radio
              v-for="brnch in branches"
              :key="branch"
              :label="branch"
              :value="branch"/>
            </v-radio-group>
            <v-list>
              <v-list-item v-for="{ html_url, sha, author, commit } in commits" :key="sha || html_url">
              <v-list-item-content>
                <v-list-item-title>
                  <a :href="html_url" target="_blank">
                    {{  sha?.substring(0, 7) || 'N/A' }}
                  </a>
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{  commit?.message || 'No message' }} - {{ commit?.author?.name || 'Unknown Author' }}
                </v-list-item-subtitle>
              </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
      </v-card>
    </v-col>
  </v-row> 

  <!-- TodoMVC -->
  <v-row>
    <v-col cols="12">
      <v-card outlined>
        <v-card-title>TodoMVC</v-card-title>
        <v-card-text>
          <v-text-field class="mb-3" v-model="newTodo" label="What needs to be done? "
          @keyup.enter="addTodo" />
          <v-list>
            <v-list-item 
            v-for="todo in filteredTodos" 
            :key="todo.id"
            :class="{ completed : todo.completed }">
            <v-checkbox v-model="todo.completed" />
            <v-list-item-content>
              <v-list-item-title>{{ todo.title }}</v-list-item-title>
            </v-list-item-content>
            <v-btn icon @click="removeTodo(todo)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="removeCompleted">Clear Completed</v-btn>
          <span>{{ remaining }} items left</span>
        </v-card-actions>
      </v-card>
    </v-col>
    </v-row>
</v-container>

    </v-app>
</template>




<style>
@import "https://unpkg.com/todomvc-app-css@2.4.1/index.css";

.inputhandlingSection,
.vIFandVForSection,
.PropsEXSection,
.formSection,
.componentSection,
.modalSection,
.treeSection,
.fliterSection,
.listSection,
.todoSection{	
    border-radius: 15px;
    border-bottom: 3px solid darkgray;
    width: 100%;
    margin-bottom: 1em;
    padding: 20px 10px;
}


</style>

 
