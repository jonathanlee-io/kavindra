<script setup lang="ts">
import Feature from '~/components/landing-page/Feature.vue';
import PricingTier from '~/components/landing-page/pricing-tier/PricingTier.vue';

const runtimeConfig = useRuntimeConfig()

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

interface Feature {
  icon: string;
  title: string;
  description: string;
  colorClass: string;
}

const features: Feature[] = [
  {
    icon: 'mdi:account-supervisor',
    title: 'Community-Driven',
    description: 'Built by the community, for the community. Your suggestions make the platform better.',
    colorClass: 'text-indigo-600',
  },
  {
    icon: 'mdi:github',
    title: 'Open-Source Benefit',
    description: 'Transparent, flexible, and trusted. Our open-source platform ensures freedom to contribute while giving you full control.',
    colorClass: 'text-green-500',
  },
  {
    icon: 'mdi:hand-peace',
    title: 'Simple to Use',
    description: 'Say goodbye to complexity. Our intuitive design ensures a seamless experience for all users, no matter their skill level.',
    colorClass: 'text-blue-500',
  },
  {
    icon: 'mdi:cash-multiple',
    title: 'Affordable for All',
    description: 'Exceptional features at a fraction of the cost. Experience premium tools without breaking the bank.',
    colorClass: 'text-yellow-500',
  },
]

const {data} = await useFetch<PricingTier[]>(`${runtimeConfig.public.apiUrl}/payments/plans`, {
  server: true,
});
const pricingTiers: PricingTier[] = data.value as PricingTier[];
</script>

<template>
  <div class="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen py-12 px-4 sm:py-16 sm:px-6 lg:px-8" style="font-family: 'Inter', 'Roboto', sans-serif;">
    <!-- Hero Section -->
    <section class="text-center mb-12 sm:mb-16">
      <h1 class="text-4xl sm:text-6xl font-extrabold text-gray-800 mb-6 sm:mb-8 drop-shadow-md">
        Welcome to <span class="text-indigo-600">Kavindra</span>
      </h1>
      <p class="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed sm:leading-loose">
        <span class="font-semibold text-gray-900">Kavindra</span> is your simple and open-source feedback platform, helping users grow while keeping costs low with
        <span class="underline decoration-indigo-600 decoration-2">direct user feedback</span>.
      </p>
      <div class="mt-8">
        <a
          href="#pricing"
          class="bg-indigo-600 text-white text-lg sm:text-xl font-semibold py-3 px-6 sm:py-4 sm:px-8 rounded-full shadow-lg hover:bg-indigo-700 hover:shadow-xl transition-all duration-300">
          View Pricing Plans
        </a>
      </div>
    </section>

    <!-- Features Section -->
    <section class="relative bg-white py-12 sm:py-16 rounded-xl shadow-lg max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
      <div class="text-center mb-10">
        <h2 class="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
          Why Choose <span class="text-indigo-600">Kavindra</span>?
        </h2>
        <p class="text-lg text-gray-600 max-w-xl mx-auto">
          Discover what makes our platform unique and suitable for every need.
        </p>
      </div>
      <div class="grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <Feature
          v-for="feature in features"
          :title="feature.title"
          :icon="feature.icon"
          :description="feature.description"
          :color-class="feature.colorClass"
        />
      </div>
    </section>

    <!-- Pricing Table Section -->
    <section id="pricing" class="py-16 bg-gradient-to-br from-white to-indigo-50 rounded-t-xl max-w-7xl mx-auto mt-16">
      <div class="text-center mb-12">
        <h2 class="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
          Pricing Plans That Fit Your Needs
        </h2>
        <p class="text-lg text-gray-600 max-w-lg mx-auto">
          Affordable plans designed to grow with your needs.
        </p>
      </div>
      <div v-if="!pricingTiers" class="text-center">
        <p class="text-lg text-gray-600 max-w-lg mx-auto">No Pricing Tiers Available</p>
      </div>
      <div
        v-else
        class="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto px-6 sm:px-8"
      >
        <PricingTier
          v-for="pricingTier in pricingTiers"
          :key="pricingTier.id"
          :id="pricingTier.id"
          :name="pricingTier.name"
          :description="pricingTier.description"
          :tag="pricingTier.tag"
          :monthly-price="pricingTier.monthlyPrice"
          :features="pricingTier.features"
          :sort-index="pricingTier.sortIndex"
          :stripe-pricing-table-id="pricingTier.stripePricingTableId"
          :stripe-publishable-key="pricingTier.stripePublishableKey"
        />
      </div>
    </section>
    <!-- GitHub Star Section -->
    <section class="text-center py-12 sm:py-16 bg-gray-50 border-t border-gray-200 mt-16">
      <div class="max-w-3xl mx-auto">
        <h2 class="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
          Love Kavindra? 💜
        </h2>
        <p class="text-lg text-gray-600 mb-6">
          Help us grow by giving our open-source project a star on GitHub and joining our journey to improve user feedback!
        </p>
        <a
          href="https://github.com/jonathanlee-io/kavindra"
          target="_blank"
          class="inline-block bg-indigo-600 text-white font-semibold text-lg sm:text-xl py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-indigo-700"
        >
          ⭐ Star on GitHub
        </a>
      </div>
    </section>
  </div>
</template>
