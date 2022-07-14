<template>
    
<div class="tooltip">
    {{tooltip}}
</div>

</template>



<script lang="ts">

export {};

interface Props{
    tooltip: string
}

const props = defineProps<Props>();


</script>



<style lang="scss" scoped>



.tooltip{
    position: absolute;

    --tooltip-top: 0;
    --tooltip-left: 0;

    top: var(--tooltip-top);
    left: var(--tooltip-left);

    background: var(--dark-6);
    color: var(--light);
    border: 1px solid var(--light-5);
    min-width: 32px;
    font-size: var(--font-size-5);
}

</style>