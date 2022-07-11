<template>

<div class="timeline">
    <svg class="svg-timeline" :width="width" :height="height" :viewBox="`0 0 ${width * zoom} ${height * zoom}`">
        <rect :width="width" :height="height" />
        <path v-for="i in 4" :key="i" :d="`M0,${(i+1) * (height/4)} l${width},0`" strokeWidth="1" strokeColor="#3339"/>
        <path :d="`M0,0 l${width},0`" strokeWidth="4" strokeColor="#333" />
    </svg>
</div>

</template>

<script lang="ts" setup>
import Timeline from '../model/Timeline';


const props = defineProps({
    timeline: {
        type: Timeline,
        default: () => new Timeline()
    },
    width: {
        type: Number,
        default: 540
    },
    height: {
        type: Number,
        default: 160
    },
    zoom: {
        type: Number,
        default: 1
    },
    start: {
        type: Number,
        default: 0
    },
    end: {
        type: Number,
        default: 120
    }
})

</script>

<style lang="scss" scoped>

</style>