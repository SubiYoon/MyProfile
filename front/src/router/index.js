import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/views/HomeView.vue')
        },
        {
            path: '/sign-in',
            name: 'signIn',
            component: () => import('@/views/SignInView.vue')
        },
        {
            path: '/admin',
            name: 'admin',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('@/views/SignInView.vue')
        }
    ]
})

router.beforeEach((to, from, next) => {
    /* 로그인이 필요한 페이지 */
    if (to.matched.some((record) => record.meta.requireAuth)) {
        // 로그인 했는지 확인
        //   if (userStore.isLoggedIn) {
        //     next()
        //   } else {
        //     /* 로그인 안되어 있을 때 */
        //     next({ name: 'auth' })
        //   }
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
