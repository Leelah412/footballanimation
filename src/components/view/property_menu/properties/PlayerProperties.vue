<template>
    
<div class="flex-column">
    <div class="player-properties-header">
        <div class="number" v-if="_player.number > 0"
            :style="`background:${_player.team?.colorPalette[0]}; border-color: ${_player.team?.colorPalette[1]}; color: ${_player.team?.colorPlayerNumber}`">
            {{_player.number}}
        </div>
        <div class="name">
            <span style="text-align: left; font-size: var(--font-size-3);">
                {{_player.name}}
            </span>
            <span v-if="_player.team !== null" style="text-align: left; font-size: var(--font-size-5); font-style: italic; opacity: 0.8;">
                {{(_player.team.name !== '' ? _player.team.name : (_player.team === store.state.editorStore.home ? 'Home' : 'Away'))}}
            </span>
        </div>

    </div>

    <div class="pm-content-divider-h" style="margin: 8px 0;"></div>

    <div class="player-properties-data">
        <div class="pm-content flex-row" style="margin-bottom: 16px">
            <div class="flex-column" style="padding-right: 8px;">
                <div class="pm-content-header">NAME</div>
                <input type="text" class="input-dark" v-model.lazy="_player.name">                
            </div>
            <div class="flex-column">
                <div class="pm-content-header">NR</div>
                <input type="number" class="input-dark" v-model.lazy="_player.number" min="0" max="99">                
            </div>
        </div>
        <div class="pm-content">
            <div class="pm-content-header">TEAM</div>
            <div class="flex-row" style="margin-bottom: 4px">
                <input type="radio" name="playerTeam" value="playerTeamHome" v-model="playerTeam">
                <label style="margin-left: 4px" for="playerTeamHome">{{(store.state.editorStore.home.name !== '' ? `${store.state.editorStore.home.name} (Home)` : 'Home')}}</label>
            </div>
            <div class="flex-row">
                <input type="radio" name="playerTeam" value="playerTeamAway" v-model="playerTeam">
                <label style="margin-left: 4px" for="playerTeamAway">{{(store.state.editorStore.away.name !== '' ? `${store.state.editorStore.away.name} (Away)` : 'Away')}}</label>
            </div>
        </div>

    </div>
    <div class="player-properties-visual">

    </div>

</div>

</template>


<script lang="ts" setup>
import Player from '@/components/model/Player';
import Team from '@/components/model/Team';
import store from '@/store';
import { Committer } from '@/store/modules/editor_committer';
import { onUpdated, ref, watch } from '@vue/runtime-core';

interface Props{
    player: Player
}

const props = defineProps<Props>();

onUpdated(()=>{
    _player.value = props.player;
    if(props.player.team === store.state.editorStore.home) playerTeam.value = 'playerTeamHome';
    else if(props.player.team === store.state.editorStore.away) playerTeam.value = 'playerTeamAway';
});

const _player = ref<Player>(props.player);
const playerTeam = ref<string>('');

if(props.player.team === store.state.editorStore.home) playerTeam.value = 'playerTeamHome';
else if(props.player.team === store.state.editorStore.away) playerTeam.value = 'playerTeamAway';

// TODO: switch player team
watch(playerTeam, (newTeam, oldTeam)=>{
    if(newTeam === oldTeam) return;
    
    switch(newTeam){
        case 'playerTeamHome':
            Committer.movePlayer(_player.value, store.state.editorStore.home);
            break;
        case 'playerTeamAway':
            Committer.movePlayer(_player.value, store.state.editorStore.away);
            break;
        default: break;
    }
});

</script>


<style lang="scss" scoped>

.player-properties-header{
    display: flex;
    flex-direction: row;
    align-items: center;
    .number{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        text-align: center;
        width: 32px;
        height: 32px;
        margin-right: 8px;
        border-radius: 1000px;
        border: 8px solid #0000;
    }
    .name{
        display: flex;
        flex-direction: column;

    }
}

.pm-content-header{
    text-align: left;
    margin-bottom: 4px;
    margin-left: 2px;
}

</style>