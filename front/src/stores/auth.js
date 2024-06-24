import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { server } from '@/api/index.js'
import router from '@/router/index.js'
import { $alert } from '@/ui/notify.js'

const USER_DEFAULT_VALUE = {
    name: '',
    alias: '',
    auth: '',
    isSignedin: false,
    expireTime: 0,
}

export const useAuthStore = defineStore(
    'auth',
    () => {
        const user = ref({
            ...USER_DEFAULT_VALUE,
        })

        const isSignedin = computed(() => user.value.isSignedin)

        async function setUser(token) {
            let userInfo = token.data.userInfo

            user.value.name = userInfo.name
            user.value.alias = userInfo.alias
            user.value.auth = userInfo.authorities
            user.value.isSignedin = true
            user.value.expireTime = 6 * 60 * 60
        }

        //TODO: 차후 token expire reset시키는 기능 추가 예정
        async function expireTimeRefresh() {}

        async function sessionRefresh() {
            user.value.expireTime = 6 * 60 * 60
        }

        async function logout() {
            server
                .post('/api/logout', {})
                .then(data => {
                    if (data.data.result === 'success') {
                        deleteUser()
                        $alert('로그아웃 되었습니다.').then(() => {
                            router.push('/login')
                        })
                    }
                })
                .catch(data => {
                    $alert(data.response.data.message)
                })
        }

        async function deleteUser() {
            user.value = { ...USER_DEFAULT_VALUE }
        }

        return { user, isSignedin, setUser, sessionRefresh, deleteUser, logout, expireTimeRefresh }
    },
    {
        persist: true,
    },
)
