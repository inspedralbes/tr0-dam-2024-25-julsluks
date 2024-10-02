<script setup>
import { ref } from 'vue';
</script>

<template>
    <nav class="bg-gray-900 py-4 absolute t-0 w-full">
        <div class="container mx-auto flex justify-between items-center">
            <div class="text-white text-lg font-semibold">
                MyApp
            </div>
            <div>
                <a href="#" class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</a>
                <a href="#" class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">About</a>
                <a href="#" class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Contact</a>
            </div>
        </div>
    </nav>
</template>