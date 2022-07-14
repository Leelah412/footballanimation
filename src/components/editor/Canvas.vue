<template>
<div id="canvas" @mousedown="onCanvasMousedown" @contextmenu="onContextMenu">
    <!-- TOOD: viewBox position -->
    <svg id="svg-canvas" xmlns="http://www.w3.org/2000/svg"
        :width="width + 'px'" :height="height + 'px'" :viewBox="x + ' ' + y + ' ' + width + ' '  + height">
        <!-- <rect :width="width" :height="height" fill="none"/> -->        

        <g :transform="`translate(${width/2},${height/2}), scale(${scale}) `" >
            <PitchVue :pitch="pitch" />
            <g v-for="(entity, key) in entityList" :key="key" :id="`player-id-${entity.id}`">
                <PlayerVue v-if="(entity instanceof Player)" :player="entity"
                    v-on:playerSelected="sel=>playerSelected(entity, sel)" v-on:playerMoved="pos=>playerMoved(entity)" 
                    v-on:startDragging="onEntityStartDraggin" v-on:stopDragging="onEntityStopDraggin"
                    v-on:dropdown="openDropdown"
                    v-on:remove-from-squad="s => onDeleteEntity(entity, s)" v-on:remove-from-team="s => onDeleteEntity(entity, s)" v-on:remove-completely="s => onDeleteEntity(entity, s)"/>
            </g>
        </g>

        <!-- delete button -->
        <g v-if="/* draggedEntity !== null &&  */rect !== null" id="canvas-remove-entity" :transform="`translate(${x + 48},${y + rect.height - 80})`" 
            @mouseenter="onDeleteEnter" @mouseleave="onDeleteLeave">
            <circle cx="16" cy="16" r="32" fill="var(--red)"/>
            <g :transform="`translate(-2,-2), scale(1.5)`">
                <path fill="var(--light)" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
            </g>
        </g>

    </svg>

    <div class="flex-column position-absolute noselect" style="top: 8px; left: 8px; opacity: 0.8; padding: 8px; width: 256px;">
        <span style="font-size: 16px; margin-right: auto;">x: {{x}}</span>
        <span style="font-size: 16px; margin-right: auto;">y: {{y}}</span>
    </div>

    <!-- <PlayerProperties v-if="selectedPlayer !== null" :player="selectedPlayer" /> -->

<!--     <div id="canvas-remove-entity">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
        </svg>
    </div> -->

    <!-- to -->
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
import { onMounted, onUnmounted } from '@vue/runtime-core';
import { DropdownItem } from '../misc/dropdown-menu.vue';
import func from 'vue-temp/vue-editor-bridge';

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

const emit = defineEmits(['dropdown', 'playerSelected', 'deleteEntity']);

function openDropdown(items: DropdownItem[], x: number, y: number){
    emit('dropdown', items, x, y);
}

////////////////

onUnmounted(()=>{
    window.removeEventListener('resize', setCanvasRect);
});

onMounted(()=>{
    setCanvasPosition(new Vector2());
    setCanvasRect();    

    window.addEventListener('resize', setCanvasRect);
});

const hoverDelete = ref<boolean>(false);

function onDeleteEnter(ev){    
    hoverDelete.value = true
}

function onDeleteLeave(ev){
    hoverDelete.value = false
}

const draggedEntity = ref<CanvasObject | null>(null);

function onEntityStartDraggin(entity: CanvasObject){
    draggedEntity.value = entity;
}

function onEntityStopDraggin(entity: CanvasObject){
    // if hovering over delete button, delete entity
    if(hoverDelete.value){
        console.log('delete entity');
        
        emit('deleteEntity', entity);
    }
    
    draggedEntity.value = null;
}

// delete a canvas object and send additional data, if necessary
function onDeleteEntity(entity: CanvasObject, data: any){
    emit('deleteEntity', entity, data);
}


const selectedPlayer = ref<Player | null>(null);

// emit signal, that player has been selected to show its properties in the menu and navbar
function playerSelected(player: Player, isSelected: boolean){
    selectedPlayer.value = isSelected ? player : null;
    emit('playerSelected', selectedPlayer.value);

    /* setPropertyMenuPosition(player); */

}

// use this function to move the property menu, when moving the player
function playerMoved(player: Player){
    if(selectedPlayer.value === null) return;
    // if selected player is for some reason not "player", reset selected player to null and return
    if(selectedPlayer.value !== player){
        selectedPlayer.value = null;
        return;
    }
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

const rect = ref<DOMRect | null>(null);

// returns the dimensions of the canvas
function setCanvasRect(){
    var cnv = document.getElementById('canvas');
    if(cnv === undefined || cnv === null) return;

    rect.value = cnv.getBoundingClientRect();
}

</script>



<style lang="scss" scoped>

#canvas{
    position: relative;
    width: 100%;                // must set to 100%, otherwise rect returns 0 for width
    height: 100%;
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

$remove-entity-size: 64px;
#canvas-remove-entity{
    /* cursor: pointer; */

    box-shadow: 0 0 4px var(--dark);
    opacity: 0.6;
    transition-duration: 0.2s;
    transition-property: opacity;

    &:hover{
        opacity: 0.8;
    }
}

</style>