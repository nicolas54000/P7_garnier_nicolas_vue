<template>

        <Navbar/>

<div id="themes" >

     <div class="newPost">

    <label >Choisir un theme:</label>

        <select @change="getvalue($event)" >
            <option  v-bind:value="theme.idThemes" v-for="theme in themes" v-bind:key='theme.idThemes'> {{ theme.Nom_theme }} </option>
        </select>

            <form @submit.prevent="createPost" aria-label="Nouveau message">
                <div class="newPost__content">
                    <textarea v-model="content" class="newPost__content__text" name="message" id="message" placeholder="Saisie du poste?" aria-label="Rédiger un nouveau message"/>


                </div>

                <div class="newPost__option">
                    <div class="newPost__option__file">
                    <button @click="uploadFile" type="button" class="newPost__option__file__btnInvisible"><i class="far fa-images fa-2x"></i> Choisir un fichier</button>

                        <input type="file" ref="fileUpload" @change="onFileSelected" accept="image/*" aria-label="Sélectionner un fichier">
                    </div>

                    <button type="submit" class="newPost__option__button" aria-label="Publier le message">Publier <i class="far fa-paper-plane"></i></button>
                </div>
            </form>
        </div>


            <div>
        </div>



    </div>
</template>



<script>
    import axios from 'axios'
    import moment from 'moment'
    import { Notyf } from 'notyf'
    import 'notyf/notyf.min.css'

    import Navbar from '@/components/Navbar.vue'

    export default {
        name: 'PostAjout',
        components: {
            Navbar,
        },

        data() {
            return {
                userId: localStorage.getItem('userId'),
                firstname: localStorage.getItem('firstname'),
                lastname: localStorage.getItem('lastname'),
                isAdmin: localStorage.getItem('isAdmin'),

                themeid: "",
                posts: [],
                themes: [],
                post: '',
                imagePost: '',
                imagePreview: null,
                content: '',
                contentmodifyPost: '',
                comments: [],
                contentComment: '',

                revele: false,
                showComment: false,
                showCreateComment: false,
                showInputModify: false,

            }
        },
        created() {
           this.displaythemes();

            this.notyf = new Notyf({
                duration: 2000,
                position: {
                    x: 'center',
                    y: 'top'
                }
            });
        },



        methods: {


             getvalue(event) {
             this.themeId = event.target.value
             },

            createPost() {
                console.log("creatpost")

                axios.post('http://localhost:3000/api/articles/',  {
                title: this.content,
                theme: this.themeId,
                userId: this.userId,

                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization':
                        localStorage.getItem('token')
                    }
                })
                .then(() => {

                  this.$router.push( { path: 'Post'});

                })
                .catch(error => {
                    const msgerror = error.response.data;
                    this.notyf.error(msgerror.error)

                })
            },
            displaythemes() {
                  axios.get('http://localhost:3000/api/themes/', {
                })

                .then(response => {
                    this.themes = response.data;
                    // console.log(this.themes)

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
                &__image {
                    max-width: 1250px;
                    width: 100%;
                    height: 274px;
                    margin: 1rem auto;
                    object-fit: cover;
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