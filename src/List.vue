<template>
    <div>
        <h2>Списки дел</h2>
        <select v-model="listsFilter">
            <option value="all">Все</option>
            <option value="complete">Выполненные</option>
            <option value="not-complete">Невыполненные</option>
        </select>
        <ul>
            <ListItem
                v-for="list of filteredLists"
                :list="list"
                :key="list.id"
                @remove-list="removeList"
            />
        </ul>
        <form @submit.prevent="createList">
            <input type="text" v-model="listTitle" placeholder="Введите название списка">
            <button type="submit">Создать список</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
import ListItem from './ListItem';

let config = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
};

export default {
    data() {
        return {
            lists: [],
            listTitle: '',
            listsFilter: 'not-complete'
        }
    },
    mounted() {
        axios
            .get('https://sa-mysite-anchousi.herokuapp.com/api/to_do_list/lists/get', config)
            .then(response => (this.lists = response.data));
    },
    components: {
        ListItem
    },
    computed: {
        filteredLists() {
            if (this.listsFilter === 'all') {
                return this.lists;
            } else if (this.listsFilter === 'complete') {
                return this.lists.filter(l => !l.undone);
            } else if (this.listsFilter === 'not-complete') {
                return this.lists.filter(l => l.undone);
            }
        }
    },
    methods: {
        createList() {
            if (this.listTitle.trim()) {
                const listTitle = this.listTitle;
                axios
                    .post('https://sa-mysite-anchousi.herokuapp.com/api/to_do_list/lists/create', {title: listTitle}, config)
                    .then(response => {
                        console.log(response);
                        this.lists.push(response.data)
                        this.listTitle = '';
                        alert('Список успешно создан');
                    });
            } else {
                alert('Сначала введите название списка');
            }
        },
        removeList(list_id) {
            const sure = confirm('Вы точно хотите удалить список?');
            if (sure) {
                axios
                    .delete('https://sa-mysite-anchousi.herokuapp.com/api/to_do_list/lists/delete/' + list_id, config)
                    .then(response => {
                        console.log(response);
                        this.lists = this.lists.filter(l => l.id !== list_id);
                        alert('Список успешно удален');
                    });
            } else {
                alert('Запрос отменен');
            }

        }
    }
}
</script>

<style lang="scss" scoped>
    div {
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

        select {
            margin: 0 auto;
            margin-bottom: 2rem;
            width: 30rem;
            height: 3rem;

            font-family: inherit;

            border: 0.1rem solid rgb(75, 189, 255);
            border-radius: 0.5rem;
            outline: none;
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