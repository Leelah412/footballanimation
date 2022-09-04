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
            <div class="slider-container">
                <svg class="slider-arrow" @click="Committer.setPitchStyle(store.state.squadCreatorStore.settings.pitchStyle - 1)"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" transform="scale(-1,1)">
                    <path d="M8 5v14l11-7z" fill="var(--accent-light)" stroke="var(--accent-dark)" stroke-width="2"/>
                </svg>

                <div class="slider-pull" id="slider-pull-style" @mousedown="ev => onPullDown(ev, 'style')">
                    <div class="pull" id="pull-style" @mousedown="ev => onPullDown(ev, 'style')"></div>
                </div>

                <svg class="slider-arrow" @click="Committer.setPitchStyle(store.state.squadCreatorStore.settings.pitchStyle + 1)"
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