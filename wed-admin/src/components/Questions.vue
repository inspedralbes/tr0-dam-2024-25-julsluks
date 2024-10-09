<template>
    <div class="mb-4 mx-3">
        <h1 class="text-2xl text-center mb-4">All Questions</h1>
        <div id="accordion-open" data-accordion="open">
            <div v-for="(question, index) in questions" :key="index">
                <h2 :id="'accordion-open-heading-' + index">
                    <button type="button" class="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200 focus:ring-4 focus:ring-gray-200 hover:bg-gray-100 gap-3" 
                    @click="toggleAccordion(index)" :aria-expanded="openAccordions[index]"
                        :aria-controls="'accordion-open-body-' + index">
                        <span class="flex items-center">
                            <svg class="w-5 h-5 me-2 shrink-0" fill="currentColor" viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                    clip-rule="evenodd"></path>
                            </svg>
                            {{ question.question }}
                        </span>
                        <svg :class="{ 'rotate-180': openAccordions[index] }" class="w-3 h-3 shrink-0"
                            aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 5 5 1 1 5" />
                        </svg>
                    </button>
                </h2>
                <div v-show="openAccordions[index]" :id="'accordion-open-body-' + index"
                    class="p-5 border border-b-0 border-gray-200"
                    :aria-labelledby="'accordion-open-heading-' + index">
                    <div class="grid grid-cols-3 gap-1 items-center max-w-[678px]">
                        <img :src="question.image" class="rounded-lg border"/>
                        <ul>
                            <li v-for="(answer, index) in question.answers" class="p-2" :class="answer.correct == true ? 'text-green-600' : 'text-red-600'">({{ answer.correct }}) {{ answer.answer }}</li>
                        </ul>
                        <div class="flex flex-col justify-center items-center space-y-4">
                            <button class="bg-red-700/40 text-white px-3 py-1 rounded-lg text-lg hover:shadow hover:bg-red-700/70">Delete</button>
                            <button class="bg-yellow-300/50 text-white px-3 py-1 rounded-lg text-lg hover:shadow hover:bg-yellow-300/80">Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { findAllQuestions } from '../communicationManager.js';

console.log('Questions Component Loaded');

const questions = ref([]);
const openAccordions = ref([]);

const loadQuestions = async () => {
    try {
        const response = await findAllQuestions();
        questions.value = response; 
        openAccordions.value = response.map(() => false);
    } catch (error) {
        console.error('Error fetching questions:', error);
    }
};

onMounted(loadQuestions);

const toggleAccordion = (index) => {
    openAccordions.value[index] = !openAccordions.value[index];
};
</script>

<style scoped>
</style>