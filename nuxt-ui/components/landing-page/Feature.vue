<script setup lang="ts">
  interface Feature {
    icon: string;
    title: string;
    description: string;
    colorClass: string;
  }

  defineProps<Feature>();
</script>

<template>
  <div
    class="rounded-lg border border-gray-200 bg-gray-50 p-6 shadow transition-all duration-300 hover:-translate-y-2 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
  >
    <div :class="colorClass" class="mb-4 text-4xl dark:text-gray-100">
      <Icon :name="icon" />
    </div>
    <h2 class="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-100">
      {{ title }}
    </h2>
    <p class="text-sm text-gray-600 dark:text-gray-400">
      {{ description }}
    </p>
  </div>
</template>

<style scoped></style>
