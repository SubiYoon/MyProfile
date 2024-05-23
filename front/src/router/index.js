import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth.js'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/Login.vue'),
        },
        {
            path: '/profile',
            name: 'profile',
            meta: { requireAuth: true },
            component: () => import('@/views/profile/Profile.vue'),
        },
    ],
})

function isLoginCheck(user) {
    if (user.isSignedin) {
        router.push('/profile')
    } else {
        router.push('/login')
    }
}

router.beforeEach((to, from, next) => {
    const userStore = useAuthStore().user
    for (let i = 0; i < router.getRoutes().length; i++) {
        if (router.getRoutes()[i].path === to.path || to.path === '/') {
            if (to.matched.some(record => record.meta.requireAuth)) {
                // 로그인 했는지 확인
                if (userStore.isSignedin) {
                    if (to.path === '/') {
                        router.push('/profile')
                        return
                    }
                    next()
                    return
                } else {
                    /* 로그인 안되어 있을 때 */
                    alert('로그인이 필요합니다.')
                    next({ name: 'login' })
                    return
                }
            } else {
                if (userStore.isSignedin && to.path === '/login') {
                    router.push('/profile')
                    return
                }
                if (to.path === '/') {
                    isLoginCheck(userStore)
                    return
                }
                next()
                return
            }
        }
    }
    alert('잘못된 접근입니다.')
    isLoginCheck(userStore)
})
router.afterEach((to, from) => {})

export default router
