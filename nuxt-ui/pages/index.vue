<script setup lang="ts">
</script>

<template>
  <div class="bg-gray-50 min-h-screen py-12 px-4 sm:py-16 sm:px-6 lg:px-8" style="font-family: 'Inter', 'Helvetica', sans-serif;">
    <!-- Hero Section -->
    <section class="text-center mb-10 sm:mb-12">
      <h1 class="text-3xl sm:text-5xl font-extrabold text-gray-800 mb-4 sm:mb-6">
        Welcome to Kavindra
      </h1>
      <p class="text-base sm:text-lg text-gray-600 max-w-xl mx-auto">
        <span class="text-gray-800 font-bold">Kavindra</span> is your simple and open-source feedback platform, helping users grow while keeping costs low with <span class="underline decoration-gray-600">direct user feedback</span>.
      </p>
      <div class="mt-6 sm:mt-8">
        <a href="#pricing" class="bg-indigo-600 text-white text-base sm:text-lg font-semibold py-3 px-5 sm:py-3 sm:px-6 rounded-lg shadow hover:shadow-md hover:bg-indigo-700 transition duration-300">
          View Pricing Plans
        </a>
      </div>
    </section>

    <!-- Features Section -->
    <section class="max-w-5xl mx-auto grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-2">
      <!-- Existing Feature Items -->
      <div class="p-5 bg-white border border-gray-200 rounded-lg shadow hover:shadow-md transition duration-300">
        <div class="text-3xl text-indigo-600 mb-4">
          <Icon name="mdi:account-supervisor" />
        </div>
        <h2 class="text-lg font-bold text-gray-800 mb-2">Community-Driven</h2>
        <p class="text-gray-600 text-sm">
          Built by the community, for the community. Your suggestions make the platform better.
        </p>
      </div>

      <!-- Add New Features Here -->

      <!-- Feature: Open Source Advantage -->
      <div class="p-5 bg-white border border-gray-200 rounded-lg shadow hover:shadow-md transition duration-300">
        <div class="text-3xl text-green-600 mb-4">
          <Icon name="mdi:github" />
        </div>
        <h2 class="text-lg font-bold text-gray-800 mb-2">Open-Source Benefit</h2>
        <p class="text-gray-600 text-sm">
          Transparent, flexible, and trusted. Our open-source platform ensures freedom to contribute while giving you full control.
        </p>
      </div>

      <!-- Feature: Incredibly Simple -->
      <div class="p-5 bg-white border border-gray-200 rounded-lg shadow hover:shadow-md transition duration-300">
        <div class="text-3xl text-blue-600 mb-4">
          <Icon name="mdi:hand-peace" />
        </div>
        <h2 class="text-lg font-bold text-gray-800 mb-2">Simple to Use</h2>
        <p class="text-gray-600 text-sm">
          Say goodbye to complexity. Our intuitive design ensures a seamless experience for all users, no matter their skill level.
        </p>
      </div>

      <!-- Feature: Affordable yet Powerful -->
      <div class="p-5 bg-white border border-gray-200 rounded-lg shadow hover:shadow-md transition duration-300">
        <div class="text-3xl text-yellow-600 mb-4">
          <Icon name="mdi:cash-multiple" />
        </div>
        <h2 class="text-lg font-bold text-gray-800 mb-2">Affordable for All</h2>
        <p class="text-gray-600 text-sm">
          Exceptional features at a fraction of the cost. Experience premium tools without breaking the bank.
        </p>
      </div>
    </section>

    <!-- Pricing Table Section -->
    <section id="pricing" class="bg-white py-12 sm:py-16">
      <div class="text-center mb-10">
        <h2 class="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-4">
          Pricing Plans That Fit Your Needs
        </h2>
        <p class="text-base sm:text-lg text-gray-600 max-w-lg mx-auto">
          From free to affordable, we’re here to support feedback at all scales.
        </p>
      </div>

      <div class="max-w-4xl mx-auto grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <!-- Basic Plan -->
        <div class="p-5 bg-gray-50 border border-gray-200 rounded-lg shadow hover:shadow-md transition duration-300 text-center">
          <h3 class="text-xl font-bold text-gray-800 mb-4">Basic</h3>
          <p class="text-sm text-gray-600 mb-4">
            Perfect for individuals and small teams.
          </p>
          <div class="text-3xl font-extrabold text-gray-800 mb-4">$0</div>
          <ul class="text-sm text-gray-600 space-y-1 mb-4">
            <li>✔ Feedback Forms</li>
            <li>✔ Basic Analytics</li>
            <li>✔ Open Source</li>
          </ul>
          <a href="#" class="bg-indigo-600 text-white text-base font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-lg shadow hover:bg-indigo-700">
            Get Started
          </a>
        </div>

        <!-- Repeat Pricing Plan Cards -->
        <!-- Pro Plan -->
        <div class="p-5 bg-indigo-600 text-white rounded-lg shadow hover:shadow-md transition duration-300 text-center">
          <h3 class="text-xl font-bold mb-4">Pro</h3>
          <p class="text-sm mb-4">
            Great for growing teams and businesses.
          </p>
          <div class="text-3xl font-extrabold mb-4">$9</div>
          <ul class="text-sm space-y-1 mb-4">
            <li>✔ Advanced Analytics</li>
            <li>✔ Priority Support</li>
            <li>✔ Integration Tools</li>
          </ul>
          <a href="#" class="bg-white text-indigo-600 font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-lg hover:bg-gray-100">
            Try Pro
          </a>
        </div>

        <!-- Enterprise Plan -->
        <div class="p-5 bg-gray-50 border border-gray-200 rounded-lg shadow hover:shadow-md transition duration-300 text-center">
          <h3 class="text-xl font-bold text-gray-800 mb-4">Enterprise</h3>
          <p class="text-sm text-gray-600 mb-4">
            Customized solutions for enterprises.
          </p>
          <div class="text-3xl font-extrabold text-gray-800 mb-4">Contact Us</div>
          <ul class="text-sm text-gray-600 space-y-1 mb-4">
            <li>✔ Custom Feedback Tools</li>
            <li>✔ Dedicated Support</li>
            <li>✔ Scalability Options</li>
          </ul>
          <a href="#" class="bg-indigo-600 text-white font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-lg hover:bg-indigo-700">
            Contact Us
          </a>
        </div>
      </div>
    </section>
  </div>
</template>
