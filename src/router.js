/**
 * I, Nenad Skocic, 000107650 certify that this material is my original work. 
 * No other person's work has been used without due acknowledgment.
 */
import vue from 'vue'
import Router from 'vue-router'
import Login from './components/public/Login.vue'
import Registration from './components/public/Registration.vue'
import DriverDispatch from './components/user/DriverDispatch.vue'

import Order from './components/admin/Order.vue'
import UserProfiles from './components/admin/UserProfiles.vue'
import DriverProfiles from './components/admin/DriverProfiles.vue'
import TruckProfiles from './components/admin/TruckProfiles.vue'
import TrailerProfiles from './components/admin/TrailerProfiles.vue'
import ClientProfiles from './components/admin/ClientProfiles.vue'

vue.use(Router);

let router = new Router({
    mode: "history",
    routes: [
        // Public paths
        { path: '/', name: 'home', component: Login, meta: { guest: true }  },
        { path: '/login', name: 'login', component: Login, meta: { guest: true } },
        { path: '/registration', name: 'registration', component: Registration, meta: { guest: true } },

        // User paths
        { path: '/user/dispatch', name: 'dispatch', component: DriverDispatch, meta: { requiresAuth: true } },

        // Admin paths
        { path: '/admin/profile/user', name: 'userProfiles', component: UserProfiles, meta: { requiresAuth: true, is_admin: true } },
        { path: '/admin/profile/driver', name: 'driverProfiles', component: DriverProfiles, meta: { requiresAuth: true, is_admin: true } },
        { path: '/admin/profile/truck', name: 'truckProfiles', component: TruckProfiles, meta: { requiresAuth: true, is_admin: true } },
        { path: '/admin/profile/trailer', name: 'trailerProfiles', component: TrailerProfiles, meta: { requiresAuth: true, is_admin: true } },
        { path: '/admin/profile/client', name: 'clientProfiles', component: ClientProfiles, meta: { requiresAuth: true, is_admin: true } },
        { path: '/admin/order', name: 'order', component: Order, meta: { requiresAuth: true, is_admin: true } },
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