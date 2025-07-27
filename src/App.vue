<template>
  <Navbar />
  <router-view />
</template>

<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
</script>

<style>
*{
  margin: 0;
  padding: 5px;
  box-sizing: border-box;
}
</style>
