<template>
    
<button :class="`svg-button-selection ${selection === SVG_SELECTION.DRAG ? 'svg-selection-drag' : ''}`" :style="`width: ${size}; height: ${size}`">
    
    <svg v-if="selection === SVG_SELECTION.ADD" :width="size" :height="size" viewBox="0 0 24 24" :fill="_fill">
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
        
    <svg v-else-if="selection === SVG_SELECTION.LOGIN" xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" viewBox="0 0 24 24" :fill="_fill">
        <path d="M11,7L9.6,8.4l2.6,2.6H2v2h10.2l-2.6,2.6L11,17l5-5L11,7z M20,19h-8v2h8c1.1,0,2-0.9,2-2V5c0-1.1-0.9-2-2-2h-8v2h8V19z"/>
    </svg>

    <svg v-else-if="selection === SVG_SELECTION.LOGOUT" xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" viewBox="0 0 24 24" :fill="_fill">
        <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
    </svg>

    <svg v-else-if="selection === SVG_SELECTION.IMPORT" xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" viewBox="0 0 24 24" :fill="_fill">
        <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"/>
    </svg>

    <svg v-else-if="selection === SVG_SELECTION.EXPORT" xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" viewBox="0 0 24 24" :fill="_fill">
        <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
    </svg>

    <svg v-else-if="selection === SVG_SELECTION.SAVE" xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" viewBox="0 0 24 24" :fill="_fill">
        <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/>
    </svg>

    <svg v-else-if="selection === SVG_SELECTION.LOAD" xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" viewBox="0 0 24 24" :fill="_fill">
        <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>
    </svg>

    <svg v-else-if="selection === SVG_SELECTION.SETTINGS" xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" viewBox="0 0 24 24" :fill="_fill">
        <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/>
    </svg>

    <svg v-else-if="selection === SVG_SELECTION.PROPERTIES" xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" viewBox="0 0 24 24" :fill="_fill">
        <path d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z"/>
    </svg>

    <svg v-else-if="selection === SVG_SELECTION.SEARCH" xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" viewBox="0 0 24 24" :fill="_fill">
        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
    </svg>

    <span v-if="text !== ''" :style="`font-size:${textSize}; color:var(--light); font-weight:300; letter-spacing:1px;`">{{text}}</span>

</button>

</template>


<script lang="ts" setup>
import { SVG_SELECTION } from '../helper/enums';

interface Props{
    selection: SVG_SELECTION
    size: number        // button is square, so no need to differentiate between "width" and "height"
    text: string
    textSize: string
    fill?: string
}

const props = withDefaults(defineProps<Props>(), {
    size: 16,
    text: '',
    textSize: 'var(--font-size-6)'
});

var _fill: string;

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
    flex-direction: column;
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