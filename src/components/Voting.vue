<script setup>
let { score } = defineProps({
    score: Number,
});

function IncreaseScore() {
    score++;
}

function DecreaseScore() {
    score--;
}
</script>

<template>
    <div>
        <img
            src="@/assets/images/icon-plus.svg"
            alt="plus-icon"
            @click="IncreaseScore"
        />
        <span>{{ score }}</span>
        <img
            src="@/assets/images/icon-minus.svg"
            alt="minus-icon"
            @click="DecreaseScore"
        />
    </div>
</template>

<style scoped>
div {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: fit-content;
    background-color: hsl(228, 33%, 97%);
    color: black;
    padding: 13px;
    border-radius: 5px;
}
img {
    width: 15px;
    cursor: pointer;
}
img:hover {
    filter: brightness(0) saturate(100%) invert(37%) sepia(9%) saturate(4487%)
        hue-rotate(202deg) brightness(91%) contrast(90%);
}
span {
    font-weight: 500;
    color: hsl(238, 40%, 52%);
    margin: 15px 0;
}
</style>
