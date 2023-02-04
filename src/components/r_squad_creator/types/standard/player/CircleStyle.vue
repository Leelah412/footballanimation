<template>

    <!-- STYLE 0 -->
    
    <g v-if="store.state.squadCreatorStore.settings.circleStyle === 0" class="sc-circle-style">
        <circle :class="`player-circle${selected ? '-active' : ''}`" @mousedown="onMouseDown" cx="0" cy="0" r="2"
            :fill="store.state.squadCreatorStore.settings.teamColors[0]" :stroke="store.state.squadCreatorStore.settings.teamColors[1]" :stroke-width="1" />
    </g>
    
    <!-- STYLE 1 -->
    <g v-else-if="store.state.squadCreatorStore.settings.circleStyle === 1" class="sc-circle-style">
        <circle :class="`player-circle${selected ? '-active' : ''}`" @mousedown="onMouseDown" cx="0" cy="0" r="2"
            :fill="store.state.squadCreatorStore.settings.teamColors[1]" :stroke="store.state.squadCreatorStore.settings.teamColors[0]" :stroke-width="1" />
    </g>

</template>


<script lang="ts" setup>
import store from "@/store";


interface Props{
    
}

const props = withDefaults(defineProps<Props>(), {
    
})


</script>


<style lang="scss" scoped>



</style>