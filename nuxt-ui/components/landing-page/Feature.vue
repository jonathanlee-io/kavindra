<script setup lang="ts">
interface Feature {
  icon: string;
  title: string;
  description: string;
  colorClass: string;
}

defineProps<Feature>()
</script>

<template>
  <div class="p-6 bg-gray-50 border border-gray-200 rounded-lg shadow hover:shadow-lg hover:-translate-y-2 transition-all duration-300">
    <div :class="colorClass" class="text-4xl mb-4">
      <Icon :name="icon" />
    </div>
    <h2 class="text-xl font-semibold text-gray-800 mb-2">{{ title }}</h2>
    <p class="text-gray-600 text-sm">
      {{ description }}
    </p>
  </div>
</template>

<style scoped>

</style>
