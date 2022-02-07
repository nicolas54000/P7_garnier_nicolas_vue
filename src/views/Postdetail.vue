<template>
    <div id="post">
        <Navbar/>

        <h1 class="invisible">Fil d'actualité</h1>

       <div class="displayPost" v-for="(post, index) in posts" :key="post.postId">
        <!-- {{ post.userId }} -->

            <div class="displayPost__item">
                <div>
                    <!--on affiche le titre pour la 1er post -->

                <div v-if= "index == 0">

                    <div class="displayPost__item__information">
                      <img class="displayPost__item__image" :src="require(`@/assets/themes/${post.Image}`)">
                            {{ post.Nom_theme }}
                    </div>

                    <div class="titrearticle">
                     {{ post.title}}
                     </div>
                            <a @click="ComAjout" type="button" class="liens">
                            <i class="far fa-images fa"></i> ajouter un commentaire sur l 'article </a>
                     <BR/>
                       <BR/>

                  </div>

                    <div class="displayPost__item__information">
                        <h2 class="displayPost__item__information__user__name">
                                Publié le {{ dateFormat(post.dateOfCreation) }}
                                par
                                {{ post.firstname }} {{ post.lastname }}
                        </h2>
                    </div>
                    {{ post.content}}
                    </div>


                <div class="displayPost__item__option">

                <!--  like un message-->

                   <Likes v-bind:post="post"/>

                    <!--  modifier le poste  si admin et si cest l auteur du poste-->

                    <i v-if="userId == post.userId || isAdminw == 1 "
                     @click="ModifyCom(post.commentId)"
                     class="far fa-edit" aria-label="Modifier le message"></i>

                    <!--  supprimer le poste  si admin et si cest l auteur du poste-->

                    <i v-if="(userId ==  post.userId || isAdminw == 1) & index != 0 "

                     v-on:click="deleteCom(post.commentId)" class="far fa-trash-alt"
                      aria-label="Supprimer le message">
                     </i>
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
        name: 'Postdetail',
        components: {
            Navbar,
            Likes
        },
        data() {
            return {
                userId: localStorage.getItem('userId'),
                firstname: localStorage.getItem('firstname'),
                lastname: localStorage.getItem('lastname'),
                isAdminw: localStorage.getItem('isAdmin'),


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
            this.displayCom();
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

            // Permet d'afficher tous les messages
            displayCom() {

            let idArticle = this.$route.query.id;

                axios.get('http://localhost:3000/api/comments/' + idArticle, {
                    headers: {
                        'Content-Type' : 'application/json',
                        'Authorization':
                        localStorage.getItem('token')
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
            ModifyCom(idCom) {
                this.$router.push( { path: 'ComModif' , query: { id: idCom }});

            },

            // Permet de supprimer un message
            deleteCom(id) {
                const postId = id;
                //let idArticle = this.$route.query.id;


                axios.delete('http://localhost:3000/api/comments/' + postId, {
                    headers: {
                        'Content-Type' : 'application/json',
                        'Authorization':
                        localStorage.getItem('token')
                    }
                })
                .then(() => {
                    this.displayCom();

                })
                .catch(error => {
                    const msgerror = error.response.data
                    this.notyf.error(msgerror.error)
                })
            },
        }
    }
</script>


<style scoped lang="scss">
@import "../variables_SCSS/couleurs.scss";

.liens
{
color: black;
text-align: start;
text-decoration: underline;

//border-radius: 25px;
}
.liens:hover {
 background-color: gold;

}

.titrearticle
{
 background-color: $fond;
  text-align: center;
  margin: 20px 0px 20px 10px;
  font-size: 20px;
}

    .displayPost {
        display: flex;
        flex-direction: column;
        &__item {
            display: flex;
            flex-direction: column;
            border: 1px solid black;
            border-radius: 25px;
            margin: auto;
            margin-top: 2rem;
            padding: 1rem;
            width: 50%;
             text-align: left;
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
                        text-align : left;
                    font-size: 15px;
                    padding: 2px 2px 5px 2px;
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
                margin: 1rem 0rem;
                @media (max-width: 700px) {

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



</style>