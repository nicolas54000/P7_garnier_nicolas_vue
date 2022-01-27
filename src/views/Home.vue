<template>
    <div class="home">
        <img class="home__title" src="../assets/iconLong450.png" alt="Logo de Groupomania">

        <div class="home__display">
            <div class="home__display__picture">
                <img class="home__display__picture" src="../assets/rambox-messageries1.jpg" alt="messageries">
            </div>

            <form @submit.prevent="login" class="home__display__form">
                <h1 class="home__display__form__title">Se connecter</h1>

                <div class="home__display__form__input">
                    <label for="mail" class="home__display__form__input__label">Email</label>
                    <input type="email" v-model="email" id="mail" name="mail">
                </div>

                <div class="home__display__form__input">
                    <label for="password" class="home__display__form__input__label">Mot de passe</label>
                    <input type="password" v-model="password" id="password" name="password">
                </div>

                <button class="home__display__form__button">Connexion</button>

                <p>création de compte : <router-link to="/signup" class="home__display__form__signup">S'inscrire</router-link></p>
            </form>
        </div>
    </div>
</template>


<script>
    import axios from 'axios'
    import { Notyf } from 'notyf'
    import 'notyf/notyf.min.css'

    export default {
        name: 'Home',
        data() {
            return {
                email: '',
                password: '',
            }
        },
        created() {
            this.notyf = new Notyf({
                duration: 2000,
                position: {
                    x: 'center',
                    y: 'bottom'
                }
            });
        },
        methods: {
            // connecter
            login() {
                axios.post('http://localhost:3000/api/users/login', {
                    email: this.email,
                    password: this.password,
                })
                .then(response => {
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('userId', response.data.userId);
                    localStorage.setItem('firstname', response.data.firstname);
                    localStorage.setItem('lastname', response.data.lastname);
                    localStorage.setItem('fk_roles', response.data.fk_roles);
                    localStorage.setItem('email', response.data.email);
                    localStorage.setItem('isActive', response.data.isActive);
                    localStorage.setItem('isAdmin', response.data.isAdmin);



                    this.$router.push('post');
                })
                .catch(error => {
                    const msgerror = error.response.data
                    this.notyf.error(msgerror.error)
                })
            }
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
            margin-top: 3rem;
            display: flex;
            justify-content: space-around;
            @media (max-width: 930px) {
                display: flex;
                flex-direction: column-reverse;
            }
            &__picture {
                float: left;
                padding-top: 4rem;
                margin: 0 0 0 3rem;
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
                max-width: 840px;
                width: 30%;
                border: 3px solid $border;
                border-radius: 25px;
                margin-top: 2rem;
                margin-left: 2rem;
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
                    color: $bouton;
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
                &__signup {
                    font-weight: bold;
                    text-decoration: none;
                    color: $site1;

                }
            }
        }
    }

</style>