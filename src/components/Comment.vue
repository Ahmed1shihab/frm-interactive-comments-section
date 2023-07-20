<script setup>
import Voting from "@/components/Voting.vue";
import AddingComment from "@/components/AddingComment.vue";
import { ref } from "vue";

const props = defineProps({
    comment: Object,
    currentUser: Object,
});

let addCommentShow = ref(false);

function changeAddCommentShow() {
    return (addCommentShow.value = !addCommentShow.value);
}

let buttonContent =
    props.currentUser.username === props.comment.user.username
        ? "Update"
        : "Reply";
let textareaContent =
    props.currentUser.username === props.comment.user.username
        ? props.comment.content
        : `@${props.comment.user.username} `;
</script>

<template>
    <div class="container">
        <Voting :score="comment.score" />
        <div class="comment_content">
            <div>
                <div class="flex_1">
                    <img
                        :src="comment.user.image.png"
                        :alt="comment.user.username"
                    />
                    <p class="name">
                        {{ comment.user.username }}
                        <span
                            v-if="comment.user.username == currentUser.username"
                            class="you"
                            >you</span
                        >
                    </p>

                    <span class="date">{{ comment.createdAt }}</span>
                </div>

                <div
                    v-if="comment.user.username == currentUser.username"
                    class="action_container"
                >
                    <button class="delete">
                        <img
                            src="@/assets/images/icon-delete.svg"
                            alt="Delete-icon"
                        />
                        Delete
                    </button>
                    <button class="edit" @click="changeAddCommentShow">
                        <img
                            src="@/assets/images/icon-edit.svg"
                            alt="Edit-icon"
                        />
                        Edit
                    </button>
                </div>
                <button v-else class="reply_btn" @click="changeAddCommentShow">
                    <img
                        src="@/assets/images/icon-reply.svg"
                        alt="Reply-icon"
                    />
                    Reply
                </button>
            </div>
            <p>
                <span v-show="comment.replyingTo"
                    >@{{ comment.replyingTo }}</span
                >
                {{ comment.content }}
            </p>
        </div>
    </div>
    <AddingComment
        v-show="addCommentShow"
        :currentUser="currentUser"
        :textareaContent="textareaContent"
        :buttonContent="buttonContent"
    />
</template>

<style scoped>
div.container {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: inherit;
    background-color: #fff;
    border-radius: 15px;
    padding: 20px;
    margin: 20px;
}
.comment_content {
    display: flex;
    flex-direction: column;
    margin-left: 20px;
}
.comment_content > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 17px;
}
.comment_content .flex_1 {
    display: flex;
    align-items: center;
}
.comment_content .flex_1 img {
    width: 35px;
    border-radius: 50%;
}
.comment_content .flex_1 .name {
    font-weight: 700;
    color: hsl(212, 24%, 26%);
    margin: 15px;
}
.comment_content .flex_1 .you {
    font-size: 13px;
    font-weight: 400;
    color: #fff;
    background-color: hsl(238, 40%, 52%);
    padding: 3px 5px;
    border-radius: 5px;
}
.comment_content .flex_1 .date {
    color: hsl(211, 10%, 45%);
    font-size: 15px;
}
.comment_content button.reply_btn {
    font-size: 16px;
    font-weight: 500;
    color: hsl(238, 40%, 52%);
    cursor: pointer;
}
.comment_content div.action_container {
    display: grid;
    grid-template-columns: auto auto;
    column-gap: 15px;
}
.comment_content div.action_container button.delete {
    display: grid;
    grid-template-columns: auto auto;
    column-gap: 5px;
    align-items: center;
    justify-content: center;
    color: hsl(358, 79%, 66%);
}
.comment_content div.action_container button.edit {
    display: grid;
    column-gap: 5px;
    grid-template-columns: auto auto;
    align-items: center;
    justify-content: center;
    color: hsl(238, 40%, 52%);
}
.comment_content button:hover {
    opacity: 0.5;
}
.comment_content p {
    color: hsl(211, 10%, 45%);
}
.comment_content p > span {
    color: hsl(238, 40%, 52%);
    font-weight: 700;
}
</style>
