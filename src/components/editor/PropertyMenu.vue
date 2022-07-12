<template>
    
<div class="editor-property-menu" :id="`property-menu-${id}`">
    <div class="property-menu-header">{{header !== undefined ? header.toUpperCase() : ''}}</div>

    <div class="property-menu-content">
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
    /* border: 1px solid var(--dark); */
    /* border-radius: 2px; */
    background: var(--dark-3);
    /* box-shadow: 0 0 2px var(--dark); */
}


.property-menu-header{
    text-align: left;
    padding: 4px;
    padding-left: 8px;
    border-bottom: 1px solid var(--accent);
    margin-bottom: 2px;
    background: var(--dark-2);
    letter-spacing: 2px;
    font-size: 12px;
    color: var(--light-5);
    
}

.property-menu-content{
    padding: 8px;

}

</style>


<style lang="scss">

.pm-nav{
    display: flex;
    flex-direction: row;
    background: var(--dark-2);
    border-radius: 4px;
    overflow: hidden;

    margin-bottom: 8px;     // padding 8px, therefore margin to the content below should be 8px too

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
    &:hover{
        background: var(--accent);
    }
}

.pm-nav-button-active{
    @extend .pm-nav-button;
    background: var(--accent);

}

.pm-content{
    font-size: var(--font-size-4);
    font-weight: 300;
}

.pm-content-header{
    font-size: var(--font-size-5);
    letter-spacing: 1.2px;
    font-weight: 600;
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
}

.pm-list-header{
    box-sizing: border-box;
    font-size: var(--font-size-4);
    font-weight: 600;
    background: var(--dark-2);
    padding: 4px 6px;
    text-align: left;
    width: 100%;
}

.pm-list-content{
    display: flex;
    flex-direction: column;
    height: 32px;
    border: 1px solid var(dark);
    background: var(--dark-4);
}

.pm-list-item{

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