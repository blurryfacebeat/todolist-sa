<template>
    <div>
        <h1>Домашняя страница</h1>
        <h2 v-if="token">Рады снова видеть вас!</h2>
        <p v-if="token">Открывайте список задач и приступайте к работе. Удачи!</p>
        <p v-if="!token">Вы на главной странице приложения To-Do-List. Если вы попали сюда впервые, то для начала работы вам нужно пройти регистрацию и авторизироваться. После этого вам станет доступна вкладка "ToDoList", где вы сможете расписать свои планы и отслеживать их выполнение. Удачи!</p>
        <div v-if="!token" class="btn-container">
            <router-link exact to="/login">Войти</router-link>
            <router-link to="/register">Зарегистрироваться</router-link>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            token: localStorage.getItem('token')
        }
    }
}
</script>

<style lang="scss" scoped>
    p {
        margin: 0 auto;
        width: 50%;

        color: #444;
        text-align: center;
        font-size: 2rem;
        line-height: 3.4rem;
    }

    h2 {
        margin-bottom: 2rem;

        text-align: center;
        font-weight: 500;
        font-size: 3rem;
        color: #444;
    }

    .btn-container {
        display: flex;
        justify-content: center;
        margin-top: 3rem;

        a {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 40rem;
            height: 4rem;

            font-size: 1.6rem;
            text-decoration: none;
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

            &:first-of-type {
                margin-right: 3rem;
            }
        }
    }
</style>