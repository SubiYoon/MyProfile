<script setup>
import { RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/auth.js'
import { ref } from 'vue'
import { server } from '@/api/index.js'

const authStore = useAuthStore()

const leftDrawerOpen = ref(false)
function toggleLeftDrawer() {
    leftDrawerOpen.value = !leftDrawerOpen.value
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
</script>

<template>
    <q-layout view="lHh Lpr lFf">
        <q-header elevated>
            <q-toolbar>
                <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer"></q-btn>
                <q-toolbar-title> My Website </q-toolbar-title>
                <q-btn v-if="authStore.user.isSignedin" icon="logout" @click="logout" />
            </q-toolbar>
        </q-header>

        <q-drawer v-model="leftDrawerOpen" show-if-above side="left" bordered>
            <q-list>
                <q-item clickable v-ripple tag="router-link" to="/">
                    <q-item-section>Home</q-item-section>
                </q-item>
                <q-item clickable v-ripple tag="router-link" to="/about">
                    <q-item-section>About</q-item-section>
                </q-item>
                <q-item clickable v-ripple tag="router-link" to="/contact">
                    <q-item-section>Contact</q-item-section>
                </q-item>
                <q-item clickable v-ripple tag="router-link" to="/login">
                    <q-item-section>Login</q-item-section>
                </q-item>
            </q-list>
        </q-drawer>

        <q-page-container>
            <RouterView />
        </q-page-container>

        <q-footer class="text-center">
            <q-toolbar>
                <q-toolbar-title> &copy; 2024 My Website </q-toolbar-title>
            </q-toolbar>
        </q-footer>
    </q-layout>
</template>
