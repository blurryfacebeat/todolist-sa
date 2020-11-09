<template>
    <div>
        <app-lists></app-lists>
        <router-view></router-view>
    </div>
</template>

<script>
import Lists from './Lists';

export default {
    components: {
        appLists: Lists
    }
}
</script>

<style lang="scss" scoped>

</style>