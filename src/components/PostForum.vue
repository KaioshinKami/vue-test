<template>
  <form @submit.prevent = "createPost">
    <h2>Создание поста</h2>
    <my-input v-model="title"
              class="input-post"
              type="text"
              placeholder="Название"
    />
    <my-input v-model="body"
              class="input-post"
              type="text"
              placeholder="Опмисание"
    />
    <my-button>
      Создать
    </my-button>
  </form>
</template>

<script setup>
import {ref} from "vue";
import MyButton from '../UI/MyButton.vue'
import MyInput from "../UI/MyInput.vue";

const title = ref('')
const body = ref('')

const emit = defineEmits(['create'])

const createPost = () =>{
  if(!title.value.trim() || !body.value.trim()) return

  emit('create', {
    id: Date.now(),
    title: title.value,
    body: body.value
  })

  title.value = '';
  body.value = '';
}
</script>

<style scoped>
.input-post{
  width: 100%;
  border: 1px #14ee6c solid;
  padding: 10px 15px;
  margin-top: 10px;
}
</style>