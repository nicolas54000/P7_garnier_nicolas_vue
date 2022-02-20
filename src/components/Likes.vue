<template>
    <div class="like">
        <i :id="post.id" @click="likePost()" class="fas fa-heart like__button" aria-label="Aimer le message"></i>
        <span v-if="post.likes > 0" class="like__count">{{ post.likes }}</span>
    </div>
</template>


<script>
    import axios from 'axios'
    import { Notyf } from 'notyf'
    import 'notyf/notyf.min.css'

    export default {
        name: 'Likes',
        props:['post'],
        data(){
            return {
                postLikes: [],
                userId: localStorage.getItem('userId'),
                dismissible: true

            }
        },

        created() {

			this.notyf = new Notyf({
			duration: 2000,
			position: {
				x: 'center',
				y: 'top'
			}
			});
		},

        mounted() {
            //this.displayHeartColor();
        },
        methods:{
            // Permet d'aimer un message
            likePost() {
                this.postLikes =[]
                console.log("*************  like *****" ,this.post.commentId, this.userId)


                axios.get(`http://localhost:3000/api/comments/like/lire/${this.userId}/${this.post.commentId}`, {


                    headers: {
                        'Content-Type' : 'application/json',
                        'Authorization':  localStorage.getItem('token')
                    }
                })
                .then(response => {
                    this.postLikes = response.data;
                    console.log(this.postLikes[0])

                    if(!this.postLikes[0] ) {
                        this.like = false

                        axios.post('http://localhost:3000/api/comments/like/ajout', {
                           commentId: this.post.commentId,
                           userId: this.userId,
                           value: 1


                        },{
                            headers: {
                                'Content-Type' : 'application/json',
                                'Authorization': localStorage.getItem('token')
                            }
                        })
                        .then(() => {
                            //console.log("Vous aimez ce message !");
                            this.notyf.success('Vous aimez ce message !')

                           // window.location.reload()
                        })
                        .catch(error => {
                            const msgerror = error.response.data
                            this.notyf.error(msgerror.error)
                        })
                    } else {
                        //alert("vous avez deja liker")
                        this.notyf.success('vous avez deja liker ce commentaire')

                    }
                })
                .catch(error => {
                   const msgerror = error.response.data
                    this.notyf.error(msgerror.error)
                })
            },

            // Permet d'afficher un coeur vide ou plein en couleur en fonction de si l'utilisateur aime le message ou non

        }
    }
</script>


<style lang="scss">
    .like {
        &__button:hover {
            color: #ff6363;
            cursor: pointer;
        }
        &__count {
            padding-left: 0.5rem;
        }
    }
    .postLiked {
        color:#ff6363;
    }
</style>