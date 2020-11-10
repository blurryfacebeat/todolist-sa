<template>
    <li>
        <span>
            <a @click="plansGet(list.id)">Список «{{ list.title }}»</a>
            <span>{{ list.created_at | moment }}</span>
            <button class="delete" @click="$emit('remove-list', list.id)">x</button>
        </span>
    </li>
</template>

<script>
import moment from 'moment';
import { eventEmitter } from './main';

export default {
    props: ['list'],
    methods: {
        moment() {
            return moment();
        },
        plansGet(list_id) {
            eventEmitter.$emit('getP', list_id);
        }
    },
    filters: {
        moment(date) {
            return moment(date).format('DD.MM.YYYY hh:mm');
        }
    }
}
</script>

<style lang="scss" scoped>
    li {
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

        span {
            display: inline-block;
            margin-left: 1rem;

            font-size: 1.2rem;
        }

        a {
            width: 100%;

            color: #fff;
            font-size: 1.6rem;
            text-decoration: none;

            cursor: pointer;

            &:hover {
                text-decoration: underline;
            }
        }

        button.delete {
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
</style>