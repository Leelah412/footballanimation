<template>
    
<div class="content">
    <div class="item flex-column">
        <label class="label-over" for="">SQUAD NAME</label>
        <input class="input-dark-2" type="text" v-model.lazy="squadCreatorStore.squadName">
    </div>

    <div class="item flex-row">
        <input type="checkbox" v-model="squadCreatorStore.settings.showSquadName">
        <label class="label-right" for="">Show squad name on pitch</label>
    </div>

    <div class="item flex-column">
        <label class="label-over" for="">BASE FORMATION</label>
        <select class="input-select" name="" @change="formationChanged" v-model="squadCreatorStore.formation">
            <option v-for="(val,key) in FormationList" :key="'formation-' + key" :value="key">{{val.name}}</option>
        </select>
    </div>

    <div class="item flex-column">
        <label class="label-over" for="">FORMATION NAME</label>
        <input class="input-dark-2" type="text" v-model.lazy="squadCreatorStore.formationName">
    </div>
    
    <div class="item flex-row">
        <input type="checkbox" v-model="squadCreatorStore.settings.showFormation">
        <label class="label-right" for="">Show formation on pitch</label>
    </div>

    <div class="item flex-row">
        <input type="checkbox" v-model="squadCreatorStore.settings.lockPositions">
        <label class="label-right" for="">Lock positions</label>
    </div>

    <div class="item flex-row align-center">
        <label class="label-over" for="">TEAM COLORS</label>
        <div class="flex-column m-right">
            <input type="color" name="" id="" v-model="squadCreatorStore.settings.teamColors[0]">
        </div>
        <div class="flex-column m-center-h">
            <input type="color" name="" id="" v-model="squadCreatorStore.settings.teamColors[1]">
        </div>
    </div>

    <div class="item flex-column">
        <label class="label-over" for="">BENCH COUNT</label>
        <input class="input-dark-2" type="number" min="0" max="12">
    </div>

    <div class="item flex-row">
        <input type="checkbox" v-model="squadCreatorStore.settings.showLogo">
        <label class="label-right" for="">Show Logo</label>
    </div>

    <div class="item flex-column">
        <label class="label-over" for="">LOGO POSITION</label>
        <select class="input-select" name="">
            <option value="up">Up</option>
            <option value="down">Down</option>
        </select>
    </div>

    <div class="item flex-column">
        Jersey
    </div>

    <div class="item flex-column">
        <div class="upload-image-container" @click="ev => openFileDialogue('upload-squad-logo')">
            <div v-if="squadCreatorStore.squadName === ''" class="flex-column m-center-v">
                <img class="upload-image-icon" />
                <div class="upload-image-header">
                    LOGO
                </div>
            </div>
            <img v-else :src="squadCreatorStore.squadLogo" style="width:100%; height:100%" />

            <input id="upload-squad-logo" type="file" @change="changeSquadLogo" accept=".svg, image/jpeg, image/png">
        </div>
    </div>
</div>

</template>


<script lang="ts" setup>
import FormationList from "@/components/helper/FormationList";
import Player from "@/components/model/Player";
import store from "@/store";
import { Committer } from "@/store/modules/squad_creator_committer";
import { ref } from "vue-demi";

interface Props{
    formationChanged: ()=>void
}

const props = defineProps<Props>();

const squadCreatorStore = ref(store.state.squadCreatorStore);

function openFileDialogue(inputEl: string){
    const input = document.getElementById(inputEl);
    if(input === null || input === undefined) return;
    input.click();
}

function changeSquadLogo(ev){
    Committer.changeSquadLogo(ev.target.files[0]);
    ev.target.value = '';
}

</script>


<style lang="scss">

.upload-image-container{
    cursor: pointer;

    display: flex;
    flex-direction: column;

    width: 128px;
    height: 128px;
    border: 2px solid var(--secondary);
    &:hover{
        filter: brightness(1.2);
    }

    .upload-image-icon{
        width: 50%;
        height: 50%;
        margin-top: auto;
        margin-bottom: 4px;
    }
    .upload-image-header{
        font-size: var(--font-size-4);
        margin-top: 4px;
        margin-bottom: auto;
    }
    input{
        display:none;
    }
}


</style>


<style lang="scss" scoped>

</style>