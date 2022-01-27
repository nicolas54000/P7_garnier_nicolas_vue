<template>
    <div id="post">
        <Navbar />

        <h1>les derniers articles</h1>

        <div class="displayPost" v-for="post in posts" :key="post.postId"  ref="post.idArticle">
            <div class="displayPost__item">

                <div class="displayPost__item__information">

                <img class="displayPost__item__image" :src="require(`@/assets/themes/${post.Image}`)">
                 {{ post.Nom_theme }}
                </div>



                <div class="displayPost__item__information">
                    <div class="displayPost__item__information__user">
                        <h2 class="displayPost__item__information__user__name">
                            Publié le {{ dateFormat(post.dateOfModificationA) }}
                            par
                            {{ post.firstname }} {{ post.lastname }}
                        </h2>
                    </div>
                </div>


                <div class="displayPost__item__information">

                        <h2 class="displayPost__item__information__user__name">
                        <br/>

                            {{post.content}}
                        </h2>
                </div>
        <button @click="detail(post.idArticle)" type="button" >detail</button>
        </div>

    </div>

    </div>
</template>

<script>
import axios from "axios";
// format date
import moment from "moment";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

import Navbar from "@/components/Navbar.vue";


export default {
    name: "Post",
    components: {
        Navbar,

    },
    data() {
        return {
            userId: localStorage.getItem("userId"),
            firstname: localStorage.getItem("firstname"),
            lastname: localStorage.getItem("lastname"),
            isAdmin: localStorage.getItem("isAdmin"),

            posts: [],
            post: "",
            imagePost: "",
            imagePreview: null,
            content: "",
            contentmodifyPost: "",
            comments: [],
            contentComment: "",
            like: false,

            revele: false,
            showComment: false,
            showCreateComment: false,
            showInputModify: false,
        };
    },
    created() {
        this.displayPost();
        this.notyf = new Notyf({
            duration: 2000,
            position: {
                x: "center",
                y: "top",
            },
        });
    },




    methods: {

    detail(idArticle) {
      // console.log("xxxxxxxxxxxxxxxxxx", idArticle)

        this.$router.push( { path: 'Postdetail', query: { id: idArticle }});
    },

        // Permet d'afficher tous les messages
        displayPost() {
            axios
                .get("http://localhost:3000/api/articles/all/5", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization:
                            "Bearer " + localStorage.getItem("token"),
                    },
                })
                .then((response) => {
                    this.posts = response.data;
                })
                .catch((error) => {
                    const msgerror = error.response.data;
                    this.notyf.error(msgerror.error);
                });
        },

        // Permet d'afficher la date de publication au bon format
        dateFormat(date) {
            if (date) {
                return moment(String(date)).format("DD/MM/YYYY");
            }
        },
    },
};
</script>

<style scoped lang="scss">
.invisible {
    display: none;
}

.displayPost {
    display: flex;
    flex-direction: column;
    &__item {
        display: flex;
        flex-direction: column;
        border: 2px solid #ff6363;
        border-radius: 25px;
        margin: auto;
        margin-top: 2rem;
        padding: 1rem;
        width: 50%;
        @media (max-width: 950px) {
            width: 60%;
        }
        &__image
        {
        width: 60px;
        height: 60px

        }

        @media (max-width: 950px) {
            width: 60%;
        }
        @media (max-width: 768px) {
            width: 70%;
            padding: 0.5rem;
        }
        @media (max-width: 550px) {
            width: 80%;
        }
        @media (max-width: 450px) {
            width: 90%;
        }
        &__information {
            display: flex;
            justify-content: space-between;
            align-items: center;
            @media (max-width: 380px) {
                display: flex;
                flex-wrap: wrap;
            }
            &__user {
                display: flex;
                align-items: center;
                &__photo {
                    margin: 0.5rem 0.5rem 0 0;
                }
                &__name {
                    margin-bottom: 0.2rem;
                    font-size: 22px;
                    @media (max-width: 767px) {
                        font-size: 18px;
                    }
                }
            }
            &__date {
                display: flex;
                justify-content: flex-end;
                @media (max-width: 767px) {
                    font-size: 14px;
                }
                @media (max-width: 380px) {
                    font-size: 10px;
                }
            }
        }

    }
}


@media (max-width: 767px) {
    textarea {
        font-size: 14px;
    }
    button {
        font-size: 14px;
    }
}
</style>
