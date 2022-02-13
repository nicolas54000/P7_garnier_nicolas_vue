<template>

        <Navbar />

<div id="post">

<!--fenetre de gauche -->
<div class="theme">
      <table >
        <thead>
            <tr>
                <th class="titretheme" colspan="2">filtrer par theme</th>
            </tr>
        </thead>

    <div>
        <tr v-for="theme in themes" v-bind:key="theme.idThemes">
            <td>
            <a class="liens" @click="themeselection(theme.idThemes)"> {{ theme.Nom_theme }} </a>
            </td>
            <td> <img class="foto" @click="themeselection(theme.idThemes)" :src="require(`@/assets/themes/${theme.Image}`)"></td>
        </tr>
    </div>
    </table>

    <div class="contenerliens">
    <a  @click="displayPost();" class="liens">les derniers articles</a>
    </div>

    <div class="contenerliens">
        <a  @click="newPost();" class="liens">nouvel article</a>
    </div>

    <div class="contenerliens">
        <H2>  pagination </h2>
        <input @click="debut()" type="button"    value="debut">
        <input @click="plus()"  type="button"    value="+">
        <input @click="moins()" type="button"    value="-">
    </div>

</div>

<div >
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


                <div class="titrearticle">
                     {{ post.title}}
                 </div>
        <div class="contenerliens">
            <a  @click="detail(post.idArticle);" class="liens">voir les commentaires de l'article</a>
        </div>
        </div>

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
            themes: [],
            post: "",
            theme:"",
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
            noligne: 0,
            ligneparpage: 3,
            nbrligne: 3,
            savetheme: -1,

        };
    },


    created() {
        this.displayPost();
        this.displaythemes();

        this.notyf = new Notyf({
            duration: 2000,
            position: {
                x: "center",
                y: "top",
            },
        });
    },

    methods: {

debut()
{


this.noligne = 0;

console.log("debut", this.noligne, this.nbrligne, this.savetheme)
this.display()
},

plus()
{
this.noligne =  this.noligne + this.ligneparpage;
 this.display()
},

moins()
{
    this.noligne = this.noligne - this.ligneparpage;
            if (this.noligne < 0)
            {
              this.noligne = 0;
            }
   this.display()
},

display()
{
if (this.savetheme == -1)
            {
              this.displayPost()
            }
            else
            {
              this. themeselection(this.savetheme)
            }

},

    detail(idArticle) {

        this.$router.push( { path: 'Postdetail', query: { id: idArticle }});
    },

    newPost() {

        this.$router.push( { path: 'PostAjout'});
    },

        displaythemes() {
                  axios.get('http://localhost:3000/api/themes', {
                })

                .then(response => {
                    this.themes = response.data;

                })
                .catch(error => {
                    const msgerror = error.response.data
                    this.notyf.error(msgerror.error)
                })
            },
 // Permet d'afficher les articles par theme
        themeselection(themeId) {

                 this.idThemes = themeId,
                 this.savetheme = themeId,

         axios.get(`http://localhost:3000/api/articles/theme/${this.idThemes}/${this.noligne}/${this.nbrligne}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization:
                        localStorage.getItem("token"),
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

        // Permet d'afficher tous les messages
        displayPost()
        {
           this.savetheme = -1,

            console.log("nbr", this.nbrligne, "no lig", this.noligne)
            axios.get(`http://localhost:3000/api/articles/all/${this.noligne}/${this.nbrligne}`,

             {headers: {
                        "Content-Type": "application/json",
                        Authorization:
                        localStorage.getItem("token"),
                   }})
                .then((response) => {
                    this.posts = response.data;
                    //window.location.reload()
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
@import "../variables_SCSS/couleurs.scss";

#post
{
display: flex,

}


td
{
width:100px;
height:50px;
text-align: start;
}

.contenerliens
{
text-align: start;
margin: 0px 15px 5px 0px;
}

.liens
{
color: black;
text-align: start;
// text-decoration: none;
//border-radius: 25px;

}
.liens:hover {
 background-color: gold;

}
.titrearticle
{
 background-color: $fond;
  text-align: center;
 margin: 2px 0px 2px 10px;
  font-size: 15px;
}

h1
{
 padding: 10px;
}

.theme
{
margin: 100px 15px 15px 50px;
}

.titretheme
{
padding: 20px 0px 20px 6px;
}

.foto
{
width:35px;
height:28px;
}
.foto:hover {
transform: scale(1.3);
}

.invisible {
    display: none;
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
        width: 700px;
        @media (max-width: 950px) {
            width: 60%;
        }
        &__image
        {
        width: 30px;
        height: 30px

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

    }
}



</style>
