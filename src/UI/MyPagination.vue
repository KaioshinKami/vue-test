<template>
    <button
        class="page"
        :class="{
          'current-page': pageNumber === currentPage
        }"
    >
      {{pageNumber}}
    </button>
</template>

<script setup>
defineOptions({
  name: 'my-pagination'
})

const props = defineProps({
  pageNumber: Number,
  currentPage: Number
})
</script>

<style scoped>
.page {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
}

.current-page {
  background-color: #0b3650;
  color: white;
}

</style>