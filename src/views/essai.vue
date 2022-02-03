<template>

     <Navbar/>



<div id="themes" >

   <label for="pet-select">Choisir un theme:</label>

 <select @change="getvalue($event)" >
     <option v-bind:value="post.idThemes" v-for="post in posts" v-bind:key='post.idThemes'> {{ post.Nom_theme }}</option>

 </select>

 </div>


<table class="toto">
<thead>
        <tr>
            <th colspan="2">filtrer par theme</th>
        </tr>
    </thead>

<tbody>
        <tr v-for="(post, index) in posts" v-bind:key='index'>
            <td> {{ post.Nom_theme }}</td>
            <td > <img class="foto" @click="themeselection(post.idThemes)" :src="require(`@/assets/themes/${post.Image}`)"></td>
        </tr>
 </tbody>
</table>

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
                  axios.get('http://localhost:3000/api/themes/', {

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

<style scoped lang="scss">
@import "../variables_SCSS/couleurs.scss";

td
{
width:150px;
height:50px;
text-align: start;
}

.toto
{
margin: 100px 15px 150px 50px;
border: solid;

}


.foto
{
width:40px;
height:35px;
}
.foto:hover {

	transform: scale(1.3);
}


</style>