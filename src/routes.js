import VueRouter from 'vue-router';
import Register from './Register.vue';
import Login from './Login.vue';
import Profile from './Profile.vue';
import TodoList from './TodoList.vue';
import Home from './Home.vue';
import Cases from './Cases.vue';

export default new VueRouter ({
    routes: [
        {
            path: '/register',
            component: Register
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/profile',
            component: Profile
        },
        {
            path: '/todolist',
            component: TodoList
        },
        {
            path: '/cases',
            component: Cases
        },
        {
            path: '/home',
            component: Home
        },
        {
            path: '/',
            redirect: '/home'
        }
        
    ],
    mode: 'history'
});