<template>
    <div>
        <List />
        <Cases />
    </div>
</template>

<script>
import List from './List';
import Cases from './Cases';

export default {
    components: {
        List,
        Cases
    }
}
</script>

<style lang="scss" scoped>
    div {
        display: flex;
        width: 100%;
        padding: 3rem;

        background-color: #fff;
        border-radius: 1rem;
    }
</style>