<template>
    <div>
        <h2>Дела</h2>
        <h4 v-if="cases.length === 0">Список дел пуст</h4>
        <ul>
            <CaseItem 
                v-for="cs of cases"
                :cs="cs"
                :key="cs.id"
            />
        </ul>
        <form @submit.prevent="createPlan(list_id)">
            <input type="text" v-model="planTitle" placeholder="Введите название дела">
            <button type="submit">Добавить дело</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
import CaseItem from './CaseItem';
import { eventEmitter } from './main';

let config = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
};

export default {
    data() {
        return {
            planTitle: '',
            cases: [],
            list_id: null
        }
    },
    components: {
        CaseItem
    },
    methods: {
        createPlan(list_id) {
            const planTitle = this.planTitle;
            if (this.planTitle.trim()) {
                axios
                    .post('https://sa-mysite-anchousi.herokuapp.com/api/to_do_list/plans/create/' + list_id, {title: planTitle, description: '', priority: 1}, config)
                    .then(response => {
                        console.log(response);
                        this.planTitle = '';
                        this.cases.push(response.data);
                    });
            } else {
                alert('Сначала введите название дела');
            }
        },
        getPlans(list_id) {
            axios
                .get('https://sa-mysite-anchousi.herokuapp.com/api/to_do_list/plans/get/' + list_id, config)
                .then(response => {
                    console.log(response);
                    this.cases = response.data;
                });
        }
    },
    created() {
        eventEmitter.$on('getPlans', (list_id) => {
            this.list_id = list_id;
            this.getPlans(list_id);
        });
    }
}
</script>

<style lang="scss" scoped>
    div {
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

        h4 {
            margin-bottom: 2rem;

            text-align: center;
            color: rgb(68, 68, 68);
            font-weight: 500;
            font-size: 1.2rem;
        }

        ul {
            list-style: none;
            margin-bottom: 5rem;
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