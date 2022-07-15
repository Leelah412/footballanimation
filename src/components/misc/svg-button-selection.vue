<template>
    
<button :class="`svg-button-selection ${selection === SVG_SELECTION.DRAG ? 'svg-selection-drag' : ''}`" :style="`width: ${size}; height: ${size}`">
    
    <svg v-if="selection === SVG_SELECTION.ADD" :width="`${size}px`" :height="`${size}px`" viewBox="0 0 24 24" :fill="_fill">
        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
    </svg>

    <svg v-if="selection === SVG_SELECTION.EDIT" :width="`${size}px`" :height="`${size}px`" viewBox="0 0 24 24" :fill="_fill">
        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
    </svg>

    <svg v-if="selection === SVG_SELECTION.DELETE" :width="`${size}px`" :height="`${size}px`" viewBox="0 0 24 24" :fill="_fill">
        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
    </svg>

    <svg v-if="selection === SVG_SELECTION.DRAG" :width="`${size}px`" :height="`${size}px`" viewBox="0 0 24 24" :fill="_fill">
        <path d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
    </svg>

    <svg v-if="selection === SVG_SELECTION.MOREV" :width="`${size}px`" :height="`${size}px`" viewBox="0 0 24 24" :fill="_fill">
        <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
    </svg>

    <svg v-if="selection === SVG_SELECTION.MOREH" :width="`${size}px`" :height="`${size}px`" viewBox="0 0 24 24" :fill="_fill">
        <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
    </svg>
    

</button>

</template>


<script lang="ts" setup>
import { SVG_SELECTION } from '../helper/enums';

console.log("asdasds");


interface Props{
    selection: SVG_SELECTION
    size: number        // button is square, so no need to differentiate between "width" and "height"
    fill: string
}

const props = withDefaults(defineProps<Props>(), {
    size: '32px',
    fill: 'none',
});

var _fill = props.fill;
switch(props.selection){
    case SVG_SELECTION.ADD:{
        _fill = 'var(--green)';
        break;
    }
    case SVG_SELECTION.DELETE:{
        _fill = 'var(--red)';
        break;
    }
    default: {        
        _fill = 'var(--light-3)';
    }
}

</script>



<style lang="scss" scoped>

.svg-button-selection{
    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 4px;
    &:hover{
        /* background: var(--light); */
        filter: brightness(0.8);
    }
}

.svg-selection-drag{
    cursor: grab;
    &:active{
        cursor: grabbing;
    }
}

</style>