<template>
    <div>
        <h1>Statistics</h1>
        <h2>I have problems with show graphics</h2>
        <img :src="`/back/data/${new Date().toLocaleDateString('en-GB').split('/').reverse().join('-')}/question_statistics.png`" alt="Question Statistics">
    </div>
</template>

<script setup>
console.log('Statistics Component Loaded');
</script>

<style scoped>

</style>