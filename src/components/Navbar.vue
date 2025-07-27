<template>
  <nav class="navbar">
    <ul class="nav-links">
      <li><router-link to="/">Главная</router-link></li>
      <li><router-link to="/about">О нас</router-link></li>
      <li><router-link to="/posts">Посты</router-link></li>
    </ul>
  </nav>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 16px 32px;
  background-color: #2e74a3;
  color: white;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 24px;
  padding: 0;
  margin: 0;

  li {
    a {
      color: white;
      text-decoration: none;
      font-weight: 500;
      transition: 0.3s;

      &:hover {
        color: #14ee6c;
      }

      &.router-link-active {
        color: #14ee6c;
        border-bottom: 2px solid #14ee6c;
      }
    }
  }
}
</style>
