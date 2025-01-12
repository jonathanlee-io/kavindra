<script setup lang="ts">
</script>

<template>
  <nav class="bg-blue-800 shadow-lg px-6 py-4" style="font-family: 'Trebuchet MS', 'Helvetica', sans-serif;">
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      <!-- Logo -->
      <div class="text-2xl font-bold text-white">
        <NuxtLink to="/" class="hover:underline">Kavindra</NuxtLink>
      </div>

      <NuxtLink
        to="/about"
        class="hidden lg:block bg-blue-600 text-white px-5 py-2 rounded-lg text-lg font-bold hover:bg-blue-700 transition-all duration-300 shadow hover:shadow-lg"
      >
        About
      </NuxtLink>
    </div>
  </nav>
</template>

<style scoped>
</style>
