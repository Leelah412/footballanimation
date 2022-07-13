<template>
<div id="canvas" @mousedown="onCanvasMousedown" @contextmenu="onContextMenu">
    <!-- TOOD: viewBox position -->
    <svg id="svg-canvas" xmlns="http://www.w3.org/2000/svg"
        :width="width + 'px'" :height="height + 'px'" :viewBox="x + ' ' + y + ' ' + width + ' '  + height">
        <rect :width="width" :height="height" fill="none"/>
        <g :transform="`translate(${width/2},${height/2}), scale(${scale}) `" >
            <PitchVue :pitch="pitch" />
            <g v-for="(entity, key) in entityList" :key="key" :id="`player-id-${entity.id}`">
                <PlayerVue v-if="(entity instanceof Player)" :player="entity"
                    v-on:player-selected="sel=>playerSelected(entity, sel)" v-on:playerMoved="pos=>playerMoved(entity)" 
                    v-on:dropdown="openDropdown"/>
            </g>
        </g>
    </svg>

    <div class="flex-column position-absolute noselect" style="top: 8px; left: 8px; opacity: 0.8; padding: 8px; width: 256px;">
        <span style="font-size: 16px; margin-right: auto;">x: {{x}}</span>
        <span style="font-size: 16px; margin-right: auto;">y: {{y}}</span>
    </div>

    <PlayerProperties v-if="selectedPlayer !== null" :player="selectedPlayer" />
</div>
</template>

<script lang="ts" setup>
import Pitch from '../model/Pitch';
import PitchVue from '../view/Pitch.vue';
import Player from '../model/Player';
import PlayerVue from '../view/Player.vue';
import CanvasObject, { EntityList } from '../model/CanvasObject';
import { ref } from '@vue/reactivity';
import PlayerProperties from '../view/PlayerProperties.vue';
import Global from '../helper/Global';
import Vector2 from '../math/Vector2';
import Snapshot from '../model/Snapshot';
import Settings from '../model/Settings';
import { onMounted } from '@vue/runtime-core';
import { DropdownItem } from '../misc/dropdown-menu.vue';

interface Props{
    pitch: Pitch
    entityList: EntityList
    width: number
    height: number
    scale: number
    yAxis: number
    xAxis: number
}

const props = defineProps<Props>();

const emit = defineEmits(['dropdown']);

function openDropdown(items: DropdownItem[], x: number, y: number){
    emit('dropdown', items, x, y);
}

////////////////

onMounted(()=>setCanvasPosition(new Vector2()));

const selectedPlayer = ref<Player | null>(null);

function playerSelected(player: Player, isSelected: boolean){
    selectedPlayer.value = isSelected ? player : null;
    if(!isSelected) return;

    setPropertyMenuPosition(player);

}

// use this function to move the property menu, when moving the player
function playerMoved(player: Player){
    if(selectedPlayer.value === null) return;
    // if selected player is for some reason not "player", reset selected player to null and return
    if(selectedPlayer.value !== player){
        selectedPlayer.value = null;
        return;
    }
    setPropertyMenuPosition(player);
}

    // set the position of the player property thing right above the selected player instance
function setPropertyMenuPosition(player: Player){
    var pl = document.getElementById(`player-${player.id}`);
    var cnv = document.getElementById('canvas');
    if(pl === null || pl === undefined) return;
    if(cnv === null || cnv === undefined) return;

    var pos = pl.getBoundingClientRect();
    cnv.style.setProperty('--property-left', `${(pos.x + pos.width/2) - (192 + 48)/2}px`);
    cnv.style.setProperty('--property-top', `${(pos.y + pos.height/2) - 80}px`);
}


const canvasDragStartRadius = 4;
var canvasDragStartPos: Vector2;
var canvasDragCurrentPos: Vector2;
var dragCanvas: boolean = false;

function onCanvasMousedown(ev){
    
    // middle button clicked
    if(ev.button === 1){
        canvasDragStartPos = new Vector2(ev.clientX, ev.clientY);
        // add the mousemove event to the listener of the whole document
        document.addEventListener('mousemove', onCanvasMousemove);
        document.addEventListener('mouseup', onCanvasMouseup);
    }
}

function onCanvasMousemove(ev){
    console.log("mouse moving");
    
    // get mouse position
    var pos = new Vector2(ev.clientX, ev.clientY);
    if(!dragCanvas){
        if(canvasDragStartPos.length(pos) < canvasDragStartRadius) return;
        // set the start position to be the current position,
        // as we will get the difference between canvasDragCurrentPos and the actual current position
        canvasDragCurrentPos = canvasDragStartPos;
        dragCanvas = true;
    }

    var curr: Vector2 = pos.distanceTo(canvasDragCurrentPos);
    addCanvasPosition(curr.x, curr.y);

    canvasDragCurrentPos = pos;
    
}

function onCanvasMouseup(ev){
    document.removeEventListener('mousemove', onCanvasMousemove);
    document.removeEventListener('mouseup', onCanvasMouseup);
    dragCanvas = false;
    
}

function onContextMenu(ev){
    ev.preventDefault();

    // only except context menu actions with right click
    if(ev.button != 2) return;

}

////////////
// VISUAL //
////////////

const x = ref(0);
const y = ref(0);

function addCanvasPosition(_x: number, _y: number){
    Global.canvasPosition.x += _x;
    Global.canvasPosition.y += _y;
    x.value = Global.canvasPosition.x;
    y.value = Global.canvasPosition.y;

}

function setCanvasPosition(pos: Vector2){
    Global.canvasPosition.x = pos.x;
    Global.canvasPosition.y = pos.y;
    x.value = Global.canvasPosition.x;
    y.value = Global.canvasPosition.y;
}

</script>

<style>

#canvas{
    position: relative;
/*     width: 100vw;
    height: 100vh; */
}

#svg-canvas{
    position: absolute;
    left: 0;
    top: 0;
    
}

.player-properties{
    left: var(--property-left);
    top: var(--property-top);
}

</style>