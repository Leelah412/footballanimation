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

        <div class="flex-row" style="margin-bottom: 8px;">
            <div class="flex-column" style="box-sizing: border-box; width: 75%; padding-right: 8px;">
                <div class="pm-content-header">TEAM NAME</div>
                <input type="text" class="input-dark">
            </div>
            <div class="flex-column" style="width: 25%">
                <div class="pm-content-header">SHORT</div>
                <input type="text" class="input-dark">
            </div>
        </div>
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
            <div class="flex-column">
                <div class="flex-column">
                    <div class="pm-content-header">SCHEME</div>
                    <div class="pm-team-color-container">
                        <!-- no need to worry about picker border, if all colors are equal -->
                        <input v-for="idx in 3" :key="`team-color-${idx-1}`" type="color" class="pm-team-color" v-model="currentTeam.colorPalette[idx-1]" :style="`background: ${currentTeam.colorPalette[idx-1]}`" />
                    </div>
                </div>

                <div>
                    verwalte spieler
                </div>
            </div>

        </div>


        <div>
            Player Jersey

            select jersey
        </div>

        <div>
            Goalkeeper Jersey

            select jersey
        </div>

        <div>
            visual:
            show logo on pitch
            show teamname on pitch
            show short on pitch
        </div>

        <div>
            
        </div>
    </div>

</div>

</template>


<script lang="ts" setup>
import Team from "@/components/model/Team";
import { ref } from "@vue/reactivity";


interface Props{
    home: Team
    away: Team
}

const props = defineProps<Props>();
const emit = defineEmits(['uploadLogo']);

enum TAB_STATE {HOME, AWAY};
const tabState = ref<TAB_STATE>(TAB_STATE.HOME);
const currentTeam = ref<Team>(props.home);

function changeTabState(newState: TAB_STATE){
    tabState.value = newState;
    currentTeam.value = tabState.value === TAB_STATE.HOME ? props.home : props.away;
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

.pm-nav{
    margin-bottom: 16px;
}

$pm-nav-button-amount: 2;
.pm-nav-button{
    width: calc(100% / $pm-nav-button-amount);
}

.pm-nav-button-active{
    @extend .pm-nav-button;
}

$logo-size: 96px;
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

.pm-team-color{
    width: 32px;
    height:32px;
}

</style>