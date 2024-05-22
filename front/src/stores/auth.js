import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

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

        async function deleteUser() {
            user.value = { ...USER_DEFAULT_VALUE }
        }

        return { user, isSignedin, setUser, deleteUser, expireTimeRefresh }
    },
    {
        persist: true,
    },
)
