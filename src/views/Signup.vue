<template>
    <div class="home">
        <img class="home__title" src="../assets/iconLong450.png" alt="Logo de Groupomania">

        <div class="home__display">
            <div class="home__display__picture">
                <img class="home__display__picture" src="../assets/rambox-messageries1.jpg" alt="logo messagerie">
            </div>

            <form @submit.prevent="signup" class="home__display__form">
                <h1 class="home__display__form__title">S'inscrire</h1>

                <div class="home__display__form__input">
                    <label for="firstname" class="home__display__form__input__label">Nom</label>
                    <input type="text" v-model="firstname" id="firstname" name="firstname">
                </div>

                <div class="home__display__form__input">
                    <label for="lastname" class="home__display__form__input__label">Prenom</label>
                    <input type="text" v-model="lastname" id="lastname" name="lastname">
                </div>



                <div class="home__display__form__input">
                    <label for="mail" class="home__display__form__input__label">Email</label>
                    <input type="email" v-model="email" id="mail" name="mail">
                </div>

                <div class="home__display__form__input">
                    <label for="password" class="home__display__form__input__label">Mot de passe</label>
                    <input type="password" v-model="password" id="password" name="password">
                </div>

                <button class="home__display__form__button">Inscription</button>

                <p> <router-link to="/" class="home__display__form__login">Se connecter</router-link></p>
            </form>
        </div>
    </div>
</template>


<script>
    import axios from 'axios'
    import { Notyf } from 'notyf'
    import 'notyf/notyf.min.css'

    export default {
        name: 'Signup',
        data() {
            return {
                firstname: '',
                lastname: '',
                email: '',
                password: '',
            }
        },
        created() {
            this.notyf = new Notyf({
                duration: 4000,
                position: {
                    x: 'center',
                    y: 'bottom'
                }
            });
        },
        methods: {
            // Permet de s'inscrire et de basculer sur la page de connexion
            signup()
             {
                axios.post('http://localhost:3000/api/users/signup', {
                    firstname: this.firstname,
                    lastname: this.lastname,
                    email: this.email,
                    password: this.password,
                })
                .then(() => {
                    this.notyf.success('compte créé ! ')
                    this.$router.push('/');
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
.home {
        &__title {
            @media (max-width: 930px) {
                max-width: 400px;
                width: 90%;
            }
        }
        &__display {
            margin-top: 2rem;
            display: flex;
            justify-content: space-around;
            @media (max-width: 930px) {
                display: flex;
                flex-direction: column-reverse;
            }
            &__picture {
                float: left;
                padding-top: 5rem;
                margin-left: 3rem;
                @media (max-width: 1170px) {
                    max-width: 350px;
                }
                @media (max-width: 930px) {
                    max-width: 250px;
                    margin: auto;
                    padding-top: 2rem;
                }
            }

            &__form {
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 30%;
                border: 3px solid $border;
                border-radius: 25px;
                margin-top: 2rem;
                margin-left: -2rem;
                padding: 1rem;
                @media (max-width: 930px) {
                    min-width: 250px;
                    margin: auto;
                }
                &__title {
                    margin-bottom: 3rem;
                    font-size: 27px;
                }
                &__input {
                    display: flex;
                    flex-direction: column;
                    margin-bottom: 2rem;
                    width: 70%;
                    &__label {
                        text-align: start;
                        font-weight: bolder;
                    }
                }
                &__button {
                    border: 3px solid $border;
                    border-radius: 25px;
                    color: $border;
                    font-size: 15px;
                    font-weight: bold;
                    padding: 0.5rem;
                    margin: 1rem;
                    outline-style: none;
                    &:hover, &:focus {
                        border: 3px solid $border_hover;
                        color: $border_hover;
                        cursor: pointer;
                    }
                }
                &__login {
                    font-weight: bold;
                    text-decoration: none;
                    color: $site1;

                }
            }
        }
    }
</style>