import vue from 'vue'
import Router from 'vue-router'
import Login from './components/public/Login.vue'
import Registration from './components/public/Registration.vue'
import SecurityQuestions from './components/public/SecurityQuestions.vue'
import PasswordChange from './components/public/PasswordChange.vue'
import About from './components/public/About.vue'
import Services from './components/public/Services.vue'
import News from './components/public/News.vue'
import Team from './components/public/Team.vue'
import Contact from './components/public/Contact.vue'

import UserProfiles from './components/admin/UserProfiles.vue'
import DriverProfiles from './components/admin/DriverProfiles.vue'
import TruckProfiles from './components/admin/TruckProfiles.vue'

export default new Router({
    mode: "history",
    routes: [
        // Public paths
        { path: '/', name: 'home', component: Login },
        { path: '/public/login', name: 'login', component: Login },
        { path: '/public/registration', name: 'registration', component: Registration },
        { path: '/public/securityQuestions', name: 'securityQuestions', component: SecurityQuestions },
        { path: '/public/passwordChange', name: 'passwordChange', component: PasswordChange },
        { path: '/public/about', name: 'about', component: About },
        { path: '/public/services', name: 'services', component: Services },
        { path: '/public/news', name: 'news', component: News },
        { path: '/public/team', name: 'team', component: Team },
        { path: '/public/contact', name: 'contact', component: Contact },

        // Admin paths
        { path: '/admin/profiles/user', name: 'userProfiles', component: UserProfiles, meta: { requiresAuth: true } },
        { path: '/admin/profiles/driver', name: 'driverProfiles', component: DriverProfiles, meta: { requiresAuth: true } },
        { path: '/admin/profiles/truck', name: 'truckProfiles', component: TruckProfiles, meta: { requiresAuth: true } },
    ]
})

vue.use(Router)