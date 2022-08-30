<template>

<div class="flex-column">
    <div class="flex-column">
        <div class="pm-content-header">PITCH</div>
        <div class="pm-content flex-row">
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

<!--     <div class="property-category flex-row">
        <div class="property-name">Grid</div>
        <div class="property-content" style="justify-content: left;">

            <div class="flex-row" style="margin-bottom: auto;">
                <input type="checkbox" name="show-grid-checkbox" id="show-grid-checkbox" v-model="defaultProps.showGrid">
                <label for="show-grid-checkbox" style="margin-left:8px">Show Grid</label>
            </div>

            <div v-if="defaultProps.showGrid" class="flex-column" style="margin-left: auto">
                <input class="input-dark" type="number" id="grid-size" min="60" max="90" />
                <label for="grid-size" style="font-weight: 300; font-size:10px; margin-top: 8px;">
                    Size
                    <span style="font-size:8px; color: #cccc;">(m)</span>
                </label>
            </div>

        </div>
    </div> -->

</div>

</template>

<script lang="ts" setup>
import store from '@/store';
import { Committer } from '@/store/modules/editor_committer';
import { ref } from 'vue-demi';


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

.pm-content-header{
    text-align: left;
    margin-bottom: 4px;
}

</style>