<template>
    <div
        class="letter__icon"
        :style="{
            backgroundColor: '#7373bf',
            color: 'white',
        }"
    >
        <span>{{ letter }}</span>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    letter: string;
}>();
</script>
