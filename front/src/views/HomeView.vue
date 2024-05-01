<script setup>
import { ref } from 'vue'
import { server } from '@/api/index.js'

const id = ref('')
const pwd = ref('')
const resultName = ref('')
function login() {
    let loginData = {
        name: id.value,
        password: pwd.value,
    }

    server
        .post('/api/admin/login', loginData, {})
        .then(data => {
            resultName.value = data.data.name
        })
        .catch(data => {
            alert(data.response.data)
        })
}

function logout() {
    server.post('/api/admin/logout').then(data => {
        alert(data)
    })
}
</script>

<template>
    <label>닉네임</label><input v-model="id" /> <label>비밀번호</label
    ><input type="password" v-model="pwd" @keyup.enter="login" />
    <button @click="login">로그인</button>
    <button @click="logout">로그아웃</button>
</template>
