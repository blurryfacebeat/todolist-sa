<template>
    <div>
        <form @submit.prevent="changePassword">
            <label for="password">Сменить Пароль</label>
            <input type="password" v-model="password" id="password" placeholder="Введите пароль">
            <button type="submit">Сменить Пароль</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

let config = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
}

export default {
    data() {
        return {
            password: ''
        }
    },
    methods: {
        changePassword() {
            const password = this.password;
            axios
                .post('https://sa-mysite-anchousi.herokuapp.com/api/auth/change', {password: password}, config)
                .then(response => {
                    console.log(response);
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

        button {
            margin-top: 1.5rem;
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