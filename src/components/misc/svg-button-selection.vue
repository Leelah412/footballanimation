<template>
    
<button :class="`svg-button-selection ${selection === SVG_SELECTION.DRAG ? 'svg-selection-drag' : ''}`" :style="`width: ${size}; height: ${size}`">
    
    <svg v-if="selection === SVG_SELECTION.ADD" :width="size" :height="size" viewBox="0 0 24 24" :fill="getFill()">
        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
    </svg>

    <svg v-else-if="selection === SVG_SELECTION.EDIT" :width="size" :height="size" viewBox="0 0 24 24" :fill="getFill()">
        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
    </svg>

    <svg v-else-if="selection === SVG_SELECTION.DELETE" :width="size" :height="size" viewBox="0 0 24 24" :fill="getFill()">
        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
    </svg>

    <svg v-else-if="selection === SVG_SELECTION.DRAG" :width="size" :height="size" viewBox="0 0 24 24" :fill="getFill()">
        <path d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
    </svg>

    <svg v-else-if="selection === SVG_SELECTION.MOREV" :width="size" :height="size" viewBox="0 0 24 24" :fill="getFill()">
        <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
    </svg>

    <svg v-else-if="selection === SVG_SELECTION.MOREH" :width="size" :height="size" viewBox="0 0 24 24" :fill="getFill()">
        <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
    </svg>

    <svg v-else-if="selection === SVG_SELECTION.INFO" :width="size" :height="size" viewBox="0 0 24 24" :fill="getFill()">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
    </svg>

    <svg v-else-if="selection === SVG_SELECTION.HELP" :width="size" :height="size" viewBox="0 0 24 24" :fill="getFill()">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
    </svg>
        
    <svg v-else-if="selection === SVG_SELECTION.LOGIN" xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" viewBox="0 0 24 24" :fill="getFill()">
        <path d="M11,7L9.6,8.4l2.6,2.6H2v2h10.2l-2.6,2.6L11,17l5-5L11,7z M20,19h-8v2h8c1.1,0,2-0.9,2-2V5c0-1.1-0.9-2-2-2h-8v2h8V19z"/>
    </svg>

    <svg v-else-if="selection === SVG_SELECTION.LOGOUT" xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" viewBox="0 0 24 24" :fill="getFill()">
        <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
    </svg>

    <svg v-else-if="selection === SVG_SELECTION.IMPORT" xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" viewBox="0 0 24 24" :fill="getFill()">
        <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
    </svg>

    <svg v-else-if="selection === SVG_SELECTION.EXPORT" xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" viewBox="0 0 24 24" :fill="getFill()">
        <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"/>
    </svg>

    <svg v-else-if="selection === SVG_SELECTION.SAVE" xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" viewBox="0 0 24 24" :fill="getFill()">
        <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/>
    </svg>

    <svg v-else-if="selection === SVG_SELECTION.LOAD" xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" viewBox="0 0 24 24" :fill="getFill()">
        <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>
    </svg>

    <svg v-else-if="selection === SVG_SELECTION.SETTINGS" xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" viewBox="0 0 24 24" :fill="getFill()">
        <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/>
    </svg>

    <svg v-else-if="selection === SVG_SELECTION.PROPERTIES" xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" viewBox="0 0 24 24" :fill="getFill()">
        <path d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z"/>
    </svg>

    <svg v-else-if="selection === SVG_SELECTION.SEARCH" xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" viewBox="0 0 24 24" :fill="getFill()">
        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
    </svg>

    <svg v-else-if="selection === SVG_SELECTION.LIKE" xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" viewBox="0 0 24 24" :fill="getFill()">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>

    <svg v-else-if="selection === SVG_SELECTION.LIKE_EMPTY" xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" viewBox="0 0 24 24" :fill="getFill()">
        <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"/>
    </svg>

    <svg v-else-if="selection === SVG_SELECTION.COPY" xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" viewBox="0 0 24 24" :fill="getFill()">
        <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
    </svg>

    <svg v-else-if="selection === SVG_SELECTION.EMAIL" xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" viewBox="0 0 24 24" :fill="getFill()">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
    </svg>

    <svg v-else-if="selection === SVG_SELECTION.USER" xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" viewBox="0 0 24 24" :fill="getFill()">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm0 14c-2.03 0-4.43-.82-6.14-2.88C7.55 15.8 9.68 15 12 15s4.45.8 6.14 2.12C16.43 19.18 14.03 20 12 20z"/>
    </svg>

    <svg v-else-if="selection === SVG_SELECTION.PASSWORD" xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" viewBox="0 0 24 24" :fill="getFill()">
        <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
    </svg>

    <svg v-else-if="selection === SVG_SELECTION.SEND" xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" viewBox="0 0 24 24" :fill="getFill()">
        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
    </svg>

    <svg v-else-if="selection === SVG_SELECTION.UNDO" xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" viewBox="0 0 24 24" :fill="getFill()">
        <path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z"/>
    </svg>
    
    <svg v-else-if="selection === SVG_SELECTION.REDO" xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" viewBox="0 0 24 24" :fill="getFill()">
        <path d="M18.4 10.6C16.55 8.99 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 16c1.05-3.19 4.05-5.5 7.6-5.5 1.95 0 3.73.72 5.12 1.88L13 16h9V7l-3.6 3.6z"/>
    </svg>
    
    <svg v-else-if="selection === SVG_SELECTION.CLOSE" xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" viewBox="0 0 24 24" :fill="getFill()">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
    </svg>

    <span v-if="text !== ''" :style="`font-size:${textSize}; margin-top:${textMargin}; color:${textColor}; font-weight:${textWeight}; letter-spacing:1px;`">{{text}}</span>

</button>

</template>


<script lang="ts" setup>
import { SVG_SELECTION } from '../helper/enums';

interface Props{
    selection: SVG_SELECTION
    size: number        // button is square, so no need to differentiate between "width" and "height"
    text: string
    textSize: string
    textMargin: string
    textColor: string
    textWeight: number
    fill?: string
}

const props = withDefaults(defineProps<Props>(), {
    size: 16,
    text: '',
    textSize: 'var(--font-size-5)',
    textMargin: '0',
    textColor: 'var(--light)',
    textWeight: 300
});

function getFill(){

    if(props.fill !== undefined) return props.fill;

    switch(props.selection){
        case SVG_SELECTION.ADD:{
            return 'var(--green)';
        }
        case SVG_SELECTION.DELETE:{
            return 'var(--red)';
        }
        default: {
            return 'var(--light-3)';
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