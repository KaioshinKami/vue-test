<template>
  <div v-if="posts.length > 0">
    <h3>Список пользователей</h3>
    <PostItem
        v-for="post in posts"
        :post = "post"
        :key = "post.id"
        @remove = "removePost"
    />
  </div>

  <h1 v-else class="list">Список пользователей пуст</h1>
</template>

<script setup>
import PostItem from './PostItem.vue'

const props = defineProps({
  posts: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['remove'])

function removePost(post){
  emit("remove", post)
}

</script>

<style scoped>
.list{
  color: red;
  text-align: center;
}
</style>