<template>
  <div class="post-page">
    <h1>Пост №{{ post?.id }}</h1>

    <div v-if="post">
      <h2>{{ post.title }}</h2>
      <p>{{ post.body }}</p>
    </div>
    <div v-else>
      Загрузка поста...
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import axios from "axios";
import {useRoute} from "vue-router";

interface Post {
  id: number
  title: string
  body: string
}

const route = useRoute()
const post = ref<Post | null>(null)

const fetchPostsId = async () => {
  const id = route.params.id
  try{
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
    post.value = response.data
  }
  catch (e) {
    console.log(e)
  }
}
onMounted(fetchPostsId)


</script>

<style lang="scss" scoped>
.post-page {
  padding: 30px;
  background-color: #f6f8fa;
  border-radius: 12px;
  max-width: 600px;
  margin: 0 auto;
}

h1 {
  color: #2c3e50;
  margin-bottom: 20px;
}

h2 {
  color: #3498db;
}

p {
  font-size: 18px;
  line-height: 1.6;
}
</style>