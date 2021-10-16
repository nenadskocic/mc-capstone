import vue from 'vue'
import Router from 'vue-router'
import Login from './components/Login.vue'
import SignUp from './components/SignUp.vue'

export default new Router({
    mode: "history",
    routes: [
        { path: '/', name: 'home', component: Login },
        { path: '/login', name: 'login', component: Login },
        { path: '/signup', name: 'signup', component: SignUp },
    ]
})

vue.use(Router)