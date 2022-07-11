<template>
    
<div class="editor-property-menu" :id="`property-menu-${id}`">
    <div class="pm-header">{{header !== undefined ? header : ''}}</div>

    <div class="pm-content">
        <slot></slot>
    </div>
</div>

</template>


<script lang="ts" setup>
import { onMounted } from "@vue/runtime-core";


interface Props{
    id: number
    header?: string
    style?: string
}

const props = defineProps<Props>();

var setStyle = ()=>{
    
    if(props.style === undefined) return;
    
    var tb = document.getElementById(`property-menu-${props.id}`);
    if(tb === undefined || tb === null) return;
    
    tb.setAttribute('style', props.style); 
}

onMounted(setStyle);

</script>


<style lang="scss" scoped>

.editor-property-menu{
    box-sizing: border-box;

    display: flex;
    flex-direction: column;
    padding: 8px;
    /* border: 1px solid var(--dark); */
    /* border-radius: 2px; */
    background: var(--dark-3);
    /* box-shadow: 0 0 2px var(--dark); */
}


.pm-header{

}

.pm-content{

}

</style>