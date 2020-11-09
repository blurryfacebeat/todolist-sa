<template>
    <div>
        <form @submit.prevent="changeEmail">
            <label for="email">Сменить Email</label>
            <input type="email" v-model="email" id="email" placeholder="Введите email">
            <button type="submit">Сменить Email</button>
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
            email: ''
        }
    },
    methods: {
        changeEmail() {
            const email = this.email;
            axios
                .post('https://sa-mysite-anchousi.herokuapp.com/api/auth/change', {email: email}, config)
                .then(response => {
                    console.log(response);
                    this.email = '';
                });
        }
    }
}
</script>

<style lang="scss" scoped>
    div {
        margin-bottom: 5rem;
    }

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