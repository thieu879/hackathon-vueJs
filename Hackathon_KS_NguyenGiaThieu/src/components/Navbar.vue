<template>
  <div class="bg-black text-white flex flex-col w-[200px] h-[100vh] p-4">
    <router-link exact-active-class="active" to="/admin" class="py-2 px-4 mb-2 rounded hover:bg-gray-700">
      Dashboard
    </router-link>
    <router-link active-class="active" to="/admin/managerCategory" class="py-2 px-4 mb-2 rounded hover:bg-gray-700">
      Manager Category
    </router-link>
    <router-link active-class="active" to="/admin/managerProduct" class="py-2 px-4 mb-2 rounded hover:bg-gray-700">
      Manager Product
    </router-link>
  </div>
</template>

<script setup>

</script>

<style scoped>
.active {
  background-color: #4a4a4a;
}
</style>
