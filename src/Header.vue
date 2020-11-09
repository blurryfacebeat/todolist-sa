<template>
    <div>
        <nav>
            <ul>
                <li v-if="tokenTemp">
                    <router-link to="/register"><span>Зарегистрироваться</span></router-link>
                </li>
                <li v-if="tokenTemp">
                    <router-link to="/login"><span>Войти</span></router-link>
                </li>
                <li v-if="tokenTemp">
                    <router-link to="/profile"><span>Личный кабинет</span></router-link>
                </li>
                <li v-if="tokenTemp">
                    <router-link to="/todolist"><span>ToDoList</span></router-link>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tokenTemp: localStorage.getItem('token')
        }
    }
}
</script>

<style lang="scss" scoped>
    div {
        margin-bottom: 6rem;
    }

    ul {
        display: flex;
        justify-content: flex-end;

        list-style: none;

        li {
            a {
                margin-right: 3rem;

                color: #444;
                text-decoration: none;
                font-size: 1.6rem;

                transition: color .2s linear;

                &:hover {
                    color: rgb(126, 126, 126);
                }
            }
        }
    }
</style>