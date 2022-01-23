<template>
    <div class="container">
     <Navbar/>
        <h3 class="p-3 text-center">Vue.js - Display a list of items with v-for</h3>
        <table class="table table-striped table-bordered">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="post in posts" :key="post.id">
                    <td>{{post.firstname}} {{post.lastname}}</td>
                    <td>{{post.userId}}</td>


                </tr>
            </tbody>
        </table>
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

            users: [
                { firstName: 'Frank', lastName: 'Murphy', email: 'frank.murphy@test.com', role: 'User' },
                { firstName: 'Vic', lastName: 'Reynolds', email: 'vic.reynolds@test.com', role: 'Admin' },
                { firstName: 'Gina', lastName: 'Jabowski', email: 'gina.jabowski@test.com', role: 'Admin' },
                { firstName: 'Jessi', lastName: 'Glaser', email: 'jessi.glaser@test.com', role: 'User' },
                { firstName: 'Jay', lastName: 'Bilzerian', email: 'jay.bilzerian@test.com', role: 'User' }
                     ]
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
                axios.get('http://localhost:3000/api/articles', {
                  nombre: 5,
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


