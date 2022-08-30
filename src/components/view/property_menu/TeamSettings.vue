<template>
    
<div id="property-menu-team-settings">
    <div class="pm-nav">
        <button :class="`pm-nav-button${tabState === TAB_STATE.HOME ? '-active' : ''}`"
            @click="()=>changeTabState(TAB_STATE.HOME)">
            HOME
        </button>

        <div class="pm-nav-divider"></div>

        <button :class="`pm-nav-button${tabState === TAB_STATE.AWAY ? '-active' : ''}`"
            @click="()=>changeTabState(TAB_STATE.AWAY)">
            AWAY
        </button>
    </div>

    <div class="pm-content">
        
        <div class="flex-row">
            <div class="flex-column" style="box-sizing: border-box; width: 75%; padding-right: 8px;">
                <div class="pm-content-header">TEAM NAME</div>
                <input type="text" class="input-dark" v-model.lazy="currentTeam.name" >
            </div>
            <div class="flex-column" style="width: 25%">
                <div class="pm-content-header">SHORT</div>
                <input type="text" class="input-dark" v-model.lazy="currentTeam.short">
            </div>
        </div>
    </div>

    <div class="pm-content-divider-h"></div>

    <div class="pm-content">
        <div class="flex-row">
            <div class="flex-column">
                <div id="pm-team-logo">
                    <img v-if="currentTeam.logoPath !== ''"  src="" alt="">
                    <div v-else >
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" width="24px" viewBox="0 0 24 24" fill="#000000">
                            <path d="M0 0h24v24H0z" fill="none"/>
                            <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"/>
                        </svg>
                        LOGO
                    </div>
                </div>
            </div>
            <div class="flex-column" style="margin: 0 auto;">
                <div class="flex-column" style="margin-bottom: 8px;">
                    <div class="pm-content-header">TEAM COLORS</div>
                    <div class="flex-row">
                        <input v-for="(col, idx) in currentTeam.colorPalette" :key="`team-color-${idx}`" type="color" class="pm-input-color" v-model="currentTeam.colorPalette[idx]" />
                    </div>
                </div>
                <div class="flex-column" style="margin-bottom: 8px;">
                    <div class="pm-content-header">PLAYER NAME</div>
                    <input type="color" class="pm-input-color" v-model="currentTeam.colorPlayerName" />
                </div>
                <div class="flex-column" style="margin-bottom: 8px;">
                    <div class="pm-content-header">PLAYER NR</div>
                    <input type="color" class="pm-input-color" v-model="currentTeam.colorPlayerNumber" />
                </div>
            </div>
        </div>
    </div>

    <div class="pm-content-divider-h"></div>

    <div class="pm-content flex-row">
        <div class="flex-column" style="width: 50%; padding-right: 8px; border-right: 1px solid var(--dark-4);">            
            <div class="pm-content-header" style="text-align:center">PLAYER JERSEY</div>
            <div style="padding: 8px">
                <Jersey :jersey="visualizationJersey" :is-visual="true" :width="84" :height="84"/>
            </div>
            <button class="btn-secondary">CHANGE</button>
        </div>

        <div class="flex-column" style="width: 50%; padding-left: 8px;">            
            <div class="pm-content-header" style="text-align:center">KEEPER JERSEY</div>
            <div style="padding: 8px">
                <Jersey :jersey="visualizationJersey" :is-visual="true" :width="84" :height="84"/>
            </div>
            <button class="btn-secondary" >CHANGE</button>
        </div>
    </div>

    <div class="pm-content-divider-h"></div>

    <div class="pm-content">
        <div>
            
        </div>
    </div>

</div>

</template>


<script lang="ts" setup>
import Team from "@/components/model/Team";
import { ref } from "@vue/reactivity";
import Jersey from "../Jersey.vue";
import {visualizationJersey} from '@/components/model/Jersey';
import store from "@/store/index";
import { Committer } from "@/store/modules/editor_committer";


interface Props{
    
}

const props = defineProps<Props>();
const emit = defineEmits(['uploadLogo']);

enum TAB_STATE {HOME, AWAY};
const tabState = ref<TAB_STATE>(TAB_STATE.HOME);
const currentTeam = ref<Team>(store.state.editorStore.home);

function changeTabState(newState: TAB_STATE){
    tabState.value = newState;
    currentTeam.value = tabState.value === TAB_STATE.HOME ? store.state.editorStore.home : store.state.editorStore.away;
}

function uploadLogo(){
    emit('uploadLogo');
}

// change the color in the given idx with the given color string
function changeScheme(color: string, idx: number){
    if( !Number.isInteger(idx) || idx < 0 || !(idx < currentTeam.value.colorPalette.length)) return;

    currentTeam.value.colorPalette[idx] = color;
}

</script>


<style lang="scss" scoped>

#property-menu-team-settings{
    display: flex;
    flex-direction: column;

    .pm-footer{
        margin-top: 32px;
    }
}



.pm-content-header{
    text-align: left;
    margin-bottom: 4px;
}


$pm-nav-button-amount: 2;
.pm-nav-button{
    width: calc(100% / $pm-nav-button-amount);
}

.pm-nav-button-active{
    @extend .pm-nav-button;
}

$logo-size: 128px;
#pm-team-logo{
    width: $logo-size;
    height: $logo-size;
    img{
        width: 100%;
        height: 100%;
    }
    div{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;


        width: 100%;
        height: 100%;
        /* background: var(--secondary-dark); */
        border: 2px solid var(--secondary-light);
        /* font-size: var(--font-size-5); */

        cursor: pointer;
        opacity: 0.6;
        transition-duration: 0.2s;
        color: var(--secondary-light);
        font-weight: 900;
        
        svg{
            width: 32px;
            height: 32px;
            fill: var(--secondary-light);
        }

        &:hover{
            opacity: 1;
        }
    }
}

.input-dark[type=text]{
    text-align: left;
}

.pm-team-color-container{
    display: flex;
    flex-direction: row;

}

.pm-input-color{
    width: 24px;
    height:24px;
}

</style>