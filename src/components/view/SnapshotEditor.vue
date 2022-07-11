<template>

<div id="snapshot-editor">
    <div id="se-header">
        <h5 class="noselect">SNAPSHOT EDITOR</h5>
        <div id="snapshot-jump-to-container">
            <label for="snapshot-jump-to" class="noselect">JUMP TO</label>
            <input type="number" class="input-number-dark" id="snapshot-jump-to" min="0" :max="_snapshotList.length-1"/>
        </div>

    </div>
    <div id="se-content">
        <div v-if="isOverflow" class="sec-move" id="sec-move-left">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#ccc">
                <path d="M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z"/>
            </svg>
        </div>
        <div id="sec-snapshots">
            <div v-for="(snap, idx) in _snapshotList" :key="idx" class="secs-snapshot">
                <div class="secss-filler" @mouseover="ev => mouseOverFiller(idx)" @mouseleave="mouseLeftFiller">
                    <div v-if="fillerPosition === idx" class="se-add-frame" @click="ev => addSnapshot(idx)">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#fff">
                            <path d="M0 0h24v24H0z" fill="none"/>
                            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                        </svg>
                    </div>
                </div>
                <div class="secss-frame" @mousedown="ev=>onSnapMouseDown(ev, snap)" @mouseup="ev=>onSnapMouseUp(ev, snap)" @mousemove="ev=>onSnapMouseMove(ev, snap)">
                    <span class="noselect">{{idx}}</span>
                </div>
            </div>
            <div class="se-add-frame" @click="ev => addSnapshot(_snapshotList.length)">
                <div v-if="_snapshotList.length === 0" >
                    <span class="noselect">FRAME</span>
                    <svg v-if="fillerPosition === -1" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#fff">
                        <path d="M0 0h24v24H0z" fill="none"/>
                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                    </svg>
                </div>
                <svg v-else v-show="fillerPosition === -1" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#fff">
                    <path d="M0 0h24v24H0z" fill="none"/>
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                </svg>
            </div>
        </div>
        <div v-if="isOverflow" class="sec-move" id="sec-move-right">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#ccc" transform="scale(-1,1)">
                <path d="M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z"/>
            </svg>
        </div>
    </div>
</div>

</template>

<script lang="ts" setup>
import { ref } from '@vue/reactivity';
import Snapshot from '../model/Snapshot';

interface Props {
    snapshotList: Snapshot[],
    takeSnapshot: Function
}

const props = defineProps<Props>();
const emit = defineEmits(['showSnapshot']);

const _snapshotList = ref(props.snapshotList);

const fillerPosition = ref(-1);

// if true: enable scrolling and show the arrows
const isOverflow = ref(false);

// adds a snapshot at the given position
function addSnapshot(pos: number){
    // take a snapshot with the function prop
    var ss: Snapshot = props.takeSnapshot();
    _snapshotList.value.splice(pos, 0, ss);
}

function reorderSnapshot(snap: Snapshot){

}

function mouseOverFiller(pos: number){
    fillerPosition.value = pos;
}

function mouseLeftFiller(){
    fillerPosition.value = -1;
}

var mousedown: boolean = false;
var reorder: boolean = false;

function onSnapMouseDown(ev, snap: Snapshot){
    mousedown = true;
}

function onSnapMouseUp(ev, snap: Snapshot){
    mousedown = false;
    if(reorder){
        return;
    }

    console.log("emitting show snapshot");
    
    emit('showSnapshot', snap);
}

function onSnapMouseMove(ev, snap: Snapshot){
    if(!mousedown) return;
}



</script>

<style lang="scss" scoped>

#snapshot-editor{
    display: flex;
    flex-direction: column;
    
    width: 100%;
    height: 100%;
}

#se-header{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    letter-spacing: 2px;
    height: 32px;
    h5{
        font-weight: 300;
        margin-left: 8px;
        margin-right: auto;
    }
}

#snapshot-jump-to-container{
    margin-left: auto;
    margin-right: 8px;
}

#snapshot-jump-to{
    margin-left: 8px;
    width: 64px;
}

#se-content{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    padding: 8px;
    margin: 8px;
    height: 100%;
    border-radius: 2px;

    background: var(--secondary);
    box-shadow: inset 0 0 4px var(--dark);
}

.sec-move{
    width: 32px;
    cursor: pointer;
}

#sec-move-left{
    margin-left: 8px;
    margin-right: auto;

}

#sec-move-right{
    margin-left: auto;
    margin-right: 8px;
}

#sec-snapshots{
    display: flex;
    flex-direction: row;
/*     justify-content: center;
    align-items: center; */

}

.secs-snapshot{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.secss-frame{
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 32px;
    height: 32px;
    background: rgb(18, 87, 156);
    span{
        font-size: x-small;
    }
    transition-duration: 0.2s;
}

.secss-frame:hover{
    background: rgb(26, 122, 218);
}

.secss-filler{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 8px;
    height: 32px;
    background: #cc23;
    transition-duration: 0.2s;
}

.secss-filler:hover{
    background: none;
    width: 32px;
}

.se-add-frame{
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background: #cc2;
    border-radius: 2px;
    width: 32px;
}

label{
    letter-spacing: 0px;
    font-weight: 300;
}



</style>