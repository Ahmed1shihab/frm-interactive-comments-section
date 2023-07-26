<script setup>
import AddingComment from "@/components/AddingComment.vue";
import Voting from "@/components/Voting.vue";
import { useCommentsStore } from "@/stores/comments.js";
import { useCurrentUserStore } from "@/stores/currentUser.js";
import { ref, Teleport } from "vue";

const currentUserStore = useCurrentUserStore();
const commentsStore = useCommentsStore();

const { comment } = defineProps({
    comment: Object,
});

let addNewCommentShow = ref(false);
let isModalOpen = ref(false);

function changeModalOpen() {
    isModalOpen.value = !isModalOpen.value;

    if (isModalOpen.value === true) {
        let scrollTop =
            window.pageYOffset || document.documentElement.scrollTop;
        let scrollLeft =
            window.pageXOffset || document.documentElement.scrollLeft;

        window.onscroll = function () {
            window.scrollTo(scrollLeft, scrollTop);
        };
        return;
    } else {
        window.onscroll = function () {};
        return;
    }
}

function changeAddNewCommentShow() {
    return (addNewCommentShow.value = !addNewCommentShow.value);
}

function deleteComment(commentId) {
    commentsStore.deleteComment(commentId);
    changeModalOpen();
    return;
}

let buttonContent =
    currentUserStore.currentUser.username === comment.user.username
        ? "Update"
        : "Reply";
let textareaContent =
    currentUserStore.currentUser.username === comment.user.username
        ? comment.content
        : `@${comment.user.username} `;

commentsStore.$onAction(({ name }) => {
    if (name === "replyToComment" || name === "updateComment") {
        addNewCommentShow.value = false;
    }
});
</script>

<template>
    <div class="container">
        <Voting :commentId="comment.id" />
        <div class="comment-user-details">
            <img :src="comment.user.image.png" :alt="comment.user.username" />
            <p class="name">
                {{ comment.user.username }}
                <span
                    v-if="
                        comment.user.username ==
                        currentUserStore.currentUser.username
                    "
                    class="you"
                    >you</span
                >
            </p>

            <span class="date">{{
                commentsStore.getTimeDistance(comment.createdAt)
            }}</span>
        </div>
        <div
            v-if="
                comment.user.username == currentUserStore.currentUser.username
            "
            class="action-container"
        >
            <button class="delete" @click="changeModalOpen">
                <img src="@/assets/images/icon-delete.svg" alt="Delete-icon" />
                Delete
            </button>

            <Teleport to="#delete-modal">
                <div class="modal-bg" v-show="isModalOpen">
                    <div class="modal">
                        <h2>Delete comment</h2>
                        <p>
                            Are you sure you want to delete this comment? This
                            will remove the comment and can't be undone
                        </p>
                        <div class="delete-modal-action">
                            <button
                                class="cancel-delete-btn"
                                @click="changeModalOpen"
                            >
                                No, cancel</button
                            ><button
                                class="yes-delete-btn"
                                @click="
                                    changeModalOpen, deleteComment(comment.id)
                                "
                            >
                                Yes, delete
                            </button>
                        </div>
                    </div>
                </div>
            </Teleport>

            <button class="edit" @click="changeAddNewCommentShow">
                <img src="@/assets/images/icon-edit.svg" alt="Edit-icon" />
                Edit
            </button>
        </div>

        <button
            v-else
            class="reply-btn"
            v-show="!comment.replyingTo"
            @click="changeAddNewCommentShow"
        >
            <img src="@/assets/images/icon-reply.svg" alt="Reply-icon" />
            Reply
        </button>
        <p class="comment-content">
            <span v-show="comment.replyingTo">@{{ comment.replyingTo }}</span>
            {{ comment.content }}
        </p>
    </div>
    <AddingComment
        v-show="addNewCommentShow"
        :textareaContent="textareaContent"
        :buttonContent="buttonContent"
        :replyingTo="comment.user.username"
        :commentId="comment.id"
    />
</template>

<style>
div.container {
    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-template-rows: 1fr 1fr;
    column-gap: 15px;
    align-items: center;
    max-width: inherit;
    background-color: #fff;
    border-radius: 15px;
    padding: 20px;
    margin: 20px;
    @media (max-width: 585px) {
        grid-auto-flow: row;
        grid-template-rows: auto 1fr;
        column-gap: 0;
        row-gap: 10px;
        justify-items: end;
    }
}

.comment-user-details {
    display: flex;
    align-items: center;
    grid-row: 1;
    grid-column: 2;
    gap: 15px;
    width: 100%;
    @media (max-width: 585px) {
        grid-area: 1;
        grid-column: span 2;
    }
}
.comment-user-details img {
    width: 35px;
    border-radius: 50%;
}
.comment-user-details .name {
    font-weight: 700;
    color: hsl(212, 24%, 26%);
    @media (max-width: 585px) {
        font-size: 15px;
    }
}
.comment-user-details .you {
    font-size: 13px;
    font-weight: 400;
    color: #fff;
    background-color: hsl(238, 40%, 52%);
    padding: 3px 5px;
    border-radius: 5px;
    @media (max-width: 585px) {
        font-size: 12px;
        padding: 1px 3px;
    }
}
.comment-user-details .date {
    color: hsl(211, 10%, 45%);
    font-size: 15px;
    @media (max-width: 585px) {
        font-size: 12px;
    }
}
button.reply-btn {
    font-size: 16px;
    font-weight: 500;
    color: hsl(238, 40%, 52%);
    cursor: pointer;
    width: fit-content;
    @media (max-width: 585px) {
        grid-area: 4;
        font-size: 15px;
    }
}

div.action-container {
    display: grid;
    grid-template-columns: auto auto;
    column-gap: 15px;
    width: fit-content;
    @media (max-width: 585px) {
        grid-area: 4;
        font-size: 15px;
    }
}
div.action-container button.delete {
    display: grid;
    grid-template-columns: auto auto;
    column-gap: 5px;
    align-items: center;
    justify-content: center;
    color: hsl(358, 79%, 66%);
}
div.action-container button.edit {
    display: grid;
    column-gap: 5px;
    grid-template-columns: auto auto;
    align-items: center;
    justify-content: center;
    color: hsl(238, 40%, 52%);
}
p.comment-content {
    color: hsl(211, 10%, 45%);
    grid-column-start: 2;
    grid-column-end: span 2;
    @media (max-width: 585px) {
        font-size: 14.5px;
        grid-column: span 2;
        justify-self: left;
    }
}
p.comment-content > span:first-child {
    color: hsl(238, 40%, 52%);
    font-weight: 700;
}
.modal-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}
.modal {
    position: relative;
    background-color: white;
    padding: 50px;
    border-radius: 5px;
    width: 450px;
    max-width: calc(100% - 10%);
    @media (max-width: 585px) {
        width: 400px;
    }
}
.modal h2 {
    color: hsl(212, 24%, 26%);
}
.modal p {
    color: hsl(211, 10%, 45%);
    margin: 25px 0;
}
.modal .delete-modal-action {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 25px;
}
.cancel-delete-btn,
.yes-delete-btn {
    text-transform: uppercase;
    padding: 10px 0;
    border-radius: 5px;
    color: #fff;
    font-size: 15px;
}
.modal .delete-modal-action .yes-delete-btn {
    background-color: hsl(358, 79%, 66%);
}
.modal .delete-modal-action .cancel-delete-btn {
    background-color: hsl(211, 10%, 45%);
}
</style>
