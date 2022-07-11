<template>

<g class="noselect" :id="`line-${line.id}`" :transform="`translate(${ln.position.x}, ${ln.position.y})`">
    <circle v-if="asTool" :cx="line.start.x" :cy="line.start.y" r="1" stroke="#fff" stroke-width="1" fill="none"/>
    <path stroke="#fff" stroke-width="1" :d="`M${line.start.x},${line.start.y} L${line.end.x},${line.end.y}`" />
    <circle :cx="line.end.x" :cy="line.end.y" r="1" stroke="#fff" stroke-width="0.2" fill="none"/>
</g>

</template>

<script lang="ts" setup>
import { ref } from "@vue/reactivity";
import Line from "../../model/CanvasObject/Line";

const props = defineProps({
    line: {
        type: Line,
        required: true
    },
    asTool: {
        type: Boolean,
        default: false
    }
})

const ln = ref<Line>(props.line);

function onmousedown(){

}

function onmouseup(){

}

function onmousemove(){
    
}


</script>


<style lang="scss" scoped>

</style>