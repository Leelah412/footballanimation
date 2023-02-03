<template>
    
<div id="editor-navbar">

    <router-link id="navbar-logo" to="/">
        <img src="@/assets/svg/logo-full.svg" alt="" id="navbar-logo-img">
    </router-link>

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

    <!--
    <button :class="`navbar-button${(showJersey ? '-active' : '')}`" id="navbar-toggle-jersey" @click="onShowJersey">
        <Jersey :jersey="visualizationJersey" :isVisual="true" :width="32" :height="32"/>
    </button>

    <div class="navbar-divider"></div>

    <div id="navbar-pitch" class="flex-row align-center" style="">
        
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 6.3499996 6.3499996"
            stroke="var(--light)">
            <g
                transform="translate(-79.558675,-53.394273)">
                <g
                transform="matrix(0.9951168,0,0,0.9951168,0.40400698,0.27623706)">
                <path
                    style="fill:none;stroke-width:0.264583;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                    d="m 82.733675,54.585181 v 1.108257"/>
                <path
                    style="fill:none;stroke-width:0.264583px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
                    d="m 82.733675,57.445105 v 1.108257"/>
                <path
                    style="fill:none;stroke-width:0.264583;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                    d="m 79.675386,55.395048 h 0.959584 v 2.348447 h -0.959584"/>
                <path
                    style="fill:none;stroke-width:0.264583px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
                    d="m 85.791962,55.395049 h -0.959583 v 2.348447 h 0.959583"/>
                <rect
                    style="fill:none;stroke-width:0.264583;stroke-linecap:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                    width="6.1165771"
                    height="3.9574206"
                    x="79.675385"
                    y="54.590565"
                    ry="0.46684465"
                    rx="0.46684465" />
                <circle
                    style="fill:none;stroke-width:0.264583;stroke-linecap:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                    cy="56.569271"
                    cx="82.733673"
                    r="0.87533373" />
                </g>
            </g>
        </svg>

        <div class="flex-row" style="margin-left: 16px">
            <input class="m-center-v" type="number" id="navbar-pitch-width" min="90" max="120" v-model.lazy="x" @change="onPitchSizeChange"/>
            <label class="m-center-v" for="navbar-pitch-width" style="font-weight: 600; font-size:var(--font-size-4);">
                W
                <span style="font-size:var(--font-size-5); color: var(--light-4);">(m)</span>
            </label>
        </div>

        <div class="flex-row">
            <input class="m-center-v" type="number" id="navbar-pitch-height" min="60" max="90" v-model.lazy="y" @change="onPitchSizeChange"/>
            <label class="m-center-v" for="navbar-pitch-height" style="font-weight: 600; font-size:var(--font-size-4);">
                H
                <span style="font-size:var(--font-size-5); color: var(--light-4);">(m)</span>
            </label>
        </div>
    </div>
    
    -->

<!--
    <div id="navbar-user" style="margin:0">
        <div v-if="!store.state.loggedIn" class="flex-row">
            <router-link to="/login">
                <svg-button-selection :selection="SVG_SELECTION.LOGIN" :size="24" :fill="'var(--light)'" :text="'LOGIN'"/>
            </router-link>
        </div>

        <div v-else class="flex-column position-relative">

            <button id="navbar-user-avatar-button" @click="openUserMenu = !openUserMenu">
                <img :src="store.getters.getAvatarURL()" alt="">
            </button>

            <div id="navbar-user-menu" :class="openUserMenu ? 'open' : ''">

                <div class="navbar-user-menu-item noselect" style="background:var(--dark); border-bottom: 1px solid var(--accent);">
                    <img :src="store.getters.getAvatarURL()" alt="">
                    <span style="font-size: var(--font-size-3);">{{store.state.username}}</span>
                </div>

                <div class="navbar-user-menu-item noselect" @click="logout">
                    <svg-button-selection :selection="SVG_SELECTION.LOGOUT" :size="24" :fill="'var(--light)'" />
                    <span>Logout</span>
                </div>

            </div>
        </div>
    </div>

-->


</div>

</template>


<script lang="ts" setup>
import Authentication from '@/services/Authentication';
import store from '@/store/index';
import { Committer } from '@/store/modules/editor_committer';
import { ref } from '@vue/reactivity';
import { onUpdated } from 'vue-demi';
import { SVG_SELECTION } from '../helper/enums';
import {visualizationJersey} from '../model/Jersey';
import Pitch, {visualizationPitch} from '../model/Pitch';
import Jersey from '../view/Jersey.vue';
import SvgButtonSelection from '../misc/svg-button-selection.vue';

interface Props{
    
}

const props = defineProps<Props>();
const emit = defineEmits(['load', 'save', 'import', 'export',
    'toggleJersey']);

const x = ref(store.state.editorStore.pitch.size.x);
const y = ref(store.state.editorStore.pitch.size.y);


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


////////////////

const openUserMenu = ref<boolean>(false);

onUpdated(()=>{
    // make sure that if we log out, we don't keep the menu open;
    // this might seem irrelevant at first, but if we log in again,
    // and "openUserMenu" is true, the menu might be shown immediately
    if(!store.state.loggedIn && openUserMenu) openUserMenu.value = false;
});

function logout(){
    Authentication.logout();
    store.commit('logout');
}

</script>


<style lang="scss" scoped>

#editor-navbar{
    display: flex;
    flex-direction: row;
    align-items: center;

    height: var(--navbar-height);
    background: var(--secondary-dark);
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
    font-size: 8px;
    color: var(--light);
    width: 48px;
    height: 100%;
    svg{
        fill: var(--light);
        margin-bottom: 4px;
    }
    &:hover{
        background: var(--secondary);
    }
    &:active{
        background: var(--secondary-light)
    }
    
}

.navbar-button-active{
    @extend .navbar-button;
    background: var(--secondary-light);
}

.navbar-divider{
    height: 60%;
    width: 1px;
    background: var(--secondary);
    margin: auto 0;
}

input{
    outline: none;
    background: var(--secondary);
    border-color: var(--secondary-light);
    color: var(--light);
    width: 48px;
    margin-right: 8px;

    &:focus{
        background: var(--secondary-light);
        border-color: var(--accent);
    }
}

#navbar-logo{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 128px;
    img{
        margin-left: auto;
        margin-right: auto;
    }
}

#navbar-user{
    display: flex;
    flex-direction: row;
    --avatar-button-size: 36px;

    width: 128px;

    div{
        margin-left: auto;
        margin-right: auto;
    }

    #navbar-user-avatar-button{
        display: flex;
        align-items: center;
        justify-content: center;

        width: var(--avatar-button-size);
        height: var(--avatar-button-size);
        background: var(--secondary-dark);
        border: 2px solid var(--accent);
        border-radius: 1000px;
        box-shadow: 0 0 4px var(--dark);
        overflow: hidden;

        img{
            width: 100%;
            height: 100%;
        }

        &:hover{
            filter: brightness(1.2);
        }

        &:active{
            filter: brightness(0.8);
        }
    }

    #navbar-user-menu{
        position: absolute;
        top: calc(var(--avatar-button-size) + 8px);
        right: 0;

        box-shadow: 0 0 4px var(--dark);
        background: var(--dark-2);
        min-width: 128px;

        z-index: -1000;
        transform: translateY(-196px);
        transition-duration: 0.3s;
        
        &.open{
            z-index: 0;
            transform: translateY(0px);
        }

        .navbar-user-menu-item{
            cursor: pointer;
            display: grid;
            grid-template-columns: 32px auto;
            padding: 8px;
            height: 24px;

            .svg-button-selection{
                padding-right: 8px;
            }
            img{
                height: 24px;
                width: 24px;
                padding-right: 8px;
            }

            span{
                margin: auto;
                margin-left: 0;
                font-size: var(--font-size-4);
                color: var(--light);
            }

            &:hover{
                background: var(--dark-3);
            }
        }

    }
}

a{
    text-decoration: none;
}

</style>