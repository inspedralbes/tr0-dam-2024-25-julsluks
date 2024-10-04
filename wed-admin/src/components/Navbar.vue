<template>
    <nav class="bg-gray-800 text-white fixed w-full top-0 left-0 z-50 shadow-md">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16">
                <!-- Logo or Brand Name -->
                <div class="flex-shrink-0">
                    <a href="/" class="text-xl font-bold">My Quiz Game</a>
                </div>

                <!-- Links (Desktop View) -->
                <div class="hidden md:flex space-x-4">
                    <a @click="toggleQuestions" class="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Questions</a>
                    <a @click="toggleStatistics" class="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Statistics</a>
                </div>

                <!-- Hamburger Menu (Mobile View) -->
                <div class="md:hidden">
                    <button @click="isOpen = !isOpen" class="text-white hover:text-gray-400 focus:outline-none"
                        aria-label="Toggle navigation">
                        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <!-- Mobile Menu -->
        <div v-if="isOpen" class="md:hidden px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a @click="toggleQuestions" class="hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">Questions</a>
            <a @click="toggleStatistics" class="hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">Statistics</a>
        </div>
    </nav>
</template>

<script setup>
import { ref } from "vue";

const isOpen = ref(false);
const showQuestions = ref(false);
const showStatistics = ref(false);
const emit = defineEmits(["response"]);

function toggleQuestions() {
    showQuestions.value = !showQuestions.value;
    if (showQuestions.value) {
        showStatistics.value = false;
    }
    console.log('Show Questions', showQuestions.value);
    emit('response', { showQuestions: showQuestions.value, showStatistics: showStatistics.value });
}

function toggleStatistics() {
    showStatistics.value = !showStatistics.value;
    if (showStatistics.value) {
        showQuestions.value = false;
    }
    console.log('Show Statistics', showStatistics.value);
    emit('response', { showQuestions: showQuestions.value, showStatistics: showStatistics.value });
}

</script>

<style scoped>
/* Custom Styles (if necessary) */
</style>