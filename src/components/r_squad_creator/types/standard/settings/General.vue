<template>
    
<div class="content">

    <div class="item flex-column">
        <label class="label-over" for="">SQUAD NAME</label>
        <input class="input-dark-2" type="text" v-model.lazy="squadCreatorStore.squadName">
    </div>

    <div class="item flex-column">
        <label class="label-over" for="">LOGO</label>
        <div v-if="squadCreatorStore.squadLogo === ''" class="flex-column m-center-h">
            <button class="btn-bootstrap-secondary flex-row flex-grow" style="padding: 8px;" @click="ev => openFileDialogue('upload-squad-logo')">
                <div class="flex-row" style="margin-right: 8px;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="var(--light)">
                        <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
                    </svg>
                </div>
                <span class="m-center-v" style="">Upload Logo</span>
            </button>
        </div>
        <div v-else class="flex-column flex-grow m-center-h width-100">
            <img :src="squadCreatorStore.squadLogo" style="width:100%; height:100%"/>
            <div class="flex-row">
                <button class="m-center" style="color:var(--light); margin-top: 8px; margin-bottom: 8px; text-decoration: underline;"
                    @click="ev => openFileDialogue('upload-squad-logo')">Change</button>
                <button class="m-center" style="color:var(--red); margin-top: 8px; margin-bottom: 8px; text-decoration: underline;"
                    @click="ev => deleteSquadLogo()">Delete</button>
            </div>
        </div>

        <input id="upload-squad-logo" type="file" @change="changeSquadLogo" accept=".svg, image/jpeg, image/png">
    </div>

    <div class="item flex-column">
        <label class="label-over" for="" style="margin: 0;">TEAM COLORS</label>
        <div class="flex-row align-center" style="margin: 8px 0;">
            <div class="input-color-wrapper" :style="`background: ${squadCreatorStore.settings.teamColors[0]};`">
                <input type="color" name="" id="" v-model="squadCreatorStore.settings.teamColors[0]">
            </div>
            <div class="input-color-wrapper m-left" :style="`background: ${squadCreatorStore.settings.teamColors[1]}; margin-left: 8px;`">
                <input type="color" name="" id="" v-model="squadCreatorStore.settings.teamColors[1]">
            </div>
        </div>
    </div>
    
    <div class="item flex-column">
        <label class="label-over" for="">BASE FORMATION</label>
        <select class="input-select" name="" @change="formationChanged" v-model="squadCreatorStore.formationKey">
            <option v-for="(val,key) in FormationList" :key="'formation-' + key" :value="key">{{val.name}}</option>
        </select>
    </div>

    <div class="item flex-column">
        <label class="label-over" for="">FORMATION NAME</label>
        <input class="input-dark-2" type="text" v-model.lazy="squadCreatorStore.formationName">
    </div>

    <div class="item flex-row">
        <input type="checkbox" v-model="squadCreatorStore.settings.showSquadName">
        <label class="label-right" for="">Show squad name</label>
    </div>

    <div class="item flex-row">
        <input type="checkbox" v-model="squadCreatorStore.settings.showLogo">
        <label class="label-right" for="">Show logo</label>
    </div>

    
    <div class="item flex-row">
        <input type="checkbox" v-model="squadCreatorStore.settings.showFormation">
        <label class="label-right" for="">Show formation</label>
    </div>

    <div class="item flex-row">
        <input type="checkbox" v-model="squadCreatorStore.settings.lockPositions">
        <label class="label-right" for="">Lock positions</label>
    </div>

<!--     <div class="item flex-column">
        <label class="label-over" for="">BENCH COUNT</label>
        <input class="input-dark-2" type="number" min="0" max="12">
    </div> -->

    <div class="item flex-column">
        <label class="label-over" for="">LOGO POSITION</label>
        <select class="input-select" name="">
            <option value="up">Up</option>
            <option value="down">Down</option>
        </select>
    </div>

<!--     <div class="item flex-column">
        Jersey
    </div> -->
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

function deleteSquadLogo(){
    Committer.changeSquadLogo(null);
}

</script>


<style lang="scss">

.upload-logo-container{
    cursor: pointer;

    display: flex;
    flex-direction: column;

    width: 128px;
    height: 128px;
    //border: 2px solid var(--secondary);
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
}

#upload-squad-logo{
    display:none;
}

</style>


<style lang="scss" scoped>

</style>