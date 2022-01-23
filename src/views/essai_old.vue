<template>

 <div>
     <Navbar/>


        <div class="displayPost" v-for="post in posts" :key="post.postId">

                     <div>
                        <h2>{{ post.Nom_them }}</h2>
                    </div>


        </div>
 </div>


</template>
<script>
 import axios from 'axios'
 import Navbar from '../components/Navbar.vue'


export default {
components: {
            Navbar,
        },


 created() {
            this.displayPost();

        },
 methods:  {


            // Permet d'afficher tous les themes

            displayPost() {
                axios.get('http://localhost:3000/api/themes', {

                })

                .then(response => {
                    this.posts = response.data;

                })
                .catch();
            },
        }
  }

</script>


