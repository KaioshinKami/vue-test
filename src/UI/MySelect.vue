<script>
export default {
  name: 'my-select'
}
</script>

<template>
  <select :value="modelValue" @change="changeOptions">
    <option disabled value="">Выберите из списка</option>
    <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
    >
      {{option.name}}
    </option>
  </select>
</template>

<script setup>
const props = defineProps({
  modelValue:{
    type: String,
    default: ''
  },
  options:{
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:modelValue'])

function changeOptions(event){
  emit('update:modelValue', event.target.value)
}
</script>

<style scoped>

</style>