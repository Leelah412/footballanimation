<template>

<div id="editor" ref="editor">

    <div id="grid-navbar">
        <Navbar />
    </div>

    <div id="grid-left-canvas-right" class="flex-row flex-grow">
        <div id="grid-left" class="flex-row">
            <EntityToolbar v-on:newEntity="newEntity" :selected="entityType" />
        </div>

        <div id="grid-canvas" class="flex-row flex-grow" style="background: #002255;">
            <!-- NEXT -->
            <CanvasVue
                v-on:dropdown="openDropdown" v-on:entitySelected="onEntitySelected" />
        </div>

        <div id="grid-right" class="flex-row">
            <PropertyMenu v-if="menuState !== ''" :id="54" :header="menuList[menuState].header" :tooltip="menuList[menuState].tooltip"
                :style="'width: var(--right-property-menu-width);'">
                <SettingsVue v-if="menuState === menuList.settings.id"/>
                <Properties v-if="menuState === menuList.properties.id" :selected="selectedEntity"/>
                <PlayerListVue v-if="menuState === menuList.playerList.id" />
                <TeamSettings v-if="menuState === menuList.teamSettings.id" />
            </PropertyMenu>
            <Toolbar :id="1" :elements="Object.values(menuList)" :style="'width: var(--right-toolbar-width);'" v-on:menuStateChanged="onMenuStateChanged"/>
        </div>
    </div>

    <div id="grid-bottom" class="flex-column">
        <EditorTools />
        <Statusbar />
    </div>

    <svg id="drag-entity"  width="32px" height="32px" viewBox="0 0 6 6" :display="dragging ? 'inline' : 'none'">
        <!-- TODO: REFACTOR TO ADD COMPONENT BY CODE -->
        <PlayerVue v-if="entityType === EntityType.PLAYERHOME" :player="entity" :asTool="true"/>
        <PlayerVue v-if="entityType === EntityType.PLAYERAWAY" :player="entity" :asTool="true"/>
    </svg>

<!--     <div class="position-absolute" style="z-index: 200; top: var(--dropdown-top); left: var(--dropdown-left)">
        <DropdownMenu v-if="showDropdown && dropdown !== undefined" :items="dropdown" v-on:close="()=>closeDropdown(null, true)"/>
    </div> -->

</div>

</template>

<script lang="ts" setup>

import { ref } from "@vue/reactivity";
import Vector2 from "../components/math/Vector2";
import Rect from "../components/math/Rect";
import CanvasObject, {EntityList} from "../components/model/CanvasObject";
import Pitch from "../components/model/Pitch";
import Player, { PlayerList } from "../components/model/Player";
import PitchVue from "../components/view/Pitch.vue";
import PlayerContainer from "../components/view/PlayerContainer.vue";
import SnapshotEditor from "../components/view/SnapshotEditor.vue";
import { onMounted, onUnmounted} from "@vue/runtime-core";
import Global, { EntityType} from "../components/helper/Global";
import PlayerVue from "../components/view/Player.vue";
import PlayerProperties from "../components/view/PlayerProperties.vue";
import CanvasVue from "../components/editor/Canvas.vue";
import EntityToolbar from "../components/editor/EntityToolbar.vue";
import EditorTools from "../components/editor/EditorTools.vue";
import Snapshot from "../components/model/Snapshot";
import Toolbar from "../components/editor/Toolbar.vue";
import PropertyMenu from "../components/editor/PropertyMenu.vue";
import Navbar from "../components/editor/Navbar.vue";
import Statusbar from "../components/editor/Statusbar.vue";
import SettingsVue from "@/components/view/property_menu/Settings.vue";
import PropertyMenuList from "../components/model/PropertyMenuList";
import PlayerListVue from "../components/view/property_menu/PlayerList.vue";
import TeamSettings from "../components/view/property_menu/TeamSettings.vue";
import Team from "../components/model/Team";
import DropdownMenu, { DropdownItem } from "../components/misc/dropdown-menu.vue";
import { IObject } from "../components/helper/enums";
import store from "@/store/index";
import { Committer } from "@/store/modules/editor_committer";
import Properties from "../components/view/property_menu/Properties.vue";


//////////////
// DROPDOWN //
//////////////

const dropdown = ref<DropdownItem[] | undefined>(undefined);
const showDropdown = ref<boolean>(false);

/* TODO: try to make it so, that the dropdown menu can be called from anywhere
    and isnt dependend on emitting signals back to Editor component */

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

const dragging = ref<boolean>(false);
var dragStart: Vector2;
const entity = ref<CanvasObject | null>(null);
const entityType = ref<EntityType>(EntityType.NONE);

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
            entity.value = new Player(new Vector2(3,3), 0, store.state.home);
            break;
        case EntityType.PLAYERAWAY:
            console.log("away");
            entity.value = new Player(new Vector2(3,3), 0, store.state.away);
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
        
        Committer.addEntity(entity.value);
        
        // if player entity, add to home/away team first eleven list
        if(entity.value instanceof Player){
            console.log("adding player to a team");
            Committer.addPlayerToTeam(entity.value as Player, entityType.value);
        }
    }

    dragging.value = false;
    entityType.value = EntityType.NONE;
    entity.value = null;
    
    var ed = document.getElementById("editor");
    if(ed === null || ed === undefined) return;

    ed.removeEventListener('mousemove', moveEntity);
    ed.removeEventListener('mouseup', dropEntity);
}

// save the selected entity on the canvas
const selectedEntity = ref<CanvasObject | null>(null);

function onEntitySelected(en: CanvasObject | null){
    selectedEntity.value = en;
    console.log("emtoty_ ", selectedEntity.value);
    
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

</script>


<style lang="scss" scoped>

#editor{
    position: relative;

    display: flex;
    flex-direction: column;
    height: 100vh;

    overflow: hidden;

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