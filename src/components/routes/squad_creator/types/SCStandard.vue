<template>
    
<div id="sc-standard" class="sc-squad-type">
    
    <!-- TODO: add ability to delete players -->

    <div id="sc-standard-squad" class="sc-squad">

        <svg id="sc-standard-squad-svg" :width="squadCreatorStore.settings.canvasWidth" :height="squadCreatorStore.settings.canvasHeight"
            :viewBox="'0 0 ' + squadCreatorStore.settings.canvasWidth + ' ' + squadCreatorStore.settings.canvasHeight">
            <g :transform="`translate(${squadCreatorStore.settings.canvasWidth/2},${squadCreatorStore.settings.canvasHeight/2}), scale(${squadCreatorStore.settings.canvasScale}),
                rotate(${squadCreatorStore.settings.pitchOrientation !== 'horizontal' ? '-90' : '0'})`">
                <Pitch />
                <HUD />
                <!-- Show placeholders, when dragging a player and placeholders are active -->
                <g v-show="showPlaceholders" id="sc-placeholder-players">
                    <PlayerVue v-for="(val, key) in sqpp" :key="'placeholder-player-' + key" :player="val" :placeholder="true"
                        v-on:mouse-enter="onMouseEnter" v-on:mouse-leave="onMouseLeave"/>
                </g>

                <PlayerVue v-for="(val, key) in squadCreatorStore.firstTeam" :key="'player-' + key" :player="val" :selected="selectedPlayer === val ? true : false"
                v-on:select="selectPlayer" v-on:changePlayer="activatePlayerChangeHUD" v-on:drag-start="onPlayerDragStart" v-on:drag-end="onPlayerDragEnd"
                v-on:mouse-enter="onMouseEnter" v-on:mouse-leave="onMouseLeave"/>
            </g>

        </svg>

        <div v-if="showHUD" id="sc-standard-squad-hud-container">
            <div id="sc-standard-squad-hud">
                <div id="sc-standard-squad-hud-change-player" class="flex-row">
                    <input class="input-dark-2" type="text" placeholder="Enter name of player..." v-model="addPlayerName">
                    <svg-button-selection :selection="SVG_SELECTION.SEND" :size="24" @click="changePlayer"/>
                </div>
                <div class="flex-column m-center-v" style="margin: auto 8px;">
                    <svg-button-selection :selection="SVG_SELECTION.CLOSE"  :size="24" @click="showHUD = false"/>
                </div>
            </div>
        </div>
    </div>


    <div id="sc-standard-properties" class="sc-properties">

        <div id="sc-standard-properties-header" class="header">
            <div class="toggle">

            </div>
            <div class="tabs">

                <button :class="`pm-nav-button${tabState === TAB_STATE.GENERAL ? '-active' : ''}`" @click="changeTabState(TAB_STATE.GENERAL)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="var(--light)">
                        <path d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z"/>
                    </svg>
                </button>

                <button :class="`pm-nav-button${tabState === TAB_STATE.PITCH ? '-active' : ''}`" @click="changeTabState(TAB_STATE.PITCH)">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 6.3499996 6.3499996"
                    stroke="var(--light)">
                    <g
                        transform="translate(-79.558675,-53.394273)">
                        <g
                        transform="matrix(0.9951168,0,0,0.9951168,0.40400698,0.27623706)">
                        <path
                            style="fill:none;stroke-width:0.3968745;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                            d="m 82.733675,54.585181 v 1.108257"/>
                        <path
                            style="fill:none;stroke-width:0.3968745;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
                            d="m 82.733675,57.445105 v 1.108257"/>
                        <path
                            style="fill:none;stroke-width:0.3968745;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                            d="m 79.675386,55.395048 h 0.959584 v 2.348447 h -0.959584"/>
                        <path
                            style="fill:none;stroke-width:0.3968745;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
                            d="m 85.791962,55.395049 h -0.959583 v 2.348447 h 0.959583"/>
                        <rect
                            style="fill:none;stroke-width:0.3968745;stroke-linecap:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                            width="6.1165771"
                            height="3.9574206"
                            x="79.675385"
                            y="54.590565"
                            ry="0.46684465"
                            rx="0.46684465" />
                        <circle
                            style="fill:none;stroke-width:0.3968745;stroke-linecap:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                            cy="56.569271"
                            cx="82.733673"
                            r="0.87533373" />
                        </g>
                    </g>
                    </svg>
                </button>

                <button :class="`pm-nav-button${tabState === TAB_STATE.PLAYERS ? '-active' : ''}`" @click="changeTabState(TAB_STATE.PLAYERS)">
                    <svg xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        stroke="var(--light)">

                        <path d="m 1.1765938,7.9880074 c 0.1272687,0.4987643 0.5754282,0.8469914 1.0904617,0.8469914 0.0909,0 0.1818461,-0.011162 0.2706645,-0.033154 L 4.4019145,8.3388356 C 4.6131301,8.2881362 4.6679914,8.4525308 4.6679914,8.5467407 V 20.367398 c 0,0.617142 0.5027371,1.119737 1.1202097,1.119737 H 18.220467 c 0.617803,0 1.120824,-0.502595 1.120824,-1.119737 V 8.5494838 c 0,-0.081771 0.02351,-0.2187828 0.184069,-0.2187828 0.02497,0 0.05344,0.00378 0.0813,0.010877 l 1.855682,0.4606453 c 0.08848,0.021992 0.179859,0.033201 0.270854,0.033201 0.515127,0 0.963334,-0.3482742 1.090177,-0.8469913 L 23.465486,5.4716738 C 23.539546,5.1812403 23.495986,4.880071 23.342283,4.623169 23.189002,4.36674 22.944491,4.185556 22.653727,4.1134324 L 16.767353,2.6520426 C 16.413166,2.5619476 16.047914,2.5158827 15.679682,2.5158827 l -1.44025,-0.00237 -0.06876,0.2844745 c -0.24376,1.0146531 -1.142112,1.7231197 -2.184808,1.7231197 -1.042883,0 -1.941424,-0.7084193 -2.1848945,-1.7231158 L 9.7322511,2.5135179 h -1.351147 l -0.066355,0.00275 c -0.3651108,0 -0.7300799,0.046065 -1.0819013,0.1354032 L 1.3466164,4.1133851 C 1.0555208,4.1855088 0.81129368,4.3666928 0.65758762,4.6231217 0.50425992,4.8796453 0.46037093,5.1811929 0.53467007,5.4716265 Z"
                        style="fill:none;stroke-width:1.5;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />

                        <g transform="translate(0,1)" fill="var(--light)">

                            <path d="M 8.8720302,14.082591 H 10.196815 V 7.5059415 H 9.1170902 c 0,0.057342 -0.01663,0.1452299 -0.04994,0.2631212 C 9.0098086,7.9654167 8.925671,8.1225394 8.813652,8.2408255 8.6510024,8.4131965 8.4394987,8.5283738 8.1803253,8.5857157 8.0176757,8.6219861 7.7327922,8.6491766 7.325428,8.6673859 v 0.8798178 h 1.5466515 v 4.5353873 z"
                            id="path4"
                            style="stroke-width:0" />

                            <path d="m 14.405423,14.246079 c 0.837724,0 1.425256,-0.292878 1.762251,-0.87962 0.337586,-0.586743 0.505862,-1.422444 0.505862,-2.508436 0,-1.085745 -0.168276,-1.9229759 -0.505862,-2.5125807 -0.336205,-0.5896047 -0.924527,-0.8844565 -1.762251,-0.8844565 -0.837478,0 -1.424615,0.2948518 -1.762202,0.8844565 -0.336748,0.5896048 -0.505369,1.4271811 -0.505369,2.5125807 0,1.085992 0.168621,1.921693 0.505369,2.508436 0.337587,0.586792 0.924724,0.87962 1.762202,0.87962 z M 13.643496,9.0980915 c 0.124208,-0.3811607 0.378743,-0.5711982 0.761927,-0.5711982 0.384466,0 0.63604,0.1904323 0.755264,0.5711982 0.119471,0.3814073 0.179379,0.9677055 0.179379,1.7599315 0,0.755906 -0.05991,1.334556 -0.179379,1.735209 -0.119668,0.400258 -0.370798,0.601004 -0.755264,0.601004 -0.383234,0 -0.637324,-0.200697 -0.761927,-0.601004 -0.12401,-0.400653 -0.185695,-0.978957 -0.185695,-1.735209 0,-0.792176 0.06169,-1.3785242 0.185695,-1.7599315 z"
                            id="path6"
                            style="stroke-width:0" />
                        </g>

                    </svg>
                </button>
            </div>
        </div>

        <div id="sc-standard-properties-content">
            <scrollarea v-if="tabState === TAB_STATE.GENERAL && selectedPlayer === null" :width="'100%'" :height="'100%'">
                <GeneralSettings :formationChanged="formationChanged" />
            </scrollarea>
            <scrollarea v-else-if="tabState === TAB_STATE.GENERAL && selectedPlayer !== null" :width="'100%'" :height="'100%'">
                <PlayerProperties :player="selectedPlayer"/>
            </scrollarea>
            <scrollarea v-else-if="tabState === TAB_STATE.PITCH" :width="'100%'" :height="'100%'">
                <PitchSettings/>
            </scrollarea>
            <scrollarea v-else-if="tabState === TAB_STATE.PLAYERS" :width="'100%'" :height="'100%'">
                <PlayersSettings />
            </scrollarea>
        </div>

    </div>

</div>

</template>

<script lang="ts" setup>
import { PlayerStyle, SVG_SELECTION } from '@/components/util/enums'
import FormationList, { LockedPositions, Position } from '@/components/util/FormationList'
import Vector2 from '@/components/math/Vector2'
import store from '@/store'
import Pitch from './standard/Pitch.vue'
import PlayerVue from './standard/Player.vue'
import HUD from './standard/HUD.vue'
import { Committer } from '@/store/modules/squad_creator_committer'
import GeneralSettings from './standard/settings/General.vue'
import PitchSettings from './standard/settings/Pitch.vue'
import PlayersSettings from './standard/settings/PlayerSettings.vue'
import Player, { createPlaceholders, PlayerList } from '@/components/model/Player'
import PlayerProperties from './standard/settings/PlayerProperties.vue'
import SvgButtonSelection from '@/components/misc/svg-button-selection.vue'
import Scrollarea from '@/components/misc/scrollarea.vue'
import { ref } from '@vue/reactivity'
import { onMounted, onUnmounted, watch } from '@vue/runtime-core'

interface Props{
    formationChanged: ()=>void
}

const props = defineProps<Props>();
const squadCreatorStore = ref(store.state.squadCreatorStore);

const sqpp = ref<PlayerList>({});
createPlaceholderPlayers();

// Create the placeholders to be displayed, when moving players around, depending on current players
function createPlaceholderPlayers(){    
    const ft: PlayerList = squadCreatorStore.value.firstTeam;
    const ft_keys = Object.keys(ft);

    // only create placeholders for empty positions
    var possible_ph_keys = Object.keys(LockedPositions);
    for(var pl in ft){        
        const index = possible_ph_keys.indexOf(ft[pl].positionKey);
        console.log("key: ", ft[pl].positionKey, "; index: ", index);
        
        if (index > -1) {
            possible_ph_keys.splice(index, 1);
        }
    }
    var phs: {[key: string]: Position} = {};
    for(var ph in possible_ph_keys){
        if(!(possible_ph_keys[ph] in LockedPositions)) continue;
        phs[possible_ph_keys[ph]] = LockedPositions[possible_ph_keys[ph]];
    }

    sqpp.value = createPlaceholders(phs);
    setSquadCreatorPlaceholderPlayersSize();
}
function setSquadCreatorPlaceholderPlayersSize(){
    for(var id in sqpp.value){
        sqpp.value[id].setPosition(sqpp.value[id].positionKey, squadCreatorStore.value.settings.pitchSize.x, squadCreatorStore.value.settings.pitchSize.y);
    }
}

enum TAB_STATE {GENERAL, PITCH, PLAYERS};

const tabState = ref<TAB_STATE>(TAB_STATE.GENERAL);
const showScrollbar = ref<boolean>(false);
const scrollOffset = ref<number>(0);
const showHUD = ref<boolean>(false);
const showPlaceholders = ref<boolean>(false);
const hoveredPlayer = ref<Player | null>(null);
const playerDrag = ref<Player | null>(null);
const playerPositionBeforeDrag = ref<Vector2>(new Vector2());
const playerPositionKeyBeforeDrag = ref<string>("");
const selectedPlayer = ref<Player | null>(null);

onMounted(()=>{
    resize();
    window.addEventListener('resize', resize);
})

onUnmounted(()=>{
    window.removeEventListener('resize', resize);
})


// resize canvas at pitch size or orientation change, or when new squad is created
const pitchSize = ref(store.state.squadCreatorStore.settings.pitchSize);
const settings = ref(store.state.squadCreatorStore.settings);
watch(pitchSize.value, (currentValue, oldValue) => {resize();});
watch(settings.value, (currentValue, oldValue) => {resize();});
watch(squadCreatorStore.value, (currentValue, oldValue) => {resize();});

function resize(){
    const content = document.getElementById('sc-content');
    const sc_squad = document.getElementById('sc-standard-squad');
    if(content === undefined || content === null) return;
    if(sc_squad === undefined || sc_squad === null) return;

    Committer.setCanvasWidth(sc_squad.getBoundingClientRect().width);
    Committer.setCanvasHeight(sc_squad.getBoundingClientRect().height);

    const size: Vector2 = squadCreatorStore.value.settings.pitchSize;
    if(squadCreatorStore.value.settings.pitchOrientation === 'horizontal'){
        Committer.setCanvasScale((squadCreatorStore.value.settings.canvasWidth / size.x) * 0.8);
    }
    else{
        Committer.setCanvasScale((squadCreatorStore.value.settings.canvasHeight / size.x) * 0.8);
    }
    setSquadCreatorPlaceholderPlayersSize();
}

defineExpose({
    resize,
    createPlaceholderPlayers
});

function changeTabState(newTab: TAB_STATE){
    tabState.value = newTab;
}

function selectPlayer(player: Player | null){
    if(selectedPlayer.value === player){
        selectedPlayer.value = null;
        const squad = document.getElementById('sc-standard-squad');
        if(squad === undefined || squad === null) return;
        squad.removeEventListener('mouseup', deselectPlayer);
        return;
    }
    
    selectedPlayer.value = player;

    if(selectedPlayer.value === null){
        const squad = document.getElementById('sc-standard-squad');
        if(squad === undefined || squad === null) return;
        squad.removeEventListener('mouseup', deselectPlayer);                
        return;
    }

    // immediately switch to propety menu, when selecting a player!
    tabState.value = TAB_STATE.GENERAL;

    // we want to deselect a player, if we click anywhere outside it
    const squad = document.getElementById('sc-standard-squad');
    if(squad === undefined || squad === null) return;
    squad.addEventListener('mouseup', deselectPlayer);
}

function deselectPlayer(ev){
    selectedPlayer.value = null;    
}

// for placeholder display and drop
function onPlayerDragStart(player: Player){
    playerPositionBeforeDrag.value = player.position.copy();
    playerPositionKeyBeforeDrag.value = player.positionKey;
    showPlaceholders.value = true;
    playerDrag.value = player;
}
function onPlayerDragEnd(player: Player){    
    if(showPlaceholders.value){
        // to new position
        if(hoveredPlayer.value !== null){
            // switch positions
            player.setPosition(hoveredPlayer.value.positionKey, squadCreatorStore.value.settings.pitchSize.x, squadCreatorStore.value.settings.pitchSize.y);
            hoveredPlayer.value.setPosition(playerPositionKeyBeforeDrag.value, squadCreatorStore.value.settings.pitchSize.x, squadCreatorStore.value.settings.pitchSize.y);
        }
        // to pre-drag position
        else{
            if(playerPositionKeyBeforeDrag.value in LockedPositions)
                player.setPosition(playerPositionKeyBeforeDrag.value, squadCreatorStore.value.settings.pitchSize.x, squadCreatorStore.value.settings.pitchSize.y);
            else
                player.setPositionFree(playerPositionBeforeDrag.value.copy());
        }
    }

    showPlaceholders.value = false;
    playerDrag.value = null;
    playerPositionKeyBeforeDrag.value = "";
    playerPositionBeforeDrag.value = new Vector2();
}

function onMouseEnter(player: Player){
    if(!playerDrag.value) return;
    hoveredPlayer.value = player;
}

function onMouseLeave(player: Player){
    hoveredPlayer.value = null;
}

const playerToChange = ref<Player | null>(null);
const addPlayerName = ref<string>('');

function activatePlayerChangeHUD(player: Player){    
    showHUD.value = true;
    playerToChange.value = player;
}

function changePlayer(ev){
    if(playerToChange.value === null) return;
    // we don't want no-name players!
    if(addPlayerName.value === '') return;
    
    Committer.replaceDummyWithPlayer(playerToChange.value, addPlayerName.value, -1, null);

    showHUD.value = false;
    playerToChange.value = null;
    addPlayerName.value = "";
}

</script>



<style lang="scss" scoped>

/* SQUAD */

#sc-standard-squad-hud-container{
    display: flex;
    position: absolute;
    top: 16px;
    left: 0;
    width: 100%;
}

#sc-standard-squad-hud{
    display: flex;
    flex-direction: row;

    margin-left: auto;
    margin-right: auto;
    background: var(--secondary-dark);
    background: var(--dark);
    box-shadow: 0 0 1px 1px #000;
    border: 1px solid var(--accent);
    border-radius: 8px;
}

#sc-standard-squad-hud-change-player{
    //margin: auto;
    input{
        margin: 8px;
        background: none;
        width: 240px;
    }
}

#sc-standard-squad-hud-squadname{

}

#sc-standard-squad-hud-formation{
    right: 16px;
    top: 16px;
    opacity: 0.6;
    transition-duration: 0.2s;
    &:hover{
        opacity: 1;
    }
}

#sc-standard-squad-hud-orientation{

}

#sc-standard-squad-svg{
    position: absolute;
    left: 0;
    top: 0;
}

/* PROPERTIES */


</style>


<style lang="scss">

.scroll-container{

    .scroll-viewport{

    }

    .scroll-scrollbar-container-v, .scroll-scrollbar-container-h{
        display: flex;
        flex-direction: column;

        width: 8px;
        padding-top: 4px;
        padding-bottom: 4px;
        background: var(--dark);
        opacity: 0.5;
        /* filter: opacity(0.5); */

        .scroll-scrollbar{
            margin-left: auto;
            margin-right: auto;
            opacity: 2;

            width: 4px;
            height: 36px;
            background: var(--light-4);
            border-radius: 4px;
            
            &:hover{
                background: var(--light-2);
                /* filter: brightness(2); */
            }
        }
    }
}

$properties-width: 256px;

.sc-squad-type{
    display: flex;
    flex-direction: row;

    height: 100%;
}

.sc-squad{
    position: relative;
    width: calc(100% - $properties-width);
    height: 100%;
    overflow: hidden;

}

.sc-properties{
    display: flex;
    flex-direction: column;
    /* background: var(--dark); */
    /* box-shadow: -2px 0 2px var(--dark); */

    width: $properties-width;
    /* height: 100%; */
    
    box-sizing: border-box;

    .header{
        padding: 16px;
        border-bottom: 1px solid var(--accent);
        width: calc($properties-width - 32px);
        .tabs{
            display: flex;
            flex-direction: row;
            justify-content: center;
            overflow: hidden;
            border-radius: 4px;
            width: 100%;
            button{
                padding: 0;
                margin: 0 2px;
/*                 border-radius: 4px; */
/*                 border: 1px solid var(--dark-6); */
                width: 32px;
                height: 32px;
/*                 flex-grow: 100;
                width: calc(100% / 3); */

/*                 &:nth-child(1), &:nth-child(2){
                    border-right: 1px solid var(--accent);
                } */
            }
        }
    }

    .content{
        display: flex;
        flex-direction: column;
        box-sizing: border-box;

        /* background: var(--dark-2); */
        padding: 16px;
        /* min-height: 100%; */
        /* width: $properties-width; */
        .item{
            margin-bottom: 16px;
        }
    }
    /* overflow-y: scroll; */
}

#sc-standard-properties-content{
    overflow: hidden;
    width: $properties-width;
}


</style>