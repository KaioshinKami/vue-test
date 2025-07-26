<template>
  <my-input
      v-model="searchQuery"
      placeholder="Пойск по названию"
  />

  <my-button @click="showDialog">
    Создать
  </my-button>

  <my-button @click="fetchPosts">Получить Посты с бэка</my-button>

  <my-select v-model="selectedSort" :options="options"/>

  <my-dialog v-model:show = "dialogVisible">
    <PostForum @create = 'addPost'/>
  </my-dialog>
  <PostList
      :posts = "sortedAndSearch"
      @remove = "removePost"
      v-if="!isPostLoading"
  />
  <div v-else>
    идет загрузка
  </div>

  <div class="page-btns">
    <my-pagination
        v-for="pageNumber in totalPages"
        :key="pageNumber"
        :pageNumber="pageNumber"
        :currentPage="page"
        @click="changePage(pageNumber)"
    />

  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, ref, watch} from "vue";
import axios, {post} from "axios";
import PostForum from './PostForum.vue';
import PostList from './PostList.vue';
import MyDialog from "../UI/MyDialog.vue";
import MyButton from "../UI/MyButton.vue";
import MySelect from "../UI/MySelect.vue";
import MyInput from "../UI/MyInput.vue";
import MyPagination from "../UI/MyPagination.vue";

interface Post{
  id: number;
  title: string;
  body: string;
}

const posts = ref<Post[]>([
  {id:13, title: 'Java Script', body: 'Язык про JS'},
  {id:26, title: 'Java', body: 'Язык про Java'},
  {id:33, title: 'Type Script', body: 'Язык про TS'},
])
const dialogVisible = ref(false);
const isPostLoading = ref(false)
const selectedSort = ref('')
const searchQuery = ref('')
const page = ref(1)
const limit = ref(10)
const totalPages = ref(0)
const options = ref([
  { value: 'title', name: 'По названию' },
  { value: 'body', name: 'По описанию' }
])

const fetchPosts = async() => {
  try{
    isPostLoading.value = true
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
      params: {
        _page: page.value,
        _limit: limit.value
      }
    })
    totalPages.value = Math.ceil(response.headers['x-total-count'] / limit.value)
    posts.value = response.data
    isPostLoading.value = false
  }
  catch (e) {
    alert(e)
  } finally {
  }
}
onMounted(fetchPosts)

const addPost = (newPost: Post) => {
  posts.value.push(newPost)
  dialogVisible.value=false
}

const removePost = (postToRemove: Post) => {
  posts.value = posts.value.filter(post => post.id !== postToRemove.id)
}

function showDialog(){
  dialogVisible.value = true
}

const sortedPosts = computed(() => {
  return [...posts.value].sort((post1, post2) => {
    if (!selectedSort.value) return 0
    return post1[selectedSort.value as keyof Post]
        .toString()
        .localeCompare(post2[selectedSort.value as keyof Post].toString())
  })
})

const sortedAndSearch = computed(() => {
  return sortedPosts.value.filter(post =>
      post.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

function changePage(pageNumber){
  page.value = pageNumber
  fetchPosts()
}
</script>

<style scoped>
.page-btns {
  display: flex;
  gap: 10px;
  margin: 20px;
}


</style>