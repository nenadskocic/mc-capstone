import vue from 'vue'
import Router from 'vue-router'
import Login from './components/Login.vue'
import SecurityQuestions from './components/SecurityQuestions.vue'
import About from './components/public/About.vue'
import Services from './components/public/Services.vue'
import News from './components/public/News.vue'
import Team from './components/public/Team.vue'
import Contact from './components/public/Contact.vue'

export default new Router({
    mode: "history",
    routes: [
        { path: '/', name: 'home', component: Login },
        { path: '/login', name: 'login', component: Login },
        { path: '/securityQuestions', name: 'securityQuestions', component: SecurityQuestions },
        { path: '/about', name: 'about', component: About },
        { path: '/services', name: 'services', component: Services },
        { path: '/news', name: 'news', component: News },
        { path: '/team', name: 'team', component: Team },
        { path: '/contact', name: 'contact', component: Contact },
    ]
})

vue.use(Router)