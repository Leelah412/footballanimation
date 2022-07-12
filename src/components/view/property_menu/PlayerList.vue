<template>
    
<div id="property-menu-player-list">

    <div class="pm-nav">
        <button :class="`pm-nav-button${plState === PL_STATE.HOME ? '-active' : ''}`"
            @click="()=>changePlState(PL_STATE.HOME)">
            HOME
        </button>

        <div class="pm-nav-divider"></div>

        <button :class="`pm-nav-button${plState === PL_STATE.AWAY ? '-active' : ''}`"
            @click="()=>changePlState(PL_STATE.AWAY)">
            AWAY
        </button>

        <div class="pm-nav-divider"></div>

        <button :class="`pm-nav-button${plState === PL_STATE.OTHER ? '-active' : ''}`"
            @click="()=>changePlState(PL_STATE.OTHER)">
            OTHER
        </button>
        <button id="pm-db-search-button" @click="()=>changePlState(PL_STATE.DB)">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
        </button>
    </div>

    <div class="pm-content">
        <div v-if="plState === PL_STATE.HOME" class="pm-list-wrapper">
            <div class="pm-list" v-for="(value, idx) in home" :key="`player-list-home-${idx}`">
                <div class="pm-list-header">{{value.name}}</div>
                <div class="pm-list-content">
                    <div class="pm-list-item" v-for="(pl, idx) in value.players" :key="`player-list-home-player-${idx}`">

                    </div>
                </div>
            </div>
        </div>
        <div v-if="plState === PL_STATE.AWAY" class="pm-list-wrapper">
            <div class="pm-list" v-for="(value, idx) in away" :key="`player-list-away-${idx}`">
                <div class="pm-list-header">{{value.name}}</div>
                <div class="pm-list-content">
                    <div class="pm-list-item" v-for="(pl, idx) in value.players" :key="`player-list-away-player-${idx}`">

                    </div>
                </div>
            </div>
        </div>
        <div v-if="plState === PL_STATE.OTHER" class="pm-list-wrapper">
            <div class="pm-list" v-for="(value, idx) in other" :key="`player-list-other-${idx}`">
                <div class="pm-list-content" v-for="(pl, idx) in value" :key="`player-list-other-player-${idx}`">

                </div>
            </div>
        </div>
    </div>
    <div class="pm-footer">
        <button>
            <span>PLAYER</span>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
        </button>
        <button>
            <span>LIST</span>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
        </button>

    </div>
</div>

</template>


<script lang="ts" setup>
import Player from '@/components/model/Player'
import { ref } from '@vue/reactivity';


interface PlayerSublist{
    firstTeam: {
        name: string,
        players: Player[]
    }
    [key: string]: {
        name: string,
        players: Player[]
    }
}

interface Props{
    home: PlayerSublist
    away: PlayerSublist
    other: Player[]
}

const props = defineProps<Props>();

enum PL_STATE {NONE, HOME, AWAY, OTHER, DB};
const plState = ref<PL_STATE>(PL_STATE.NONE);

function changePlState(newState: PL_STATE){
    plState.value = newState;
}

</script>


<style lang="scss" scoped>

#property-menu-player-list{
    display: flex;
    flex-direction: column;

    .pm-footer{
        margin-top: 32px;
    }
}


$pm-nav-button-amount: 3;
.pm-nav-button{
    width: calc((100% / $pm-nav-button-amount) - 32px/$pm-nav-button-amount);
}

.pm-nav-button-active{
    @extend .pm-nav-button;
}

#pm-db-search-button{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 100;
    height: 28px;
    margin: auto;
    &:hover{
        background: var(--accent);
    }
    svg{
        width: 20px;
        height: 20px;
        fill: var(--light);
    }    
}

</style>


