<script setup></script>

<template>
    <main class="text-red-500">
        <header>
            <button @click="test">api test</button>
            <div>
                <nav>
                    <RouterLink to="/">Home</RouterLink>
                    <RouterLink to="/sign-in" class="text-black">sign-in</RouterLink>
                </nav>
            </div>
        </header>
    </main>
</template>
