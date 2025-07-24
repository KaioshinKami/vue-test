<script>
export default {
  name: 'my-dialog'
}
</script>

<template>
  <div class="dialog" v-if="show" @click.stop="hideDialog">
    <div @click.stop class="dialog-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:show'])

const hideDialog = () => {
  emit('update:show', false)
}
</script>

<style scoped>
.dialog{
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
}

.dialog-content{
  margin: 250px auto;
  background: white;
  border-radius: 12px;
  max-height: 200px;
  max-width: 350px;
}
</style>