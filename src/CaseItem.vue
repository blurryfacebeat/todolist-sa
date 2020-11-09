<template>
    <li>
        <span>
            <span>Дело «{{ cs.title }}»</span>
            <span>{{ cs.data_create | moment }}</span>
        </span>
    </li>
</template>

<script>
import moment from 'moment';

export default {
    props: ['cs'],
    methods: {
        moment() {
            return moment();
        }
    },
    filters: {
        moment(date) {
            return moment(date).format('DD.MM.YYYY hh:mm');
        }
    },
}
</script>

<style lang="scss" scoped>
    li {
        width: 100%;
        margin-bottom: 1rem;
        padding-bottom: 1rem;

        text-align: center;
        font-size: 1.4rem;

        cursor: pointer;
        border-bottom: 0.1rem solid rgba(0, 0, 0, 0.2);

        &:last-child {
            margin-bottom: 0;
        }

        span {
            display: inline-block;
            margin-left: 1rem;

            &:first-of-type {
                margin-left: 0;
            }
        }
    }
</style>