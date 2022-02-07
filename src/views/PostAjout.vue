<template>

        <Navbar/>

<div id="themes" >

     <div class="newPost">

     <h1>nouvel article</h1>

    <label >Choisir un theme:</label>

        <select @change="getvalue($event)" >
            <option  v-bind:value="theme.idThemes" v-for="theme in themes" v-bind:key='theme.idThemes'> {{ theme.Nom_theme }} </option>
        </select>

            <form @submit.prevent="createPost">
                <div>
                    <textarea v-model="content" class="newPost__content__text2" maxlength="30" minlength="5"  placeholder="titre du poste (30 caracteres maximun)" />
                </div>

                 <div>
                    <textarea v-model="commentaire" class="newPost__content__text" name="message" id="message" placeholder="commentaire du poste" />
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
                commentaire: '',
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
                 // console.log("creatpost", this.content)

                if (this.content !== ""  & this.commentaire !== "" )

                {

                axios.post('http://localhost:3000/api/articles/',  {
                title: this.content,
                theme: this.themeId,
                userId: this.userId,
                commentaire: this.commentaire,

                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization':
                        localStorage.getItem('token')
                    }
                })
                .then(() => {
                  this.notyf.success('article bien ajouté')
                  this.$router.push( { path: 'Post'});

                })
                .catch(error => {
                    const msgerror = error.response.data;
                    this.notyf.error(msgerror.error)

                })
                 }
                else
                {
                 this.notyf.success('vous devez saisir un texte le titre doit etre < a 30 caracteres')

                }
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
            min-height: 10rem;
        }
        &__content__text2 {
            border-radius: 0 15px;
            border: none;
            margin: 1.5rem 0 0 0;
            max-width: 50rem;
            width: 90%;
            min-height: 2rem;
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





</style>