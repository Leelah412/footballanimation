<template>

<div id="editor-properties" >
    <div id="ep-header">
        <h4>PROPERTIES</h4>
    </div>
    <div id="ep-content">

        <div v-if="propertyType === PropertyType.DEFAULT" id="pitch-size" class="flex-column">
            <div class="property-category flex-row">
                <div class="property-name">Pitch Size</div>
                <div class="property-content">
                    <div class="flex-column" style="margin-left: auto">
                        <input type="number" id="pitch-width" min="90" max="120" v-model.lazy="pitch.size.x" @change="pitchSizeChange"/>
                        <label for="pitch-width" style="font-weight: 300; font-size:10px; margin-top: 8px;">
                            Width
                            <span style="font-size:8px; color: #cccc;">(m)</span>
                        </label>
                    </div>
                    <div class="flex-column" style="margin-left: 16px">
                        <input type="number" id="pitch-height" min="60" max="90" v-model.lazy="pitch.size.y" @change="pitchSizeChange"/>
                        <label for="pitch-height" style="font-weight: 300; font-size:10px; margin-top: 8px;">
                            Height
                            <span style="font-size:8px; color: #cccc;">(m)</span>
                        </label>
                    </div>
                </div>
            </div>

            <div class="property-category flex-row">
                <div class="property-name">Grid</div>
                <div class="property-content" style="justify-content: left;">

                    <div class="flex-row" style="margin-bottom: auto;">
                        <input type="checkbox" name="show-grid-checkbox" id="show-grid-checkbox" v-model="defaultProps.showGrid">
                        <label for="show-grid-checkbox" style="margin-left:8px">Show Grid</label>
                    </div>

                    <div v-if="defaultProps.showGrid" class="flex-column" style="margin-left: auto">
                        <input type="number" id="grid-size" min="60" max="90" />
                        <label for="grid-size" style="font-weight: 300; font-size:10px; margin-top: 8px;">
                            Size
                            <span style="font-size:8px; color: #cccc;">(m)</span>
                        </label>
                    </div>

                </div>
            </div>
        </div>

        <div v-else-if="propertyType === PropertyType.PLAYER" id="player-props" class="flex-column">
            <div class="flex-row">
                <label for="pp-name" style="font-weight: 300; font-size: small">NAME</label>
                <input type="text" id="pp-name" />
            </div>
            <div class="flex-row">
                <label for="pp-number" style="font-weight: 300; font-size: small">NR.</label>
                <input type="number" id="pp-number" min="1" max="99" />
            </div>
        </div>

    </div>
</div>

</template>

<script lang="ts" setup>
import { ref } from '@vue/reactivity';
import { PropertyType } from '../helper/Global';
import Pitch from '../model/Pitch';

interface Props{
    propertyType: PropertyType,
    pitch: Pitch
    pitchSizeChange: Function
}

const props = withDefaults(defineProps<Props>(), {
    propertyType: PropertyType.DEFAULT
})

interface Default{
    showGrid: boolean
}

const defaultProps = ref<Default>({
    showGrid: false
})

</script>

<style lang="scss" scoped>


#editor-properties{
    position: absolute;
    right: 4vh;
    top: 4vh;
    min-width: 256px;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 8px;
    background: #333;
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

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number]{
    background: #ccc3;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 4px 8px;
    color: #ccc;
    width: 32px;
    -moz-appearance: textfield;
    text-align: center;
    /* font-weight: 600; */
}



</style>