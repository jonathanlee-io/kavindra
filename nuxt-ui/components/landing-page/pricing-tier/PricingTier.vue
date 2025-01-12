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
    class="relative p-8 bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300 text-center">
    <!-- Tag (if present) -->
    <span
      v-if="tag"
      class="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white text-sm font-semibold py-1 px-4 rounded-full shadow-lg"
    >
      {{ tag }}
    </span>

    <!-- Plan Name -->
    <h3 class="text-3xl font-bold text-gray-800 mb-4">{{ name }}</h3>

    <!-- Description -->
    <p class="text-gray-600 mb-6">{{ description }}</p>

    <!-- Pricing -->
    <div class="text-5xl font-extrabold text-gray-800 mb-4">
      <span class="text-indigo-600">{{ monthlyPrice }}</span>
      <span class="text-lg font-medium text-gray-600"> / Month</span>
    </div>

    <!-- Features -->
    <ul class="text-gray-600 space-y-3 mb-6">
      <li v-for="(feature, index) in features" :key="index">
        <span class="text-green-600 font-bold">✔</span> {{ feature }}
      </li>
    </ul>

    <!-- Call-to-Action Button -->
    <NuxtLink
      :to="`/get-started/${id}`"
      class="bg-indigo-600 text-white text-lg font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-indigo-700 transition-all duration-300"
    >
      Get Started
    </NuxtLink>
  </div>
</template>

<style scoped>

</style>
