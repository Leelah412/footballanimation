<template>

<!-- for simple dropdown menus, calling this component should be enough -->

<div class="dropdown-menu noselect" :id="`dropdown-menu-lvl-${level}`">

    <div v-for="(it, idx) in items" :key="`dropdown-idx-${idx}`" class="dropdown-item"
        @click="it.action" @mouseover="ev=>{}">

        <div v-if="it.icon !== undefined" class="dropdown-icon">
            <div v-if="it.iconAsImg === undefined && !it.iconAsImg" v-html="it.icon"></div>
            <!-- if above causes problems bzgl. definition of iconAsImg, uncomment this below -->
            <!-- <div v-else-if="!it.iconAsImg" v-html="it.icon"></div> -->
            <img v-else :src="'@/assets/' + it.icon" alt=""/>

        </div>

        <div class="dropdown-name">{{it.name}}</div>

        <!-- nested dropdown -->
        <div v-if="it.items !== undefined" class="dropdown-nested-indicator">
            <svg viewBox="0 0 24 24" fill="var(--light)">
                <path d="M10 17l5-5-5-5v10z"/>
                <path d="M0 24V0h24v24H0z" fill="none"/>
            </svg>
        </div>
    </div>

    <dropdown-menu v-if="openDropdownItem !== undefined && openDropdownItem.items !== undefined"
        :items="openDropdownItem.items" :level="level + 1"/>
</div>

</template>


<script lang="ts" setup>
import { ref } from "@vue/reactivity"


export interface DropdownItem{
    name: string
    action: Function        // all dropdown elements lead to an action, don't they?
    icon?: string           // svg or img path; should be (optimized for) 16x16
    iconAsImg?: boolean     // if true, show icon as img, if it exists

    items?: DropdownItem[]  // for nested dropdowns
}

interface Props{
    items: DropdownItem[]
    level: number           // the recursive level of the current dropdown menu 
}

// create a recursive dropdown menu
const props = withDefaults(defineProps<Props>(), {
    level: 0
})
// item holding the currently open dropdown menu
const openDropdownItem = ref<DropdownItem | undefined>();

// open dropdown menu of item with recursive dropdown items
function onHover(item: DropdownItem){
    if(item === undefined || item === null) return;
    // if hovered item has no dropdown items, do nothing
    if(item.items === undefined) return;
    if(!(item.items.length > 0)) return;


    openDropdownItem.value = item;

}

</script>


<style lang="scss" scoped>

.dropdown-menu{
    position: absolute;     // for recursiveness

    background: var(--dark-2);
    border: var(--light-5);
    box-shadow: 0 0 4px var(--dark);
}

.dropdown-item{
    display: flex;
    flex-direction: row;

    border-bottom: 1px solid var(--dark-3);
    &:last-child{
        border: none;
    }
    padding: 4px;

    &:hover{
        background: var(--dark-3);
    }
}

$dd-icon-size: 16px;
.dropdown-icon{
    width: $dd-icon-size;
    height: $dd-icon-size;
    *{
        width: 100%;
        height: 100%;
    }
}

.dropdown-name{
    font-size: var(--font-size-4);
    color: var(--light);
}

.dropdown-nested-indicator svg{
    width: $dd-icon-size;
    height: $dd-icon-size;
}

</style>