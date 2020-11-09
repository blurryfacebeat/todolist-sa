<template>
    <div class="to-do-container">
        <div class="lists-container">
            <h2>Списки дел</h2>
            <ul class="lists">
                <li 
                    class="lists-item" 
                    v-for="list of todoLists"
                    :key="list.id"
                >
                    <router-link exact :to="'/cases/' + list.id">
                        <a class="list-link" @click="getPlans(list.id)">Список «{{ list.title }}» <span>{{ list.date_create | moment }}</span></a>
                    </router-link>
                    <button @click.prevent="deleteList(list.id)">x</button>
                </li>
            </ul>
            <form>
                <input type="text" v-model="listTitle" placeholder="Введите название списка">
                <button type="submit" @click.prevent="createList">Создать список</button>
            </form>
        </div>
        <div class="plans-container">
            <h2>Дела</h2>
            <router-link exact :to="'/'">
                <button class="close-plans">x</button>
            </router-link>
            <ul class="plans">
                <li 
                    class="plans-item"
                    v-for="cs of cases"
                    :key="cs.id"
                >
                    Дело: {{ cs.title }} <span>{{ cs.date_create | moment }}</span>
                </li>
            </ul>
            <form>
                <input type="text" v-model="planTitle" placeholder="Введите название дела">
                <button type="submit" @click.prevent="createPlan(listId)">Добавить дело</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

let config = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
}

export default {
    data() {
        return {
            todoLists: null,
            cases: null,
            listTitle: '',
            planTitle: '',
            listId: 0
        }
    },
    methods: {
        moment() {
            return moment();
        },
        refreshList() {
            axios
                .get('https://sa-mysite-anchousi.herokuapp.com/api/to_do_list/lists/get', config)
                .then(response => (this.todoLists = response.data));
        },
        // Удаляю список
        deleteList(list_id) {
            axios
                .delete('https://sa-mysite-anchousi.herokuapp.com/api/to_do_list/lists/delete/' + list_id, config)
                .then(response => {
                    console.log(response);
                    this.refreshList();
                });
        },
        // Создаю список
        createList() {
        const listTitle = this.listTitle;
        if (listTitle === '') {
            alert('Сначала введите название списка');
        }
        axios
            .post('https://sa-mysite-anchousi.herokuapp.com/api/to_do_list/lists/create', {title: listTitle}, config)
            .then(response => {
                console.log(response);
                this.listTitle = '';
                this.refreshList();
            });
        },
        getPlans(list_id) {
            this.listId = list_id;
            axios
                .get('https://sa-mysite-anchousi.herokuapp.com/api/to_do_list/plans/get/' + list_id, config)
                .then(response => {
                    console.log(response);
                    this.cases = response.data;
                });
        },
        createPlan(list_id) {
            const planTitle = this.planTitle;
            if (planTitle === '') {
                alert('Сначала введите название плана');
            }
            axios
                .post('https://sa-mysite-anchousi.herokuapp.com/api/to_do_list/plans/create/' + list_id, {title: planTitle, description: '', priority: 1}, config)
                .then(response => {
                    console.log(response);
                    this.planTitle = '';
                    this.getPlans(list_id);
                });
        }
    },
    filters: {
        moment(date) {
            return moment(date).format('DD.MM.YYYY hh:mm');
        }
    },
    mounted() {
        axios
            .get('https://sa-mysite-anchousi.herokuapp.com/api/to_do_list/lists/get', config)
            .then(response => (this.todoLists = response.data));
    }
}
</script>

<style lang="scss" scoped>
    .to-do-container {
        display: flex;
        width: 100%;
        padding: 3rem;

        background-color: #fff;
        border-radius: 1rem;

        .lists-container {
            display: flex;
            flex-direction: column;
            width: 50%;
            padding-right: 3rem;

            h2 {
                margin-bottom: 2rem;

                text-align: center;
                color: rgb(68, 68, 68);
                font-weight: 500;
                font-size: 2.4rem;
            }

            .lists {
                list-style: none;
                margin-bottom: 5rem;

                &-item {
                    padding: 1rem;
                    height: 5rem;
                    position: relative;
                    width: 100%;
                    margin: 0 auto;
                    margin-bottom: 1rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    text-align: center;
                    color: #fff;
                    font-size: 1.6rem;

                    background-color: rgb(40, 158, 255);
                    border-radius: 1rem;

                    &:last-child {
                        margin-bottom: 0;
                    }

                    a {
                        width: 100%;

                        color: #fff;
                        text-decoration: none;

                        span {
                            display: inline-block;
                            margin-left: 5rem;

                            font-size: 1.2rem;
                        }
                    }

                    button {
                        position: absolute;
                        top: .3rem;
                        right: 1rem;

                        color: #fff;
                        font-size: 2rem;

                        border: none;
                        cursor: pointer;
                        background-color: transparent;
                        outline: none;
                    }
                }
            }

            form {
                width: 100%;
                margin-top: auto;
                display: flex;
                align-items: center;
                justify-content: center;

                input {
                    padding-right: 2rem;
                    padding-left: 2rem;
                    width: 70%;
                    height: 4rem;

                    font-family: inherit;
                    font-size: 1.4rem;

                    outline: none;
                    border: 0.1rem solid #289eff;
                    border-radius: 0.5rem 0 0 0.5rem;

                    &::placeholder {
                        font-family: inherit;
                    }
                }

                button {
                    width: 30%;
                    height: 4rem;

                    color: #fff;
                    font-family: inherit;
                    font-size: 1.4rem;

                    border: none;
                    border-radius: 0 0.5rem 0.5rem 0;
                    cursor: pointer;
                    outline: none;
                    background-color: #289eff;
                }
            }
        }
    }

    .plans-container {
        display: flex;
        position: relative;
        flex-direction: column;
        width: 50%;
        padding-left: 3rem;

        border-left: 0.1rem solid rgba(0, 0, 0, 0.2);

        h2 {
            margin-bottom: 2rem;

            text-align: center;
            color: rgb(68, 68, 68);
            font-weight: 500;
            font-size: 2.4rem;
        }

        .close-plans {
            position: absolute;
            top: 0;
            right: 0;

            font-size: 1.6rem;
            font-weight: 700;

            background-color: transparent;
            border: none;
            cursor: pointer;
            outline: none;
        }

        .plans {
            list-style: none;
            margin-bottom: 5rem;

            &-item {
                width: 100%;
                margin-bottom: 1rem;
                padding-bottom: 1rem;

                text-align: center;
                font-size: 1.6rem;

                cursor: pointer;
                border-bottom: 0.1rem solid rgba(0, 0, 0, 0.2);

                &:last-child {
                    margin-bottom: 0;
                }

                span {
                    display: inline-block;
                    margin-left: 1rem;
                }
            }
        }

        form {
            width: 100%;
            margin-top: auto;
            display: flex;
            align-items: center;
            justify-content: center;

            input {
                padding-right: 2rem;
                padding-left: 2rem;
                width: 70%;
                height: 4rem;

                font-family: inherit;
                font-size: 1.4rem;

                outline: none;
                border: 0.1rem solid #289eff;
                border-radius: 0.5rem 0 0 0.5rem;

                &::placeholder {
                    font-family: inherit;
                }
            }

            button {
                width: 30%;
                height: 4rem;

                color: #fff;
                font-family: inherit;
                font-size: 1.4rem;

                border: none;
                border-radius: 0 0.5rem 0.5rem 0;
                cursor: pointer;
                outline: none;
                background-color: #289eff;
            }
        }
    }
</style>