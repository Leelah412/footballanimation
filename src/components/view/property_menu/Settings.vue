<template>

<div id="property-menu-settings" class="flex-column">

    <div class="pm-nav">
        <button :class="`pm-nav-button${tabState === TAB_STATE.PITCH ? '-active' : ''}`"
            @click="()=>changeTabState(TAB_STATE.PITCH)">
            PITCH
        </button>

        <div class="pm-nav-divider"></div>

        <button :class="`pm-nav-button${tabState === TAB_STATE.SCOREBOARD ? '-active' : ''}`"
            @click="()=>changeTabState(TAB_STATE.SCOREBOARD)">
            SCOREBOARD
        </button>
    </div>

    <div v-if="tabState === TAB_STATE.PITCH" class="flex-column">
        <div class="flex-row">
            <div class="pm-content flex-row m-center-h">
                <div class="flex-column">
                    <input class="input-dark" type="number" id="pitch-width" min="90" max="120" v-model.lazy="pw" @change="onPitchSizeChange"/>
                    <label for="pitch-width" style="font-weight: 300; font-size:10px; margin-top: 8px;">
                        Width
                        <span style="font-size:8px; color: #cccc;">(m)</span>
                    </label>
                </div>
                <div class="flex-column" style="margin-left: 16px">
                    <input class="input-dark" type="number" id="pitch-height" min="60" max="90" v-model.lazy="ph" @change="onPitchSizeChange"/>
                    <label for="pitch-height" style="font-weight: 300; font-size:10px; margin-top: 8px;">
                        Height
                        <span style="font-size:8px; color: #cccc;">(m)</span>
                    </label>
                </div>
            </div>
        </div>

        <div class="pm-content-divider-h"></div>

        <div class="pm-content flex-row">
            <input id="settings-show-team-name" type="checkbox" :checked="store.state.editorStore.settings.showTeamName" @change="ev => {Committer.showTeamName(ev.currentTarget.checked)}">
            <label class="label-checkbox" for="settings-show-team-name">Show full team names on pitch</label>
        </div>
        <div class="pm-content flex-row">
            <input id="settings-show-team-short" type="checkbox" :checked="store.state.editorStore.settings.showTeamShort" @change="ev => {Committer.showTeamShort(ev.currentTarget.checked)}">
            <label class="label-checkbox" for="settings-show-team-short">Show short team names on pitch</label>
        </div>
        <div class="pm-content flex-row">
            <input id="settings-show-logo" type="checkbox" :checked="store.state.editorStore.settings.showTeamLogo" @change="ev => {Committer.showTeamLogo(ev.currentTarget.checked)}">
            <label class="label-checkbox" for="settings-show-logo">Show logos on pitch</label>
        </div>

        <div class="pm-content flex-row">
            <input id="settings-show-jersey" type="checkbox" :checked="store.state.editorStore.settings.showJersey">
            <label class="label-checkbox" for="settings-show-jersey">Show jerseys</label>
        </div>

    </div>

    <div v-else-if="tabState === TAB_STATE.SCOREBOARD" class="flex-column">  
        <!-- TODO: implement scoreboard state-->
        <div class="pm-content flex-row">
            <input id="settings-show-scoreboard" type="checkbox" :checked="false">
            <label class="label-checkbox" for="settings-show-scoreboard">Show scoreboard</label>
        </div>

        <!-- TODO: replace true with scoreboard state-->
        <div v-if="true" class="flex-column">
            <div class="pm-content flex-row">
                <input id="settings-show-time" type="checkbox" :checked="store.state.editorStore.settings.showTimer">
                <label class="label-checkbox" for="settings-show-time">Show play time</label>
            </div>

            <div class="pm-content flex-row">
                <input id="settings-show-scores" type="checkbox" :checked="store.state.editorStore.settings.showScore">
                <label class="label-checkbox" for="settings-show-scores">Show scores</label>
            </div> 
        </div> 
    </div>

</div>

</template>

<script lang="ts" setup>
import { ref } from '@vue/reactivity';
import store from '@/store/index';
import { Committer } from '@/store/modules/editor_committer';

// TODO: rename this file

interface Props{
    
}

const props = defineProps<Props>();

const pw = ref(store.state.editorStore.pitch.size.x);
const ph = ref(store.state.editorStore.pitch.size.y);

function onPitchSizeChange(ev){
    Committer.pitchSizeChange(pw.value, ph.value);
}

enum TAB_STATE {PITCH, SCOREBOARD};
const tabState = ref<TAB_STATE>(TAB_STATE.PITCH);

function changeTabState(newState: TAB_STATE){
    tabState.value = newState;
}

interface Default{
    showGrid: boolean
}

const defaultProps = ref<Default>({
    showGrid: false
})

</script>

<style lang="scss" scoped>

$pm-nav-button-amount: 2;
.pm-nav-button{
    width: calc(100% / $pm-nav-button-amount);
}

.pm-nav-button-active{
    @extend .pm-nav-button;
}


#property-menu-settings{
    
}

#ep-header h4{
    letter-spacing: 4px;
    font-weight: 600;
    margin-bottom: 8px;
    padding: 8px;
}

.property-category{
    border-bottom: 1px solid #ccc3;
    padding-bottom: 8px;
    margin-bottom: 8px;
}

.property-name{
    min-width: 64px;
    font-size: 12px;
    font-weight: 600;
    margin-bottom: auto;
    text-align: left;
    padding: 4px;
}

.property-content{
    width: calc(100% - 64px);
    font-size: 12px;
    font-weight: 300;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
    padding: 4px;
}





</style>