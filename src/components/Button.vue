<script setup>
defineProps({
    content: String,
});
</script>

<template>
    <button>{{ content }}</button>
</template>

<style scoped>
button {
    background-color: hsl(238, 40%, 52%);
    color: white;
    font-weight: 700;
    letter-spacing: 1.1px;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    text-transform: capitalize;
}
button:hover {
    opacity: 0.5;
}
</style>
