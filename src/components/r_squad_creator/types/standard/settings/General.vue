<template>
    
<div class="content">
    <div class="item flex-column">
        <label class="label-over" for="">SQUAD NAME</label>
        <input class="input-dark-2" type="text" v-model.lazy="store.state.squadCreatorStore.squadName">
    </div>

    <div class="item flex-row">
        <input type="checkbox" v-model="store.state.squadCreatorStore.settings.showSquadName">
        <label class="label-right" for="">Show squad name on pitch</label>
    </div>

    <div class="item flex-column">
        <label class="label-over" for="">BASE FORMATION</label>
        <select class="input-select" name="" @change="formationChanged" v-model="store.state.squadCreatorStore.formation">
            <option v-for="(val,key) in FormationList" :key="'formation-' + key" :value="key">{{val.name}}</option>
        </select>
    </div>

    <div class="item flex-column">
        <label class="label-over" for="">FORMATION NAME</label>
        <input class="input-dark-2" type="text" v-model.lazy="store.state.squadCreatorStore.formationName">
    </div>
    
    <div class="item flex-row">
        <input type="checkbox" v-model="store.state.squadCreatorStore.settings.showFormation">
        <label class="label-right" for="">Show formation on pitch</label>
    </div>

    <div class="item flex-row">
        <input type="checkbox" v-model="store.state.squadCreatorStore.settings.lockPositions">
        <label class="label-right" for="">Lock positions</label>
    </div>

    <div class="item flex-row align-center">
        <label class="label-over" for="">TEAM COLORS</label>
        <div class="flex-column m-right">
            <input type="color" name="" id="" v-model="store.state.squadCreatorStore.settings.teamColors[0]">
        </div>
        <div class="flex-column m-center-h">
            <input type="color" name="" id="" v-model="store.state.squadCreatorStore.settings.teamColors[1]">
        </div>
    </div>

    <div class="item flex-column">
        <label class="label-over" for="">BENCH COUNT</label>
        <input class="input-dark-2" type="number" min="0" max="12">
    </div>

    <div class="item flex-row">
        <input type="checkbox" v-model="store.state.squadCreatorStore.settings.showLogo">
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
        Logo
    </div>
</div>

</template>


<script lang="ts" setup>
import FormationList from "@/components/helper/FormationList";
import Player from "@/components/model/Player";
import store from "@/store";

interface Props{
    formationChanged: ()=>void
}

const props = defineProps<Props>();


</script>



<style lang="scss" scoped>

</style>