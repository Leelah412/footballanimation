<template>

<div id="match-editor">
    <div class="tool-header">
        <h5 class="noselect">MATCH EDITOR</h5>

        <div class="animation-button-container">
            <!-- prev frame -->
            <button @click="setPrevFrametime">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" width="24px" viewBox="0 0 24 24" fill="var(--light)">
                    <path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z"/>
                </svg>
            </button>

            <!-- pause -->
            <button @click="pauseAnimation" v-if="play">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" width="24px" viewBox="0 0 24 24" fill="var(--light)">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                </svg>
            </button>

            <!-- play -->
            <button @click="startAnimation" v-if="!play">            
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" width="24px" viewBox="0 0 24 24" fill="var(--green)">
                    <path d="M8 5v14l11-7z"/>
                </svg>
            </button>


            <!-- stop -->
            <button @click="resetAnimation">
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="var(--red)">
                    <path d="M6 6h12v12H6z"/>
                </svg>
            </button>

            <!-- next frame -->
            <button @click="setNextFrametime">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" width="24px" viewBox="0 0 24 24" fill="var(--light)">
                    <path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z"/>
                </svg>
            </button>
        </div>

        <svg-button-selection @click="deleteSelectedFrames" :selection="SVG_SELECTION.DELETE" />

        <!-- click + FRAME to add a frame for all elements, or select an individual object to add a frame for -->
        <button id="add-frame" @click="addFrameForAll">+ FRAME</button>
        <select name="add-frame-for-object" id="" style="margin-right: 32px; width: 16px;" >
            <option value="" selected disabled hidden></option>
            <option v-for="(obj, idx) in getEntitiesAndTimelines()" :key="`add-frame-option-obj-${obj.id}`" :value="obj.id">
                {{(obj instanceof Player) ? obj.name + ` (player-${obj.id})` : `object-${obj.id}`}}
            </option>
        </select>
        
        <div style="font-size: var(--font-size-4); letter-spacing: 0px; text-align:right; margin-right: 8px;">
            <input class="input-number-dark" type="number" min="0" :value="Math.floor(currentTime/60000)" @change="ev => setTime(ev.target.value, 'm')"/> m
            <input class="input-number-dark" type="number" min="0" max="59" :value="Math.floor(currentTime/1000) % 60" @change="ev => setTime(ev.target.value, 's')"/> s
            <input class="input-number-dark" type="number" min="0" max="999" :value="Math.floor(currentTime) % 1000" @change="ev => setTime(ev.target.value, 'ms')"/> ms
        </div>

    </div>

    <div id="me-content" class="tool-content">
        <table class="flex-grow" id="me-timeline">
            <tr>
                <th id="met-header-name">Name</th>
                <th id="met-header-timeline">
                    <svg @mousedown="onTimelineMousedown" id="svg-header-timeline" :width="width" height="24">
                        <rect :width="width" height="24" fill="var(--accent-light)" />
                        <g :transform="`translate(${-(secondsAtZeroPixels % lineDividerSeconds) / secondsPerPixel}, 0)`">
                            <g v-for="i in Math.floor((secondsPerPixel * width)/lineDividerSeconds)" :key="`header-timeline-second-divider-${i}`">
                                {{i - Math.floor(secondsAtZeroPixels/lineDividerSeconds) % (60/lineDividerSeconds)}}
                                <rect v-if="i % (60/lineDividerSeconds) !== ((60/lineDividerSeconds) - Math.floor(secondsAtZeroPixels/lineDividerSeconds) % (60/lineDividerSeconds)) % (60/lineDividerSeconds)"
                                    :x="i * lineDividerSeconds / secondsPerPixel"
                                    :y="6"  width="1" height="6" fill="var(--light-4)" />
                                <text v-else fill="var(--light)"
                                    :x="i * lineDividerSeconds / secondsPerPixel" :y="10"
                                    style="font-size: var(--font-size-5);" text-anchor="middle" alignment-baseline="middle">
                                    {{(i + Math.floor(secondsAtZeroPixels/lineDividerSeconds)) / (60/lineDividerSeconds)}}
                                </text>
                            </g>
                        </g>

                        <rect v-if="secondsAtZeroPixels <= (currentTime/1000) && secondsPerPixel * width + secondsAtZeroPixels >= (currentTime/1000)"
                            width="2" height="24" fill="var(--red)"
                            :x="(currentTime/1000 - secondsAtZeroPixels)/secondsPerPixel - 1"/>
                        <rect x="0" y="16" :width="width" height="8" fill="var(--accent)"  />
                        <circle v-for="(val, idx) in frametimes" :key="`frametime-${val}`" :cx=" ((val/1000) - secondsAtZeroPixels) / secondsPerPixel" :cy="20" r="3" stroke-width="1" stroke="var(--dark)" fill="var(--accent-light)"/>
                    </svg>
                </th>
                <th style="width:128px; text-align:left;">

                </th>
            </tr>
            <tr v-for="(obj, idx) in getEntitiesAndTimelines()" :key="`ot-object-id-${obj.id}`">

                <td class="met-data-name flex-column" v-if="(obj instanceof Player)">
                    <span>{{obj.name}}</span>
                    <span style="font-size:var(--font-size-5); font-style:italic; opacity: 0.8; ">player-{{obj.id}}</span>
                </td>
                <td class="met-data-name flex-column" v-else>
                    canvas-object-{{obj.id}}
                </td>

                <td class="met-data-timeline">
                    <svg @mousedown="ev=>addFrame(ev, obj)" @mouseenter="ev => onFrameEnter(ev, obj)" @mousemove="ev => onFrameMove(ev)" @mouseleave="ev => onFrameLeave()" :id="`svg-timeline-object-id-${obj.id}`" class="svg-timeline" :width="width" :height="height" :viewBox="`0 0 ${width} ${height}`">
                        <rect :width="width" :height="height" fill="var(--light)" opacity="0.2"/>
                        <path :d="`M0,${height/2} l${width},0`" stroke="var(--light)" stroke-width="2" />

    	                
                        <g :transform="`translate(${-(secondsAtZeroPixels % lineDividerSeconds) / secondsPerPixel}, 0)`">
                            <g v-for="i in Math.floor((secondsPerPixel * width)/lineDividerSeconds)" :key="`obj-${obj.id}-second-divider-${i}`">
                                <rect v-if="i % (60/lineDividerSeconds) !== ((60/lineDividerSeconds) - Math.floor(secondsAtZeroPixels/lineDividerSeconds) % (60/lineDividerSeconds)) % (60/lineDividerSeconds)"
                                    :x="i * lineDividerSeconds / secondsPerPixel" :y="height/2 - 3"  width="1" height="6" fill="var(--light-3)" />
                                <rect v-else  :x="i * lineDividerSeconds / secondsPerPixel"
                                    :y="height/2 - 6" width="1" height="12" fill="var(--light-3)"/>
                            </g>
                        </g>


                        <path v-if="hoveredObjectID === obj.id" :transform="`translate(${hoverPosition-2}, 0)`" :d="`M0,0 l4,0 l-1,2 l0,${height - 4} l1,2 l-4,0 l1,-2, l0,${-height + 4} z`" fill="var(--accent-light)" style="filter:drop-shadow(0 0 1px var(--dark))" />
                        
                        <rect v-for="(fr, idx) in getFrameList(obj)" :key="`obj-${obj.id}-frame-${idx}`" :class="`svg-timeline-frame${(obj.id in multiselect) && multiselect[obj.id].includes(fr) ? '-selected' : ''}`"
                            @mousedown="ev => onFrameMousedown(ev, obj, fr)"
                            :x="((fr.time/1000 - secondsAtZeroPixels) / secondsPerPixel) - 3" :y="(height/2) - 3" width="6" height="6"
                            fill="var(--accent)" stroke="var(--dark)" stroke-width="1"
                            style="transform-box: fill-box; transform-origin: center; transform: rotate(45deg);"/>
                    </svg>
                </td>

                <td style="text-align: left">
                    <span v-if="hoveredObjectID === obj.id" >
                        {{Math.floor((hoverPosition * secondsPerPixel + secondsAtZeroPixels) / 60)}}m
                        {{((hoverPosition * secondsPerPixel + secondsAtZeroPixels) % 60).toFixed(4)}}s
                    </span>
                </td>
            </tr>
        </table>

        <!-- visualize the selection rectangle -->
        <div id="selection-draw" class="position-relative" style="z-index: 999999999; top: 0; left: 0;">
            <svg width="" height="" viewBox="0 0 0 0">
                <rect width="" height="" />
            </svg>
        </div>

        <!-- a single frame selected for interpolation editing -->
<!--         <div id="me-interpolation-editor">
            <svg :width="128" :height="64">
                <rect :width="128" :height="64" fill="var(--dark)" opacity="0.5"/>
                <rect width="1" :height="64" x="2"/>
                <rect :width="128" :height="1" y="62"/>
                <circle :cx="64" :cy="32" :r="2"/>
                <circle v-for="(p, idx) in getIpolPoints(null)" :key="`ipol-point-${idx}`" :cx="64" :cy="32" :r="2"/>
                <circle :cx="64" :cy="32" :r="2"/>
            </svg>
        </div> -->
    </div>

</div>

</template>



<script lang="ts" setup>
import store from '@/store';
import Vector2 from '@/components/math/Vector2';
import CanvasObject, { EntityList } from '@/components/model/CanvasObject';
import Match, { Frame, ObjectTimeline, Timestamp } from '@/components/model/Match';
import Player from '@/components/model/Player';
import SvgButtonSelection from '@/components/misc/svg-button-selection.vue';
import { SVG_SELECTION } from '@/components/util/enums';
import Rect from '@/components/math/Rect';
import { ref } from '@vue/reactivity';
import { onMounted } from '@vue/runtime-core';

const props = defineProps({
})

const match = ref<Match>(store.state.editorStore.match);
const entities = ref<EntityList>(store.state.editorStore.entityList);
// current time in MILLISECONDS(!) keep that in mind!!!
const currentTime = ref<number>(0);
const startTime = ref<number>(0);
const endTime = ref<number>(120 * 60 * 1000);

// take three integer values representing minutes, seconds and milliseconds, and return the number of milliseconds
function calcMilliseconds(m: number, s: number, ms: number): number{
    return Math.floor(m) * 60000 + Math.floor(s) * 1000 + ms;
}

function setTime(val: number, type: string){
    var m = Math.floor(currentTime.value/60000);
    var s = Math.floor(currentTime.value/1000) % 60;
    var ms = Math.floor(currentTime.value) % 1000;

    var res;

    switch(type){
        case 'm': {
            res = calcMilliseconds(Math.floor( Math.max(0, val) ), s, ms);
            break;
        };
        case 's': {
            res = calcMilliseconds(m, Math.floor( Math.max(Math.min(0, val), Math.min(59, val)) ), ms);
            break;

        };
        case 'ms': {
            res = calcMilliseconds(m, s, Math.floor( Math.max(Math.min(0, val), Math.min(999, val)) ));
            break;

        };
        default: return;
    }

    setFrame(res);
}

const play = ref<boolean>(false);
const fps = ref<number>(60);            // frames per second; must be bigger than 0 (obviously)

// show the frame at the given time (in milliseconds)
function setFrame(time: number){
    // time cannot be smaller 0
    if(time < 0) return;

    currentTime.value = time;
    match.value.showFrameAtTime(currentTime.value);
    /* currentFrame.value = match.value.getFrameAtTime(currentTime.value); */

    // reposition the timeline if necessary
    const svg = document.getElementById('svg-header-timeline');
    if(svg === undefined || svg === null) return;
    const width = svg.getBoundingClientRect().width;
    const sec_width = width * secondsPerPixel.value;
    
    const secs = time/1000;
    // new time inside the dimensions of the timeline still: no need for change
    if(secondsAtZeroPixels.value < secs && secondsAtZeroPixels.value + sec_width > secs) return;
    secondsAtZeroPixels.value = Math.max(0, secs - sec_width);
}

// add a frame for the given object at the current time
/* function addFrameForObject(object: CanvasObject){
    match.value.addFrame(currentTime.value, object);
} */

// return the list of entities in the entity list and those, that aren't in the list,
// but for which user has already assigned animations (i.e. objects used in "match" but not in "entities")
function getEntitiesAndTimelines(): CanvasObject[]{
    var lst: CanvasObject[] = Object.values(entities.value);
    // add all elements not in entities, but in timelines into the lst
    for(var key in match.value.timelines){
        if(!(key in entities.value)){
            lst.push(match.value.timelines[key].object);
        }
    }
    
    return lst;
}

/* const timelines = ref<{[key: string]: CanvasObject | ObjectTimeline}>({});

function setTimelines(){
    // IMPORTANT: ONLY create a timeline object for an entity, 
    // first assign all objects in the entitylist in order to the list of timeline objects
    Object.values(store.state.editorStore.entityList).forEach(obj => { if(!(obj.id in timelines.value)) timelines.value[obj.id] = obj });
    // overwrite each entitylist object with the corresponding timeline object, if it exists
    match.value.timelines.forEach(tl => timelines.value[tl.object.id] = tl);
} */

// return the linked frame list as array
function getFrameList(object: CanvasObject): Frame[]{
    
    if(!(object.id in match.value.timelines)) return [];

    var ot: ObjectTimeline = match.value.timelines[object.id];

    var curFrame: Frame | null = ot.start;
    var lst: Frame[] = [];

    while(curFrame !== null){
        lst.push(curFrame);
        curFrame = curFrame.next;
    }

    return lst;
}

// 
// add a frame to the animation
// take the time of the frame from the mouse position during the click event
function addFrame(ev, object: CanvasObject){
    const svg = document.getElementById(`svg-timeline-object-id-${object.id}`);
    if(svg === undefined || svg === null) return;
    const svg_rect = svg.getBoundingClientRect();
    const x = ev.clientX - svg_rect.left;               // clicked position relative to svg
    // get the time point of the new frame from the clicking position and the seconds/pixel scale 
    const seconds = x * secondsPerPixel.value + secondsAtZeroPixels.value;
    
    // add frame in milliseconds
    match.value.addFrame(Math.floor(seconds * 1000), object);
    // recalculate frametimes
    frametimes.value = getFrametimes();
    
    console.log('frame added for object ', object.id, '; ObjectTimeline:');
    console.log(match.value.timelines[object.id]);
}

// add a frame for all objects at the current time
function addFrameForAll(){
    var objs: CanvasObject[] = getEntitiesAndTimelines();
    objs.forEach(obj => {
        match.value.addFrame(currentTime.value, obj);
    });

    frametimes.value = getFrametimes();
}

// delete given frame from 
function deleteFrame(frame: Frame, object: CanvasObject){
    match.value.deleteFrame(frame, object);
    frametimes.value = getFrametimes();

    console.log("frame deleted for object ", object.id);    
}

// delete all selecte frames in the list
function deleteSelectedFrames(){
    for(var id in multiselect.value){
        for(var i = 0; i < multiselect.value[id].length; i++){
            match.value.deleteFrame(multiselect.value[id][i], match.value.timelines[id].object);
        }
    }

    frametimes.value = getFrametimes();

    console.log("multiple frames deleted");    
}

///////////////
// ANIMATION //
///////////////

var anim_id: number = -1;
var anim_prev_date: number = 0;

function startAnimation(){
    play.value = true;
    anim_prev_date = Date.now();
    // call the next frame around "fps" times per second
    anim_id = setInterval(nextAnimationFrame, Math.floor(1000/fps.value));
}

function nextAnimationFrame(){
    var now = Date.now();
    setFrame(now - anim_prev_date + currentTime.value);
    anim_prev_date = now;
}

function pauseAnimation(){
    clearInterval(anim_id);
    play.value = false;
}

function resetAnimation(){
    setFrame(0);
    clearInterval(anim_id);
    play.value = false
}


////////////
// VISUAL //
////////////

// width and height of svg frame visualizer
const width = ref(0);
const height = ref(32);

// scale of the frame visualizer: 60 sec./240 pix
const secondsPerPixel = ref<number>(0.25);
const secondsAtZeroPixels = ref<number>(0);
// add an orientational line after every "lineDividerSeconds" on the timeline
const lineDividerSeconds = ref<number>(5);

onMounted(()=>{
    // make width of svg equivalent to row length
    const hdr = document.getElementById('met-header-timeline');
    if(hdr === undefined || hdr === null) return;

    width.value = hdr.getBoundingClientRect().width; 
    /* height.value = hdr.getBoundingClientRect().height;    */

    frametimes.value = getFrametimes();
});

// selected frames
// key: object ID of frame
// value: list of selected frames 
const multiselect = ref<{[key: string]: Frame[]}>({});

function selectFrame(frame: Frame, object: CanvasObject){
    if(!(object.id in multiselect.value)) multiselect.value[object.id] = [];

    // deselect frame, if it already exists
    if(multiselect.value[object.id].includes(frame)){
        multiselect.value[object.id] = multiselect.value[object.id].filter(fr => fr !== frame);
        if(multiselect.value[object.id].length === 0)
            delete multiselect.value[object.id];
        return;
    }

    multiselect.value[object.id].push(frame);
}

var dragging: boolean = false;
var dragStart: number = 0; 
var dragPrev: number = 0;
var leftMBDown: boolean = false;

const hoveredObjectID = ref<String>("");
const hoverPosition = ref(-1);
var hoverPositionClientX = -1;          // helper for calculation hoverPosition, when moving mouse over frame

////////// FRAME //////////

var selectedObject: CanvasObject | null = null;
var selectedFrame: Frame | null = null

function onFrameMousedown(ev, object: CanvasObject, frame: Frame){

    // left mb clicked
    if(ev.button == 0){
        dragStart = ev.clientX;
        leftMBDown = true;
        selectedObject = object;
        selectedFrame = frame;
        ev.stopPropagation();

/*         if(ev.ctrlKey){
            multiselect.value.push(frame);   
        }
        else{
            multiselect.value = [frame];
        } */
    }

    document.addEventListener('mousemove', onFrameMousemove);
    document.addEventListener('mouseup', onFrameMouseup);

}

function onFrameMousemove(ev){
    if(leftMBDown){
        if(!dragging){            
            if(Math.abs(ev.clientX - dragStart) < 4) return;
            dragging = true;
            dragPrev = dragStart;
        }

        if(selectedObject === null) return;
        if(selectedFrame === null) return;

        const svg = document.getElementById(`svg-timeline-object-id-${selectedObject.id}`);
        if(svg === undefined || svg === null) return;
        const svg_rect = svg.getBoundingClientRect();

        // mouse x position relative to timeline element of object 
        const x = ev.clientX - svg_rect.x;
        
        var t: number = (x * secondsPerPixel.value + secondsAtZeroPixels.value) * 1000;
        
        // x must be inside limits
        if(x < 0){
            t = secondsAtZeroPixels.value * 1000;
        }
        else if(x > svg_rect.width){
            t = (svg_rect.width * secondsPerPixel.value + secondsAtZeroPixels.value) * 1000;
        };

        match.value.moveFrame(t, selectedObject, selectedFrame);
        frametimes.value = getFrametimes();
        
        return;
    }

}

function onFrameMouseup(ev){

    // select current frame (e.g. for deletion)
    if(ev.button == 0 && !dragging && selectedFrame !== null && selectedObject !== null){
        selectFrame(selectedFrame, selectedObject);     
    }

    if(ev.button == 0) leftMBDown = false;
    dragging = false;
    selectedObject = null;
    selectedFrame = null;
    
    document.removeEventListener('mousemove', onFrameMousemove);
    document.removeEventListener('mouseup', onFrameMouseup);
}

function onFrameEnter(ev, object: CanvasObject){
    const svg = document.getElementById(`svg-timeline-object-id-${object.id}`);
    if(svg === undefined || svg === null) return;
    const svg_rect = svg.getBoundingClientRect();
    hoverPositionClientX = ev.clientX;
    const x = hoverPositionClientX - svg_rect.left;

    hoverPosition.value = x;
    hoveredObjectID.value = object.id;
}

// set new hover position on mouse move
function onFrameMove(ev){
/*     if(!dragging){
        if(Math.abs(ev.clientX - dragStart) > 8) dragging = true;
    } */

    // get the delta of the mouse move
    hoverPosition.value += ev.clientX - hoverPositionClientX;
    hoverPositionClientX = ev.clientX;
}

// reset hover, when mouse leaves frame
function onFrameLeave(){
    hoverPosition.value = -1;
    hoveredObjectID.value = "";
    hoverPositionClientX = -1;
}

////////// CONTENT //////////

const selectionRectStart = ref<Vector2>(new Vector2());

// generally when clicking on "me-content"
function onContentMousedown(ev){
    // create selection rectangle
    if(ev.altKey && ev.button == 0){
        selectionRectStart.value.x = ev.clientX;
        selectionRectStart.value.y = ev.clientY;
    }

    document.addEventListener('mousemove', onContentMousemove);
    document.addEventListener('mouseup', onContentMouseup);
}

function onContentMousemove(ev){

}

function onContentMouseup(ev){
    document.removeEventListener('mousemove', onContentMousemove);
    document.removeEventListener('mouseup', onContentMouseup);
}

////////// TIMELINE //////////

function setTimelineFrame(ev){
    // set time
    const svg = document.getElementById('svg-header-timeline');
    if(svg === undefined || svg === null) return;
    const x = ev.clientX - svg.getBoundingClientRect().x;
    // multiply by 1000 to get time in ms
    setFrame((secondsPerPixel.value * x + secondsAtZeroPixels.value) * 1000);

}

var timelineMoveID = -1;
function onTimelineMousedown(ev){
    if(ev.button == 0){
        setTimelineFrame(ev);

        leftMBDown = true;

        // connect with mousemove events
        document.addEventListener('mousemove', onTimelineMousemove);
        document.addEventListener('mouseup', onTimelineMouseup);
    }
}

function onTimelineMousemove(ev){
    if(leftMBDown){    
        const svg = document.getElementById('svg-header-timeline');
        if(svg === undefined || svg === null) return;
        const x = ev.clientX - svg.getBoundingClientRect().x;
        
        // if mouse over svg limits, scroll towards left/right
        if(x < 0 || x > svg.getBoundingClientRect().width){
            var _x = (x < 0) ? x : x - svg.getBoundingClientRect().width;

            if(timelineMoveID !== -1) clearInterval(timelineMoveID);

            if(secondsAtZeroPixels.value + _x < 0)
                secondsAtZeroPixels.value = 0;
            else{
                timelineMoveID = setInterval(()=>{
                    secondsAtZeroPixels.value += _x/4;
                    if(secondsAtZeroPixels.value < 0){
                        secondsAtZeroPixels.value = 0;
                        clearInterval(timelineMoveID);
                    }
                }, 100);
            }

        }
        else if(timelineMoveID !== -1) clearInterval(timelineMoveID);

        setTimelineFrame(ev);
    }
}

function onTimelineMouseup(ev){

    if(ev.button == 0) leftMBDown = false;
    if(timelineMoveID !== -1) clearInterval(timelineMoveID);

    document.removeEventListener('mousemove', onTimelineMousemove);
    document.removeEventListener('mouseup', onTimelineMouseup);
}

///////////////////

function getIpolPoints(frame: Frame | null): Vector2[]{
    if(frame === null) return [];

    var points: Vector2[] = [
        new Vector2(frame.interpolation.position.startTime, 0),
        ...frame.interpolation.position.points,
        new Vector2(frame.interpolation.position.endTime, 1)

    ];

    return points;
}

const frametimes = ref<number[]>([]);

// returns a cut list of frametimes to show on the header element
// times in milliseconds
function getFrametimes(): number[]{    
    const svg = document.getElementById('svg-header-timeline');
    if(svg === undefined || svg === null) return [];

    // calculate shown min/max time on the timeline
    const width = svg.getBoundingClientRect().width;
    const min = secondsAtZeroPixels.value * 1000;
    const max = (secondsPerPixel.value * width + secondsAtZeroPixels.value) * 1000;

    // retrieve all keys between min and max from the "frametimes" list
    // NOTE: it is assumed, that ALL keys are integer numbers!!!
    const keys = Object.keys(match.value.frametimes);
    var key_lst: number[] = [], parsed: number;

    for(var key = 0; key < keys.length; key++){
        parsed = parseInt(keys[key]);
        if(parsed >= min && parsed <= max)
            key_lst.push(parsed);
    }

    return key_lst;
}

function setPrevFrametime(){
    const keys = Object.keys(match.value.frametimes);
    var latest: number = 0, parsed: number;
    for(var i = 0; i < keys.length; i++){
        parsed = parseInt(keys[i]);
        if(parsed < currentTime.value && parsed > latest){
            latest = parsed;
        }
    }

    if(latest === currentTime.value) return;
    setFrame(latest);
    console.log("set to prev frametime");
}

function setNextFrametime(){
    const keys = Object.keys(match.value.frametimes);
    var earliest: number = currentTime.value, parsed: number;

    for(var i = 0; i < keys.length; i++){
        parsed = parseInt(keys[i]);
        
        if((parsed > currentTime.value && parsed < earliest)
            || (earliest === currentTime.value && parsed > earliest))
            earliest = parsed;
    }

    if(earliest === currentTime.value) return;
    setFrame(earliest);
    console.log("set to next frametime");    
}

</script>



<style lang="scss" scoped>

#match-editor{
    display: flex;
    flex-direction: column;
    height: 100%;
}

.tool-header{
    position: relative; // make relative to be able to easily center animation buttons
    .animation-button-container{
        position: absolute;
        left: 50%;
        right: 50%;
    }
}

.tool-content{
    
}

.animation-button-container{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

table{
    table-layout: fixed;
    margin-bottom: auto;
}

th, td{
    font-size: var(--font-size-4);
    font-weight: 300;
    overflow: hidden;
    white-space: nowrap;
}

/* tr{
    max-height: 32px;
} */

#met-header-name, .met-data-name{
    width: 128px;
}

.met-data-timeline{

}

#svg-header-timeline{
    cursor: text;
}

.svg-timeline-frame{
    &:hover{
        filter: brightness(1.5);
    }
}

.svg-timeline-frame-selected{
    @extend .svg-timeline-frame;
    fill: var(--secondary-light);
    stroke-width: 2;
    
}

#me-interpolation-editor{

}

.input-number-dark{
    width: 48px;
    text-align: right;
}

</style>