<script setup>
import { ref } from 'vue';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import Navbar from './components/Navbar.vue';
</script>

<template>
  <div class="bg-background-image flex flex-col items-center justify-center h-screen text-white">
    <Navbar />
    <Header />
    <Footer />
  </div>
</template>

<style scoped>

</style>
