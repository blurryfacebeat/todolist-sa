<template>
    <li :class="{urgently: cs.priority !== 1}">
        <span class="plan-container">
            <span @click="$emit('plan-done', cs.id, cs.complete)">Дело «{{ cs.title }}»</span>
            <span>{{ cs.created_at | moment }}</span>
            <span class="done" v-if="cs.complete"></span>
            <div class="delete-plan" @click="$emit('remove-plan', cs.id)">x</div>
        </span>
    </li>
</template>

<script>
import moment from 'moment';

export default {
    props: ['cs', 'urgently'],
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
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;

        text-align: center;
        font-size: 1.4rem;

        border-bottom: 0.1rem solid rgba(0, 0, 0, 0.2);
        border-radius: 0.5rem;

        &:last-child {
            margin-bottom: 0;
        }

        .plan-container {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;

            span {
                display: inline-block;
                margin-left: 1rem;

                &:first-of-type {
                    cursor: pointer;

                    &:hover {
                        text-decoration: underline;
                    }
                }

                &:first-of-type {
                    margin-left: 0;
                }
            }

            .done {
                width: 2rem;
                height: 2rem;

                background-image: url('./assets/done.svg');
                background-repeat: no-repeat;
                background-position: center;
                background-size: contain;
            }

            .delete-plan {
                position: absolute;
                top: -0.4rem;
                right: 0.7rem;

                font-weight: 600;

                cursor: pointer;
            }
        }
    }

    .urgently {
        background-color: rgb(255, 167, 167);
    }
</style>