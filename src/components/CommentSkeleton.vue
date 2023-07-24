<template>
    <div class="container">
        <div class="voting-container">
            <span class="plus-icon">+</span>
            <span class="score"></span>
            <span class="minus-icon">-</span>
        </div>
        <div class="comment-content">
            <div>
                <div class="flex-1">
                    <div class="user-image"></div>
                    <p class="name"></p>

                    <span class="date">Just now</span>
                </div>

                <button class="reply-btn">Reply</button>
            </div>
            <p></p>
            <p></p>
            <p></p>
        </div>
    </div>
</template>

<style scoped>
div.container {
    width: 700px;
    height: 160px;
}
div.voting-container span {
    font-size: 20px;
    margin: 5px 0;
    cursor: pointer;
}
.comment-content .flex-1 .user-image {
    width: 35px;
    height: 35px;
    background-color: hsl(223, 19%, 93%);
    border-radius: 50%;
}
.comment-content > p {
    height: 10px;
    background-color: hsl(223, 19%, 93%);
    border-radius: 2px;
}
.comment-content > p:first-of-type {
    width: 500px;
}

.comment-content > p:nth-of-type(2) {
    width: 300px;
    margin: 4px 0;
}
.comment-content > p:last-of-type {
    width: 400px;
}
</style>
