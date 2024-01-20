<template>
    <div :class="classes">
        <label :for="id">{{ label }}</label>
        <input
            :id="id"
            :type="type"
            :value="modelValue"
            @input="(event) => emits('update:modelValue', event)"
            @change="(event) => emits('inputChange', { label, event })"
            :autocomplete="autocomplete"
        />
        <p v-if="message">{{ message.value }}</p>
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps([
    'id',
    'label',
    'type',
    'modelValue',
    'validateInput',
    'autocomplete',
    'message'
])

const classes = computed(() => {
    if (!props.message) return ''
    return props.message.type
})

const emits = defineEmits(['update:modelValue', 'inputChange'])
</script>
