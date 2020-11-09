<template>
    <div>
        <!-- <app-lists /> -->
        <!-- <router-view></router-view> -->
        <!--  -->
        <List />
        <Cases />
    </div>
</template>

<script>
// import Lists from './Lists';
// 
import List from './List';
import Cases from './Cases';

export default {
    components: {
        // appLists: Lists
        // 
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