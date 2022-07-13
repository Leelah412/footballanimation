<template>
    
<div class="dropdown-vue">

    <DropdownMenu :items="items" />

    <!-- slot for unique kinds of dropdown items -->
    <slot></slot>

</div>

</template>


<script lang="ts" setup>
import DropdownMenu, { DropdownItem } from './dropdown-menu.vue';

interface Props{
    items: DropdownItem[]
}

const props = defineProps<Props>();


</script>


<style lang="scss" scoped>

.dropdown-vue{
    position: relative;     // for recursiveness and for showing dd at click position relative to viewport

}


</style>