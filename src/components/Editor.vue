<template>

<div id="editor">

    <div id="grid-navbar">
        <Navbar :pitch="pitch" v-on:changePitchSize="pitchSizeChange"/>
    </div>

    <div id="grid-left-canvas-right" class="flex-row flex-grow">
        <div id="grid-left" class="flex-row">
            <EntityToolbar v-on:newEntity="newEntity" :selected="entityType" :homeColors="home.colorPalette" :awayColors="away.colorPalette"/>
        </div>

        <div id="grid-canvas" class="flex-row flex-grow" style="background: #002255;">
            <CanvasVue :pitch="pitch" :entityList="entityList" :width="svgWidth" :height="svgHeight" :scale="svgScale" :yAxis="getYAxis()" :xAxis="getXAxis()"
                v-on:dropdown="openDropdown" v-on:playerSelected="onPlayerSelected"
                v-on:deleteEntity="deleteEntity"/>
        </div>

        <div id="grid-right" class="flex-row">
            <PropertyMenu v-if="menuState !== ''" :id="54" :header="menuList[menuState].header" :style="'width: var(--right-property-menu-width);'">
                <SettingsVue v-if="menuState === menuList.settings.id" :pitch="pitch" :pitchSizeChange="pitchSizeChange"/>
                <PlayerListVue v-if="menuState === menuList.playerList.id"
                    v-on:removePlayer="pl=>removePlayer(pl, true, true)"
                    :home="home" :away="away" :database="database"/>
                <TeamSettings v-if="menuState === menuList.teamSettings.id" :home="home" :away="away"/>
            </PropertyMenu>
            <Toolbar :id="1" :elements="Object.values(menuList)" :style="'width: var(--right-toolbar-width);'" v-on:menuStateChanged="onMenuStateChanged"/>
        </div>
    </div>

    <div id="grid-bottom" class="flex-column">
        <EditorTools :entityList="entityList" :pitch="pitch" :snapshotList="[]" v-on:showSnapshot="showSnapshot"/>
        <Statusbar />
    </div>

    <!-- <Properties v-if="showProperties" :propertyType="propertyType" :pitch="pitch" :pitchSizeChange="pitchSizeChange"/> -->
    <!-- <EntityToolbar v-on:newEntity="newEntity" :selected="entityType"/> -->

    <svg id="drag-entity"  width="32px" height="32px" viewBox="0 0 6 6" :display="dragging ? 'inline' : 'none'">
        <PlayerVue v-if="entityType === EntityType.PLAYERHOME" :player="entity" :circleColors="home.colorPalette" :asTool="true"/>
        <PlayerVue v-if="entityType === EntityType.PLAYERAWAY" :player="entity" :circleColors="away.colorPalette" :asTool="true"/>
    </svg>

    <div class="position-absolute" style="z-index: 200; top: var(--dropdown-top); left: var(--dropdown-left)">
        <DropdownMenu v-if="showDropdown && dropdown !== undefined" :items="dropdown" v-on:close="()=>closeDropdown(null, true)"/>
    </div>

</div>

</template>

<script lang="ts" setup>

import { ref } from "@vue/reactivity";
import Vector2 from "./math/Vector2";
import Rect from "./math/Rect";
import CanvasObject, {EntityList} from "./model/CanvasObject";
import Pitch from "./model/Pitch";
import Player, { PlayerList } from "./model/Player";
import PitchVue from "./view/Pitch.vue";
import PlayerContainer from "./view/PlayerContainer.vue";
import SnapshotEditor from "./view/SnapshotEditor.vue";
import { onMounted, onUnmounted, watch } from "@vue/runtime-core";
import Global, { EntityType} from "./helper/Global";
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
import SettingsVue from "@/components/view/property_menu/Settings.vue";
import PropertyMenuList from "./model/PropertyMenuList";
import PlayerListVue from "./view/property_menu/PlayerList.vue";
import TeamSettings from "./view/property_menu/TeamSettings.vue";
import Team from "./model/Team";
import DropdownMenu, { DropdownItem } from "./misc/dropdown-menu.vue";
import { IObject } from "./helper/enums";
import store from "@/store";


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
/* const settings = ref<Settings>(Settings.settings); */


//////////
// TEAM //
//////////

const home = ref<Team>(new Team());
const away = ref<Team>(new Team());
const database = ref<PlayerList>({});

///////////
// PITCH //
///////////

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

//////////////
// DROPDOWN //
//////////////

const dropdown = ref<DropdownItem[] | undefined>(undefined);
const showDropdown = ref<boolean>(false);

function openDropdown(_dropdown: DropdownItem[], x: number, y: number){
    if(_dropdown === undefined || _dropdown === null) return;    

    // set the top left origin of the dropdown to the click position
    var ed = document.getElementById('editor');
    if(ed === undefined || ed === null) return;

    ed.style.setProperty('--dropdown-top', `${y}px`);
    ed.style.setProperty('--dropdown-left', `${x}px`);    

    dropdown.value = _dropdown;
    showDropdown.value = true;

    document.addEventListener('click', closeDropdown);
    document.addEventListener('keydown', closeDropdown);
}

// close dropdown, if necessary; setting 'close' to true will DEFINITELY close the DD
function closeDropdown(ev, close: boolean = false){

    // all necessary actions, when closing the DD menu
    const closeDD = ()=>{
        dropdown.value = undefined;
        showDropdown.value = false;

        document.removeEventListener('click', closeDropdown);
        document.removeEventListener('keydown', closeDropdown);
    }

    if(close){
        closeDD();
        return;
    }

    // definitely close dropdown, if esc was clicked
    if(ev.key == "Esc" || ev.key == "Escape"){
        closeDD();
        ev.preventDefault();
        return;
    }    

    // left mb must have been clicked to close a dd menu
    if(ev.button != 0) return;

    // traverse all recursively open dropdown menus and check, if click happened on there somewhere
    var dda: HTMLCollectionOf<Element> = document.getElementsByClassName('dropdown-menu');
    if(dda === undefined || dda === null) return;

    var rect: DOMRect;
    var x = ev.clientX;
    var y = ev.clientY;
    for (var i = 0; i < dda.length; i++) {
        rect = dda[i].getBoundingClientRect();
        // if something inside dd clicked, dd prob. already handled it and sent a "close" signal, if its supposed to be closed
        // --> nothing to do, return
        if(rect.x <= x && rect.x + rect.width > x
            && rect.y <= y && rect.y + rect.height > y) return;
    }

    // if we are here, something outside dropdown was clicked -> close dropdown
    closeDD();

}

///////////////////
// PROPERTY MENU //
///////////////////

const menuList = PropertyMenuList;
const menuState = ref<string>('');
const additionalHeaderInfo = ref<string>('');

function onMenuStateChanged(oldState: string, newState: string){
    menuState.value = newState;
}

const selectedPlayer = ref<Player | null>(null);

function onPlayerSelected(player: Player | null){
    selectedPlayer.value = player;
}

////////////
// ENTITY //
////////////

const entityList = ref<EntityList>({});
const dragging = ref<boolean>(false);
var dragStart: Vector2;
const entity = ref<CanvasObject | null>(null);
const entityType = ref<EntityType | null>(null);

// select an entity type from the toolbar to drag n drop on the canvas
function newEntity(ev, type: EntityType){
    var de = document.getElementById("drag-entity");
    if(de === null || de === undefined) return;

    if(entityType.value === type)
        entityType.value = EntityType.NONE;
    else
        entityType.value = type;

    switch(type){
        case EntityType.BALL:
            return;
            break;
        case EntityType.PLAYERHOME:
            console.log("playerhome");
            // Vector2(3,3) is for visual purposes and should be overwritten in the end, when dropping the entity on the canvas
            entity.value = new Player(new Vector2(3,3));
            break;
        case EntityType.PLAYERAWAY:
            console.log("away");
            entity.value = new Player(new Vector2(3,3));
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
    ed.addEventListener('mouseup', dropEntity);
}

function moveEntity(ev){
    if(!dragging.value){
        if(dragStart.length(new Vector2(ev.clientX, ev.clientY)) < 8) return;
        dragging.value = true;
    }

    var de = document.getElementById("drag-entity");
    if(de === null || de === undefined) return;
    de.style.left = (ev.clientX - 16).toString() + 'px';
    de.style.top = (ev.clientY - 16).toString() + 'px';
    console.log("change left top");

}

// try to drop the entity on the canvas
function dropEntity(ev){
    
    // only dropdown, if mouse over canvas
    var cnv = document.getElementById('grid-canvas'), rect, overCanvas = false;
    var x = ev.clientX, y = ev.clientY;
    console.log("X: ", x, " Y: ", y);
    
    if(cnv !== undefined && cnv !== null){
        rect = cnv.getBoundingClientRect();
        if(rect.x <= x && rect.x + rect.width > x
            && rect.y <= y && rect.y + rect.height > y)
            overCanvas = true;
    }

    if(entity.value !== null && overCanvas){
        // set the position correctly
        entity.value.position = Global.viewportToPitch(new Vector2(ev.clientX, ev.clientY));
        
        entityList.value[entity.value.id] = entity.value;
        
        // if player entity, add to home/away team first eleven list
        if(entityType.value === EntityType.PLAYERHOME
            ||entityType.value === EntityType.PLAYERAWAY){
            console.log("adding player to a team");
            
            addPlayerToTeam((entity.value as Player), entityType.value);
        }
    }

    dragging.value = false;
    entityType.value = null;
    entity.value = null;
    
    var ed = document.getElementById("editor");
    if(ed === null || ed === undefined) return;

    ed.removeEventListener('mousemove', moveEntity);
    ed.removeEventListener('mouseup', dropEntity);
}

// deletes given canvas object
// can take in additional data to be processed for specific kinds of entities
function deleteEntity(entity: CanvasObject, data: any){
    if(!(entity.id in entityList.value)) return;
    delete entityList.value[entity.id];

    // if type is Player, additionally remove from team list
    if(entity instanceof Player){
        // delete from team, keep player in database
        if(data === 'removeFromTeam'){
            removePlayer(entity as Player);
            return;
        }
        // delete completely
        if(data === 'removeCompletely'){
            removePlayer(entity as Player, true, true);
            return;
        }
        // delete from squad, keep player in team
        removePlayer(entity as Player, false);
    }

}

// deletes a canvas object with the given ID
function deleteEntityById(id: number){
    if(!(id in entityList.value)) return;
    delete entityList.value[id];
}

function addPlayerToTeam(player: Player, type: EntityType){
    switch(type){
        case EntityType.PLAYERHOME: {
            home.value.addPlayer(player, 'firstTeam');            
            break;
        }
        case EntityType.PLAYERAWAY: {
            away.value.addPlayer(player, 'firstTeam');
            break;
        }
    }
}

// removes player from squad, team, or completely
// default: delete from squad team, push player to 'others' squad
// if player not supposed to be removed completely, push him to database
// if 'removeFromTeam' false and 'removeCompletely' true, ignore 'removeCompletely'
function removePlayer(player: Player, removeFromTeam: boolean = true, removeCompletely: boolean = false){
    // remove player from entity list, if it still is in it for some reason
    if(player.id in entityList.value)
        delete entityList.value[player.id];

    var team: Team | null = player.team;
    if(team !== null)
        team.removePlayer(player, [], removeFromTeam);
    else{
        // make sure, that player REALLY has no team

        var lst = home.value.playerList;
        var keys: string[] = Object.keys(lst);
        for(var i = 0; i < keys.length; i++){
            if(lst[keys[i]] === player){
                home.value.removePlayer(player, [], removeFromTeam);
                break;
            }
        }

        lst = away.value.playerList;
        keys = Object.keys(lst);
        for(var i = 0; i < keys.length; i++){
            if(lst[keys[i]] === player){
                away.value.removePlayer(player, [], removeFromTeam);
                break;
            }
        }
    }

    // dont push into db and dont delete completely
    if(!removeFromTeam) return;
    // remove player completely, including database
    if(removeCompletely){
        if(player.id in database.value)
            delete database.value[player.id];
        return;
    }
    
    database.value[player.id] = player;
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


// create reactive reference to all objects, such that we may access them...
// oh wait... GODDAMN IT I COMPLETELY FORGOT ABOUT THE EXISTENCE OF THE VUE STORE
// what a waste of time...
Global.objects = ref({
    home: home,
    away: away,
    database: database,
    pitch: pitch,
    entityList: entityList,
});

</script>


<style lang="scss" scoped>

#editor{
    position: relative;

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

    // EXCLUSIVELY for the dropdown menu! (of course you can use it for other things, but why would u?)
    --dropdown-top: 0;
    --dropdown-left: 0;

    $z: 10;
    #grid-navbar,#grid-bottom{
        z-index: 2 * $z;

    }

    #grid-navbar{
        /* min-height: var(--navbar-height); */
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
        /* min-width: calc(var(--left-toolbar-width) + var(--left-property-menu-width)); */
    }
    #grid-right{
        /* min-width: calc(var(--right-toolbar-width) + var(--right-property-menu-width)); */
        margin-left: auto;
        &:first-child{
            margin-left: auto;
        }
    }
    #grid-bottom{
        /* min-height: calc(var(--editor-tools-height) + var(--statusbar-height)); */
    }

    @media screen {
        
    }

}

#drag-entity{
    position: absolute;
    z-index: 100;
}

/* .dropdown-vue, .dropdown-menu{
    z-index: 200;
} */

</style>