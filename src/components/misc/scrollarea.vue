<template>
    
<div :class="`scrollarea ${!showScrollbarV ? 'hide-vbar' : ''} ${!showScrollbarH ? 'hide-hbar' : ''}`" :style="`width:${width}; height:${height};`">
    
    <div class="scrollarea-content" @scroll="onScroll" ref="content">
        <slot></slot>
    </div>

    <div v-show="showScrollbarV" class="scrollbar-area-v">
        <div class="scrollbar-v" ref="scrollbarV" @mousedown="onVbarMousedown"></div>
    </div>
    
    <div v-show="showScrollbarH" class="scrollbar-area-h">
        <!-- <div class="scrollbar-h" ref="scrollbarH" @mousedown="onHbarMousedown"></div>     -->    
    </div>

</div>

</template>


<script lang="ts" setup>
import { ref } from "@vue/reactivity";
import { onMounted, onUnmounted } from "@vue/runtime-core";


interface Props{
    width: string
    height: string
}

const props = defineProps<Props>();

const content = ref(null);
const scrollbarV = ref(null);
const scrollbarH = ref(null);

const showScrollbarV = ref<boolean>(false);
const showScrollbarH = ref<boolean>(false);

var resizeObserver: ResizeObserver;
onMounted(()=>{
    window.addEventListener('resize', resize);
    if(content.value === null) return;
    resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(content.value);

    resize();
})

function resize(){
    if(content.value === null) return;

    // check, if showing the scrollbar is necessary at all
    const visualHeight = content.value.getBoundingClientRect().height;      // height of visible part 
    const scrollHeight = content.value.scrollHeight;                        // total height of all contents
    const diff = scrollHeight - visualHeight;
    //console.log(diff);
    //console.log('scrollarea vh: ', visualHeight);
    //console.log('scrollarea sh: ', scrollHeight);
    
    if(!(diff > 1)){
        showScrollbarV.value = false;
        return;
    }

    showScrollbarV.value = true;

    if(scrollbarV.value === null) return;
    const svh = visualHeight * (1 - (diff / scrollHeight));
    console.log('svh: ', svh);
    
    //
    scrollbarV.value.style.setProperty('height', `${svh}px`);
    
}


onUnmounted(()=>{
    window.removeEventListener('resize', resize);
    if(content.value === null) return;
    resizeObserver.unobserve(content.value);
    resizeObserver.disconnect();
})

function onScroll(ev){
    if(scrollbarV.value === null) return;
    if(content.value === null) return;

    scrollbarV.value.style.setProperty('transform', `translateY(${content.value.scrollTop}px)`);
}

var scrolling: boolean = false;
var start: number = 0;
var prev: number = 0;

function onVbarMousedown(ev){
    start = ev.clientY;
    window.addEventListener('mousemove', onVbarMousemove);
    window.addEventListener('mouseup', onVbarMouseup);
}

function onVbarMousemove(ev){
    if(content.value === null) return;
    if(scrollbarV.value === null) return;

    var m_y = ev.clientY;
    if(!scrolling){
        if(Math.abs(m_y - start) < 2) return;
        prev = start;
        scrolling = true;
    }

    const delta = m_y - prev;
    prev = m_y;

    if(content.value.scrollTop + delta < 0)
        content.value.scrollTop = 0;
    else
        content.value.scrollTop += delta;

    scrollbarV.value.style.setProperty('transform', `translateY(${content.value.scrollTop}px)`);

}


function onVbarMouseup(ev){
    scrolling = false;

    window.removeEventListener('mousemove', onVbarMousemove);
    window.removeEventListener('mouseup', onVbarMouseup);

}

</script>



<style lang="scss" scoped>

.scrollarea{

    --vbar-height: 16px;
    --hbar-width: 16px;

    display: grid;
    grid-template-areas:
        'content vbar'
        'hbar null';

    grid-template-rows: auto 8px;
    grid-template-columns: auto 8px;

    &.hide-vbar{
        grid-template-columns: auto 0px;
    }
    &.hide-hbar{
        grid-template-rows: auto 0px;
    }

    .scrollarea-content{
        grid-area: content;
        overflow: scroll;

        /* Hide scrollbar for Chrome, Safari and Opera */
        &::-webkit-scrollbar {
            display: none;
        }
        /* Hide scrollbar for IE, Edge and Firefox */
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
    }

    .scrollbar-area-v{
        grid-area: vbar;

        background: var(--dark-4);
        opacity: 0.5;
        width: 8px;
        height: 100%;
    }
    .scrollbar-area-h{
        grid-area: hbar;

        background: var(--dark-4);
        opacity: 0.5;
        width: 100%;
        height: 8px;
    }

    .scrollbar-v, .scrollbar-h{
        background: var(--light-4);
        border-radius: 4px;
        &:hover{
            background: var(--light-2);
        }
    }

    .scrollbar-v{
        width: 8px;
        height: var(--vbar-height);
    }

    .scrollbar-h{
        width: var(--hbar-width);
        height: 8px;
    }

}


</style>