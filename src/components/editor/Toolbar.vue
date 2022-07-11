<template>
    
<!-- toolbar on the side -->
<div class="editor-toolbar" :id="`toolbar-${id}`">

    <div v-for="(el, idx) in elements" :key="`toolbar-element-${el.name}-${idx}`" class="toolbar-element"
        @click="ev => el.click(ev)">
        <img :src="el.avatarPath" />
    </div>

    <button :class="`toolbar-element${menuState === MENU_STATE.SETTINGS ? '-active' : ''}`" @click="ev => changeMenuState(MENU_STATE.SETTINGS)">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="var(--light)">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z"/>
        </svg>
    </button>

</div>

</template>


<script lang="ts" setup>
import { onMounted, ref } from "@vue/runtime-core";


interface ToolbarElement{
    name: string
    avatarPath: string
    tooltip?: string

    click: Function
    mousedown?: Function
    mouseup?: Function
    mousemove?: Function
    mouseleave?: Function
}

interface Props{
    id: number
    elements: ToolbarElement[]
    style?: string
}

enum MENU_STATE {NONE, SETTINGS};

const props = defineProps<Props>();
const emit = defineEmits(['settings']);

const menuState = ref<MENU_STATE>(MENU_STATE.NONE);

var setStyle = ()=>{
    
    if(props.style === undefined) return;
    
    var tb = document.getElementById(`toolbar-${props.id}`);
    if(tb === undefined || tb === null) return;
    
    tb.setAttribute('style', props.style); 
}

onMounted(setStyle);


// call the basic settings property menu
function changeMenuState(newState: MENU_STATE){
    var old = menuState.value;
    // check, if new state == current state
    // if yes, set property menu to NONE instead
    if(old === newState)    menuState.value = MENU_STATE.NONE; 
    else                    menuState.value = newState;
    // emit the old and new property menu state
    emit('settings', old, menuState.value);
}

</script>


<style lang="scss" scoped>

$img-width: 32px;
$img-height: $img-width;

.editor-toolbar{
    box-sizing: border-box;

    display: flex;
    flex-direction: column;
    padding: 8px;
    /* border: 1px solid var(--dark); */
    /* border-radius: 2px; */
    background: var(--dark-2);
    /* box-shadow: 0 0 2px var(--dark); */
}

.toolbar-element{
    padding: 8px;
    border-radius: 2px;
    svg{
        width: $img-width;
        height: $img-height;
    }
    &:hover{
        background: var(--dark-4);
    }
}

.toolbar-element-active{
    @extend .toolbar-element;
    background: var(--accent-dark);
    &:hover{
        background: var(--accent);
    }
}

</style>