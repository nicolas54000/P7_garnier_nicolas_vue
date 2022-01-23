<template>

     <Navbar/>



<select v-model="selected">
  <option v-for="post in posts" v-bind:value="post.idThemes" :key="post.idThemes">
    {{ post.Nom_theme }}
    </option>
</select>
<br>
<span>Sélectionné : {{ selected }} </span>


</template>
<script>
 import axios from 'axios'
 import Navbar from '../components/Navbar.vue'
 import { Notyf } from 'notyf'
 import 'notyf/notyf.min.css'


export default {
components: {
            Navbar,
        },

    data() {
        return {
                posts: [],
                post: '',
                // affiche articles
                nombre:5,
                apres:0,

            }
 },
 created() {
            this.displayPost();
             console.log('I change when this.property changes.')
             console.log(this.postId)
            this.notyf = new Notyf({
                duration: 2000,
                position: {
                    x: 'center',
                    y: 'top'
                }
            });
        },
 methods:  {


            // Permet d'afficher tous les messages

            displayPost() {
                  axios.get('http://localhost:3000/api/themes', {

                })

                .then(response => {
                    this.posts = response.data;

                })
                .catch(error => {
                    const msgerror = error.response.data
                    this.notyf.error(msgerror.error)
                })
            },

        }
  }


</script>


