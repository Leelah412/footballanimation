<template>
    
<div class="editor-property-menu" :id="`property-menu-${id}`">
    <div class="property-menu-header" :id="`property-menu-header-${id}`">
        <span>{{header !== undefined ? header.toUpperCase() : ''}}</span>
        <svg-button-selection :selection="SVG_SELECTION.INFO" />
        <!-- <tooltip id="property-menu-header-tooltip" v-if="tooltipVisible && tooltip !== undefined" :tooltip="tooltip"/> -->
    </div>

    <div class="property-menu-content">
        <slot></slot>
    </div>
</div>

</template>


<script lang="ts" setup>
import { onMounted, ref } from "@vue/runtime-core";
import { SVG_SELECTION } from "@/components/util/enums";
import SvgButtonSelection from "@/components/misc/svg-button-selection.vue";
/* import Tooltip from "../misc/tooltip.vue"; */


interface Props{
    id: number
    header?: string
    style?: string
    tooltip?: string
}

const props = defineProps<Props>();

const tooltipVisible = ref<boolean>(false);

var setStyle = ()=>{
    
    if(props.style === undefined) return;
    
    var tb = document.getElementById(`property-menu-${props.id}`);
    if(tb === undefined || tb === null) return;
    
    tb.setAttribute('style', props.style); 
}

onMounted(setStyle);

// show tooltip at clicking position
/* function showTooltip(ev){
    if(tooltipVisible.value){
        tooltipVisible.value = false;
        return;
    }

    const header = document.getElementById(`property-menu-header-${props.id}`);

    if(header === undefined || header === null) return;
    
    tooltipVisible.value = true;

    var rect = header.getBoundingClientRect();
    var x = ev.clientX - rect.x;
    var y = ev.clientY - rect.y;
    
    const dom = document.getElementById('property-menu-header-tooltip');
    if(dom === undefined || dom === null) return;
    console.log('asdsssasd');

    dom.style.setProperty('--tooltip-left', `${x}px`);
    dom.style.setProperty('--tooltip-top', `${y}px`);
} */

</script>


<style lang="scss" scoped>

.editor-property-menu{
    box-sizing: border-box;

    display: flex;
    flex-direction: column;
    /* border: 1px solid var(--dark); */
    /* border-radius: 2px; */
    background: var(--dark-3);
    /* box-shadow: 0 0 2px var(--dark); */
}


.property-menu-header{
    position: relative;

    display: flex;
    flex-direction: row;
    align-items: center;
    .svg-button-selection{
        margin-left: 8px;
    }

    text-align: left;
    padding: 4px;
    padding-left: 8px;
    border-bottom: 1px solid var(--accent);
    margin-bottom: 2px;
    background: var(--dark-2);
    letter-spacing: 2px;
    font-size: 12px;
    color: var(--light-5);

    --tooltip-top: 0;
    --tooltip-left: 0;
    
}

.property-menu-content{
    padding: 8px;

}

.tooltip{    
    position: absolute;

    top: var(--tooltip-top);
    left: var(--tooltip-left);
}

</style>


<style lang="scss">

// NAVIGATION
.pm-nav{
    display: flex;
    flex-direction: row;
    background: var(--dark-2);
    border-radius: 4px;
    overflow: hidden;

    margin-bottom: 16px;

    .pm-nav-divider{
        margin-top: auto;
        margin-bottom: auto;
    }
}

.pm-nav-divider{
    width: 1px;
    height: var(--font-size-5);
    background: var(--dark-3);
}

.pm-nav-button{
    letter-spacing: 2px;
    font-weight: 300;
    font-size: var(--font-size-5);
    color: var(--light-3);
    padding: 8px;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: block;
    overflow: hidden;
    &:hover{
        background: var(--accent);
    }
}

.pm-nav-button-active{
    @extend .pm-nav-button;
    background: var(--accent);

}

// CONTENT
.pm-content{
    font-size: var(--font-size-4);
    font-weight: 300;
    margin-top: 8px;
    margin-bottom: 8px;
}

.pm-content-header{
    font-size: var(--font-size-5);
    letter-spacing: 1.2px;
    font-weight: 600;
}

.pm-content-divider-v{
    width: 1px;
    height: 100%;
    background: var(--dark-4);
}

.pm-content-divider-h{
    height: 1px;
    width: 100%;
    background: var(--dark-4);
    margin-top: 8px;
    margin-bottom: 8px;
}

.pm-list-wrapper{
    .pm-list{
        margin-top: 8px;
    }
}

.pm-list{
    display: flex;
    flex-direction: column;
    font-size: var(--font-size-5);
    overflow: hidden;
    border-radius: 4px;
    box-shadow: 0 0 4px var(--dark);
}

.pm-list-header{
    box-sizing: border-box;
    font-size: var(--font-size-4);
    font-weight: 600;
    background: var(--secondary);
    border-bottom: 2px solid var(--secondary-dark);
    padding: 4px 6px;
    text-align: left;
    width: 100%;
}

.pm-list-content{
    display: flex;
    flex-direction: column;
    min-height: 32px;
    border: 1px solid var(dark);
    border-radius: 4px;
    background: var(--dark-3);
}

.pm-list-item{
    display: flex;
    flex-direction: row;
    
    padding: 4px;
    &:nth-child(2n){
        background: var(--dark-4);
    }
}

.pm-list-item-col{
    border-left: 1px solid var(--dark-3);
    padding: 0 8px;

    &:first-child{
        border: none;
    }
}

.pm-footer{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    &,*{
        color: var(--light);
    }
    svg{
        width: 16px;
        height: 16px;
        fill: var(--accent-light);
    }

    button{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        margin-left: 8px;
        margin-right: 8px;
        padding: 4px 2px 4px 8px;
        border-radius: 4px;
        border: 1px solid var(--accent-light);
        /* background: var(--accent); */
        &,*{
            color: var(--accent-light);
            transition-duration: 0.2s;
        }
        font-size: var(--font-size-5);
        span{
            margin-right: 2px;
            letter-spacing: 2px;
        }

        &:hover{
            background: var(--accent-light);
            svg{
                fill: var(--light);
            }
            &,*{
                color: var(--light);
            }
        }
    }

}

</style>