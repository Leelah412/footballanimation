<template>
    
<div class="content">

    <div class="item flex-column">
        <label class="label-over" for="">ORIENTATION</label>
        <select class="input-select" name="" @change="ev => Committer.setPitchOrientation(ev.target.value)" :value="squadCreatorStore.settings.pitchOrientation">
            <option value="horizontal">Horizontal</option>
            <option value="vertical">Vertical</option>
        </select>
    </div>
    <div class="item flex-column">
        <label class="label-over" for="">SIZE</label>
        <div class="flex-row align-center" style="margin: 8px 0;">
            <div class="flex-column m-right">
                <input class="input-bottom-line" style="text-align:center; font-size: var(--font-size-4);" type="number" min="60" max="90" @change="ev => Committer.setPitchHeight(ev.target.value)" :value="squadCreatorStore.settings.pitchSize.y">
                <label class="label-under" style="text-align:center; margin-top: 8px;" for="">
                    {{squadCreatorStore.settings.pitchOrientation !== 'horizontal' ? 'WIDTH' : 'HEIGHT'}} <span style="font-size:var(--font-size-6); opacity: 0.8;">(m)</span> 
                </label>
            </div>
            <div class="flex-column m-center-h">
                <input class="input-bottom-line" style="text-align:center; font-size: var(--font-size-4);" type="number" min="90" max="120" @change="ev => Committer.setPitchWidth(ev.target.value)" :value="squadCreatorStore.settings.pitchSize.x">
                <label class="label-under" style="text-align:center; margin-top: 8px;" for="">
                    {{squadCreatorStore.settings.pitchOrientation !== 'horizontal' ? 'HEIGHT' : 'WIDTH'}} <span style="font-size:var(--font-size-6); opacity: 0.8;">(m)</span> 
                </label>
            </div>
        </div>
    </div>

    <div class="item flex-column">
        <label class="label-over" for="">COLORS</label>
        <div class="flex-row align-center" style="margin: 8px 0;">
            <div class="flex-column">
                <div class="input-color-wrapper" :style="`background:${squadCreatorStore.settings.pitchColor};`">
                    <input type="color" name="" id="" v-model="squadCreatorStore.settings.pitchColor">
                </div>
                <label class="label-under" for="" style="text-align:center;">PITCH</label>
            </div>
            <div class="flex-column m-left" style="margin-left: 16px;">
                <div class="input-color-wrapper" :style="`background:${squadCreatorStore.settings.lineColor};`">
                    <input type="color" name="" id="" v-model="squadCreatorStore.settings.lineColor">
                </div>
                <label class="label-under" for="" style="text-align:center;">LINE</label>
            </div>
        </div>
    </div>

    <div class="item flex-column">
        <label class="label-over" for="">PATTERN</label>

            <input class="input-dark-2 m-center-h" style="background:none;" type="number" name="" id="" :value="squadCreatorStore.settings.pitchStyle">
            <div class="slider-container">
                <svg class="slider-arrow" @click="Committer.setPitchStyle(squadCreatorStore.settings.pitchStyle - 1)"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" transform="scale(-1,1)">
                    <path d="M8 5v14l11-7z" fill="var(--accent-light)" stroke="var(--accent-dark)" stroke-width="2"/>
                </svg>

                <div class="slider-pull" id="slider-pull-style" @mousedown="ev => onPullDown(ev, 'style')">
                    <div class="pull" id="pull-style" @mousedown="ev => onPullDown(ev, 'style')"></div>
                </div>

                <svg class="slider-arrow" @click="Committer.setPitchStyle(squadCreatorStore.settings.pitchStyle + 1)"
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
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";

interface Props{
    
}

const props = defineProps<Props>();
const squadCreatorStore = store.state.squadCreatorStore;
const pitchStyleAmount = ref(1);

onMounted(()=>{
    const styles = document.getElementsByClassName('sc-pitch-style');
    pitchStyleAmount.value = styles.length;
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
        moveBar(ev);
    }

    document.addEventListener('mousemove', onPullMove);
    document.addEventListener('mouseup', onPullUp);
}

function onPullMove(ev){
    if(!dragging){
        if(Math.abs(ev.clientX - dragStart) < 4) return;
        dragging = true;
    }

    moveBar(ev);
}

function moveBar(ev){
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
    if(!(pitchStyleAmount.value > 1)){
        sliderPull.style.setProperty('left', '-4px');
        return;
    }

    var num = 1/pitchStyleAmount.value;
}

</script>


<style lang="scss" scoped>

</style>