<script setup lang="ts">
  import Feature from "~/components/landing-page/Feature.vue";
  import GitHubStarPrompt from "~/components/landing-page/GitHubStarPrompt.vue";
  import PricingTier from "~/components/landing-page/pricing-tier/PricingTier.vue";

  const runtimeConfig = useRuntimeConfig();

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
      icon: "mdi:account-supervisor",
      title: "Community-Driven",
      description:
        "Built by the community, for the community. Your suggestions make the platform better.",
      colorClass: "text-indigo-600",
    },
    {
      icon: "mdi:github",
      title: "Open-Source Benefit",
      description:
        "Transparent, flexible, and trusted. Our open-source platform ensures freedom to contribute while giving you full control.",
      colorClass: "text-green-500",
    },
    {
      icon: "mdi:hand-peace",
      title: "Simple to Use",
      description:
        "Say goodbye to complexity. Our intuitive design ensures a seamless experience for all users, no matter their skill level.",
      colorClass: "text-blue-500",
    },
    {
      icon: "mdi:cash-multiple",
      title: "Affordable for All",
      description:
        "Exceptional features at a fraction of the cost. Experience premium tools without breaking the bank.",
      colorClass: "text-yellow-500",
    },
  ];

  const { data } = await useFetch<PricingTier[]>(`${runtimeConfig.public.apiUrl}/payments/plans`, {
    server: true,
  });
  const pricingTiers: PricingTier[] = data.value as PricingTier[];
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-b from-indigo-50 via-blue-100 to-blue-50 dark:bg-gradient-to-b dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
    style="font-family: &quot;Inter&quot;, &quot;Roboto&quot;, sans-serif"
  >
    <!-- Hero Section -->
    <section class="mb-12 text-center sm:mb-16">
      <div
        class="relative mx-auto flex h-full w-full max-w-full items-center justify-center overflow-hidden rounded-lg border bg-white px-6 py-12 shadow-lg dark:bg-gray-900 p-20 md:shadow-xl"
      >
        <Meteors :number="30" />
        <p
          class="z-10 whitespace-pre-wrap text-center text-5xl font-medium tracking-tighter text-black dark:text-white"
        >
          <NuxtImg
            src="/logo.svg"
            alt="Kavindra Logo"
            class="mx-auto mb-6"
            style="filter: drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.1))"
            width="64"
            height="64"
          />
          <h1
            class="mb-6 text-4xl font-extrabold text-gray-800 drop-shadow-md dark:text-gray-200 sm:mb-8 sm:text-6xl"
          >
            Welcome to <span class="text-indigo-600 dark:text-indigo-400">Kavindra</span>
          </h1>
          <p
            class="mx-auto max-w-2xl text-lg lg:leading-relaxed text-gray-600 dark:text-gray-400 sm:text-xl"
          >
            <span class="font-semibold text-gray-900 dark:text-white">Kavindra</span> is your simple and
            open-source feedback platform, helping users grow while keeping costs low with
            <span class="underline decoration-indigo-600 decoration-2 dark:decoration-indigo-400"
            >direct user feedback</span
            >.
          </p>
        </p>
      </div>
      <div class="mt-8">
        <a
          href="#pricing"
          class="rounded-full bg-indigo-600 px-6 py-3 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:bg-indigo-700 hover:shadow-xl dark:bg-indigo-500 dark:shadow-md dark:hover:bg-indigo-600 sm:px-8 sm:py-4 sm:text-xl"
        >
          View Pricing Plans
        </a>
      </div>
    </section>

    <!-- Features Section -->
    <section
      class="relative mx-auto max-w-7xl rounded-xl bg-white px-6 py-12 shadow-lg dark:bg-gray-900 sm:px-12 sm:py-16 lg:px-16"
    >
      <div class="mb-10 text-center">
        <h2 class="mb-4 text-3xl font-bold text-gray-800 dark:text-gray-100 sm:text-4xl">
          Why Choose <span class="text-indigo-600 dark:text-indigo-400">Kavindra</span>?
        </h2>
        <p class="mx-auto max-w-xl text-lg text-gray-600 dark:text-gray-400">
          Discover what makes our platform unique and suitable for every need.
        </p>
      </div>
      <div
        class="grid grid-cols-1 gap-6 dark:divide-gray-700 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 xl:grid-cols-4"
      >
        <Feature
          v-for="feature in features"
          :key="feature.id"
          :title="feature.title"
          :icon="feature.icon"
          :description="feature.description"
          :color-class="feature.colorClass"
        />
      </div>
    </section>

    <!-- Pricing Table Section -->
    <section
      id="pricing"
      class="mx-auto mt-16 max-w-7xl rounded-t-xl bg-gradient-to-br from-white to-indigo-50 py-16 dark:from-gray-900 dark:to-gray-800"
    >
      <div class="mb-12 text-center">
        <h2 class="mb-4 text-3xl font-bold text-gray-800 dark:text-gray-100 sm:text-4xl">
          Pricing Plans That Fit Your Needs
        </h2>
        <p class="mx-auto max-w-lg text-lg text-gray-600 dark:text-gray-400">
          Affordable plans designed to grow with your needs.
        </p>
      </div>
      <div v-if="!pricingTiers" class="text-center">
        <p class="mx-auto max-w-lg text-lg text-gray-600 dark:text-gray-400">
          No Pricing Tiers Available
        </p>
      </div>
      <div
        v-else
        class="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 sm:grid-cols-3 sm:gap-8 sm:px-8"
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
          :stripe-publishable-key="pricingTier.stripePublishableKey"
          :stripe-pricing-table-id="pricingTier.stripePricingTableId"
        />
      </div>
    </section>
    <GitHubStarPrompt />
  </div>
</template>
