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

    server
        .post('/api/login', loginData, {})
        .then(data => {
            authStore.setUser(data)
        })
        .catch(data => {
            alert(data.response.data.failMessage)
        })
}
</script>

<template>
    <div class="login-form">
        <q-card class="login-card">
            <q-card-section>
                <div class="text-h6">Login</div>
            </q-card-section>

            <q-card-section>
                <q-form @submit="login">
                    <q-input v-model="id" filled label="닉네임" lazy-rules :rules="[val => !!val || '닉네임을 입력해주세요.']" />
                    <q-input
                        v-model="pwd"
                        filled
                        type="password"
                        label="비밀번호"
                        lazy-rules
                        :rules="[val => !!val || '비밀번호를 입력해주세요']"
                        @keyup.enter="login"
                    />
                    <q-btn type="submit" label="로그인" color="primary" class="full-width q-mt-md" />
                </q-form>
                <q-btn @click="regist" label="회원가입" color="primary" class="full-width q-mt-md" />
            </q-card-section>
        </q-card>
    </div>
</template>

<style scoped>
.login-card {
    width: 400px;
}

.login-form {
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    display: flex;
}
</style>
