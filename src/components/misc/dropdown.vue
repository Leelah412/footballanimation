<template>
    
<div class="dropdown-vue">

    <!-- slot for unique kinds of items -->
    <div class="dropdown-vue-unique">
        <slot></slot>
    </div>

    <DropdownMenu :items="items" />


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
    position: absolute;     // for recursiveness and for showing dd at click position relative to viewport

}

.dropdown-vue-unique{

}

</style>