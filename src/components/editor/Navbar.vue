<template>
    
<div id="editor-navbar">

    <button class="navbar-button" @click="onLoad">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>
        </svg>
        <span>LOAD</span>
    </button>
    <button class="navbar-button" @click="onSave">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/>
        </svg>
        <span>SAVE</span>
    </button>
    <button class="navbar-button" @click="onImport">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
        </svg>
        <span>IMPORT</span>
    </button>
    <button class="navbar-button" @click="onExport">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" width="24px" viewBox="0 0 24 24" fill="#000000">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"/>
        </svg>
        <span>EXPORT</span>
    </button>

    <div class="navbar-divider"></div>

    <button :class="`navbar-button${(showJersey ? '-active' : '')}`" id="navbar-toggle-jersey" @click="onShowJersey">
        <Jersey :jersey="visualizationJersey" :isVisual="true" :width="32" :height="32"/>
        <!-- <span>JERSEY</span> -->
    </button>

    <div class="navbar-divider"></div>

    <div id="navbar-pitch" class="flex-row align-center">
        <svg :width="`${(105/68) * 32}px`" :height="`${32}px`" viewBox="-2 -2 109 72" style="opacity:0.6">
        <g id="layer1">
            <rect
            style="fill:var(--secondary-dark);stroke:var(--light);stroke-width:6;stroke-linecap:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
            id="outer-lines"
            width="104.81563"
            height="67.815628"
            x="0.12500298"
            y="0.12500361" />
            <path
            style="fill:var(--secondary-dark);stroke:var(--light);stroke-width:6;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
            d="m 52.532807,0.03281 v 68"
            id="center-line" />
            <g
            id="center-circle">
            <circle
                style="fill:none;stroke:var(--light);stroke-width:6;stroke-linecap:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                id="path1079"
                cx="52.53281"
                cy="34.03281"
                r="15" />
            </g>
            <g
            id="penarea-left">
            <rect
                style="fill:var(--secondary-dark);stroke:var(--light);stroke-width:6;stroke-linecap:round;stroke-miterlimit:4;stroke-dasharray:none"
                id="rect833-6-6"
                width="16.443743"
                height="40.243744"
                x="0.12500298"
                y="13.910938" />
            </g>
            <g
            id="penarea-right">
            <rect
                style="fill:var(--secondary-dark);stroke:var(--light);stroke-width:6;stroke-linecap:round;stroke-miterlimit:4;stroke-dasharray:none"
                id="rect833-6-6-2"
                width="16.443743"
                height="40.243744"
                x="88.496895"
                y="13.910954" />
            </g>
        </g>
        </svg>
        
        <div class="flex-column" style="margin-left: 16px">
            <label for="navbar-pitch-width" style="font-weight: 300; font-size:10px; margin-top: 8px;">
                Width
                <span style="font-size:8px; color: var(--light-4);">(m)</span>
            </label>
            <input type="number" id="navbar-pitch-width" min="90" max="120" v-model.lazy="x"
                style="margin-bottom: 16px;" @change="onPitchSizeChange"/>
        </div>

        <div class="flex-column">
            <label for="navbar-pitch-height" style="font-weight: 300; font-size:10px; margin-top: 8px;">
                Height
                <span style="font-size:8px; color: var(--light-4);">(m)</span>
            </label>
            <input type="number" id="navbar-pitch-height" min="60" max="90" v-model.lazy="y"
                style="margin-bottom: 16px;" @change="onPitchSizeChange"/>
        </div>
    </div>

</div>

</template>


<script lang="ts" setup>
import store from '@/store/index';
import { Committer } from '@/store/modules/editor_committer';
import { ref } from '@vue/reactivity';
import {visualizationJersey} from '../model/Jersey';
import Pitch, {visualizationPitch} from '../model/Pitch';
import Jersey from '../view/Jersey.vue';

interface Props{
    
}

const props = defineProps<Props>();
const emit = defineEmits(['load', 'save', 'import', 'export',
    'toggleJersey']);

const x = ref(store.state.pitch.size.x);
const y = ref(store.state.pitch.size.y);


const showJersey = ref(false);

// just emit click signal for listeners (this would be the editor most likely)
function onLoad(){
    emit('load');
    console.log("load files");
}

function onSave(){
    emit('save');
    console.log("save files");
}

function onImport(){
    emit('import');
    console.log("import files");
}

function onExport(){
    emit('export');
    console.log("export files");
}

function onShowJersey(ev){
    // toggle showing the jersey
    showJersey.value = !showJersey.value;

    // emit change to listeners
    emit('toggleJersey', showJersey.value);
}

function onPitchSizeChange(ev){
    // call the pitch resize mutation from the committer
    Committer.pitchSizeChange(x.value, y.value);   
}

</script>


<style lang="scss" scoped>

#editor-navbar{
    display: flex;
    flex-direction: row;
    height: var(--navbar-height);
    background: var(--secondary);
    box-shadow: 0 0 4px var(--dark);
    div, button{
        margin-left: 8px;
        margin-right: 8px;
    }

    .navbar-button{
        svg{
            margin-top: auto;
        }
        span{
            margin-bottom: auto;
        }
        margin-left: 0;
        margin-right: 0;
    }

    #navbar-pitch{
        margin-left: auto;
        margin-right: auto;
        div{
        }
    }

}

.navbar-button{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* margin: 6px; */
    font-size: 8px;
    color: var(--light);
    width: 48px;
    svg{
        fill: var(--light);
        margin-bottom: 4px;
    }
    &:hover{
        background: var(--secondary-dark);
    }
    
}

.navbar-button-active{
    @extend .navbar-button;
    background: var(--secondary-light);
}

.navbar-divider{
    height: 60%;
    width: 1px;
    background: var(--secondary-dark);
    margin: auto 0;
}

input{
    background: var(--secondary-light);
    border-color: var(--secondary-dark);
    color: var(--light);
}

</style>