<template>
    
<g :transform="`translate(${player.position.x},${player.position.y}),
        rotate(${store.state.squadCreatorStore.settings.pitchOrientation !== 'horizontal' ? '90' : '0'})`">
    
    <!-- CIRCLE STYLES -->

    <!-- STYLE 0 -->
    <g class="sc-circle-style">
        <circle v-if="store.state.squadCreatorStore.settings.circleStyle === 0" :class="`player-circle${selected ? '-active' : ''}`" @mousedown="onMouseDown" cx="0" cy="0" r="2"
            :fill="store.state.squadCreatorStore.settings.teamColors[0]" :stroke="store.state.squadCreatorStore.settings.teamColors[1]" :stroke-width="1" />
    </g>

    <!-- STYLE 1 -->
    <g class="sc-circle-style">
        <circle v-if="store.state.squadCreatorStore.settings.circleStyle === 1" :class="`player-circle${selected ? '-active' : ''}`" @mousedown="onMouseDown" cx="0" cy="0" r="2"
            :fill="store.state.squadCreatorStore.settings.teamColors[0]" :stroke="store.state.squadCreatorStore.settings.teamColors[1]" :stroke-width="1" />
    </g>
    
    <!-- SELECTED HIGHLIGHTERS -->
    <circle v-if="selected" style="pointer-events:none;" cx="0" cy="0" r="2.5" fill="var(--light)" opacity="0.3"/>

    <!-- PLAYER -->
    <text fill="var(--light)" font-size="2" text-anchor="middle" y="5">
        <tspan v-if="player.positionShort !== ''" fill="var(--accent-light)" style="font-weight: 600;">{{player.positionShort}}&ensp;</tspan>
        <tspan>{{player.name}}</tspan>
    </text>
</g>

</template>


<script lang="ts" setup>
import Vector2 from "@/components/math/Vector2";
import Player from "@/components/model/Player";
import store from "@/store";


interface Props{
    player: Player,
    selected: boolean
}

const props = withDefaults(defineProps<Props>(), {
    selected: false
});
const emit = defineEmits(['select']);

var dragStart: Vector2 = new Vector2();
var dragStartPlayerPos: Vector2 = new Vector2();
var dragging: boolean = false;

function onMouseDown(ev){
    
    dragStart.x = ev.clientX;
    dragStart.y = ev.clientY;
    if(store.state.squadCreatorStore.settings.pitchOrientation !== 'horizontal'){
        dragStartPlayerPos.x = props.player.position.y;
        dragStartPlayerPos.y = props.player.position.x;
    }
    else{
        dragStartPlayerPos = props.player.position.copy();
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
}

function onMouseMove(ev){
    if(!dragging){
        if(dragStart.length(new Vector2(ev.clientX, ev.clientY)) < 8) return;
        
        dragging = true;
    }

    const scs = store.state.squadCreatorStore;

    const dragCurr = new Vector2(ev.clientX, ev.clientY);
    const dragDiff = new Vector2(dragCurr.x - dragStart.x, dragCurr.y - dragStart.y);
    const pitchSize: Vector2 = scs.settings.pitchSize;
    var dragNewPlayerPos;

    if(store.state.squadCreatorStore.settings.pitchOrientation !== 'horizontal'){
        dragNewPlayerPos = new Vector2(-dragDiff.y / scs.settings.canvasScale + dragStartPlayerPos.y, dragDiff.x / scs.settings.canvasScale + dragStartPlayerPos.x);
        if(dragNewPlayerPos.y < -pitchSize.y/2) dragNewPlayerPos.y = -pitchSize.y/2
        else if(dragNewPlayerPos.y > pitchSize.y/2) dragNewPlayerPos.y = pitchSize.y/2

        if(dragNewPlayerPos.x < -pitchSize.x/2) dragNewPlayerPos.x = -pitchSize.x/2
        else if(dragNewPlayerPos.x > pitchSize.x/2) dragNewPlayerPos.x = pitchSize.x/2
    }
    else{
        dragNewPlayerPos = new Vector2(dragDiff.x / scs.settings.canvasScale + dragStartPlayerPos.x, dragDiff.y / scs.settings.canvasScale + dragStartPlayerPos.y);
        if(dragNewPlayerPos.x < -pitchSize.x/2) dragNewPlayerPos.x = -pitchSize.x/2
        else if(dragNewPlayerPos.x > pitchSize.x/2) dragNewPlayerPos.x = pitchSize.x/2

        if(dragNewPlayerPos.y < -pitchSize.y/2) dragNewPlayerPos.y = -pitchSize.y/2
        else if(dragNewPlayerPos.y > pitchSize.y/2) dragNewPlayerPos.y = pitchSize.y/2
    }

    props.player.position = dragNewPlayerPos;
}

function onMouseUp(ev){

    if(!dragging){
        emit('select', props.player);
    }

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    dragging = false;

}


</script>


<style lang="scss" scoped>

.player-circle{
    filter: drop-shadow(0 0 0.5px var(--dark));
    &:hover{
        filter: drop-shadow(0 0 2px var(--dark));
    }
}

.player-circle-active{
    filter: drop-shadow(0 0 2px var(--dark));
}

</style>