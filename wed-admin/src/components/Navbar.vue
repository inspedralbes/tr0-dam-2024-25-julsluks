<script setup>
import { ref } from 'vue';
</script>

<template>
    <nav class="fixed w-full z-20 top-0 start-0 bg-gray-800">
        <div class="container mx-auto flex justify-between items-center px-4">
            <div class="text-white text-lg font-semibold">
                MyApp
            </div>
            <ul class="flex space-x-4">
                <li><a href="#" class="text-gray-300 hover:text-white">Home</a></li>
                <li><a href="#" class="text-gray-300 hover:text-white">About</a></li>
                <li><a href="#" class="text-gray-300 hover:text-white">Services</a></li>
                <li><a href="#" class="text-gray-300 hover:text-white">Contact</a></li>
            </ul>
        </div>
    </nav>
</template>