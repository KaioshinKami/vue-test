<script>
export default {
  name: 'my-input'
}
</script>

<template>
  <input :value="modelValue" @input="updateInput">
</template>

<script setup>
const props = defineProps({
  modelValue:{
    type: [String, Number],
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

function updateInput(event){
  emit('update:modelValue', event.target.value)
}
</script>

<style scoped>

</style>