<script setup>
import { ref } from 'vue'
import { server } from '@/api/index.js'
import { useAuthStore } from '@/stores/auth.js'

const id = ref('')
const pwd = ref('')
const authStore = useAuthStore()
function login() {
    let loginData = {
        name: id.value,
        password: pwd.value,
    }

    if (loginData.name === null || loginData.name === undefined || loginData.name === '') {
        alert('닉네임을 입력해주세요.')
        return
    } else if (loginData.password === null || loginData.password === undefined || loginData.password === '') {
        alert('비밀번호를 입력해주세요.')
        return
    }

    server
        .post('/api/login', loginData, {})
        .then(data => {
            authStore.setUser(data)
        })
        .catch(data => {
            alert(data.response.data.failMessage)
        })
}

function logout() {
    server
        .post('/api/logout', {})
        .then(data => {
            if (data.data.result === 'success') {
                authStore.deleteUser()
                alert('로그아웃 되었습니다.')
            }
        })
        .catch(data => {
            alert(data.response.data.message)
        })
}

function test() {
    server
        .post('/api/name/ABCD')
        .then(data => {
            console.log(data)
            alert(data)
        })
        .catch(data => {
            console.log(data)
            alert(data.response.data.message)
        })
}
</script>

<template>
    <label>닉네임</label> <input v-model="id" /> <label>비밀번호</label> <input type="password" v-model="pwd" @keyup.enter="login" />
    <button @click="login">로그인</button>
    <button @click="logout">로그아웃</button>
    <button @click="test">testest</button>
    <q-input label="test"></q-input>
</template>
