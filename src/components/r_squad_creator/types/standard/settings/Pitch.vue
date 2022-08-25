<template>
    
<div class="content">

    <div class="item flex-column">
        <label class="label-over" for="">PITCH ORIENTATION</label>
        <select class="input-select" name="" @change="resize" v-model="store.state.squadCreatorStore.settings.pitchOrientation">
            <option value="horizontal">Horizontal</option>
            <option value="vertical">Vertical</option>
        </select>
    </div>
    <div class="item flex-row align-center">
        <label class="label-over" for="">PITCH SIZE</label>
        <div class="flex-column m-right">
            <label class="label-over" style="text-align:center" for="">
                {{store.state.squadCreatorStore.settings.pitchOrientation !== 'horizontal' ? 'WIDTH' : 'HEIGHT'}} <span style="font-size:var(--font-size-6); opacity: 0.8;">(m)</span> 
            </label>
            <input class="input-dark-2" type="number" min="60" max="90" @change="ev => Committer.setPitchHeight(ev.target.value)" v-model.lazy="store.state.squadCreatorStore.settings.pitchSize.y">
        </div>
        <div class="flex-column m-center-h">
            <label class="label-over" style="text-align:center" for="">
                {{store.state.squadCreatorStore.settings.pitchOrientation !== 'horizontal' ? 'HEIGHT' : 'WIDTH'}} <span style="font-size:var(--font-size-6); opacity: 0.8;">(m)</span> 
            </label>
            <input class="input-dark-2" type="number" min="90" max="120" @change="ev => Committer.setPitchWidth(ev.target.value)" v-model.lazy="store.state.squadCreatorStore.settings.pitchSize.x">
        </div>

    </div>

    <div class="item flex-row align-center">
        <label class="label-over" for="">COLORS</label>
        <div class="flex-column m-right">
            <label class="label-over" for="" style="text-align:center">PITCH</label>
            <input type="color" name="" id="" v-model="store.state.squadCreatorStore.settings.pitchColor">
        </div>
        <div class="flex-column m-center-h">
            <label class="label-over" for="" style="text-align:center">LINE</label>
            <input type="color" name="" id="" v-model="store.state.squadCreatorStore.settings.lineColor">
        </div>
    </div>

    <div class="item flex-column">
        <label class="label-over" for="">PATTERN</label>

            <input class="input-dark-2 m-center-h" style="background:none;" type="number" name="" id="" v-model.lazy="store.state.squadCreatorStore.settings.pitchStyle">
            <div class="pull-bar-container">
                <svg class="pull-bar-arrow" @click="Committer.setPitchStyle(store.state.squadCreatorStore.settings.pitchStyle - 1)"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" transform="scale(-1,1)">
                    <path d="M8 5v14l11-7z" fill="var(--accent-light)" stroke="var(--accent-dark)" stroke-width="2"/>
                </svg>

                <div class="pull-bar" id="pull-bar-style" @mousedown="ev => onPullBarDown(ev, 'style')">
                    <div class="bar" id="bar-style" @mousedown="ev => onPullBarDown(ev, 'style')"></div>
                </div>

                <svg class="pull-bar-arrow" @click="Committer.setPitchStyle(store.state.squadCreatorStore.settings.pitchStyle + 1)"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" fill="var(--accent-light)" stroke="var(--accent-dark)" stroke-width="2"/>
                </svg>

            </div>

    </div>

</div>

</template>


<script lang="ts" setup>
import store from "@/store";
import { Committer } from "@/store/modules/squad_creator_committer";
import { onMounted, ref } from "vue-demi";


interface Props{
    resize: ()=>void
}

const props = defineProps<Props>();
const pitchStyleAmount = ref(1);

onMounted(()=>{
    const styles = document.getElementsByClassName('sc-pitch-style');
    pitchStyleAmount.value = styles.length;
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
    if(!(pitchStyleAmount.value > 1)){
        pullBar.style.setProperty('left', '-4px');
        return;
    }

    var num = 1/pitchStyleAmount.value;
}

</script>


<style lang="scss" scoped>

</style>