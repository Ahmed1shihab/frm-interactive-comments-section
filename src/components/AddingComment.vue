<script setup>
import Button from "@/components/Button.vue";
import { useCommentsStore } from "@/stores/comments.js";
import { useCurrentUserStore } from "@/stores/currentUser.js";
import { ref } from "vue";

const currentUserStore = useCurrentUserStore();
const commentsStore = useCommentsStore();

const props = defineProps({
    textareaContent: {
        type: String,
        default: "",
    },
    replyingTo: {
        type: String,
        default: null,
    },
    buttonContent: {
        type: String,
        default: "Send",
    },
    commentId: {
        type: Number,
        default: null,
    },
});

let textarea = ref(null);

function addComment() {
    if (props.buttonContent == "Send") {
        commentsStore.addComment(textarea.value.value);
        textarea.value.value = "";
    } else if (props.buttonContent == "Reply") {
        let textareaArray = textarea.value.value.split(" ");
        textareaArray.forEach((word, index) => {
            if (word[0] === "@") textareaArray.splice(index, 1);
        });
        commentsStore.replyToComment(textareaArray.join(" "), props.replyingTo);
    } else if (props.buttonContent === "Update") {
        commentsStore.updateComment(props.commentId, textarea.value.value);
    }
}
</script>

<template>
    <div class="grid">
        <img
            :src="currentUserStore.currentUser.image?.png"
            :alt="currentUserStore.currentUser.username"
        />
        <textarea
            placeholder="Add a comment..."
            :value="textareaContent"
            ref="textarea"
        >
        </textarea>
        <Button :content="buttonContent" @click="addComment" />
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
    @media (max-width: 585px) {
        grid-template-columns: none;
        grid-template-rows: 1fr auto;
        justify-content: normal;
        column-gap: 0;
        row-gap: 10px;
        justify-items: right;
    }
}
.grid img {
    max-width: 50px;
    @media (max-width: 585px) {
        width: 43px;
        grid-area: 2;
        justify-self: left;
    }
}
.grid textarea {
    min-width: 100%;
    max-width: 525px;
    min-height: 100px;
    padding: 5px;
    color: hsl(211, 10%, 45%);
    border: 1px solid hsl(223, 19%, 93%);
    border-radius: 5px;
    font: inherit;
    resize: vertical;
    transition: 0.2s border-color ease-in-out;
    @media (max-width: 585px) {
        grid-column: span 2;
    }
}
.grid textarea:hover {
    border-color: hsl(238, 40%, 52%);
}
.grid textarea:focus-visible {
    outline: none;
    border: 2px solid hsl(238, 40%, 52%);
}
@media (max-width: 585px) {
    .grid button {
        grid-area: 2;
    }
}
</style>
