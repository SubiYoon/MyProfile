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
        // 이동하려는 페이지가 router 목록에 존재하는 경우
        if (router.getRoutes()[i].path === to.path || to.path === '/') {
            // 로그인 인증이 필요한 url
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
                    // 로그인 안되어 있을 때
                    alert('로그인이 필요합니다.')
                    router.push('/login')
                    return
                }
                // 로그인 인증이 필요없는 url
            } else {
                // 로그인한 사용자가 login 화면에 진입하려고 하는 경우 profile 화면으로 리다이렉트
                if (userStore.isSignedin && to.path === '/login') {
                    router.push('/profile')
                    return
                }
                // /페이지에 접근시 로그인 유무에 따른 리다이렉트
                if (to.path === '/') {
                    isLoginCheck(userStore)
                    return
                }
                // 정상 동작
                next()
                return
            }
            // 이동하려는 페이지가 router 목록에 존재하지 않는 경우
        } else if (router.getRoutes()[i].path !== to.path && i === router.getRoutes().length - 1) {
            alert('잘못된 접근입니다.')
            isLoginCheck(userStore)
        }
    }
})
router.afterEach((to, from) => {})

export default router
