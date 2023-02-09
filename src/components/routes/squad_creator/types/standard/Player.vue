<template>
    
<g :transform="`translate(${player.position.x},${player.position.y}),
        rotate(${squadCreatorStore.settings.pitchOrientation !== 'horizontal' ? '90' : '0'})`">

    <!-- DUMMY/PLACEHOLDER PLAYER -->
    <g v-if="player.isDummy || placeholder" :id="`dummy-${player.id}`" :class="`sc-dummy ${placeholder ? 'placeholder' : ''}`" transform="translate(-4.25, -4.5)"
        @mousedown="onMouseDown" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
        <defs>
        <linearGradient id="linearGradient1375" x1="66.152" x2="71.374" y1="93.947" y2="93.947" gradientTransform="translate(-64.715 -89.557)" gradientUnits="userSpaceOnUse">
            <stop style="stop-color:#0b0b0b" offset="0"/>
            <stop style="stop-color:#0e1e5b" offset=".5312"/>
            <stop style="stop-color:#0b0b0b" offset="1"/>
        </linearGradient>
        <filter id="filter2379" style="color-interpolation-filters:sRGB">
            <feFlood flood-color="rgb(0,0,0)" result="flood"/>
            <feComposite in="flood" in2="SourceGraphic" operator="in" result="composite1"/>
            <feGaussianBlur in="composite1" result="blur" stdDeviation="0.1"/>
            <feOffset dx="0" dy="0" result="offset"/>
            <feComposite in="SourceGraphic" in2="offset" result="composite2"/>
        </filter>
        <linearGradient id="linearGradient2407" x1="-249.63" x2="-235.67" y1="96.578" y2="44.486" gradientTransform="matrix(-.10147 .3787 .3787 .10147 -47.028 88.154)" gradientUnits="userSpaceOnUse">
            <stop style="stop-color:#643907" offset="0"/>
            <stop style="stop-color:#643907;stop-opacity:.49412" offset=".50371"/>
            <stop style="stop-color:#643907" offset="1"/>
        </linearGradient>
        <filter id="filter2617" style="color-interpolation-filters:sRGB">
            <feFlood flood-color="rgb(0,0,0)" result="flood"/>
            <feComposite in="flood" in2="SourceGraphic" operator="in" result="composite1"/>
            <feGaussianBlur in="composite1" result="blur" stdDeviation="0.2"/>
            <feOffset dx="0" dy="0" result="offset"/>
            <feComposite in="SourceGraphic" in2="offset" result="composite2"/>
        </filter>
        </defs>
        <path d="m4.2333 0.71755-3.7197 2.7026 1.4208 4.3728 4.5979-1.59e-5 1.4207-4.3727z" style="fill:#e5e5e5;stroke-width:.39206"/>
        <path d="m4.2333 0.71755-3.7197 2.7026 1.4208 4.3728 4.5979-1.6e-5 1.4207-4.3727z" style="fill:url(#linearGradient2407);stroke-width:.39206"/>
        <path d="m3.9436 3.339v0.79375h-0.79375l-2e-5 0.52917h0.79377l-2e-5 0.79375 0.52917 1.27e-4 2e-5 -0.79388 0.79373 1.27e-4 2e-5 -0.52917-0.79375-1.27e-4v-0.79362z" filter="drop-shadow(0 0 10px #000000)" style="fill:#091442;filter:url(#filter2379)"/>
        <path d="m4.4726 3.339-0.07939 0.07937v0.79375l0.07939-0.0795z" style="fill:#112063"/>
        <path d="m4.0226 3.419-0.07935-0.0795v0.79375l0.07935 0.0795z" style="fill:#112063"/>
        <path d="m3.2286 4.213-0.07935-0.0795-2e-5 0.52917 0.07937-0.07925z" style="fill:#3562a6"/>
        <path d="m5.1866 4.213 0.0794-0.07937-2e-5 0.52917-0.07938-0.07937z" style="fill:#3562a6"/>
        <path d="m4.3926 5.377 0.07937 0.07937-0.52917-1.27e-4 0.07937-0.07925z" style="fill:#6594c0"/>
        <path d="m4.0226 4.583-0.07939 0.07937v0.79375l0.07939-0.0795z" style="fill:#112063"/>
        <path d="m4.4726 4.662-0.07935-0.0795v0.79375l0.07935 0.0795z" style="fill:#112063"/>
        <path d="m4.3926 3.419 0.07937-0.07937-0.52917 1.27e-4 0.07937 0.07925z" style="fill:#6594c0"/>
        <path d="m4.0226 3.419v0.79375h-0.79375v0.37042h0.79375v0.79375l0.37042 5e-6v-0.79375l0.79375-3e-6v-0.37042l-0.79375 2e-6v-0.79375z" style="fill:url(#linearGradient1375)"/>
        <path transform="matrix(-.10147 .3787 .3787 .10147 -47.028 88.154)" d="m-249.26 68.575 9.1139-7.3803 9.8354 6.3872-3.0353 11.328-11.711 0.61376z" style="fill:none;filter:url(#filter2617);mix-blend-mode:normal;stroke-linecap:round;stroke-width:1.3497;stroke:#091442"/>
        <path d="m4.2333 0.71755-3.7197 2.7026 1.4208 4.3728 4.5979-1.59e-5 1.4207-4.3727z" style="fill:none;stroke-linecap:round;stroke-width:.37042;stroke:#0e1e5b"/>
    </g>

    <g v-else>
        <!-- CIRCLE -->
        <g :id="`player-${player.id}`" :class="`sc-circle ${selected ? 'active' : ''}`" v-html="getCircleStyle()" @mousedown="onMouseDown"></g>
        <!-- SELECTED HIGHLIGHTERS -->
        <circle v-if="selected" pointer-events="none" cx="0" cy="0" r="2.5" fill="var(--light)" opacity="0.3"/>
    </g>

    <!-- PLAYER -->
    <text fill="var(--light)" font-size="2" text-anchor="middle" y="6">
        <tspan v-if="player.positionShort !== ''" fill="var(--accent-light)" style="font-weight: 600; font-family: Unispace;">{{player.positionShort}}</tspan>
        <tspan v-if="!player.isDummy">&ensp;{{player.name}}</tspan>
    </text>
</g>

</template>


<script lang="ts" setup>
import Vector2 from "@/components/math/Vector2";
import Player from "@/components/model/Player";
import store from "@/store";
import CircleStyles from "@/components/model/SquadCreator/standard/CircleStyles";
import { ref } from "@vue/reactivity";

interface Props{
    player: Player,
    selected: boolean,
    placeholder: boolean
}

const props = withDefaults(defineProps<Props>(), {
    selected: false,
    placeholder: false
});
const emit = defineEmits(['select', 'changePlayer', 'dragStart', 'dragEnd', 'mouseEnter', 'mouseLeave']);

const squadCreatorStore = ref(store.state.squadCreatorStore);

var dragStart: Vector2 = new Vector2();
var dragStartPlayerPos: Vector2 = new Vector2();
var dragging: boolean = false;

function onMouseDown(ev){
    if(props.placeholder === true){
        ev.preventDefault();
        return;
    }

    dragStart.x = ev.clientX;
    dragStart.y = ev.clientY;
    if(squadCreatorStore.value.settings.pitchOrientation !== 'horizontal'){
        dragStartPlayerPos.x = props.player.position.y;
        dragStartPlayerPos.y = props.player.position.x;
    }
    else{
        dragStartPlayerPos = props.player.position.copy();
    }

    const pl = document.getElementById(`${props.player.isDummy ? 'dummy' : 'player'}-${props.player.id}`);
    if(pl !== undefined && (pl !== null)){
        pl.style.pointerEvents = 'none';
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
}

function onMouseMove(ev){
    if(!dragging){
        if(dragStart.length(new Vector2(ev.clientX, ev.clientY)) < 8) return;
        
        dragging = true;
        emit('dragStart', props.player);

    }

    const scs = squadCreatorStore.value;

    const dragCurr = new Vector2(ev.clientX, ev.clientY);
    const dragDiff = new Vector2(dragCurr.x - dragStart.x, dragCurr.y - dragStart.y);
    const pitchSize: Vector2 = scs.settings.pitchSize;
    var dragNewPlayerPos;

    if(scs.settings.pitchOrientation !== 'horizontal'){
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
    props.player.setPositionFree(dragNewPlayerPos);
}

function onMouseUp(ev){
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    const pl = document.getElementById(`${props.player.isDummy ? 'dummy' : 'player'}-${props.player.id}`);
    if(pl !== undefined && (pl !== null)){
        pl.style.pointerEvents = 'all';
    }

    if(!dragging){
        if(props.player.isDummy){
            emit('changePlayer', props.player);
            return;
        }
        emit('select', props.player);
        return;
    }

    emit('dragEnd', props.player);
    dragging = false;
}

function onMouseEnter(ev){
    emit('mouseEnter', props.player);
}

function onMouseLeave(ev){
    emit('mouseLeave', props.player);
}

function getCircleStyle(){
    return CircleStyles[squadCreatorStore.value.settings.circleStyle](squadCreatorStore.value.settings.teamColors[0], squadCreatorStore.value.settings.teamColors[1]);
}

</script>


<style lang="scss" scoped>

.sc-dummy{
    cursor: pointer;
    filter: drop-shadow(0 0 0.5px var(--dark));
    &:hover{
        filter: drop-shadow(0 0 0.5px var(--dark)) brightness(1.2);
    }
    &.placeholder{
        opacity: 0.2;
        transition-duration: 0.2s;
        &:hover{
            opacity: 0.6;
        }
    }
}

.sc-circle{
    filter: drop-shadow(0 0 0.5px var(--dark));
    &:hover{
        filter: drop-shadow(0 0 2px var(--dark));
    }
    &.active{
        filter: drop-shadow(0 0 2px var(--dark));
    }
}

</style>