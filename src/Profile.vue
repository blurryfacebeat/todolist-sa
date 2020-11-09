<template>
    <div>
        <h1>Личный кабинет</h1>
        <div class="change-container">
            <change-email />
            <change-password />
        </div>
    </div>
</template>

<script>
import ChangeEmail from './ChangeEmail';
import ChangePassword from './ChangePassword';

export default {
    components: {
        ChangeEmail,
        ChangePassword
    }
}
</script>

<style lang="scss" scoped>
    .change-container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>