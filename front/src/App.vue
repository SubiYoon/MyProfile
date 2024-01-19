<script setup>
import { RouterLink, RouterView } from 'vue-router'
import axios from 'axios'

const mode = import.meta.env.MODE

async function test() {
    try {
        const res = await axios.get('/api/main')
        console.log(res)
    } catch (error) {
        console.log(error)
    }
}
</script>

<template>
    <header>
        <button @click="test">api test</button>
        <div>
            <nav>
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/sign-in">sign-in</RouterLink>
            </nav>
        </div>
    </header>

    <RouterView />
</template>
