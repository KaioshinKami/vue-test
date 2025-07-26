<template>
  <div class = 'post'>
    <div>
      <div>{{post.id}}</div>
      <div><strong>Название:</strong> {{post.title}}</div>
      <div><strong>Описание:</strong> {{post.body}}</div>
    </div>

    <div class="del_btn">
      <my-button @click = 'removePost'>
        Удалить
      </my-button>
    </div>
  </div>
</template>

<script setup>
import MyButton from '../UI/MyButton.vue'

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
</style>