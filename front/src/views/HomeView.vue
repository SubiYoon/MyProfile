<script setup></script>

<template>
    <main class="text-red-500">
        <header>
            <button @click="test">api test</button>
            <div>
                <nav>
                    <RouterLink to="/">Home</RouterLink>
                    <RouterLink to="/login" class="text-black">login</RouterLink>
                </nav>
            </div>
        </header>
    </main>
</template>
