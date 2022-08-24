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

            <input class="input-dark-2 m-center-h" style="background:none;" type="number" name="" id="" v-model.lazy="store.state.squadCreatorStore.settings.circleStyle">
            <div class="pull-bar-container">
                <svg class="pull-bar-arrow" @click="Committer.setCircleStyle(store.state.squadCreatorStore.settings.circleStyle - 1)"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" transform="scale(-1,1)">
                    <path d="M8 5v14l11-7z" fill="var(--accent-light)" stroke="var(--accent-dark)" stroke-width="2"/>
                </svg>

                <div class="pull-bar" id="pull-bar-circle-style" @mousedown="ev => onPullBarDown(ev, 'circle-style')">
                    <div class="bar" id="bar-circle-style" @mousedown="ev => onPullBarDown(ev, 'circle-style')"></div>
                </div>

                <svg class="pull-bar-arrow" @click="Committer.setCircleStyle(store.state.squadCreatorStore.settings.circleStyle + 1)"
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
var pullBarElementID: string = '';
var pullBarStart: number = 0;

function onPullBarDown(ev, elementID: string){
    dragStart = ev.clientX;
    pullBarElementID = elementID;

    const bar = document.getElementById('bar-' + pullBarElementID);
    const pullBar = document.getElementById('pull-bar-' + pullBarElementID);
    if(bar === undefined || bar === null) return;
    if(pullBar === undefined || pullBar === null) return;

    pullBarStart = bar.getBoundingClientRect().left - pullBar.getBoundingClientRect().left; 
    
    // if clicked significantly far outside bar, push bar to the clicked position
    if(Math.abs(dragStart - bar.getBoundingClientRect().left - 4) > 8){
        // dragStart must be the bar's left offset for this to work
        dragStart = bar.getBoundingClientRect().left;
        moveBar(ev);
    }

    document.addEventListener('mousemove', onPullBarMove);
    document.addEventListener('mouseup', onPullBarUp);
}

function onPullBarMove(ev){
    if(!dragging){
        if(Math.abs(ev.clientX - dragStart) < 4) return;
        dragging = true;
    }

    moveBar(ev);
}

function moveBar(ev){
    const bar = document.getElementById('bar-' + pullBarElementID);
    const pullBar = document.getElementById('pull-bar-' + pullBarElementID);
    if(bar === undefined || bar === null) return;
    if(pullBar === undefined || pullBar === null) return;


    var newPos = pullBarStart + (ev.clientX - dragStart);
    if(newPos < 0){
        newPos = 0;
    }
    else if(newPos > pullBar.getBoundingClientRect().width){
        newPos = pullBar.getBoundingClientRect().width;
    }

    bar.style.setProperty('left', `${newPos - 4}px`);       // subtract 4 to center bar horizontally
}

function onPullBarUp(ev){
    document.removeEventListener('mousemove', onPullBarMove);
    document.removeEventListener('mouseup', onPullBarUp);
    dragging = false;

    const bar = document.getElementById('bar-' + pullBarElementID);
    const pullBar = document.getElementById('pull-bar-' + pullBarElementID);
    if(bar === undefined || bar === null) return;
    if(pullBar === undefined || pullBar === null) return;

    // set the correct style based on the drop position relative to the complete pull bar
    // NOTE: don't to forget add half the width of 'bar', as we actually want to get its center position, and not the left one
    const ratio = ((bar.getBoundingClientRect().left + 4) - pullBar.getBoundingClientRect().left) / pullBar.getBoundingClientRect().width;
    
    // if at most one pitch style available, always keep bar at the start
    if(!(circleStyleAmount.value > 1)){
        pullBar.style.setProperty('left', '-4px');
        return;
    }

    var num = 1/circleStyleAmount.value;
}

</script>



<style lang="scss" scoped>

</style>