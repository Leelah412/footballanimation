<template>
<g class="noselect" :id="`player-${player.id}`" :transform="`translate(${pl.position.x}, ${pl.position.y})`">
    <g class="player-circle" @mousedown="onmousedown">
        <circle :r="radius" :fill="Settings.settings.entityColors.homeColors.main" :stroke="Settings.settings.entityColors.homeColors.secondary" :stroke-width="strokeWidth" />
        <g v-if="!asTool">
            <circle v-if="selected" :r="radius+1" stroke="#ee0" stroke-width="0.25" stroke-dasharray="1,1" stroke-linecap="round" fill="none" />
            <text class="player-number" v-show="pl.number > 0">{{pl.number}}</text>
            <text class="player-name" y="4" >{{pl.name}}</text>
        </g>
    </g>
<!--     <foreignObject @click="ontextclick" :x="`-${30}`" y="0" width="60" height="20">
        <input class="player-name" placeholder="<name>" v-model="name"/>
    </foreignObject> -->
</g>
</template>

<script lang="ts" setup>
import { ref } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";
import Global from "../helper/Global";
import Vector2 from "../math/Vector2";
import Player from "../model/Player";
import Settings from "../model/Settings";

const props = defineProps({
    player: {
        type: Player,
        required: true
    },
    asTool: {
        type: Boolean,
        default: false
    }
})

const radius = ref(2);
const strokeWidth = ref(1);

const pl = ref(props.player);
const name = ref(props.player.name);
const selected = ref(false);

var selectRadius = 4;
var leftMBDown: boolean = false;
var rightMBDown: boolean = false;
// the radius around the clicking point, which has to be overcome to start dragging
const dragStartRadius = 8;
var dragStartPos: Vector2;
var dragging: boolean = false;

// player name text double clicked to make editable
var playerNameClicked = false;
var playerNameClickTime = 0;
var playerNameEdit = true;

watch(name, (newName, oldName)=>{
    pl.value.name = newName;
})

function onmousedown(ev){
    if(props.asTool) return;
    // left mb
    if(ev.button === 0){
        leftMBDown = true;
        var pos = getMousePosition(ev);
        if(pos === null) return;
        dragStartPos = pos;
        // connect with canvas events
        connectCanvasEvent();
    }
    // right mb
    if(ev.button === 2){
        rightMBDown = true;
    }

}

const emit = defineEmits(['playerSelected', 'playerMoved']);

function onmouseup(ev){
    // left mb
    if(ev.button === 0){
        // disconnect from canvas events
        disconnectCanvasEvent();

        leftMBDown = false;
        var pos = getMousePosition(ev);
        if(pos === null) return;
        if(dragStartPos.length(pos) < selectRadius){
            selected.value = !selected.value;
            emit("playerSelected", selected.value);
        };
    }
    // right mb
    if(ev.button === 2){
        rightMBDown = false;
    }
    if(dragging){
        dragging = false;
    }
}

function onmousemove(ev){
    // only relevant, if left mb is down
    if(!leftMBDown) return;

    var pos = getMousePosition(ev);
    if(pos === null) return;

    if(!dragging){
        if(dragStartPos.length(pos) < dragStartRadius) return;
        dragging = true;
    }

    // set the position based on the viewport-pitch projection
    pl.value.position = Global.viewportToPitch(pos);
    emit('playerMoved', pl.value.position);

}

function ontextover(ev){
    ev.preventDefault();
}

function ontextclick(ev){
    ev.preventDefault();
    if(playerNameClicked){
        // register as double click
        if(Date.now() - playerNameClickTime < 500){
            playerNameEdit = true;
            const cnv = document.getElementById('canvas');
            if(cnv != null){
                cnv.style.contentEditable = true;
            }
        }
        playerNameClicked = false;
    }
    else{
        playerNameClicked = true;
        playerNameClickTime = Date.now();
    }
}

/// HELPERS

// get the mouse position relative to the svg canvas
function getMousePosition(ev): Vector2 | null{
    const rect = document.getElementById('svg-canvas')?.getBoundingClientRect();
    if(rect === undefined) return null;
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;

    /* console.log("mouse: x=", x, " y=", y); */
    
    return new Vector2(x, y);
}

function connectCanvasEvent(){
    // connect player with mousemove event of the canvas
    const cnv = document.getElementById('svg-canvas');
    if(cnv === undefined || cnv === null) return null;
    cnv.addEventListener('mousemove', onmousemove);
    cnv.addEventListener('mouseup', onmouseup);
}

function disconnectCanvasEvent(){
    // connect player with mousemove event of the canvas
    const cnv = document.getElementById('svg-canvas');
    if(cnv === undefined || cnv === null) return null;
    cnv.removeEventListener('mousemove', onmousemove);
    cnv.removeEventListener('mouseup', onmouseup);
}

</script>

<style lang="scss" scoped>

.player-circle:hover{
    filter: contrast(0.8);
}

.player-circle:active{
    filter: contrast(1.2);
}

text{
    text-anchor: middle;
    dominant-baseline: middle;
}

.player-number{
    font-size: 1.5pt;
    text-align: center;
}

.player-name{
    font-size: 1.5pt;
    text-align: center;
    pointer-events: none;
}

</style>