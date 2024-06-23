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

const menus = ref([])

server.get('/api/menu/admin').then(data => {
    menus.value = data.data.menus
})
</script>

<template>
    <q-layout view="lHh Lpr lFf">
        <q-header elevated>
            <q-toolbar>
                <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer"></q-btn>
                <q-toolbar-title> My Profile </q-toolbar-title>
                <q-btn v-if="authStore.user.isSignedin" flat round dense icon="logout" @click="authStore.logout()" />
            </q-toolbar>
        </q-header>

        <q-drawer v-if="authStore.user.isSignedin" v-model="leftDrawerOpen" show-if-above side="left" bordered>
            <q-list>
                <router-view>
                    <q-item v-for="item in menus" :key="item.routePath" :to="item.routePath" clickable v-ripple>
                        <q-item-section>{{ item.menuName }}</q-item-section>
                    </q-item>
                </router-view>
            </q-list>
        </q-drawer>

        <q-page-container class="wapper">
            <RouterView class="router-view" />
        </q-page-container>

        <q-footer class="text-center">
            <q-toolbar>
                <q-toolbar-title> &copy; 2024 My Profile </q-toolbar-title>
            </q-toolbar>
        </q-footer>
    </q-layout>
</template>

<style scoped>
.wapper {
    height: 100vh;
}

.router-view {
    width: 80%;
    min-width: 1800px;
    margin: auto;
    padding-bottom: 60px;
}
</style>
