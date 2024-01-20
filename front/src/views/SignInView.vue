<script setup>
import { ref, reactive } from 'vue'
import { useAuthStore } from '@/stores/auth'

import Input from '@/components/Input.vue'

const inputs = reactive({
    username: '',
    password: '',
})

const messages = reactive({
    username: { type: '', value: '' },
    password: { type: '', value: '' },
    form: { type: '', value: '' },
})

const authStore = useAuthStore()

const validateInput = ({ label, event }) => {
    if (inputs[label] === '') {
        messages[label].type = 'error'
        messages[label].value = `${label} is required.`

        return false
    } else {
        messages[label].type = ''
        messages[label].value = ''

        return true
    }
}

const validateForm = () => {
    let pass = true

    for (const label in inputs) {
        if (pass) {
            pass = validateInput({
                label,
            })
        } else {
            validateInput({
                label,
            })
        }
    }

    return pass
}

async function submitHandler() {
    if (!validateForm()) return

    console.log('login')

    try {
        authStore.signIn({
            username: inputs.username,
            password: inputs.password,
        })

        // router
    } catch (error) {
        messages.form.type = 'error'
        messages.form.value = `${error.message}`
    }
}
</script>

<template>
    <main>
        <h2>로그인</h2>
        <form @submit.prevent="submitHandler">
            <Input
                id="username"
                label="username"
                type="text"
                autocomplete="username"
                :modelValue="inputs.username"
                :message="messages.username"
                @update:modelValue="(event) => (inputs.username = event.target.value)"
                @input-change="validateInput"
            />
            <Input
                id="password"
                label="password"
                type="password"
                autocomplete="current-password"
                :modelValue="inputs.password"
                :message="messages.password"
                @update:modelValue="(event) => (inputs.password = event.target.value)"
                @input-change="validateInput"
            />
            <!-- 서버로부터 받은 메시지 -->
            <div :class="messages.form.type">
                {{ messages.form.value }}
            </div>
            <div>
                <button>로그인</button>
            </div>
        </form>
    </main>
</template>
