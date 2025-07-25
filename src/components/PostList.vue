<template>
  <div v-if="posts.length > 0">
    <h3>Список пользователей</h3>
    <TransitionGroup name="post-list" tag="ul">
      <PostItem
          v-for="post in posts"
          :post = "post"
          :key = "post.id"
          @remove = "removePost"
      />
    </TransitionGroup>
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

.post-list-enter-active,
.post-list-leave-active {
  transition: all 0.4s ease;
}
.post-list-enter-from,
.post-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>