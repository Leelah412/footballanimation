<template>
    
<div class="content">

    <div class="item flex-column">
        <label class="label-over" for="">PLAYER STYLE</label>
        <select class="input-select" name="" id="" @change="changePlayerStyle" v-model="playerStyle">
            <option value="none">None</option>
            <option value="circle">Circle</option>
            <option value="jersey">Jersey</option>
            <option value="face">Face</option>
        </select>
    </div>

    <div class="item flex-column">
        <label class="label-over" for="">CIRCLE STYLE</label>

        <input class="input-dark-2 m-center-h" style="background:none;" type="number" name="" id="" :value="store.state.squadCreatorStore.settings.circleStyle">
        <div class="slider-container">
            <svg class="slider-arrow" @click="Committer.setCircleStyle(store.state.squadCreatorStore.settings.circleStyle - 1)"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" transform="scale(-1,1)">
                <path d="M8 5v14l11-7z" fill="var(--accent-light)" stroke="var(--accent-dark)" stroke-width="2"/>
            </svg>

            <div class="slider-pull" id="slider-pull-circle-style" @mousedown="ev => onPullDown(ev, 'circle-style')">
                <div class="pull" id="pull-circle-style" @mousedown="ev => onPullDown(ev, 'circle-style')"></div>
            </div>

            <svg class="slider-arrow" @click="Committer.setCircleStyle(store.state.squadCreatorStore.settings.circleStyle + 1)"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" fill="var(--accent-light)" stroke="var(--accent-dark)" stroke-width="2"/>
            </svg>
        </div>
    </div>
</div>

</template>


<script lang="ts" setup>
import { PlayerStyle } from "@/components/helper/enums";
import store from "@/store";
import { Committer } from "@/store/modules/squad_creator_committer";
import { onMounted, ref } from "vue-demi";

const playerStyle = ref<string>('circle');

onMounted(()=>{
    switch(store.state.squadCreatorStore.settings.playerStyle){
        case PlayerStyle.NONE: playerStyle.value = 'none'; break;
        case PlayerStyle.CIRCLE: playerStyle.value = 'circle'; break;
        case PlayerStyle.JERSEY: playerStyle.value = 'jersey'; break;
        case PlayerStyle.FACE: playerStyle.value = 'face'; break;
        default: playerStyle.value = 'circle'; break;
    }

});

function changePlayerStyle(ev){
    switch(ev.target.value){
        case 'none': Committer.setPlayerStyle(PlayerStyle.NONE); break;
        case 'circle': Committer.setPlayerStyle(PlayerStyle.CIRCLE); break;
        case 'jersey': Committer.setPlayerStyle(PlayerStyle.JERSEY); break;
        case 'face': Committer.setPlayerStyle(PlayerStyle.FACE); break;
        default: Committer.setPlayerStyle(PlayerStyle.CIRCLE); break;
    }
}


const circleStyleAmount = ref(1);

onMounted(()=>{
    const styles = document.getElementsByClassName('sc-circle-style');
    circleStyleAmount.value = styles.length;
})

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
    if(!(circleStyleAmount.value > 1)){
        sliderPull.style.setProperty('left', '-4px');
        return;
    }

    var num = 1/circleStyleAmount.value;
}

</script>



<style lang="scss" scoped>

</style>