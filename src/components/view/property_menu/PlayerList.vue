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

        <button :class="`pm-nav-button${plState === PL_STATE.DB ? '-active' : ''}`"
            @click="()=>changePlState(PL_STATE.DB)">
            DATABASE
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
            <div class="pm-list" v-for="(value, key, idx) in store.state.home.squadList" :key="`player-list-home-${idx}`">
                <div class="pm-list-header">{{value.name}}</div>
                <div class="pm-list-content">
                    <div class="pm-list-item" v-for="(pl, idx2) in value.players" :key="`player-list-home-player-${idx2}`">
                        
                        <div class="pm-list-item-col flex-row align-center">
                            <span v-if="pl.number !== -1">{{pl.number}}</span>
                            <span v-else class="span-placeholder">Nr.</span>
                        </div>

                        <div class="pm-list-item-col flex-row align-center">
                            <span v-if="pl.name !== ''">{{pl.name}}</span>
                            <span v-else class="span-placeholder">Name</span>
                        </div>

                        <div v-if="key === 'firstTeam'" class="pm-list-item-col flex-row align-center">
                            <span>x: {{pl.position.x}}</span>
                            <span>y: {{pl.position.y}}</span>
                        </div>

                        
                        <div class="player-list-crud">
                            <svg-button-selection :selection="SVG_SELECTION.EDIT" :size="16"/>
                            <svg-button-selection :selection="SVG_SELECTION.DELETE" :size="16"
                                @click="ev => onRemovePlayer(pl)"/>
                            <svg-button-selection :selection="SVG_SELECTION.MOREV" :size="16"/>
                            <svg-button-selection :selection="SVG_SELECTION.DRAG" :size="16"/>
                        </div>

                    </div>
                </div>
            </div>
        </div>

        <div v-if="plState === PL_STATE.AWAY" class="pm-list-wrapper">
            <div class="pm-list" v-for="(value, key, idx) in store.state.away.squadList" :key="`player-list-away-${idx}`">
                <div class="pm-list-header">{{value.name}}</div>
                <div class="pm-list-content">
                    <div class="pm-list-item" v-for="(pl, idx2) in value.players" :key="`player-list-away-player-${idx2}`">
                        
                        <div class="pm-list-item-col flex-row align-center">
                            <span v-if="pl.number !== -1">{{pl.number}}</span>
                            <span v-else class="span-placeholder">Nr.</span>
                        </div>

                        <div class="pm-list-item-col flex-row align-center">
                            <span v-if="pl.name !== ''">{{pl.name}}</span>
                            <span v-else class="span-placeholder">Name</span>
                        </div>

                        <div v-if="key === 'firstTeam'" class="pm-list-item-col flex-row align-center">
                            <span>x: {{pl.position.x}}</span>
                            <span>y: {{pl.position.y}}</span>
                        </div>

                        
                        <div class="player-list-crud">
                            <svg-button-selection :selection="SVG_SELECTION.EDIT" :size="16"/>
                            <svg-button-selection :selection="SVG_SELECTION.DELETE" :size="16"
                                @click="ev => onRemovePlayer(pl)"/>
                            <svg-button-selection :selection="SVG_SELECTION.MOREV" :size="16"
                                @click="ev => onMore(ev, pl)"/>
                            <svg-button-selection :selection="SVG_SELECTION.DRAG" :size="16"/>
                        </div>

                    </div>
                </div>
            </div>
        </div>

        <div v-if="plState === PL_STATE.DB" class="pm-list">
            <div class="pm-list-item" v-for="(pl, idx) in store.state.database" :key="`player-list-database-${idx}`">
                <div class="pm-list-item-col flex-row align-center" style="font-size: var(--font-size-4)">
                    <span v-if="pl.name !== ''">{{pl.name}}</span>
                    <span v-else class="span-placeholder">Name</span>
                </div>
                
                <div class="player-list-crud">
                    <svg-button-selection :selection="SVG_SELECTION.EDIT" :size="20"/>
                    <svg-button-selection :selection="SVG_SELECTION.DELETE" :size="20"
                        @click="ev => onRemovePlayer(pl, true)"/>
                    <svg-button-selection :selection="SVG_SELECTION.MOREV" :size="20"/>
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
import Player, { PlayerList } from '@/components/model/Player'
import Team from '@/components/model/Team';
import { ref } from '@vue/reactivity';
import SvgButtonSelection from '@/components/misc/svg-button-selection.vue';
import { SVG_SELECTION } from '@/components/helper/enums';
import { DropdownItem } from '@/components/misc/dropdown-menu.vue';
import { Committer } from '@/store/modules/editor_committer';
import store from '@/store/index';

interface Props{
    
}

const props = defineProps<Props>();
const emit = defineEmits(['movePlayer', 'moreMenu']);


///////////////////////

enum PL_STATE {NONE, HOME, AWAY, DB, SEARCH};
const plState = ref<PL_STATE>(PL_STATE.NONE);

function changePlState(newState: PL_STATE){
    plState.value = newState;
}

///////////////////////


function onRemovePlayer(player: Player, removeFromDatabase: boolean = false){

    // remove player from all teams (not just his team, in case he's in multiple teams for some reason)
    var keys = Object.keys(store.state.home.squadList);
    for(var i = 0; i < keys.length; i++){
        
    }

    Committer.removePlayer(player, );
/*     switch(plState.value){
        case PL_STATE.HOME: {
            emit('removePlayer', 'home');
            break;
        }
        case PL_STATE.AWAY: {
            emit('removePlayer', 'away');
            break;
        }
        case PL_STATE.DB: {
            // since database passed as reference, we can just delete player directly from it
            if(player.id in props.database){
                delete props.database[player.id];
            }
            break;
        }
        default: break;
    } */
}

function onMovePlayer(player: Player, _old: PL_STATE, _new: PL_STATE, _squad: string){

    // still in same team/ in database
    if(_old === _new){
        // shouldnt be able to move around inside database, return
        if(_new === PL_STATE.DB) return;
        
    }
}

// open a dropdown menu at the clicked position for the player
function onMore(ev, player: Player){

    // if home/ away team, send to "other" list first
    // TODO: allow selection of individual squads
    const dropdown: DropdownItem[] = [
        {name: 'Move to', action(): boolean | undefined{return undefined},
        items: [
            {name: 'Home Team', action(): boolean | undefined{return undefined}},
            {name: 'Away Team', action(): boolean | undefined{return undefined}},
            {name: 'Database', action(): boolean | undefined{return undefined}},

        ]}
    ]
    emit('moreMenu', ev, player, dropdown);
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

.player-list-crud{
    display: flex;
    flex-direction: row;
    margin-left: auto;
    align-items: center;

    .svg-button-selection{
        margin: 0 1px;
        &:last-child{
            margin-right: 0;
        }
    }
}

</style>


