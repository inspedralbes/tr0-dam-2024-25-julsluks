<script setup>
import { ref } from 'vue';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import Navbar from './components/Navbar.vue';
</script>

<template>
  <Navbar />
  <div class="bg-background-image flex flex-col items-center justify-center h-screen text-white">
    <Header />
  </div>
  <Footer />
</template>

<style scoped>

</style>
