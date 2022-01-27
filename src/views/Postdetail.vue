<template>
    <div id="post">
        <Navbar/>

        <h1 class="invisible">Fil d'actualité</h1>



       <div class="displayPost" v-for="(post, index) in posts" :key="post.postId">
            <div class="displayPost__item">
                <div>
                    <!--on affiche le titre pour la 1er post -->

                <div v-if= "index == 0">

                    <div class="displayPost__item__information">
                      <img class="displayPost__item__image" :src="require(`@/assets/themes/${post.Image}`)">
                            {{ post.Nom_theme }}

                    </div>
                    <button @click="ComAjout" type="button" class="">
                    <i class="far fa-images fa"></i> ajouter un poste </button>
                    <BR/>
                     <BR/>
                  </div>


                    <div class="displayPost__item__information">
                                    <h2 class="displayPost__item__information__user__name">
                                        Publié le {{ dateFormat(post.dateOfModification) }}
                                        par
                                        {{ post.firstname }} {{ post.lastname }}
                                    </h2>
                    </div>
                    {{ post.content}}
                    </div>

                    <div class="displayPost__item__publication">

                </div>

                <div class="displayPost__item__option">

                <!--  like un message-->

                    <Likes v-bind:post="post"/>

                    <div>
                        <i @click="displayComment(post.id)" v-on:click="diplayCreateComment(post.id)" class="displayPost__item__option__button far fa-comment-dots" aria-label="Commenter le message"></i>


                    </div>

                    <!--  modifier le poste  si admin et si cest l auteur du poste-->

                    <i v-if="userId == post.UserId || isAdmin == 'true'"
                     @click="displayModifyPost(post.id)" class="displayPost__item__option__button far fa-edit" aria-label="Modifier le message"></i>

                    <i v-if="userId == post.UserId || isAdmin == 'true'" v-on:click="deletePost(post.id)" class="displayPost__item__option__button far fa-trash-alt" aria-label="Supprimer le message"></i>
                </div>
            </div>

            <div>

            </div>
        </div>

        <router-view/>
    </div>
</template>



<script>
    import axios from 'axios'
    import moment from 'moment'
    import { Notyf } from 'notyf'
    import 'notyf/notyf.min.css'

    import Navbar from '@/components/Navbar.vue'
    // import ProfileImage from '../components/ProfileImage.vue'
    import Likes from '../components/Likes.vue'

    export default {
        name: 'Post',
        components: {
            Navbar,
           // ProfileImage,
            Likes
        },
        data() {
            return {
                userId: localStorage.getItem('userId'),
                firstname: localStorage.getItem('firstname'),
                lastname: localStorage.getItem('lastname'),
                isAdmin: localStorage.getItem('isAdmin'),

                posts: [],
                post: '',
                imagePost: '',
                imagePreview: null,
                content: '',
                contentmodifyPost: '',
                comments: [],
                contentComment: '',
                like: false,
                postLikes: [],
                revele: false,
                showComment: false,
                showCreateComment: false,
                showInputModify: false,


            }
        },
        created()

        {
            this.displayPost();
            this.notyf = new Notyf({
                duration: 2000,
                position: {
                    x: 'center',
                    y: 'top'
                }
            });
        },
        methods: {
            // Permet de créer un nouveau message

        ComAjout() {
        let idArticle = this.$route.query.id;

        this.$router.push( { path: 'ComAjout' , query: { id: idArticle }});
    },

            // uploadFile() {
            //     this.$refs.fileUpload.click()
            // },

            // onFileSelected(event) {
            //     this.imagePost = event.target.files[0];
            //     this.imagePreview = URL.createObjectURL(this.imagePost);
            // },
            createPost() {
                const formData = new FormData();
                formData.append("content", this.content);
                formData.append("image", this.imagePost);




                axios.post('http://localhost:3000/api/post', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                .then(() => {
                    window.location.reload()
                })
                .catch(error => {
                    const msgerror = error.response.data;
                    this.notyf.error(msgerror.error)

                })
            },


            // Permet d'afficher tous les messages
            displayPost() {

            let idArticle = this.$route.query.id;

                axios.get('http://localhost:3000/api/comments/' + idArticle, {
                    headers: {
                        'Content-Type' : 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                .then(response => {
                    this.posts = response.data;

                })
                .catch(error => {
                    const msgerror = error.response.data
                    this.notyf.error(msgerror.error)
                })
            },

            // Permet d'afficher la date de publication au bon format
            dateFormat(date){
                if (date) {
                    return moment(String(date)).format('DD/MM/YYYY')
                }
            },



            // Permet de modifier un message
            modifyPost(id) {
                const postId = id;

                const formData = new FormData();
                formData.append("content", this.contentmodifyPost);
                formData.append("image", this.imagePost);

                axios.put('http://localhost:3000/api/post/' + postId, formData, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token'),
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(() => {
                    window.location.reload()
                })
                .catch(error => {
                    const msgerror = error.response.data
                    this.notyf.error(msgerror.error)
                })
            },

            // Permet de supprimer un message
            deletePost(id) {
                const postId = id;

                axios.delete('http://localhost:3000/api/post/' + postId, {
                    headers: {
                        'Content-Type' : 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                .then(() => {
                    this.displayPost();
                })
                .catch(error => {
                    const msgerror = error.response.data
                    this.notyf.error(msgerror.error)
                })
            },





            // Permet de créer un nouveau commentaire
            createComment(id) {
                const postId = id;

                axios.post('http://localhost:3000/api/comment/' + postId, {
                    content: this.contentComment,
                },{
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                .then(() => {
                    window.location.reload()
                })
                .catch(error => {
                    const msgerror = error.response.data
                    this.notyf.error(msgerror.error)
                })
            },

            // Permet d'afficher les commentaires d'un message
            // displayComment(id) {
            //     this.showComment = !this.showComment

            //     const postId = id;

            //     axios.get('http://localhost:3000/api/comment/' + postId, {
            //         headers: {
            //             'Content-Type' : 'application/json',
            //             'Authorization': 'Bearer ' + localStorage.getItem('token')
            //         }
            //     })
            //     .then(response => {
            //         this.comments = response.data;
            //     })
            //     .catch(error => {
            //         const msgerror = error.response.data
            //         this.notyf.error(msgerror.error)
            //     })
            // },

            // Permet de supprimer un commentaire
            deleteComment(id) {
                const commentId = id;

                axios.delete('http://localhost:3000/api/comment/' + commentId, {
                    headers: {
                        'Content-Type' : 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                .then(() => {
                    window.location.reload()
                })
                .catch(error => {
                    const msgerror = error.response.data
                    this.notyf.error(msgerror.error)
                })
            }
        }
    }
</script>


<style scoped lang="scss">
    .invisible {
        display: none;
    }
    .newPost {
        background: #ffb1b1;
        border-radius: 25px;
        margin: auto;
        margin-top: 2rem;
        padding: 1rem;
        width: 50%;
        @media (max-width: 950px) {
            width: 60%;
        }
        @media (max-width: 768px) {
            width: 70%;
        }
        @media (max-width: 550px) {
            width: 80%;
        }
        @media (max-width: 450px) {
            width: 90%;
        }
        &__photo__image {
            width: 47px;
        }
        &__content__text {
            border-radius: 0 15px;
            border: none;
            margin: 1.5rem 0 0 0;
            max-width: 50rem;
            width: 90%;
            min-height: 5rem;
        }
        &__content__image {
            max-width: 50rem;
            width: 90%;
            height: 274px;
            margin: 1rem auto;
            object-fit: cover;
        }
        &__option {
            display: flex;
            justify-content: space-around;
            align-items: center;
            &__file>input {
                display: none;
            }
            &__file {
                &__btnInvisible {
                    display: flex;
                    align-items: center;
                    color: #3f3d56;
                    border: none;
                    background-color: #ffb1b1;
                    &:hover, &:focus {
                        color: white;
                    }
                }
            }
            &__button {
                border: 2px solid #3f3d56;
                border-radius: 25px;
                color: #3f3d56;
                font-size: 15px;
                font-weight: bold;
                padding: 0.4rem;
                margin: 1rem;
                outline-style: none;
                &:hover, &:focus {
                    color: #ff6363;
                }
            }

        }
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
             &__image
             {
                 width: 60px;
                 height: 60px

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
            &__publication {
                display: flex;
                flex-direction: column;
                margin: 0.5rem 2rem;
                @media (max-width: 700px) {
                    margin: 0.5rem;
                }
                &__text {
                    text-align: left;
                    margin: 0 ;
                    @media (max-width: 700px) {
                        font-size: 14px;
                    }
                    @media (min-width: 2800px) {
                        margin-left: 1.8rem;
                    }
                    &__modifyText {
                        display: flex;
                        align-items: center;
                        padding: 2rem 0;
                        margin: 1rem 0;
                        border-radius: 15px;
                        box-shadow: 5px 5px 15px grey;
                        &__textarea {
                            border-radius: 5px;
                            width: 90%;
                        }
                        &__option {
                            display: flex;
                            align-items: center;
                            justify-content: space-around;
                            &__file>input {
                            display: none;
                            }
                            &__file__btnInvisible {
                                display: flex;
                                align-items: center;
                                font-size: 14px;
                                color: #3f3d56;
                                border: none;
                                background-color: white;
                                &:hover, &:focus {
                                    color: #ff6363;
                                }
                            }
                            &__button {
                                border: 2px solid #3f3d56;
                                border-radius: 25px;
                                color: #3f3d56;
                                font-size: 14px;
                                font-weight: bold;
                                padding: 0.4rem;
                                margin: 1rem;
                                outline-style: none;
                                margin-left: 1rem;
                                &:hover, &:focus {
                                    color: #ff6363;
                                }
                            }
                        }
                    }
                }

            }
            &__option {
                display: flex;
                justify-content: space-around;
                &__button:hover, &__button:focus {
                    color: #ff6363;
                    cursor: pointer;
                }
                &__count {
                    padding-left: 0.5rem;
                }
            }
        }
    }

    .displayComment {
        display: flex;
        flex-direction: column;
        &__item {
            display: flex;
            flex-direction: column;
            border: 2px solid #ff6363;
            border-radius: 25px;
            margin: auto;
            margin-top: 0.5rem;
            padding: 0.5rem;
            width: 40%;
            @media (max-width: 950px) {
                width: 50%;
            }
            @media (max-width: 768px) {
                width: 60%;
            }
            @media (max-width: 550px) {
                width: 70%;
            }
            @media (max-width: 450px) {
                width: 80%;
            }
            &__information {
                display: flex;
                justify-content: space-between;
                align-items: center;
                &__user {
                    display: flex;
                    align-items: center;
                    &__photo {
                    margin: 0 0.5rem 0 0;
                    }
                    &__name {
                        margin-top: 0.5rem;
                        margin-bottom: 0;
                        font-size: 18px;
                    }
                }
            }
        }
        &__newComment {
            background: #ffb1b1;
            border-radius: 25px;
            margin: auto;
            margin-top: 0.5rem;
            padding: 0.5rem;
            width: 40%;
            @media (max-width: 950px) {
                width: 50%;
            }
            @media (max-width: 768px) {
                width: 60%;
            }
            @media (max-width: 550px) {
                width: 70%;
            }
            @media (max-width: 450px) {
                width: 80%;
            }
            &__form {
                display: flex;
                align-items: center;
                justify-content: center;
                &__text {
                    border-radius: 15px;
                    border: none;
                    margin: 0.5rem ;
                    padding: 0.5rem;
                    max-width: 50rem;
                    width: 90%;
                    min-height: 3rem;
                }
                &__button {
                    border: 2px solid #3f3d56;
                    border-radius: 25px;
                    color: #3f3d56;
                    font-size: 15px;
                    font-weight: bold;
                    padding: 0.4rem;
                    margin: 1rem;
                    outline-style: none;
                    &:hover, &:focus {
                        color: #ff6363;
                        cursor: pointer;
                    }
                    @media (max-width: 450px) {
                        margin: 0.5rem;
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