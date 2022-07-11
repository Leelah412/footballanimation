<template>

<div id="editor">

<!--     <div id="editor-toolbar">
        <div id="editor-pitch-size" class="flex-row">
            <div class="flex-column">
                <span id="editor-pitch-size-width-label" style="font-weight: 300; font-size: small">Width</span>
                <span id="editor-pitch-size-width" contenteditable="true">{{pitch.size.x}}</span>
            </div>
            <div class="flex-column">
                <span id="editor-pitch-size-width-label" style="font-weight: 300; font-size: small">Height</span>
                <span id="editor-pitch-size-height" contenteditable="true">{{pitch.size.y}}</span>
            </div>
        </div>
        <div id="editor-player-list">

        </div>
    </div> -->

    <div id="grid-navbar">
        <Navbar :pitch="pitch" v-on:changePitchSize="pitchSizeChange"/>
    </div>

    <div id="grid-left-canvas-right" class="flex-row flex-grow">
        <div id="grid-left" class="flex-row">
            <!-- <Toolbar :id="0" :elements="[]" :style="'width: var(--left-toolbar-width);'"/> -->
            <EntityToolbar v-on:selectEntity="selectEntity" :selected="selectedEntityType"/>
        </div>

        <div id="grid-canvas" class="flex-row flex-grow" style="background: #002255;">
            <CanvasVue :pitch="pitch" :entityList="entityList" :width="svgWidth" :height="svgHeight" :scale="svgScale" :yAxis="getYAxis()" :xAxis="getXAxis()"/>
        </div>

        <div id="grid-right" class="flex-row">
            <PropertyMenu :id="54" :header="SETTINGS" :style="'width: var(--right-property-menu-width);'">
                <SettingsVue :pitch="pitch"/>
            </PropertyMenu>
            <Toolbar :id="1" :elements="[]" :style="'width: var(--right-toolbar-width);'"/>
        </div>
    </div>

    <div id="grid-bottom" class="flex-column">
        <EditorTools :entityList="entityList" :pitch="pitch" :snapshotList="[]" v-on:showSnapshot="showSnapshot"/>
        <Statusbar />
    </div>

    <!-- <Properties v-if="showProperties" :propertyType="propertyType" :pitch="pitch" :pitchSizeChange="pitchSizeChange"/> -->
    <!-- <EntityToolbar v-on:selectEntity="selectEntity" :selected="selectedEntityType"/> -->

    <svg id="drag-entity"  width="32px" height="32px" viewBox="0 0 6 6" :display="dragging ? 'inline' : 'none'">
        <PlayerVue v-if="selectedEntityType === EntityType.PLAYERHOME || selectedEntityType === EntityType.PLAYERAWAY" :player="selectedEntity" :asTool="true"/>
    </svg>

</div>

</template>

<script lang="ts" setup>

import { ref } from "@vue/reactivity";
import Vector2 from "./math/Vector2";
import Rect from "./math/Rect";
import CanvasObject, {EntityList} from "./model/CanvasObject";
import Pitch from "./model/Pitch";
import Player from "./model/Player";
import PitchVue from "./view/Pitch.vue";
import PlayerContainer from "./view/PlayerContainer.vue";
import SnapshotEditor from "./view/SnapshotEditor.vue";
import Settings from "./model/Settings";
import { onMounted, onUnmounted, watch } from "@vue/runtime-core";
import Global, { EntityType, PropertyType } from "./helper/Global";
import PlayerVue from "./view/Player.vue";
import PlayerProperties from "./view/PlayerProperties.vue";
import CanvasVue from "./editor/Canvas.vue";
import EntityToolbar from "./editor/EntityToolbar.vue";
import EditorTools from "./editor/EditorTools.vue";
import Snapshot from "./model/Snapshot";
import Properties from "./editor/Properties.vue";
import Toolbar from "./editor/Toolbar.vue";
import PropertyMenu from "./editor/PropertyMenu.vue";
import Navbar from "./editor/Navbar.vue";
import Statusbar from "./editor/Statusbar.vue";
import SettingsVue from "./editor/property_menus/Settings.vue";



// TODO: width and height should be calculated in "App.vue" depending on viewport n stuff
const props = defineProps({
    width: {
        type: Number,
        default: 640
    },
    height: {
        type: Number,
        default: 480
    }
})


// TODO: save default settings on PC of user
const settings = ref<Settings>(Settings.settings);

const zoom = ref(1);
const pitch = ref<Pitch>(new Pitch());

function pitchSizeChange(){
    
    if(pitch.value.size.x < Pitch.MINSIZEX) pitch.value.size.x = Pitch.MINSIZEX;
    if(pitch.value.size.x > Pitch.MAXSIZEX) pitch.value.size.x = Pitch.MAXSIZEX;
    if(pitch.value.size.y < Pitch.MINSIZEY) pitch.value.size.y = Pitch.MINSIZEY;
    if(pitch.value.size.y > Pitch.MAXSIZEY) pitch.value.size.y = Pitch.MAXSIZEY;
    
    // resize, when the pitch size changes, to set the Global pitch rect correctly
    svgResize();
};

const showProperties = ref<Boolean>(true);
const propertyType = ref<PropertyType>(PropertyType.DEFAULT);

const entityList = ref<EntityList>({});
const dragging = ref<boolean>(false);
var dragStart: Vector2;
const selectedEntity = ref<CanvasObject | null>(null);
const selectedEntityType = ref<EntityType | null>(null);

function selectEntity(ev, type: EntityType){
    var de = document.getElementById("drag-entity");
    if(de === null || de === undefined) return;

    if(selectedEntityType.value === type)
        selectedEntityType.value = EntityType.NONE;
    else
        selectedEntityType.value = type;

    switch(type){
        case EntityType.BALL:
            return;
            break;
        case EntityType.PLAYERHOME:
            console.log("playerhome");
            // Vector2(3,3) is for visual purposes and should be overwritten in the end, when dropping the entity on the canvas
            selectedEntity.value = new Player(new Vector2(3,3));
            break;
        case EntityType.PLAYERAWAY:
            console.log("away");
            selectedEntity.value = new Player(new Vector2(3,3));
            break;
        case EntityType.LINE:
            console.log("line");

            
        default:
            return;
    }

    // connect mouse events
    dragStart = new Vector2(ev.clientX, ev.clientY);
    de.style.left = dragStart.x.toString() + 'px';
    de.style.top = dragStart.y.toString() + 'px';

    var ed = document.getElementById("editor");
    if(ed === null || ed === undefined) return;

    ed.addEventListener('mousemove', moveEntity);
    ed.addEventListener('mouseup', deselectEntity);
}

function moveEntity(ev){
    if(!dragging.value){
        if(dragStart.length(new Vector2(ev.clientX, ev.clientY)) < 8) return;
        dragging.value = true;
    }

    var de = document.getElementById("drag-entity");
    if(de === null || de === undefined) return;
    de.style.left = (ev.clientX - 16 - Global.canvasPosition.x).toString() + 'px';
    de.style.top = (ev.clientY - 16 - Global.canvasPosition.y).toString() + 'px';
    console.log("change left top");

}

function deselectEntity(ev){
    selectedEntityType.value = null;
    dragging.value = false;
    // add a new entity, if addNew
    if(selectedEntity.value !== null){
        // set the position correctly
        selectedEntity.value.position = Global.viewportToPitch(new Vector2(ev.clientX, ev.clientY));
        entityList.value[selectedEntity.value.id] = selectedEntity.value;
        console.log(entityList.value);
        
    }

    selectedEntity.value = null;
    
    var ed = document.getElementById("editor");
    if(ed === null || ed === undefined) return;

    ed.removeEventListener('mousemove', moveEntity);
    ed.removeEventListener('mouseup', deselectEntity);
}

function addEntity(type: EntityType){
    
}

function addPlayer(pos: Vector2){
    var pl = new Player(pos);
    entityList.value[pl.id] = pl;
}

// deletes a canvas object with the given ID
function deleteCanvasObject(id: number){
    if(!(id in entityList.value)) return;
    delete entityList.value[id];
}

////////////
// VISUAL //
////////////

const svgWidth = ref(Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0));
const svgHeight = ref(Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0));
// NOTE: svgScale is the value of how much the elements inside the canvas are upscaled by at a zoom level of 1 and depend on the viewport width and height
const svgScale = ref(1);
// svgZoom is the value of how much the user zooms into the canvas
const svgZoom = ref(1);
// dimensions of the pitch
const pitchOrigin = ref<Rect | undefined>(undefined);

/* new Vector2(svgWidth/2 - (pitch.size.x * svgScale)/2, svgHeight/2 - svgHeight * 0.075 - (pitch.size.y * svgScale)/2) */

onMounted(()=>{
    document.documentElement.addEventListener('resize', svgResize);
    window.addEventListener('resize', svgResize);
    // resize again to be safe
    svgResize();
});

onUnmounted(()=>{
    document.documentElement.removeEventListener('resize', svgResize);
    window.removeEventListener('resize', svgResize);
})

function svgResize(){
    svgWidth.value = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    svgHeight.value = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    // calculate the scale based on the viewport
    var base: number = svgWidth.value > svgHeight.value ? svgHeight.value : svgWidth.value;
    const margin: number = 0.9;
    svgScale.value = Math.floor((base * margin) / pitch.value.size.x);
    // set the global variables to the correct values
    Global.scale = svgScale.value;    
    Global.origin = new Vector2(svgWidth.value/2, svgHeight.value/2);
    
/*     {
        x: getYAxis(),
        y: getXAxis(),
        width: pitch.value.size.x * svgScale.value,
        height: pitch.value.size.y * svgScale.value
    }; */
}

// gets the Y position of the X axis!!!! DO NOT CONFUSE!!!!
function getXAxis(): number{
    return svgHeight.value/2 - (pitch.value.size.y/2)*svgScale.value;
}
// other way round DO NOT CONFUSE!!!!
function getYAxis(): number{
    return svgWidth.value/2 - (pitch.value.size.x/2)*svgScale.value;
}

interface Grid{
    navbarHeight?: string
    leftToolbarWidth?: string
    leftPropertyMenuWidth?: string
    rightToolbarWidth?: string
    rightPropertyMenuWidth?: string
    editorToolsHeight?: string
    statusbarHeight?: string
}

// set the size of each element in the "grid" (grid is metaphorical, we use flex)
function setGridSize(grid: Grid){

    var editor = document.getElementById('editor');
    if(editor === undefined || editor === null) return;


    if(grid.navbarHeight !== undefined)
        editor.style.setProperty('--navbar-height', grid.navbarHeight);

    if(grid.leftToolbarWidth !== undefined)
        editor.style.setProperty('--left-toolbar-width', grid.leftToolbarWidth);

    if(grid.leftPropertyMenuWidth !== undefined)
        editor.style.setProperty('--left-property-menu-width', grid.leftPropertyMenuWidth);

    if(grid.rightToolbarWidth !== undefined)
        editor.style.setProperty('--right-toolbar-width', grid.rightToolbarWidth);

    if(grid.rightPropertyMenuWidth !== undefined)
        editor.style.setProperty('--right-property-menu-width', grid.rightPropertyMenuWidth);

    if(grid.editorToolsHeight !== undefined)
        editor.style.setProperty('--editor-tools-height', grid.editorToolsHeight);
    
    if(grid.statusbarHeight !== undefined)
        editor.style.setProperty('--statusbar-height', grid.statusbarHeight);

}

// show the snapshot on screen
function showSnapshot(snap: Snapshot){
    console.log(snap.entities);
    
    // create a copy of each entity, as passing them directly as reference means actively editing the snapshot
    var lst: EntityList = {};
    for(var i in snap.entities){
        if(snap.entities[i] instanceof Player){
            var pl: Player = (snap.entities[i] as Player).copy();
            lst[pl.id] = pl;
        }
    }

    entityList.value = lst;
    console.log("show snapshot editor");
}

</script>


<style lang="scss" scoped>

#editor{
    display: flex;
    flex-direction: column;
    height: 100vh;

    // canvas width and height dependend on following values
    --navbar-height: 48px;
    --left-toolbar-width: 64px;
    --left-property-menu-width: 0px;
    --right-toolbar-width: 64px;
    --right-property-menu-width: 256px;
    --editor-tools-height: 192px;
    --statusbar-height: 24px;


    $z: 10;
    #grid-navbar,#grid-bottom{
        z-index: 2 * $z;

    }

    #grid-navbar{
        min-height: var(--navbar-height);
    }


    #grid-left-canvas-right{
        z-index: $z;
    }

    #grid-canvas{
        z-index: -$z;
    }

    #grid-left,#grid-right{
        box-shadow: 0 0 4px var(--dark);
        background: var(--dark-2);
    }

    #grid-left{
        min-width: calc(var(--left-toolbar-width) + var(--left-property-menu-width));
    }
    #grid-right{
        min-width: calc(var(--right-toolbar-width) + var(--right-property-menu-width));
        margin-left: auto;
        &:first-child{
            margin-left: auto;
        }
    }
    #grid-bottom{
        min-height: calc(var(--editor-tools-height) + var(--statusbar-height));
    }

    @media screen {
        
    }

}

#drag-entity{
    position: absolute;
}

</style>