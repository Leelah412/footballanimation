<template>
    
<div class="content">

    <div class="item flex-column">
        <label class="label-over" for="">PLAYER STYLE</label>
        <!-- TODO: replace select by fancy switch buttons -->
        <select class="input-select" name="" id="" @change="changePlayerStyle" :value="PlayerStyle[squadCreatorStore.settings.playerStyle]">
            <option :value="PlayerStyle[PlayerStyle.NONE]">None</option>
            <option :value="PlayerStyle[PlayerStyle.CIRCLE]">Circle</option>
            <option :value="PlayerStyle[PlayerStyle.JERSEY]">Jersey</option>
            <option :value="PlayerStyle[PlayerStyle.FACE]">Face</option>
        </select>
    </div>

    <div class="item flex-column">
        <label class="label-over" for="">CIRCLE STYLE</label>

        <input class="input-dark-2 m-center-h" style="background:none;" type="number" name="" id="" :value="squadCreatorStore.settings.circleStyle">
        <div class="slider-container">
            <svg class="slider-arrow" @click="Committer.setCircleStyle(squadCreatorStore.settings.circleStyle - 1)"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" transform="scale(-1,1)">
                <path d="M8 5v14l11-7z" fill="var(--accent-light)" stroke="var(--accent-dark)" stroke-width="2"/>
            </svg>

            <div class="slider-pull" id="slider-pull-circle-style" @mousedown="ev => onPullDown(ev, 'circle-style')">
                <div class="pull" id="pull-circle-style" @mousedown="ev => onPullDown(ev, 'circle-style')"></div>
            </div>

            <svg class="slider-arrow" @click="Committer.setCircleStyle(squadCreatorStore.settings.circleStyle + 1)"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" fill="var(--accent-light)" stroke="var(--accent-dark)" stroke-width="2"/>
            </svg>
        </div>
    </div>
</div>

</template>


<script lang="ts" setup>
import { PlayerStyle, KeyPlayerStyleMap } from "@/components/helper/enums";
import CircleStyles from "@/components/model/SquadCreator/standard/CircleStyles";
import store from "@/store";
import { Committer } from "@/store/modules/squad_creator_committer";
import { ref } from "vue-demi";

const squadCreatorStore = ref(store.state.squadCreatorStore);

function changePlayerStyle(ev){
    ev.preventDefault();
    Committer.setPlayerStyle(KeyPlayerStyleMap[ev.target.value]);
}

var dragStart: number = 0;
var dragging: boolean = false;
var sliderElementID: string = '';
var sliderStart: number = 0;

function onPullDown(ev, elementID: string){
    dragStart = ev.clientX;
    sliderElementID = elementID;

    const pull = document.getElementById('pull-' + sliderElementID);
    const sliderPull = document.getElementById('slider-pull-' + sliderElementID);
    if(pull === undefined || pull === null) return;
    if(sliderPull === undefined || sliderPull === null) return;

    sliderStart = pull.getBoundingClientRect().left - sliderPull.getBoundingClientRect().left; 
    
    // if clicked significantly far outside pull, push pull to the clicked position
    if(Math.abs(dragStart - pull.getBoundingClientRect().left - 4) > 8){
        // dragStart must be the pull's left offset for this to work
        dragStart = pull.getBoundingClientRect().left;
        movePull(ev);
    }

    document.addEventListener('mousemove', onPullMove);
    document.addEventListener('mouseup', onPullUp);
}

function onPullMove(ev){
    if(!dragging){
        if(Math.abs(ev.clientX - dragStart) < 4) return;
        dragging = true;
    }

    movePull(ev);
}

function movePull(ev){
    const pull = document.getElementById('pull-' + sliderElementID);
    const sliderPull = document.getElementById('slider-pull-' + sliderElementID);
    if(pull === undefined || pull === null) return;
    if(sliderPull === undefined || sliderPull === null) return;


    var newPos = sliderStart + (ev.clientX - dragStart);
    if(newPos < 0){
        newPos = 0;
    }
    else if(newPos > sliderPull.getBoundingClientRect().width){
        newPos = sliderPull.getBoundingClientRect().width;
    }

    pull.style.setProperty('left', `${newPos - 4}px`);       // subtract 4 to center pull horizontally
}

function onPullUp(ev){
    document.removeEventListener('mousemove', onPullMove);
    document.removeEventListener('mouseup', onPullUp);
    dragging = false;

    const pull = document.getElementById('pull-' + sliderElementID);
    const sliderPull = document.getElementById('slider-pull-' + sliderElementID);
    if(pull === undefined || pull === null) return;
    if(sliderPull === undefined || sliderPull === null) return;

    // set the correct style based on the drop position relative to the complete pull pull
    // NOTE: don't to forget add half the width of 'pull', as we actually want to get its center position, and not the left one
    const ratio = ((pull.getBoundingClientRect().left + 4) - sliderPull.getBoundingClientRect().left) / sliderPull.getBoundingClientRect().width;
    
    // if at most one pitch style available, always keep pull at the start
    if(!(CircleStyles.length > 1)){
        sliderPull.style.setProperty('left', '-4px');
        return;
    }

    var num = 1/CircleStyles.length;
}

</script>



<style lang="scss" scoped>

</style>