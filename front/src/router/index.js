import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth.js'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'login',
            component: () => import('@/views/HomeView.vue'),
        },
    ],
})

router.beforeEach((to, from, next) => {
    /* 로그인이 필요한 페이지 */
    if (to.matched.some(record => record.meta.requireAuth)) {
        const userStore = useAuthStore().user
        debugger
        // 로그인 했는지 확인
        if (userStore.isSignedin) {
            next()
        } else {
            /* 로그인 안되어 있을 때 */
            next({ name: 'login' })
        }
    } else {
        // login, register
        //   if (userStore.isLoggedIn) {
        //     if (to.name === 'auth' || to.name === 'register') {
        //       router.push({ name: 'main' })
        //     } else {
        //       next()
        //     }
        //   } else {
        //     next()
        //   }

        next()
    }
})

router.afterEach((to, from) => {})

export default router
