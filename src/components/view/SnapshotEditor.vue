<template>

<div id="snapshot-editor">
    <div id="se-header">
        <h5 class="noselect">SNAPSHOT EDITOR</h5>
        <!-- <button class="btn-secondary" @click="editSnapshot">EDIT</button> -->
        <SvgButtonSelection :selection="SVG_SELECTION.EDIT" @click="editSnapshot"/>
        <SvgButtonSelection :selection="SVG_SELECTION.DELETE" @click="deleteSnapshot"/>
        <div v-if="store.state.snapshotList.length > 0" id="snapshot-jump-to-container">
            <label for="snapshot-jump-to" class="noselect">JUMP TO</label>
            <input type="number" class="input-number-dark" id="snapshot-jump-to" min="0" :max="store.state.snapshotList.length-1"/>
        </div>

    </div>
    <div id="se-content">
        <div v-if="isOverflow" class="sec-move" id="sec-move-left">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#ccc">
                <path d="M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z"/>
            </svg>
        </div>
        <div id="sec-snapshots">
            <div v-for="(snap, idx) in store.state.snapshotList" :key="`snap-id-${snap.id}`" class="secs-snapshot" :id="`snap-idx-${snap.id}`">
<!--                 <div class="secss-filler" @mouseover="ev => mouseOverFiller(idx)" @mouseleave="mouseLeftFiller">
                    <div v-if="fillerPosition === idx" class="se-add-frame" @click="ev => addSnapshot(idx)">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#fff">
                            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                        </svg>
                    </div>
                </div> -->
                <div :class="`secss-frame${currentSnapshot === snap ? '-active' : (multiselect.includes(snap) ? '-selected' : '')}`"
                    @mousedown="ev=>onSnapMouseDown(ev, snap, idx)"
                    :style="`width:${snap.pitch.size.x}px; height:${snap.pitch.size.y}px;`">
                    <svg xmlns="http://www.w3.org/2000/svg" :width="snap.pitch.size.x" :height="snap.pitch.size.y" :viewBox="`${-snap.pitch.size.x/2} ${-snap.pitch.size.y/2} ${snap.pitch.size.x} ${snap.pitch.size.y}`">
                        <g v-for="(pl, idx2) in snap.entities" :key="'snap-' + idx + '-player-' + idx2">
                            <circle v-if="(pl instanceof Player)" :cx="pl.position.x" :cy="pl.position.y" r="2" :fill="pl.team !== null ? pl.team.colorPalette[0] : 'var(--light)'" :stroke="pl.team !== null ? pl.team.colorPalette[1] : 'var(--dark)'" strokeWidth="1"/>
                        </g>
                    </svg>
                    <span class="noselect">{{snap.name}}</span>
                </div>
            </div>
            
            <!-- only active, if dragging elements around -->
            <div id="multiselect-container" style="display: none"></div>

        </div>
        <div class="se-add-frame" :style="`width: ${store.state.pitch.size.x}px; height: ${store.state.pitch.size.y}px`"
            @click="ev => addSnapshot(store.state.snapshotList.length)">
<!--                 <div class="flex-column align-center" v-if="store.state.snapshotList.length === 0" >
                <span class="noselect">SNAP</span>
                <svg v-if="fillerPosition === -1" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#fff">
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                </svg>
            </div> -->
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#fff">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
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
import store from '@/store/index';
import { Committer } from '@/store/modules/editor_committer';
import { ref } from '@vue/reactivity';
import CanvasObject, { EntityList } from '../model/CanvasObject';
import Player from '../model/Player';
import Snapshot from '../model/Snapshot';
import SvgButtonSelection from '../misc/svg-button-selection.vue';
import { SVG_SELECTION } from '../helper/enums';
import Vector2 from '../math/Vector2';
import func from 'vue-temp/vue-editor-bridge';

interface Props {
    
}

const props = defineProps<Props>();

// current snapshot shown on screen
const currentSnapshot = ref<Snapshot | null>(null);
// multiselect snapshots to move/delete
const multiselect = ref<Snapshot[]>([]);
// save the previous snapshot here, before editing, to reset, if necessary
const snapshotBeforeEdit = ref<Snapshot | null>(null);
const entityListBeforeEdit = ref<EntityList | null>(null);

const fillerPosition = ref(-1);

// if true: enable scrolling and show the arrows
const isOverflow = ref(false);

// adds a snapshot at the given position
function addSnapshot(pos: number){
    Committer.addSnapshot(takeSnapshot(), pos);
}

function reorderSnapshot(snap: Snapshot){

}

function mouseOverFiller(pos: number){
    fillerPosition.value = pos;
}

function mouseLeftFiller(){
    fillerPosition.value = -1;
}

var leftMBDown: boolean = false;
var multiselectStartIndex: number = -1;
var dragList: Snapshot[] = [];                  // temporary snapshot list, that will be assigned to the store one, once dragging is done (avoiding state based rerender)
var containerPivotX: number = 0;                // x mouse position relative to multiselect container, when starting to drag snaps
var duplicate: Snapshot | null = null;
var createDuplicate: boolean = false;
var dragStart: number = 0;
var dragPrev: number = 0;
const dragRadius = 8;
var dragging: boolean = false;

var onSnapMouseMoveListener: (ev: any) => void;
var onSnapMouseUpListener: (ev: any) => void;

function onSnapMouseDown(ev, snap: Snapshot, idx: number = 0){
    if(ev.button == 0){
        leftMBDown = true;
        multiselectStartIndex = idx;
        dragStart = ev.clientX;

        onSnapMouseMoveListener = (ev: any) => onSnapMouseMove(ev, snap);
        onSnapMouseUpListener = (ev: any) => onSnapMouseUp(ev, snap);

        // add event listeners for mousemove and mouseup over the whole document
        document.addEventListener('mousemove', onSnapMouseMoveListener);
        document.addEventListener('mouseup', onSnapMouseUpListener);
    }
}



function onSnapMouseMove(ev, snap: Snapshot){
    if(!leftMBDown) return;

    // check, if user is already dragging
    if(dragging){
        drag(ev.clientX);
        return;
    }

    // check, if user is holding shift (& not ctrl) => interpret it as user wanting to select multiple snaps
/*     if(ev.shiftKey && !ev.ctrlKey){
        // assign all snaps inbetween the starting and current snap index to multiselect list
        multiselect.value = store.state.snapshotList.splice(multiselectStartIndex, idx + 1);
        return;
    } */
    
    startDrag(ev.clientX, snap);

}


function onSnapMouseUp(ev, snap: Snapshot){

    leftMBDown = false;

    // add event listeners for mousemove and mouseup over the whole document
    document.removeEventListener('mousemove', onSnapMouseMoveListener);
    document.removeEventListener('mouseup', onSnapMouseUpListener);

    if(dragging) return stopDrag();

    // if ctrl held down and left mb was down too, add selected snap into multiselect list
    if(ev.ctrlKey && ev.button == 0){
        console.log('ctrl down');
        // if snap already in list, then clicking on it means user wants it out
        if(multiselect.value.includes(snap)){
            multiselect.value = multiselect.value.filter(s => s !== snap);
            return;
        }
        // add 'snap' in the correct position, such that the elements in 'multiselect'
        // are ordered ascendingly by their index in the store's snapshot list
        // TODO: find a more efficient search algorithm
        const lst = store.state.snapshotList;
        const idx = lst.findIndex(sn => sn === snap);
        var pos: number = 0;
        while(pos < multiselect.value.length){
            // if index of 'snap' in snapshot list smaller than current 'multiselect' snap, break 
            if(idx < lst.findIndex(sn => sn === multiselect.value[pos])) break;
            pos++;
        }
        // push snap in correct position
        multiselect.value.splice(pos, 0, snap);
        // current snapshot MUST be null!
        currentSnapshot.value = null;

        return;
    }

    // otherwise delete all elements from 'multiselect' and show selected snapshot on screen
    multiselect.value = [];
    showSnapshot(snap);
}

/////////////////////////////////////////////

// initiate dragging of snaps in "multiselect"
// x: x position of current mouse position (y value not needed)
// snap: pivot snapshot
function startDrag(x: number, snap: Snapshot){

    // check, if over drag radius, if not dragging
    if( !(Math.abs(dragStart - x) > dragRadius) ) return;

    dragging = true;

    // TODO: check, if user is holding ctrl (& not shift) => interpret it as user wanting to duplicate snaps in multiselect
/*     if(ev.ctrlKey && !ev.shiftKey){
        // constructor already creates only a copy of the given entities, so no need to worry about them not being real copies
        duplicate = new Snapshot(snap.entities, snap.pitch);
        createDuplicate = true;  
        // TODO: set position of dingens          
        return;
    } */

    // otherwise interpret it as user wanting to
    // - drag multiple snaps, if selected snap in multiselect
    // - drag a single snap, if selected snap not part of multiselect
    if(multiselect.value.includes(snap)){

        // sort all selected snaps together in a row, with the selected snap being the "pivot",
        // meaning all preceding selected snaps come right before and
        // all succeeding selected snaps come right after the pivot

        const idx = store.state.snapshotList.findIndex(s => s === snap);
        const ms_idx = multiselect.value.findIndex(s => s === snap);

        if(idx === -1){
            console.log('ERROR: snap not in store snapshot list');
            return;            
        }
        if(ms_idx === -1){
            console.log("ERROR: snap found in multiselect, but findIndex couldn't find it for some reason");
            return;            
        }     

        // copy current snapshot list (to make sure we dont directly mutate it)
        dragList = store.state.snapshotList.slice(0);
        
        var nghbrs: Snapshot[] = [];
        // delete preceding snaps from snapshot list
        // (assuming "multiselect" is sorted by the order of the snaps in the store's "snapshotList")
        for(var i = 0; i < ms_idx; i++){
            dragList = dragList.filter(s => s !== multiselect.value[i]);
            nghbrs.push(multiselect.value[i]);
        }
        // add preceding snaps as left neighbors of 'snap';
        // must subtract index of 'snap' by 'ms_idx', since we deleted all elements in 'multiselect'
        // preceding 'snap' from 'dragList', meaning index of 'snap' in 'dragList' is now 'idx - ms_idx'                
        dragList.splice(idx - ms_idx, 0, ...nghbrs);

        // now the same for succeeding snaps
        // reset neighbors!
        nghbrs = [];
        // delete succeeding snaps from snapshot list
        for(var i = ms_idx + 1; i < multiselect.value.length; i++){
            dragList = dragList.filter(s => s !== multiselect.value[i]);
            nghbrs.push(multiselect.value[i]);
        }

        // add succeeding snaps as right neighbors of 'snap'
        dragList.splice(idx + 1, 0, ...nghbrs);

    }
    else{
        // use the multiselect variable to drag the single element anyway, makes things easier and more consistent
        multiselect.value = [snap];
    }


    if(!(dragList.length > 0)) return;

    // assign all elements in 'multiselect' list to the container
    const container = document.getElementById('multiselect-container');
    if(container === undefined || container === null) return;

    var ms_el;
    for(var i = 0; i < multiselect.value.length; i++){
        ms_el = document.getElementById(`snap-idx-${multiselect.value[i].id}`);
        if(ms_el === undefined || ms_el === null) continue;

        container.appendChild(ms_el);
    }

    // index of the first element in "multiselect" in snap list
    const lst_ms_first_idx = dragList.findIndex(s => s === multiselect.value[0]);
    // first element in "dragList" is first element in "multiselect"
    // => append container to the start of the list
    if(lst_ms_first_idx === 0){
        const snap_editor_el = document.getElementById('sec-snapshots');
        if(snap_editor_el === undefined || snap_editor_el === null) return;

        snap_editor_el.appendChild(container);
    }
    // otherwise append container behind last element in snap list BEFORE the first "multiselect" item
    else{
        const lst_last = dragList[lst_ms_first_idx - 1];
        const lst_last_el = document.getElementById(`snap-idx-${lst_last.id}`);
        if(lst_last_el === undefined || lst_last_el === null) return;

        lst_last_el.after(container);
    }

    // make container visible
    container.style.setProperty('display', 'flex');
    
    // set the pivot to be the x distance between the container's left border and the drag starting position
    containerPivotX = dragStart - container.getBoundingClientRect().left;
    dragPrev = dragStart;

    drag(x);
}

// dragging a snapshot for reordering
// x: current mouse position
function drag(x: number){
    // dragging a new copy
    if(createDuplicate){

        return;
    }

    // if nothing in "multiselect", there is nothing to drag
    if(!(multiselect.value.length > 0)) return;    

    // get the drag delta
    const dragDelta = x - dragPrev;
    dragPrev = x;
    // nothing to do, if delta is zero
    if(dragDelta === 0) return;
    
    const dragDeltaSign = Math.sign(dragDelta);

    // get multiselect container
    const container = document.getElementById('multiselect-container');
    if(container === undefined || container === null) return;
    const container_rect = container.getBoundingClientRect();

    // if "dragDelta" below zero, we move left, otherwise we go right
    const container_rect_x = dragDeltaSign < 0 ? container_rect.left : container_rect.right;    

    const getTranslateX = () => {
        const old = container.style.getPropertyValue('transform');
        container.style.setProperty('transform', 'translateX(0px)');
        const new_container_rect = container.getBoundingClientRect();
        // dont forget to reset transform to its old value!
        container.style.setProperty('transform', old);
        
        // it doesnt matter, if left or right, as we can assume, that the width hasnt changed after the transform
        return container_rect.left - new_container_rect.left;
    }

    // get all elements, where if we added the delta, their left border would be to the right of the container's left border,
    // meaning we pushed all multiselect elements further to the left of the list

    // if container not the first/last element, then there must exist an item before/after all "multiselect" items in the "dragList"
    //
    // NOTE: if the drag delta's sign is -1, the term in the brackets will resolve to '0', otherwise to 'multiselect.value.length - 1',
    // returning the first/last element in the list depending on whether we are going left/right
    var current_snap_idx = dragList.findIndex(s => s === multiselect.value[ ((1 + dragDeltaSign)/2) * (multiselect.value.length - 1) ]) + dragDeltaSign;
    var current_snap_el;
    var current_snap: Snapshot;
    var current_snap_rect: DOMRect;

    // collect all snaps we want to push to the right of the "multiselect" items in this list
    var snap_lst: Snapshot[] = [];
    
    while(current_snap_idx >= 0 && current_snap_idx < dragList.length){
      
        current_snap = dragList[current_snap_idx];
        current_snap_el = document.getElementById(`snap-idx-${dragList[current_snap_idx].id}`);
        if(current_snap_el === undefined || current_snap_el === null){
            console.log('error: snap doesnt exist, but is in the snap list');
            return;
        }
        current_snap_rect = current_snap_el.getBoundingClientRect();  

        // we've pushed all elements to the left/right of container to the right/left of container
        if( (container_rect_x + dragDelta > current_snap_rect.left && dragDelta < 0) ||
            (container_rect_x + dragDelta < current_snap_rect.right && dragDelta > 0) )
            break;

        snap_lst.push(dragList[current_snap_idx]);
        dragList = dragList.filter(s => s !== current_snap);
        
        // push the dom element behind/in front of the container
        if(dragDeltaSign < 0){
            // change translateX for the transition effect
            /* current_snap_el.style.setProperty('transform', `translateX(${container_rect.width}px)`); */
            container.after(current_snap_el);
            /* current_snap_el.style.setProperty('transform', `translateX(0px)`); */

        }
        else{
            container.before(current_snap_el);

        }
        
        current_snap_idx += dragDeltaSign;              // get the next snap, if possible        
    }
    
    // push all relevant snaps towards the right/left, depending on the direction we are moving
    dragList.splice(current_snap_idx - dragDeltaSign * (multiselect.value.length + 1), 0, ...snap_lst);

    // get boundaries of snapshot editor
    const snap_editor_el = document.getElementById('sec-snapshots');
    if(snap_editor_el === undefined || snap_editor_el === null) return;
    const snap_editor_rect = snap_editor_el.getBoundingClientRect();

    // if adding the delta to the container position causes it to go over the border, (re)set the transform to nothing and return
    if( (container_rect_x + dragDelta < snap_editor_rect.left && dragDelta < 0) ||
        (container_rect_x + dragDelta > snap_editor_rect.right && dragDelta > 0) ){
        container.style.setProperty('transform', 'translateX(0px)');
        return;
    }

    // If we pushed any element behind the container, then the natural (i.e. non-translated) position of the container will have changed.
    // That means we have to recalculate the x translation to make sure, that the container is in the correct position again.
    // To do that, we need to get the new x position of the container's left border, and calculate the difference between
    // the previous and the new position.
    // Finally, we add the "dragDelta", so that we actually drag the element.
    // In the end, we assign the calculated value to be the new x translation of the container.
    
/*     container.style.setProperty('transform', 'translateX(0px)');
    const new_container_rect = container.getBoundingClientRect();
    const new_container_rect_x = dragDeltaSign < 0 ? new_container_rect.left : new_container_rect.right; */
    const newTranslateX = getTranslateX() + dragDelta;
    container.style.setProperty('transform', `translateX(${newTranslateX}px)`);
}


function stopDrag(){
    dragging = false;
    duplicate = null;
    createDuplicate = false;

    // push all snap elements of the container out of it
    // make container invisible
    const container = document.getElementById('multiselect-container');
    if(container === undefined || container === null) return;
    
    var container_snap_el;
    while(container.childElementCount > 0){
        container_snap_el = container.children[0];
        if(container_snap_el === undefined || container_snap_el === null) break;        
        // reposition child element before the container
        container.before(container_snap_el);
    }

    if(container !== undefined && container !== null)
        container.style.setProperty('display', 'none');
    
    Committer.setSnapshotList(dragList);

}

/////////////////////////////////////////////

function takeSnapshot(): Snapshot{
    return new Snapshot(Object.values(store.state.entityList), store.state.pitch);
}


// show the snapshot on screen
function showSnapshot(snap: Snapshot){
    // if current snapshot same as before, deselect it
    if(currentSnapshot.value === snap){
        currentSnapshot.value = null;
        return;
    }
    
    // create a copy of each entity, as passing them directly as reference means actively editing the snapshot
    var lst: EntityList = {};
    for(var i in snap.entities){
        if(snap.entities[i] instanceof Player){
            var pl: Player = (snap.entities[i] as Player).copy();
            lst[pl.id] = pl;
        }
    }

    // set current snapshot
    currentSnapshot.value = snap;
    Committer.setEntityList(lst);
    console.log("show snapshot");
}

// assign current snapshot instances to the list to be edited
// this way, any changes made on the canvas will directly affect 
function editSnapshot(){
    if(currentSnapshot.value === null) return;

    // save the current snapshot state to reset to, if necessary
    snapshotBeforeEdit.value = currentSnapshot.value;
    // save the current entity list to reset to, if necessary
    entityListBeforeEdit.value = store.state.entityList;

    var lst: EntityList = {};
    for(var i = 0; i < currentSnapshot.value.entities.length; i++){
        lst[currentSnapshot.value.entities[i].id] = currentSnapshot.value.entities[i];
    }

    Committer.setEntityList(lst);
    console.log('edit snapshot');
    
}

// delete the current snapshot
function deleteSnapshot(){
    if(currentSnapshot.value === null) return;
    Committer.deleteSnapshot(currentSnapshot.value);
    currentSnapshot.value = null;
}

// 
function resetSnapshot(){

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

    transition-duration: 0.2s;
}

.secss-frame{
    position: relative;     // for display

    /* box-sizing: border-box; */
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 105px;
    height: 68px;
    background: var(--green);
    border-radius: 4px;
    span{
        position: absolute;
        font-size: var(--font-size-3);
        bottom: calc(-12px - var(--font-size-3));
    }
    box-shadow: 0 0 4px var(--dark);
    margin: 0 4px;
    transition-duration: 0.2s;
    &:hover{
        filter: brightness(1.2);
    }

    svg{
        position: absolute;
        top: 0;
        left: 0;
    }
}

.secss-frame-active{
    @extend .secss-frame;
    border: 1px solid var(--light);
    filter: brightness(1.25);
}

.secss-frame-selected{
    @extend .secss-frame;
    box-sizing: border-box;
    border: 2px solid var(--light);
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
    background: var(--accent);
    box-shadow: 0 0 2px var(--dark);
    border-radius: 4px;
    /* width: 32px; */

    &:hover{
        background: var(--accent-light);
    }
}

#multiselect-container{
    flex-direction: row;
    background: #f7f7f722;
    z-index: 100;
}

label{
    letter-spacing: 0px;
    font-weight: 300;
}



</style>