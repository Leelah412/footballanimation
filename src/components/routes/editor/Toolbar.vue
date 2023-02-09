<template>
    
<!-- toolbar on the side -->
<div class="editor-toolbar" :id="`toolbar-${id}`">

    <button v-for="el in elements" :key="`toolbar-element-${el.id}`" :class="`toolbar-element${menuState === el.id ? '-active' : ''}`"
        @click="ev => changeMenuState(el.id)">
        <svg v-html="el.avatar"></svg>
    </button>
    
</div>

</template>


<script lang="ts" setup>
import { onMounted, ref } from "@vue/runtime-core";
import { PropertyMenuListItem } from "@/components/model/PropertyMenuList";

interface Props{
    id: number
    elements: PropertyMenuListItem[]
    style?: string
}

const props = defineProps<Props>();
const emit = defineEmits(['menuStateChanged']);

const menuState = ref<string>('');


var setStyle = ()=>{
    
    if(props.style === undefined) return;
    
    var tb = document.getElementById(`toolbar-${props.id}`);
    if(tb === undefined || tb === null) return;
    
    tb.setAttribute('style', props.style); 
}

onMounted(setStyle);


// call the basic settings property menu
function changeMenuState(newState: string){
    var old = menuState.value;
    // check, if new state == current state
    // if yes, set property menu to NONE instead
    if(old === newState)    menuState.value = ''; 
    else                    menuState.value = newState;
    // emit the old and new property menu state
    emit('menuStateChanged', old, menuState.value);
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
    border-left: 1px solid var(--accent-dark);
    /* box-shadow: 0 0 2px var(--dark); */
}

.toolbar-element{
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 8px;
    margin-bottom: 8px;
    border-radius: 4px;
    background: var(--dark-3);
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