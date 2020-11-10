<template>
    <div>
        <h2>Дела</h2>
        <h4 v-if="list_id === null">Вы еще не выбрали список дел</h4>
        <h4 v-if="cases.length === 0 && list_id !== null">Список дел пуст</h4>
        <ul>
            <CaseItem 
                v-for="cs of cases"
                :cs="cs"
                :key="cs.id"
                @remove-plan="removePlan"
                @plan-done="planDone"
            />
        </ul>
        <form v-if="list_id !== null" @submit.prevent="createPlan(list_id)">
            <input type="text" v-model="planTitle" placeholder="Введите название дела">
            <button type="submit">Добавить дело</button>
            <span class="urgently">
                <input type="checkbox" v-model="urgently">
                <span>Срочно</span>
            </span>
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
            list_id: null,
            urgently: false
        }
    },
    components: {
        CaseItem
    },
    methods: {
        createPlan(list_id) {
            let priority = 1;
            if (this.urgently) {
                priority = 5;
            }
            const planTitle = this.planTitle;
            if (this.planTitle.trim()) {
                axios
                    .post('https://sa-mysite-anchousi.herokuapp.com/api/to_do_list/plans/create/' + list_id, {title: planTitle, description: '', priority}, config)
                    .then(response => {
                        console.log(response);
                        this.planTitle = '';
                        this.cases.push(response.data);
                        alert('Дело успешно добавлено');
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
        },
        removePlan(plan_id) {
            const sure = confirm('Вы точно хотите удалить дело?');
            if (sure) {
                axios
                    .delete('https://sa-mysite-anchousi.herokuapp.com/api/to_do_list/plans/delete/' + plan_id, config)
                    .then(response => {
                        console.log(response);
                        this.cases = this.cases.filter(c => c.id !== plan_id);
                        alert('Дело успешно удалено');
                    });
            } else {
                alert('Запрос отменен');
            }

        },
        planDone(plan_id, plan_complete) {
            axios
                .post('https://sa-mysite-anchousi.herokuapp.com/api/to_do_list/plans/change/' + plan_id + '/' + this.list_id, {complete: true}, config)
                .then(response => {
                    console.log(response);
                    this.getPlans(this.list_id);
                });
        }
    },
    created() {
        eventEmitter.$on('getP', (list_id) => {
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
                width: 50%;
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

            .urgently {
                width: 20%;
                display: flex;
                align-items: center;
                margin-left: 1rem;

                input {
                    margin-right: 0.5rem;
                    width: 1.5rem;
                    height: 1.5rem;
                }

                span {
                    font-size: 1.4rem;
                }
            }
        }
    }
</style>