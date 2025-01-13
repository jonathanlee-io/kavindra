<script setup lang="ts">
  interface PricingTier {
    id: string;
    name: string;
    description: string;
    monthlyPrice: string;
    features: string[];
    sortIndex: number;
    tag: string | null;
    stripePricingTableId: string;
    stripePublishableKey: string;
  }

  defineProps<PricingTier>();
</script>

<template>
  <div
    class="relative rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800"
  >
    <!-- Tag (if present) -->
    <span
      v-if="tag"
      class="absolute -top-4 left-1/2 -translate-x-1/2 transform rounded-full bg-indigo-600 px-4 py-1 text-sm font-semibold text-white shadow-lg dark:bg-indigo-500"
    >
      {{ tag }}
    </span>

    <!-- Plan Name -->
    <h3 class="mb-4 text-3xl font-bold text-gray-800 dark:text-gray-100">
      {{ name }}
    </h3>

    <!-- Description -->
    <p class="mb-6 text-gray-600 dark:text-gray-400">
      {{ description }}
    </p>

    <!-- Pricing -->
    <div class="mb-4 text-5xl font-extrabold text-gray-800 dark:text-gray-100">
      <span class="text-indigo-600 dark:text-indigo-400">
        {{ monthlyPrice }}
      </span>
      <span class="text-lg font-medium text-gray-600 dark:text-gray-400"> / Month </span>
    </div>

    <!-- Features -->
    <ul class="mb-6 space-y-3 text-gray-600 dark:text-gray-400">
      <li v-for="(feature, index) in features" :key="index">
        <span class="font-bold text-green-600 dark:text-green-400">✔</span>
        {{ feature }}
      </li>
    </ul>

    <!-- Call-to-Action Button -->
    <NuxtLink
      :to="`/get-started/${id}`"
      class="rounded-lg bg-indigo-600 px-8 py-3 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
    >
      Get Started
    </NuxtLink>
  </div>
</template>

<style scoped></style>
