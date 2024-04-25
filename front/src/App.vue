<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { instance } from '@/api'

const mode = import.meta.env.MODE

async function test() {
    try {
        const res = await instance.get('/api/menu')
        console.log(res)
    } catch (error) {
        console.log(error)
    }
}

test()
</script>

<template>
    <RouterView />
</template>
