<template>
    
<div id="editor-statusbar">

</div>

</template>


<script lang="ts" setup>

interface Props{

}

const props = defineProps<Props>();

</script>


<style lang="scss" scoped>

#editor-statusbar{
    display: flex;
    flex-direction: row;
    flex-grow: 100;
    background: var(--dark);
    height: var(--statusbar-height);
}

</style>