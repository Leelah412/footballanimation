<template>
    
<div id="squad-creator" class="global-padding">

    <div id="sc-header">
        <div style="font-family: Unispace; font-size: var(--font-size-2); padding: 32px;">
            SQUAD CREATOR
        </div>
        <div>
            <!-- <label for="" style="font-size:var(--font-size-4)">TYPE: </label> -->
            <select id="sc-type" class="input-select">
                <option value="standard">Standard</option>
            </select>
        </div>

        <div id="sc-squadname" class="flex-row" style="flex-grow: 100; margin: 0 32px;">
            <input type="text" class="input-bottom-line m-right" style="flex-grow: 100; " placeholder="Squadname" v-model.lazy="store.state.squadCreatorStore.squadName">
        </div>

        <select class="input-select" style="margin-right: 32px;" @change="formationChanged" v-model="store.state.squadCreatorStore.formation">
            <option v-for="(val,key) in FormationList" :key="'formation-' + key" :value="key">{{val.name}}</option>
        </select>

        <div id="sc-header-buttons" class="flex-row m-right">
            <svg-button-selection :selection="SVG_SELECTION.SAVE" :size="24"/>
            <svg-button-selection :selection="SVG_SELECTION.LOAD" :size="24"/>
            <svg-button-selection :selection="SVG_SELECTION.IMPORT" :size="24"/>
            <svg-button-selection :selection="SVG_SELECTION.EXPORT" :size="24"/>
            <svg-button-selection :selection="SVG_SELECTION.DELETE" :size="24"/>
            <svg-button-selection :selection="SVG_SELECTION.SETTINGS" :size="24"/>
        </div>

    </div>

    <div id="sc-content">
        <SCStandard v-if="mounted" :formation-changed="formationChanged"/>
    </div>

</div>

</template>


<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from "vue-demi";
import Pitch from "@/components/view/Pitch.vue";
import SvgButtonSelection from "@/components/misc/svg-button-selection.vue";
import { SVG_SELECTION } from "@/components/helper/enums";
import PlayerVue from "@/components/view/Player.vue";
import Player, { PlayerList } from "@/components/model/Player";
import SCStandard from "@/components/r_squad_creator/types/SCStandard.vue";
import store from "@/store";
import FormationList, { Formation, Position } from "@/components/helper/FormationList";

// add players to the first team, if necessary
const squadCreatorStore = ref(store.state.squadCreatorStore);

checkPlayerCount();

function checkPlayerCount(){
    var ft: PlayerList = squadCreatorStore.value.firstTeam;
    const ft_keys = Object.keys(ft);
    const ft_count = squadCreatorStore.value.settings.firstTeamCount;
    const diff = ft_count - ft_keys.length;

    // if expected player count smaller equal actual 'firstTeam' object count, do nothing
    if(diff <= 0) return;
    if(!(squadCreatorStore.value.formation in FormationList)) return;

    const formation: Formation = FormationList[squadCreatorStore.value.formation];
    if(formation.positions.length !== 11) return;

    // add additional players to the first team based on current base formation
    for(var i = 0; i < diff; i++){
        const player = new Player();
        assignPosition(player, formation.positions[11 - diff + i]);
        ft[player.id] = player;
    }


}

// reposition players
function formationChanged(){
    var ft: PlayerList = squadCreatorStore.value.firstTeam;
    const ft_keys = Object.keys(ft);
    
    if(!(squadCreatorStore.value.formation in FormationList)) return;

    const formation: Formation = FormationList[squadCreatorStore.value.formation];
    if(formation.positions.length !== 11) return;

    for(var i = 0; i < ft_keys.length && i < 11; i++){
        assignPosition(ft[ft_keys[i]], formation.positions[i]);
    }
    
}

function assignPosition(player: Player, position: Position){
    player.position.x = position.vector.x * store.state.squadCreatorStore.settings.pitchSize.x;
    player.position.y = position.vector.y * store.state.squadCreatorStore.settings.pitchSize.y;
    player.positionName = position.name;
    player.positionShort = position.short;
}

////////////
// RENDER //
////////////

// only render 'sc-content', when mounted
// needed to make sure the size of the content is correct
const mounted = ref(false);

onMounted(()=>{
    resize();
    window.addEventListener('resize', resize);    
    mounted.value = true;
})

onUnmounted(()=>{
    window.removeEventListener('resize', resize);
    mounted.value = false;
})

function resize(){
    const sc = document.getElementById('squad-creator');
    if(sc === null || sc === undefined) return;
    const sc_rect = sc.getBoundingClientRect();

    var new_height = window.innerHeight - sc_rect.y;
    sc.style.setProperty('height', `${new_height}px`);


    const cnt = document.getElementById('sc-content');
    if(cnt === null || cnt === undefined) return;
    const cnt_rect = cnt.getBoundingClientRect();

    new_height = window.innerHeight - cnt_rect.y - 32;
    cnt.style.setProperty('height', `${new_height}px`);
}

</script>



<style lang="scss" scoped>

#squad-creator{
    display: flex;
    flex-direction: column;
    background: var(--dark-2);
}

#sc-header{
    display: flex;
    flex-direction: row;
    align-items: center;
    
    border-radius: 4px;
}

//////////////////////

#sc-content{
    box-shadow: 0 0 4px var(--dark);
    /* border-radius: 4px; */
/*     height: 100vh;
    margin-bottom: 32px; */
    overflow: hidden;
}

#sc-settings{
    display: flex;
    flex-direction: row;
}

</style>