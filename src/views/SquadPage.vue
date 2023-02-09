<template>
    
<div id="squad-page" class="global-padding">

    <div id="sp-header">

        <div id="sp-header-buttons" class="flex-row m-left" style="margin-right:16px">
            <svg-button-selection @click="TEST_USER.likedSquad = !TEST_USER.likedSquad" :text="'10.3k'" :text-size="'var(--font-size-3)'" :text-margin="'4px'"
                :selection="(TEST_USER.likedSquad ? SVG_SELECTION.LIKE : SVG_SELECTION.LIKE_EMPTY)" :size="32" :fill="'var(--red)'"/>
        </div>

        <div class="flex-column width-100" style="width:100%">


            <div class="m-left" style="font-size:var(--font-size-2);">
                {{TEST_SQUAD.name}}
            </div>
        <div id="sp-formation" class="flex-row width-100">
            {{TEST_SQUAD.formation}}
        </div>

        </div>
        <svg-button-selection :text="'COPY'"  :text-margin="'4px'" :selection="SVG_SELECTION.COPY" :size="24"/>


    </div>

    <div id="sp-content">
        <!-- <SCStandard :formation-changed="()=>{}"/> -->
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
import { ref } from "@vue/reactivity";
import { onMounted, onUnmounted } from "@vue/runtime-core";

const TEST_SQUAD = {
    name: "Example Squad #1",
    formation: "2-3-3-2"
}

const TEST_USER = ref({
    likedSquad: false,
});

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
    const sc = document.getElementById('squad-page');
    if(sc === null || sc === undefined) return;
    const sc_rect = sc.getBoundingClientRect();

    var new_height = window.innerHeight - sc_rect.y;
    sc.style.setProperty('height', `${new_height}px`);


    const cnt = document.getElementById('sp-content');
    if(cnt === null || cnt === undefined) return;
    const cnt_rect = cnt.getBoundingClientRect();

    new_height = window.innerHeight - cnt_rect.y - 32;
    cnt.style.setProperty('height', `${new_height}px`);
}

</script>



<style lang="scss" scoped>

#squad-page{
    display: flex;
    flex-direction: column;
    background: var(--dark-2);
}

#sp-header{
    display: flex;
    flex-direction: row;
    align-items: center;
    
    border-radius: 4px;

    margin-top: var(--global-margin);
    margin-bottom: var(--global-margin);
    @media screen and (min-width:1200px) {
        margin-top: 16px;
        margin-bottom: 16px;
    }
}

#sp-formation{
    font-size:var(--font-size-3);
    font-style: italic;
    color:var(--light-6);

}

//////////////////////

#sp-content{
    box-shadow: 0 0 4px var(--dark);
    background: var(--secondary-dark);
    overflow: hidden;
}

#sp-settings{
    display: flex;
    flex-direction: row;
}

</style>