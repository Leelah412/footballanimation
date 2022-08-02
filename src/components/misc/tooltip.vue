<template>
    
<div class="tooltip" ref="tooltipRef">
    {{tooltip}}
</div>

</template>



<script lang="ts" setup>
import { ref } from "@vue/reactivity";


interface Props{
    tooltip: string
}

const props = defineProps<Props>();

const tooltipRef = ref(null);

// set the width of the tooltip based on the available width on the viewport
function setSize(){
    var vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    var vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

    const rect = tooltipRef.value.getBoundingClientRect();
}


</script>



<style lang="scss" scoped>



.tooltip{
    background: var(--dark-3);
    color: var(--light);
    border: 1px solid var(--light-6);
    box-shadow: 0 0 4px var(--dark);
    /* min-width: 32px; */
    font-size: var(--font-size-5);
    font-weight: 300;
    padding: 4px;
}

</style>