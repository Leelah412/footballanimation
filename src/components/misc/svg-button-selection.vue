<template>
    
<button :class="`svg-button-selection ${selection === SVG_SELECTION.DRAG ? 'svg-selection-drag' : ''}`" :style="`width: ${size}; height: ${size}`">
    
    <svg v-if="selection === SVG_SELECTION.ADD" :width="`${size}`" :height="`${size}`" viewBox="0 0 24 24" :fill="_fill">
        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
    </svg>

    <svg v-else-if="selection === SVG_SELECTION.EDIT" :width="size" :height="size" viewBox="0 0 24 24" :fill="_fill">
        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
    </svg>

    <svg v-else-if="selection === SVG_SELECTION.DELETE" :width="size" :height="size" viewBox="0 0 24 24" :fill="_fill">
        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
    </svg>

    <svg v-else-if="selection === SVG_SELECTION.DRAG" :width="size" :height="size" viewBox="0 0 24 24" :fill="_fill">
        <path d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
    </svg>

    <svg v-else-if="selection === SVG_SELECTION.MOREV" :width="size" :height="size" viewBox="0 0 24 24" :fill="_fill">
        <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
    </svg>

    <svg v-else-if="selection === SVG_SELECTION.MOREH" :width="size" :height="size" viewBox="0 0 24 24" :fill="_fill">
        <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
    </svg>

    <svg v-else-if="selection === SVG_SELECTION.INFO" :width="size" :height="size" viewBox="0 0 24 24" :fill="_fill">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
    </svg>

    <svg v-else-if="selection === SVG_SELECTION.HELP" :width="size" :height="size" viewBox="0 0 24 24" :fill="_fill">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
    </svg>
    

</button>

</template>


<script lang="ts" setup>
import { SVG_SELECTION } from '../helper/enums';

console.log("asdasds");


interface Props{
    selection: SVG_SELECTION
    size: number        // button is square, so no need to differentiate between "width" and "height"
    fill?: string
}

const props = withDefaults(defineProps<Props>(), {
    size: '16px',
});

var _fill;

if(props.fill !== undefined){
    _fill = props.fill;    
}
else{
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