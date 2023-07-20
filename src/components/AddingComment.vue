<script setup>
import Button from "@/components/Button.vue";

defineProps({
    currentUser: Object,
    textareaContent: {
        type: String,
        default: "",
    },
    buttonContent: String,
});
</script>

<template>
    <div class="grid">
        <img :src="currentUser?.image.png" :alt="currentUser?.username" />
        <textarea placeholder="Add a comment..." :value="textareaContent">
        </textarea>
        <Button :content="buttonContent" />
    </div>
</template>

<style scoped>
div.grid {
    display: grid;
    grid-template-columns: auto 1fr auto;
    column-gap: 10px;
    align-items: start;
    justify-content: center;
    justify-items: center;
    max-width: 700px;
    background-color: #fff;
    border-radius: 15px;
    padding: 15px;
    margin: 20px;
}
.grid img {
    max-width: 50px;
}
.grid textarea {
    min-width: 100%;
    max-width: 525px;
    height: 100px;
    padding: 3px;
    color: hsl(211, 10%, 45%);
    font: inherit;
    resize: none;
}
</style>
