<template>
  <my-button @click="showDialog">
    Создать
  </my-button>
  <my-button @click="fetchPosts">Получить Посты с бэка</my-button>

  <my-dialog v-model:show = "dialogVisible">
    <PostForum @create = 'addPost'/>
  </my-dialog>
  <PostList
      :posts = "posts"
      @remove = "removePost"
  />
</template>

<script setup lang="ts">
import {ref} from "vue";
import PostForum from './PostForum.vue';
import PostList from './PostList.vue';
import MyDialog from "../UI/MyDialog.vue";
import MyButton from "../UI/MyButton.vue";
import axios from "axios";

interface Post{
  id: number;
  title: string;
  body: string;
}

const posts = ref<Post[]>([
  {id:1, title: 'Java Script', body: 'Язык про JS'},
  {id:2, title: 'Java', body: 'Язык про Java'},
  {id:3, title: 'Type Script', body: 'Язык про TS'},
])

const fetchPosts = async() => {
  try{
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10')
    posts.value.push(...response.data)
  }
  catch (e) {
    alert(e)
  }
}

const addPost = (newPost: Post) => {
  posts.value.push(newPost)
  dialogVisible.value=false
}

const removePost = (postToRemove: Post) => {
  posts.value = posts.value.filter(post => post.id !== postToRemove.id)
}

const dialogVisible = ref(false);

function showDialog(){
  dialogVisible.value = true
}

</script>

<style scoped>
</style>