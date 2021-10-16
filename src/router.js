import vue from 'vue'
import Router from 'vue-router'
import Login from './components/Login.vue'

export default new Router({
    mode: "history",
    routes: [
        { path: '/', name: 'home', component: Login },
        { path: '/login', name: 'login', component: Login },
    ]
})

vue.use(Router)