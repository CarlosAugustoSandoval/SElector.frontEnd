import Vue from 'vue'
import VueRouter from 'vue-router'
import goTo from 'vuetify/es5/services/goto'
import store from '@/store'

import settings from '@/modules/settings/router'
import auth from '@/modules/auth/router'
import persons from '@/modules/persons/router'
import users from '@/modules/users/router'
import roles from '@/modules/roles/router'
import error from '@/modules/error/router'

Vue.use(VueRouter)

const routes = [
    settings,
    auth,
    persons,
    users,
    roles,
    error
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior: (to, from, savedPosition) => {
        let scrollTo = 0
        if (to.hash) {
            scrollTo = to.hash
        } else if (savedPosition) {
            scrollTo = savedPosition.y
        }
        return goTo(scrollTo)
    },
    routes
})


// navigation guards before each
router.beforeEach(async (to, from, next) => {
    document.title = `SElector | ${to.meta.title}`
    if (to.matched.some(record => record.meta.requireAuth)) {
        if (!store.state.authModule.access_token) {
            next({ name: 'Login' })
        } else if (!to.meta.permission || (await store.getters['authModule/permissionByName'](to.meta.permission))) {
            next()
        } else {
            setTimeout(() => {
                store.commit('SET_SNACKBAR', {
                    color: 'warning',
                    message: `No tiene permisos para entrar en ${to.meta.title}.`
                })
            }, 200)
            next({ name: 'Home' })
        }
    } else {
        next()
    }
})

export default router
