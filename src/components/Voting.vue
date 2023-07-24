<script setup>
import { useCommentsStore } from "@/stores/comments";

defineProps({
    commentId: Number,
});

const commentsStore = useCommentsStore();
</script>

<template>
    <div class="voting-container">
        <img
            src="@/assets/images/icon-plus.svg"
            alt="plus-icon"
            @click="commentsStore.increaseScore(commentId)"
        />
        <span>{{ commentsStore.getComment(commentId).score }}</span>
        <img
            src="@/assets/images/icon-minus.svg"
            alt="minus-icon"
            @click="commentsStore.decreaseScore(commentId)"
        />
    </div>
</template>

<style>
div.voting-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: fit-content;
    background-color: hsl(228, 33%, 97%);
    color: black;
    padding: 13px;
    border-radius: 5px;
}
div.voting-container img {
    width: 15px;
    cursor: pointer;
}
div.voting-container img:hover {
    filter: brightness(0) saturate(100%) invert(37%) sepia(9%) saturate(4487%)
        hue-rotate(202deg) brightness(91%) contrast(90%);
}
div.voting-container span {
    font-weight: 500;
    color: hsl(238, 40%, 52%);
    margin: 15px 0;
}
@media screen and (max-width: 600px) {
    div.voting-container {
        flex-direction: row;
    }
    div.voting-container span {
        margin: 0 15px;
    }
}
</style>
