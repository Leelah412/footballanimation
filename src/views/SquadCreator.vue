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
        <SCStandard />
    </div>

</div>

</template>


<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from "vue-demi";
import Pitch from "@/components/view/Pitch.vue";
import SvgButtonSelection from "@/components/misc/svg-button-selection.vue";
import { SVG_SELECTION } from "@/components/helper/enums";
import PlayerVue from "@/components/view/Player.vue";
import Player from "@/components/model/Player";
import SCStandard from "@/components/r_squad_creator/types/SCStandard.vue";

onMounted(()=>{
    window.addEventListener('resize', resize);
    
    resize();
})

onUnmounted(()=>{
    window.removeEventListener('resize', resize);
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
    border-radius: 4px;
    overflow: hidden;
}

#sc-settings{
    display: flex;
    flex-direction: row;
}

</style>