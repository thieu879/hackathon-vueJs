<template>
  <div>
    <Header></Header>
    <div class="flex">
      <Navbar></Navbar>
      <div class="flex-1 p-4">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import Header from './components/Header.vue';
import Navbar from './components/Navbar.vue';
</script>

<style scoped>

</style>
