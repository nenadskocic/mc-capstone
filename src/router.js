import vue from 'vue'
import Router from 'vue-router'
import Login from './components/public/Login.vue'
import Registration from './components/public/Registration.vue'
// import SecurityQuestions from './components/public/SecurityQuestions.vue'
// import PasswordChange from './components/public/PasswordChange.vue'
// import About from './components/public/About.vue'
// import Services from './components/public/Services.vue'
// import News from './components/public/News.vue'
// import Team from './components/public/Team.vue'
// import Contact from './components/public/Contact.vue'
import Dispatch from './components/user/Dispatch.vue'

import UserProfiles from './components/admin/UserProfiles.vue'
import DriverProfiles from './components/admin/DriverProfiles.vue'
import TruckProfiles from './components/admin/TruckProfiles.vue'
import TrailerProfiles from './components/admin/TrailerProfiles.vue'

vue.use(Router);

let router = new Router({
    mode: "history",
    routes: [
        // Public paths
        { path: '/', name: 'home', component: Login, meta: { guest: true }  },
        { path: '/login', name: 'login', component: Login, meta: { guest: true } },
        { path: '/registration', name: 'registration', component: Registration, meta: { guest: true } },
        // { path: '/securityQuestions', name: 'securityQuestions', component: SecurityQuestions, meta: { guest: true } },
        // { path: '/passwordChange', name: 'passwordChange', component: PasswordChange, meta: { guest: true } },
        // { path: '/public/about', name: 'about', component: About },
        // { path: '/public/services', name: 'services', component: Services },
        // { path: '/public/news', name: 'news', component: News },
        // { path: '/public/team', name: 'team', component: Team },
        // { path: '/public/contact', name: 'contact', component: Contact },
        { path: '/user/dispatch', name: 'dispatch', component: Dispatch, meta: { requiresAuth: true } },

        // Admin paths
        { path: '/admin/profile/user', name: 'userProfiles', component: UserProfiles, meta: { requiresAuth: true, is_admin: true } },
        { path: '/admin/profile/driver', name: 'driverProfiles', component: DriverProfiles, meta: { requiresAuth: true, is_admin: true } },
        { path: '/admin/profile/truck', name: 'truckProfiles', component: TruckProfiles, meta: { requiresAuth: true, is_admin: true } },
        { path: '/admin/profile/trailer', name: 'trailerProfiles', component: TrailerProfiles, meta: { requiresAuth: true, is_admin: true } },
    ]
})

router.beforeEach((to, from, next) => {
    if(to.matched.some(x => x.meta.requiresAuth)) {
        if(localStorage.getItem('jwt') == null) {
            next({
                path: '/login',
                params: { nextUrl: to.fullPath }
            })
        } else {
            let authUser = JSON.parse(localStorage.getItem('authUser'));

            if(to.matched.some(x => x.meta.is_admin)) {
                if(authUser[0].is_admin == 1) {
                    next()
                } else {
                    next('/user/dispatch');
                }
            }
            else {
                next();
            }
        }
    } else if (to.matched.some(x => x.meta.guest)) {
        if(localStorage.getItem('jwt') == null) {
            next();
        } else {
            next('/user/dispatch');
        }
    } else {
        next();
    }
})

export default router;