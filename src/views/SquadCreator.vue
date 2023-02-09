<template>
    
<div id="squad-creator" class="global-padding">

    <div id="sc-header">
        <div class="header-standard">
            SQUAD CREATOR
        </div>
        <div>
            <!-- <label for="" style="font-size:var(--font-size-4)">TYPE: </label> -->
            <select id="sc-type" class="input-select">
                <option value="standard">Standard</option>
            </select>
        </div>

        <div id="sc-squadname" class="flex-row" style="flex-grow: 100; margin: 0 32px;">
            <input type="text" class="input-bottom-line m-right" style="flex-grow: 100; " placeholder="Squadname"
                @change="ev => Committer.setSquadName(ev.target.value)" :value="store.state.squadCreatorStore.squadName" >
        </div>

        <select class="input-select" style="margin-right: 32px;" @change="formationChanged" v-model="store.state.squadCreatorStore.formationKey">
            <option v-for="(val,key) in FormationList" :key="'formation-' + key" :value="key">{{val.name}}</option>
        </select>

        <div class="sc-buttons">
            <!-- SAVE ON SERVER -->
            <svg-button-selection style="margin-right:16px;" :selection="SVG_SELECTION.SAVE" :size="32"
                :text="'SAVE'" :text-size="'var(--font-size-5)'" :text-color="'var(--green)'" :text-weight="900" :fill="'var(--green)'"/>
            <!-- LOAD EXISTING SQUAD FROM SERVER -->
            <svg-button-selection style="margin-right:16px;" :selection="SVG_SELECTION.LOAD" :size="32"
                :text="'LOAD'" :text-size="'var(--font-size-5)'" :text-color="'var(--light)'" :text-weight="900" :fill="'var(--light)'"/>
            <!-- CREATE NEW SQUAD -->
            <svg-button-selection :selection="SVG_SELECTION.ADD" :size="32"
                :text="'NEW'" :text-size="'var(--font-size-5)'" :text-color="'var(--blue)'" :text-weight="900" :fill="'var(--blue)'"/>
        </div>

    </div>

    <div id="sc-edit" class="flex-row" style="padding: 8px 0; border-top: 1px solid var(--accent-dark); border-bottom: 1px solid var(--accent-dark);">
        <div class="sc-buttons" style="margin-right:32px">
            <!-- EXPORT TO LOCAL SYSTEM -->
            <svg-button-selection :selection="SVG_SELECTION.IMPORT" :size="24" @click="ev=>Committer.saveSquad(true)"/>
            <!-- IMPORT FROM LOCAL SYSTEM -->
            <svg-button-selection :selection="SVG_SELECTION.EXPORT" :size="24" @click="openFileDialog"/>
            <input type="file" id="load-file" style="display:none" @change="loadFile">
        </div>
        <div class="sc-buttons m-left">
            <svg-button-selection :selection="SVG_SELECTION.UNDO" :size="24" @click="Committer.undo"
                :fill="squadCreatorStore.undoList.length !== 0 ? 'var(--light)' : 'var(--light-6)'"/>
            <svg-button-selection :selection="SVG_SELECTION.REDO" :size="24" @click="Committer.redo"
                :fill="squadCreatorStore.redoList.length !== 0 ? 'var(--light)' : 'var(--light-6)'"/>
        </div>
        <div class="sc-buttons m-right">
            <svg-button-selection :selection="SVG_SELECTION.DELETE" :size="24" @click="eraseSquad"/>
            <svg-button-selection :selection="SVG_SELECTION.SETTINGS" :size="24"/>
        </div>
    </div>

    <div id="sc-content">
        <SCStandard v-if="mounted" ref="scContent" :formation-changed="formationChanged"/>
    </div>

</div>

</template>


<script lang="ts" setup>
import Pitch from "@/components/view/Pitch.vue";
import SvgButtonSelection from "@/components/misc/svg-button-selection.vue";
import { SVG_SELECTION } from "@/components/util/enums";
import PlayerVue from "@/components/view/Player.vue";
import Player, { PlayerList } from "@/components/model/Player";
import SCStandard from "@/components/routes/squad_creator/types/SCStandard.vue";
import store from "@/store";
import FormationList, { Formation, Position } from "@/components/util/FormationList";
import Vector2 from "@/components/math/Vector2";
import { Committer } from "@/store/modules/squad_creator_committer";
import { ref } from "@vue/reactivity";
import { onMounted, onUnmounted } from "@vue/runtime-core";

const STORAGE = 'squadCreator';

const squadCreatorStore = ref(store.state.squadCreatorStore);
const scContent = ref(null);

function openFileDialog(ev){
    const input = document.getElementById('load-file');
    if(input === null || input === undefined) return;
    input.click();
}
function loadFile(ev){

    var fr=new FileReader();
    fr.onload = ev2=>{
        // load the squad from the json
        if(ev2.target === null || ev2.target.result === null) return;
        
        Committer.loadSquad(ev2.target.result.toString());
        ev.target.value = '';
    };
    fr.onprogress = ev=>{

    };
        
    fr.readAsText(ev.target.files[0]);
}

function checkPlayerCount(){
    const ft: PlayerList = squadCreatorStore.value.firstTeam;
    const ft_keys = Object.keys(ft);
    const ft_count = squadCreatorStore.value.settings.firstTeamCount;
    const diff = ft_count - ft_keys.length;

    // if expected player count smaller equal actual 'firstTeam' object count, do nothing
    if(diff <= 0) return;
    if(!(squadCreatorStore.value.formationKey in FormationList)) return;

    const formation: Formation = FormationList[squadCreatorStore.value.formationKey];
    if(formation.positions.length !== 11) return;

    // add dummy players to the first team based on current base formation
    for(var i = 0; i < diff; i++){
        const player = new Player();
        player.setPosition(formation.positions[11 - diff + i].id, squadCreatorStore.value.settings.pitchSize.x, squadCreatorStore.value.settings.pitchSize.y);
        player.isDummy = true;
        player.name = '';
        ft[player.id] = player;
    }
}

// reposition players
function formationChanged(){
    const ft: PlayerList = squadCreatorStore.value.firstTeam;
    const ft_keys = Object.keys(ft);
    
    if(!(squadCreatorStore.value.formationKey in FormationList)) return;

    const formation: Formation = FormationList[squadCreatorStore.value.formationKey];
    if(formation.positions.length !== 11){
        console.warn("Formation does not have 11 players! Abort.");
        return;
    }

    for(var i = 0; i < ft_keys.length && i < 11; i++){
        ft[ft_keys[i]].setPosition(formation.positions[i].id, squadCreatorStore.value.settings.pitchSize.x, squadCreatorStore.value.settings.pitchSize.y);
    }

    if(scContent.value)
        scContent.value.createPlaceholderPlayers();
}

// deletes the entire squad from screen and local storage
function eraseSquad(){
    localStorage.setItem(STORAGE, '');
    Committer.setDefault();
    // to fill field again
    checkPlayerCount();
    if(scContent.value){
        scContent.value.createPlaceholderPlayers();
        scContent.value.resize();
    }
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

    // first load squad from localstorage, if it exists
    Committer.loadSquad();
    // add players to the first team, if necessary
    checkPlayerCount();
    
    mounted.value = true;
})

window.onbeforeunload = ev=>{
    Committer.saveSquad();
}

onUnmounted(()=>{
    Committer.saveSquad();
    
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
}

#sc-header{
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: 4px;
}

.sc-buttons{
    display: flex;
    flex-direction: row;
    
    button{
        margin-left: 2px;
        margin-right: 2px;
    }
}


//////////////////////

#sc-content{
    overflow: hidden;
}

#sc-settings{
    display: flex;
    flex-direction: row;
}

</style>