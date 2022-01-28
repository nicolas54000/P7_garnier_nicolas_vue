<template>

     <Navbar/>



<div id="themes" >

  <label for="pet-select">Choisir un theme:</label>

<select @change="getvalue($event)" >
    <option v-bind:value="post.idThemes" v-for="post in posts" v-bind:key='post.idThemes'> {{ post.Nom_theme }}</option>



</select>

</div>




<div id="themes">
 <h2>Items:</h2>
  <ul>
  <li v-for="(post, index) in posts" v-bind:key='index'>
     {{ post.idThemes }}

      {{ post.Nom_theme }} <button  @click="themeselection(post.idThemes)">choisir</button>
     </li>
   </ul>
 </div>

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

getvalue(event) {
    console.log(event.target.value)

      },


      themeselection(toto)

      {
    console.log(toto)

      },


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


