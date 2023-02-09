<template>

<g class="noselect" :id="`player-${player.id}`" :transform="`translate(${pl.position.x}, ${pl.position.y})`">
    <g class="player-circle" @mousedown="onmousedown" @contextmenu="openDropdown">
        <circle :r="radius" :fill="getTeamColors()[0]" :stroke="getTeamColors()[1]" :stroke-width="strokeWidth" />
        <g v-if="!asTool">
            <circle v-if="selected" :r="radius+1" stroke="var(--accent)" stroke-width="0.25"  stroke-linecap="round" fill="none" />
            <text class="player-number" :fill="getPlayerNumberColor()" v-show="pl.number > 0">{{pl.number}}</text>
            <text class="player-name" :fill="getPlayerNameColor()" y="4" >{{pl.name}}</text>
        </g>
    </g>
<!--     <foreignObject @mouseup="onmouseup" :x="`-${30}`" y="0">
        <dropdown-menu :items="dropdown"/>
    </foreignObject> -->
</g>

</template>


<script lang="ts" setup>
import { ref } from "@vue/reactivity";
import { onUpdated, watch } from "@vue/runtime-core";
import { extend } from "@vue/shared";
import Global from "@/components/util/Global";
import Vector2 from "@/components/math/Vector2";
import dropdownMenuVue, { DropdownItem } from "../misc/dropdown-menu.vue";
import Jersey from "@/components/model/Jersey";
import Player from "@/components/model/Player";

interface Props{
    player: Player
    selected: boolean
    asTool: boolean
}

const props = withDefaults(defineProps<Props>(), {
    selected: false,
    asTool: false
})

const emit = defineEmits(['playerSelected', 'startDragging', 'playerMoved', 'stopDragging',
                          'removeFromSquad', 'removeFromTeam', 'removeCompletely']);

// dropdown to show, when click
const dropdown: DropdownItem[] = [
    {name: props.player.name || 'name', action(): boolean | undefined{return false}},
    {name: 'Properties...', action(): boolean | undefined{return undefined}, items: [{name: 'Test', action(): boolean | undefined{return undefined}}]},
    // remove player from first team
    {name: 'Remove from Squad', action(): boolean | undefined{
            emit('removeFromSquad', 'removeFromSquad');
            return undefined
        }
    },
    // remove player from team completely and send to "other" list
    {name: 'Remove from Team', action(): boolean | undefined{
            emit('removeFromTeam', 'removeFromTeam');
            return undefined
        }
    },
    // remove player completely from the local DB
    {name: 'Remove completely', action(): boolean | undefined{
            emit('removeCompletely', 'removeCompletely');
            return undefined
        }
    },
]

//////////////

const radius = ref(2);
const strokeWidth = ref(1);

const pl = ref(props.player);
const name = ref(props.player.name);

//////////////

onUpdated(()=>{
    console.log('updated prob change team');
});

var jersey: Jersey | null = null;

// have to use a functions for reactivity
function getTeamColors(){
    if(pl.value.team !== undefined && pl.value.team !== null)
        return pl.value.team.colorPalette;
    return ['#000', '#fff'];
}

function getPlayerNameColor(){
    if(pl.value.team !== undefined && pl.value.team !== null)
        return pl.value.team.colorPlayerName;
    return '#fff';
}

function getPlayerNumberColor(){
    if(pl.value.team !== undefined && pl.value.team !== null)
        return pl.value.team.colorPlayerNumber;
    return '#fff';
}

function getJersey(){
    if(pl.value.team === undefined || pl.value.team === null) return;

    if(props.player.isGoalkeeper)   return pl.value.team.goalkeeperJersey;
    else                            return pl.value.team.playerJersey;
}

var selectRadius = 4;
var leftMBDown: boolean = false;
var rightMBDown: boolean = false;
// the radius around the clicking point, which has to be overcome to start dragging
const dragStartRadius = 8;
var dragStartPos: Vector2;
var dragging: boolean = false;

// player name text double clicked to make editable
/* var playerNameClicked = false;
var playerNameClickTime = 0;
var playerNameEdit = true; */

watch(name, (newName, oldName)=>{
    pl.value.name = newName;
})

function onmousedown(ev){
    if(props.asTool) return;
    // left mb
    if(ev.button === 0){
        leftMBDown = true;
        var pos = new Vector2(ev.clientX, ev.clientY);
        
        dragStartPos = pos;
        // connect with canvas events
        connectCanvasEvent();
    }
    // right mb
    if(ev.button === 2){
        rightMBDown = true;
    }

}

function onmouseup(ev){
    // left mb
    if(ev.button === 0){
        // disconnect from canvas events
        disconnectCanvasEvent();

        leftMBDown = false;
        var pos = new Vector2(ev.clientX, ev.clientY);
        
        if(dragStartPos.length(pos) < selectRadius){
            emit("playerSelected", props.player);
        };
    }
    // right mb
    if(ev.button === 2){
        rightMBDown = false;
    }
    if(dragging){
        dragging = false;        
        emit('stopDragging', props.player);
    }
}

function onmousemove(ev){
    // only relevant, if left mb is down
    if(!leftMBDown) return;

    var pos = new Vector2(ev.clientX, ev.clientY);

    if(!dragging){
        if(dragStartPos.length(pos) < dragStartRadius) return;
        dragging = true;
        emit('startDragging', props.player);
    }

    // set the position based on the viewport-pitch projection
    pl.value.position = Global.viewportToPitch(pos);
    emit('playerMoved', pl.value.position);

}

function openDropdown(ev){
    if(ev.button == 2){
        ev.preventDefault();
        
        const editor = document.getElementById('editor');
        if(editor === null || editor === undefined) return;

        console.log(dropdownMenuVue);
        console.log(extend(dropdownMenuVue));
        // open dropdown menu
        var Dropdown = extend(dropdownMenuVue);
        console.log(Dropdown);
        
    }
}

/* function ontextover(ev){
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
} */

// HELPERS

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