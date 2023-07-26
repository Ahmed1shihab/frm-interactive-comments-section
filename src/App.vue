<script setup>
import AddingComment from "@/components/AddingComment.vue";
import Comment from "@/components/Comment.vue";
import { useCommentsStore } from "@/stores/comments.js";
import { useCurrentUserStore } from "@/stores/currentUser.js";
import { onMounted } from "vue";

const commentsStore = useCommentsStore();
const currentUserStore = useCurrentUserStore();

onMounted(async () => {
    await commentsStore.getComments();
});

commentsStore.$subscribe((mutation, state) => {
    localStorage.setItem(
        "data",
        JSON.stringify({
            currentUser: currentUserStore.currentUser,
            comments: state.comments,
        })
    );
});
</script>

<template>
    <ul class="comments">
        <li v-for="comment in commentsStore.comments" :key="comment.id">
            <Comment :comment="comment" />
            <div class="replies">
                <ul v-show="comment.replies !== []">
                    <li v-for="reply in comment?.replies" :key="reply.id">
                        <Comment :comment="reply" />
                    </li>
                </ul>
            </div>
        </li>
    </ul>
    <AddingComment />
</template>

<style>
*,
*::after,
*::before {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
:root {
    font-family: "Rubik", sans-serif;
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
    scroll-behavior: smooth;
}

body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: hsl(228, 33%, 97%);
    font-size: 16px;
    overflow-x: hidden;
}
button {
    outline: none;
    background: transparent;
    border: 1px solid transparent;
    font-family: inherit;
    cursor: pointer;
    transition: 0.1s opacity ease-in-out;
}
button:hover {
    opacity: 0.5;
}
ul.comments {
    max-width: 700px;
}
li {
    list-style: none;
}
div.replies {
    display: flex;
    justify-content: flex-end;
}
div.replies ul {
    width: calc(100% - 10%);
    border-left: 1px solid hsl(239, 57%, 85%);
}
</style>
