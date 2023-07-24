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
        <div class="comment-content">
            <div>
                <div class="flex-1">
                    <img
                        :src="comment.user.image.png"
                        :alt="comment.user.username"
                    />
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

                    <span class="date">{{ comment.createdAt }}</span>
                </div>

                <div
                    v-if="
                        comment.user.username ==
                        currentUserStore.currentUser.username
                    "
                    class="action-container"
                >
                    <button class="delete" @click="changeModalOpen">
                        <img
                            src="@/assets/images/icon-delete.svg"
                            alt="Delete-icon"
                        />
                        Delete
                    </button>

                    <Teleport to="#delete-modal">
                        <div class="modal-bg" v-show="isModalOpen">
                            <div class="modal">
                                <h2>Delete comment</h2>
                                <p>
                                    Are you sure you want to delete this
                                    comment? This will remove the comment and
                                    can't be undone
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
                                            changeModalOpen,
                                                deleteComment(comment.id)
                                        "
                                    >
                                        Yes, delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Teleport>

                    <button class="edit" @click="changeAddNewCommentShow">
                        <img
                            src="@/assets/images/icon-edit.svg"
                            alt="Edit-icon"
                        />
                        Edit
                    </button>
                </div>

                <button
                    v-else
                    class="reply-btn"
                    v-show="!comment.replyingTo"
                    @click="changeAddNewCommentShow"
                >
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
        v-show="addNewCommentShow"
        :textareaContent="textareaContent"
        :buttonContent="buttonContent"
        :replyingTo="comment.user.username"
        :commentId="comment.id"
    />
</template>

<style>
div.container {
    display: flex;
    flex-direction: row;
    align-items: center;
    max-width: inherit;
    background-color: #fff;
    border-radius: 15px;
    padding: 20px;
    margin: 20px;
}
@media screen and (max-width: 600px) {
    div.container {
        flex-direction: column;
    }
}
.comment-content {
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    max-width: 100%;
}
.comment-content > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 17px;
}
.comment-content .flex-1 {
    display: flex;
    align-items: center;
}
.comment-content .flex-1 img {
    width: 35px;
    border-radius: 50%;
}
.comment-content .flex-1 .name {
    font-weight: 700;
    color: hsl(212, 24%, 26%);
    margin: 15px;
}
.comment-content .flex-1 .you {
    font-size: 13px;
    font-weight: 400;
    color: #fff;
    background-color: hsl(238, 40%, 52%);
    padding: 3px 5px;
    border-radius: 5px;
}
.comment-content .flex-1 .date {
    color: hsl(211, 10%, 45%);
    font-size: 15px;
}
.comment-content button.reply-btn {
    font-size: 16px;
    font-weight: 500;
    color: hsl(238, 40%, 52%);
    cursor: pointer;
}
.comment-content div.action-container {
    display: grid;
    grid-template-columns: auto auto;
    column-gap: 15px;
}
.comment-content div.action-container button.delete {
    display: grid;
    grid-template-columns: auto auto;
    column-gap: 5px;
    align-items: center;
    justify-content: center;
    color: hsl(358, 79%, 66%);
}
.comment-content div.action-container button.edit {
    display: grid;
    column-gap: 5px;
    grid-template-columns: auto auto;
    align-items: center;
    justify-content: center;
    color: hsl(238, 40%, 52%);
}
.comment-content p {
    color: hsl(211, 10%, 45%);
}
.comment-content p > span:first-child {
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
