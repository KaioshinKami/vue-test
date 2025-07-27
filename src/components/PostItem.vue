<template>
  <div class = 'post'>
    <div>
      <div>{{post.id}}</div>
      <div><strong>Название:</strong> {{post.title}}</div>
      <div><strong>Описание:</strong> {{post.body}}</div>
    </div>

    <div class="btns">
      <my-button
          @click="router.push(`/posts/${post.id}`)"
      >
        Открыть
      </my-button>

      <my-button @click = 'removePost'>
        Удалить
      </my-button>
    </div>
  </div>
</template>

<script setup>
import MyButton from '../UI/MyButton.vue'
import router from "../router/router.js";

const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['remove'])

function removePost(){
  emit('remove', props.post)
}
</script>

<style scoped>
.post{
  padding: 10px;
  border: #14ee6c solid;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btns{
  display: flex;
}
</style>