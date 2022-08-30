<template>

<div id="property-menu-settings" class="flex-column">
<!--     <div class="pm-nav">
    </div> -->

    <div class="pm-content flex-column">
        <div style="text-align: left">
            Show Team-... on Pitch
        </div>
        <div style="padding: 8px 16px">
            <div class="flex-row">
                <input type="checkbox" :checked="store.state.editorStore.settings.showTeamName" @change="ev => {Committer.showTeamName(ev.currentTarget.checked)}">
                <label class="label-checkbox" for="">Name</label>
            </div>
            <div class="flex-row">
                <input type="checkbox" :checked="store.state.editorStore.settings.showTeamShort" @change="ev => {Committer.showTeamShort(ev.currentTarget.checked)}">
                <label class="label-checkbox" for="">Short</label>
            </div>
            <div class="flex-row">
                <input type="checkbox" :checked="store.state.editorStore.settings.showTeamLogo" @change="ev => {Committer.showTeamLogo(ev.currentTarget.checked)}">
                <label class="label-checkbox" for="">Logo</label>
            </div>

        </div>
    </div>

    <div class="pm-content flex-row">
        <input type="checkbox" :checked="store.state.editorStore.settings.showJersey">
        <label class="label-checkbox" for="">Show Jersey</label>
    </div>

    <div class="pm-content flex-row">
        <input type="checkbox" :checked="store.state.editorStore.settings.showTimer">
        <label class="label-checkbox" for="">Show Time</label>
    </div>

    <div class="pm-content flex-row">
        <input type="checkbox" :checked="store.state.editorStore.settings.showScore">
        <label class="label-checkbox" for="">Show Scores</label>
    </div>

    <!-- <div class="pm-content-divider-h"></div> -->

    <div class="pm-content">
        
    </div>

</div>

</template>

<script lang="ts" setup>
import { ref } from '@vue/reactivity';
import store from '@/store/index';
import { Committer } from '@/store/modules/editor_committer';
import CanvasObject from '@/components/model/CanvasObject';

// TODO: rename this file

interface Props{
    
}

const props = defineProps<Props>();

const pw = ref(store.state.editorStore.pitch.size.x);
const ph = ref(store.state.editorStore.pitch.size.y);

function onPitchSizeChange(ev){
    Committer.pitchSizeChange(pw.value, ph.value);
}

interface Default{
    showGrid: boolean
}

const defaultProps = ref<Default>({
    showGrid: false
})

</script>

<style lang="scss" scoped>


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