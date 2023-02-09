<template>
<div id="canvas" @mousedown="onCanvasMousedown" @contextmenu="onContextMenu">

    <svg id="svg-canvas" xmlns="http://www.w3.org/2000/svg"
        :width="width + 'px'" :height="height + 'px'" :viewBox="x + ' ' + y + ' ' + width + ' '  + height">
        <!-- <rect :width="width" :height="height" fill="none"/> -->        

        <g :transform="`translate(${width/2},${height/2}), scale(${scale}) `" >
            <Pitch />
            
            <!-- team names/logos HOME -->
            <g :transform="`translate(${-store.state.editorStore.pitch.size.x/2 + 2},${store.state.editorStore.pitch.size.y/2 - 2})`" opacity="0.5">
                <text fill="var(--light)" font-size="4px" class="team-name">
                    {{ store.state.editorStore.settings.showTeamName ? store.state.editorStore.home.name : ''}}
                    {{(store.state.editorStore.settings.showTeamName && store.state.editorStore.settings.showTeamShort) ? '(' : ''}}<!--  -->
                    {{ store.state.editorStore.settings.showTeamShort ? store.state.editorStore.home.short : ''}}<!--  -->
                    {{(store.state.editorStore.settings.showTeamName && store.state.editorStore.settings.showTeamShort) ? ')' : ''}}
                </text>
            </g>

            <!-- team names/logos AWAY -->
            <g :transform="`translate(${store.state.editorStore.pitch.size.x/2 - 2},${store.state.editorStore.pitch.size.y/2 - 2})`" opacity="0.5">
                <text fill="var(--light)" font-size="4px" text-anchor="end" class="team-name">
                    {{ store.state.editorStore.settings.showTeamName ? store.state.editorStore.away.name : ''}}
                    {{(store.state.editorStore.settings.showTeamName && store.state.editorStore.settings.showTeamShort) ? '(' : ''}}<!--  -->
                    {{ store.state.editorStore.settings.showTeamShort ? store.state.editorStore.away.short : ''}}<!--  -->
                    {{(store.state.editorStore.settings.showTeamName && store.state.editorStore.settings.showTeamShort) ? ')' : ''}}
                </text>
            </g>

            <g v-for="(entity, key) in store.state.editorStore.entityList" :key="key" :id="`player-id-${entity.id}`">
                <PlayerVue v-if="(entity instanceof Player)" :player="entity" :selected="selectedEntity === entity"
                    v-on:playerSelected="entitySelected" 
                    v-on:startDragging="onEntityStartDragging" v-on:stopDragging="onEntityStopDragging"
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

    <!-- to -->
</div>
</template>

<script lang="ts" setup>
import Player from '@/components/model/Player';
import PlayerVue from '@/components/view/Player.vue';
import CanvasObject, { EntityList } from '@/components/model/CanvasObject';
import { ref } from '@vue/reactivity';
import PlayerProperties from '@/components/view/PlayerProperties.vue';
import Global from '@/components/util/Global';
import Vector2 from '@/components/math/Vector2';
import Snapshot from '@/components/model/Snapshot';
import Settings from '@/components/model/CanvasSettings';
import { onMounted, onUnmounted } from '@vue/runtime-core';
import { DropdownItem } from '@/components/misc/dropdown-menu.vue';
import store from '@/store/index';
import Pitch from '@/components/view/Pitch.vue';
import { Committer } from '@/store/modules/editor_committer';

interface Props{
    
}

const props = defineProps<Props>();
const emit = defineEmits(['dropdown', 'entitySelected']);

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

function onEntityStartDragging(entity: CanvasObject){
    draggedEntity.value = entity;
}

function onEntityStopDragging(entity: CanvasObject){
    // if hovering over delete button, delete entity
    if(hoverDelete.value){
        Committer.deleteEntity(entity);
        console.log('delete entity');
    }
    
    draggedEntity.value = null;
}

// delete a canvas object and send additional data, if necessary
function onDeleteEntity(entity: CanvasObject, data: any){
    Committer.deleteEntity(entity, data);
}

// single player select TODO: extend this to CanvasObject in general
const selectedEntity = ref<CanvasObject | null>(null);
// TODO: allow multi-select of canvas objects
const selectedCanvasObjectList = ref<CanvasObject[]>([]);

// emit signal, that player has been selected to show its properties in the menu and navbar
function entitySelected(entity: CanvasObject){

    // if selected player was already selected, deselect him
    if(selectedEntity.value === entity){
        selectedEntity.value = null;
        emit('entitySelected', null);
        return;
    }

    selectedEntity.value = entity;
    emit('entitySelected', selectedEntity.value);

}

// use this function to move the property menu, when moving the player
/* function playerMoved(player: Player){
    if(selectedPlayer.value === null) return;
    // if selected player is for some reason not "player", reset selected player to null and return
    if(selectedPlayer.value !== player){
        selectedPlayer.value = null;
        return;
    }
} */

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

const width = ref(0);
const height = ref(0);
const scale = ref(1);
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
    // set width and height of canvas svg
    width.value = rect.value.width;
    height.value = rect.value.height;

    // calculate the scale based on the canvas viewport
    var base: number = width.value > height.value ? height.value : width.value;
    const margin: number = 1;
    scale.value = (base * margin) / store.state.editorStore.pitch.size.x;
    // set the global variables to the correct values
    Global.scale = scale.value;
    Global.origin = new Vector2(width.value/2, height.value/2);
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