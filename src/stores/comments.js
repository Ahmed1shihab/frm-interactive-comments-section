import { useCurrentUserStore } from "@/stores/currentUser.js";
import { defineStore } from "pinia";

export const useCommentsStore = defineStore("comments", {
    state: () => ({
        comments: [],
    }),
    getters: {
        getNewId: (state) => {
            let max = 1;

            for (let i = 0; i < state.comments.length; i++) {
                if (
                    state.comments[i]["replies"] === [] &&
                    state.comments[i]["id"] > max
                ) {
                    max = state.comments[i]["id"];
                } else {
                    for (
                        let index = 0;
                        index < state.comments[i]["replies"].length;
                        index++
                    ) {
                        if (state.comments[i]["replies"][index]["id"] > max) {
                            max = state.comments[i]["replies"][index]["id"];
                        }
                    }
                }
            }
            return max + 1;
        },
        getComment: (state) => {
            return (commentId) => {
                for (const key in state.comments) {
                    if (Object.hasOwnProperty.call(state.comments, key)) {
                        // if it was a comment
                        if (state.comments[key]["id"] === commentId) {
                            return state.comments[key];
                        } else {
                            // if it was a reply
                            for (
                                let index = 0;
                                index < state.comments[key]["replies"].length;
                                index++
                            ) {
                                const element =
                                    state.comments[key]["replies"][index];

                                if (element.id === commentId) {
                                    return state.comments[key]["replies"][
                                        index
                                    ];
                                }
                            }
                        }
                    }
                }
            };
        },
        getTimeDistance: (state) => {
            return (commentCreatedAt) => {
                if (commentCreatedAt.toString().split(" ").includes("ago")) {
                    return commentCreatedAt;
                }

                let timeDistance;
                const initialTime = new Date(commentCreatedAt);
                const currentTime = new Date();
                let diffTime = (currentTime - initialTime) / 1000; // seconds

                if (diffTime < 60) {
                    return "just now";
                }

                diffTime = Math.floor(diffTime / 60); // minutes

                if (diffTime < 60) {
                    timeDistance = `${diffTime} ${
                        diffTime > 1 ? "minutes" : "minute"
                    } ago`;
                } else {
                    diffTime = Math.floor(diffTime / 60); // hours

                    if (diffTime < 24) {
                        timeDistance = `${diffTime} ${
                            diffTime > 1 ? "hours" : "hour"
                        } ago`;
                    } else {
                        diffTime = Math.floor(diffTime / 24); // days
                        timeDistance = `${diffTime} ${
                            diffTime > 1 ? "days" : "day"
                        } ago`;
                    }
                }

                return timeDistance;
            };
        },
    },
    actions: {
        async getComments() {
            const currentUserStore = useCurrentUserStore();

            if (localStorage.getItem("data")) {
                this.comments = JSON.parse(
                    localStorage.getItem("data")
                ).comments;
                currentUserStore.currentUser = JSON.parse(
                    localStorage.getItem("data")
                ).currentUser;
            } else {
                let response = await fetch("./src/data.json").then((response) =>
                    response.json()
                );
                this.comments = response.comments.sort(
                    (a, b) => b.score - a.score
                );
                currentUserStore.currentUser = response.currentUser;
                localStorage.setItem("data", JSON.stringify(response));
            }
        },
        addComment(commentContent) {
            if (!commentContent.trim()) {
                return;
            }
            const currentUserStore = useCurrentUserStore();

            const NEW_COMMENT = {
                id: this.getNewId,
                content: commentContent,
                createdAt: new Date(),
                score: 0,
                user: currentUserStore.currentUser,
                replies: [],
            };
            this.comments.push(NEW_COMMENT);
            return;
        },
        replyToComment(content, replyingTo) {
            for (const key in this.comments) {
                if (
                    Object.hasOwnProperty.call(this.comments, key) &&
                    this.comments[key]["user"]["username"] === replyingTo
                ) {
                    const currentUserStore = useCurrentUserStore();
                    this.id++;

                    const NEW_REPLY = {
                        id: this.getNewId,
                        content: content,
                        createdAt: new Date(),
                        score: 0,
                        user: currentUserStore.currentUser,
                        replyingTo: replyingTo,
                    };

                    this.comments[key]["replies"].push(NEW_REPLY);
                }
            }
        },
        updateComment(commentId, content) {
            const comment = this.getComment(commentId, content);
            comment.content = content;
        },
        deleteComment(commentId) {
            for (const key in this.comments) {
                if (Object.hasOwnProperty.call(this.comments, key)) {
                    // if it was a comment
                    if (this.comments[key]["id"] === commentId) {
                        this.comments.splice(key, 1);
                        return;
                    } else {
                        // if it was a reply
                        for (
                            let index = 0;
                            index < this.comments[key]["replies"].length;
                            index++
                        ) {
                            const element =
                                this.comments[key]["replies"][index];

                            if (element.id === commentId) {
                                this.comments[key]["replies"].splice(index, 1);
                            }
                        }
                    }
                }
            }
        },
        increaseScore(commentId) {
            this.getComment(commentId).score += 1;
            this.comments = this.comments.sort((a, b) => b.score - a.score);
        },
        decreaseScore(commentId) {
            this.getComment(commentId).score -= 1;
            this.comments = this.comments.sort((a, b) => b.score - a.score);
        },
    },
});
