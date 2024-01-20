import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { instance } from '@/api'

const USER_DEFAULT_VALUE = {
    name: '',
    birth: '',
    sex: '',
    addr: '',
    addrDetail: '',
    simpleIntro: '',
    detailIntro: '',
    profileImage: '',
    createdAt: '',
    updatedAt: '',
    isSignedin: false
}

export const useAuthStore = defineStore('auth', () => {
    const user = ref({
        ...USER_DEFAULT_VALUE
    })

    const isSignedin = computed(() => user.value.isSignedin)

    async function signIn() {}

    async function updateUser() {}

    async function signOut() {}

    return { user, isSignedin, signIn, signOut, updateUser }
})
