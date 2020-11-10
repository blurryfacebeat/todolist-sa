<template>
    <div>
        <h1>Логин</h1>
        <form @submit.prevent="login">
            <div class="control-group">
                <label for="username">Логин</label>
                <input type="text" v-model="username" id="username" placeholder="Введите имя пользователя">
            </div>
            <div class="control-group">
                <label for="password">Пароль</label>
                <input type="password" v-model="password" id="password" placeholder="Введите пароль">
            </div>
            <button type="submit">Войти</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            username: '',
            password: ''
        }
    }, 
    methods: {
        login() {
            const regObj = {
                username: this.username,
                password: this.password
            };
            console.log(regObj);
            axios
                .post('https://sa-mysite-anchousi.herokuapp.com/api/auth/login', regObj)
                .then(response => {
                    console.log(response);
                    console.log(regObj);
                    console.log('Авторизация прошла');
                    localStorage.setItem('token', response.data.token);
                    location.reload();
                    this.username = '';
                    this.password = '';
                });
        }
    }
}
</script>

<style lang="scss" scoped>
    form {
        display: flex;
        flex-direction: column;
        align-items: center;

        .control-group {
            margin-bottom: 2rem;
            display: flex;
            flex-direction: column;

            &:last-of-type {
                margin-bottom: 0;
            }

            label {
                margin-bottom: 1rem;

                font-size: 1.6rem;
            }

            input {
                width: 40rem;
                height: 4rem;
                padding-right: 2rem;
                padding-left: 2rem;

                font-size: 1.6rem;
                font-family: inherit;

                border-radius: 1rem;
                border: transparent;
                outline: none;
                transition: border .2s linear;

                &:focus {
                    border: .1rem solid rgba(116, 199, 255, .8);
                }

                &::placeholder {
                    font-family: inherit;
                }
            }
        }

        button {
            margin-top: 3rem;
            width: 40rem;
            height: 4rem;

            font-size: 1.6rem;
            color: #fff;

            cursor: pointer;
            background-color: rgb(116, 199, 255);
            border-radius: 1rem;
            border: none;
            outline: none;
            transition: box-shadow .2s linear;

            &:hover {
                box-shadow: .25rem .25rem rgb(59, 176, 253);
            }
        }
    }
</style>