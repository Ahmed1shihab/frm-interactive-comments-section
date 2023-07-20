<script setup>
import Comment from "@/components/Comment.vue";
import AddingComment from "@/components/AddingComment.vue";
import { onMounted, ref } from "vue";

let data = ref("");

onMounted(async () => {
    data.value = await fetch("./src/data.json").then((response) =>
        response.json()
    );
});
</script>

<template>
    <ul class="comments">
        <li v-for="comment in data.comments" :key="comment.id">
            <Comment :comment="comment" :currentUser="data.currentUser" />
            <div class="replies">
                <ul v-show="comment.replies !== []">
                    <li v-for="reply in comment.replies" :key="reply.id">
                        <Comment
                            :comment="reply"
                            :currentUser="data.currentUser"
                        />
                    </li>
                </ul>
            </div>
        </li>
    </ul>
    <AddingComment :currentUser="data.currentUser" />
</template>

<style>
*,
*::after,
*::before {
    padding: 0;
    margin: 0;
    scroll-behavior: smooth;
}
:root {
    font-family: "Rubik", sans-serif;
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
}

body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: hsl(228, 33%, 97%);
    font-size: 16px;
}
button {
    outline: none;
    background: transparent;
    border: 1px solid transparent;
    font-family: inherit;
    cursor: pointer;
}
ul.comments {
    width: 700px;
}
li {
    list-style: none;
}
div.replies {
    display: flex;
    justify-content: flex-end;
}
div.replies ul {
    width: 650px;
    border-left: 1px solid hsl(239, 57%, 85%);
}
</style>
