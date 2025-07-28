<template>
  <my-input
      v-model="searchQuery"
      placeholder="Пойск по названию"
  />

  <my-button @click="showDialog">
    Создать
  </my-button>

  <my-select v-model="selectedSort" :options="options"/>

  <my-dialog v-model:show = "dialogVisible">
    <PostForum @create = 'addPost'/>
  </my-dialog>
  <PostList
      :posts = "posts"
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
import {computed, onMounted, ref} from "vue";
import PostForum from '../components/PostForum.vue';
import PostList from '../components/PostList.vue';
import MyDialog from "../UI/MyDialog.vue";
import MyButton from "../UI/MyButton.vue";
import MySelect from "../UI/MySelect.vue";
import MyInput from "../UI/MyInput.vue";
import MyPagination from "../UI/MyPagination.vue";
import {useStore} from "vuex";
import type {Post} from "../store/postModule.ts";


const store = useStore()
const posts = computed(() => store.getters['post/sortedAndSearchedPosts'])
const isPostLoading = computed(() => store.state.post.isPostLoading)
const selectedSort = computed({
  get: () => store.state.post.selectedSort,
  set: (val) => store.commit('post/setSelectedSort', val)
})
const searchQuery = computed({
  get: () => store.state.post.searchQuery,
  set: (val) => store.commit('post/setSearchQuery', val)
})
const page = computed(() => store.state.post.page)
const totalPages = computed(() => store.state.post.totalPages)

const options = [
  { value: 'title', name: 'По названию' },
  { value: 'body', name: 'По описанию' }
]

const dialogVisible = ref(false)

function showDialog() {
  dialogVisible.value = true
}

onMounted(() => {
  store.dispatch('post/fetchPosts')
})

const addPost = (newPost: Post) => {
  store.commit('post/addPost', newPost)
}

const removePost = (post: Post) => {
  store.commit('post/removePost', post.id)
}


const changePage = (pageNumber) => {
  store.commit('post/setPage', pageNumber)
  store.dispatch('post/fetchPosts')
}
</script>

<style scoped>
.page-btns {
  display: flex;
  gap: 10px;
  margin: 20px;
}


</style>