<template>
    
<div id="sc-standard" class="sc-squad-type">
    
    <div id="sc-standard-squad" class="sc-squad">


        <svg id="sc-standard-squad-svg" :width="width" :height="height" :viewBox="'0 0 ' + width + ' ' + height">
            <rect :width="width" :height="height" fill="var(--green)"/>
            <g :transform="`translate(${width/2},${height/2}), scale(${scale}),
                rotate(${store.state.squadCreatorStore.settings.pitchOrientation !== 'horizontal' ? '-90' : '0'})`">
                <Pitch />

                <!-- PLAYERS -->

                <g v-for="(val, key) in store.state.squadCreatorStore.firstTeam" :key="'player-' + key"
                    :transform="`translate(${val.position.x},${val.position.y}),
                        rotate(${store.state.squadCreatorStore.settings.pitchOrientation !== 'horizontal' ? '90' : '0'})`">
                    <circle cx="0" cy="0" r="2" :fill="'var(--dark)'" :stroke="'var(--light)'" :stroke-width="1" />
                    <text fill="var(--light)" font-size="2" text-anchor="middle" y="5">
                        {{val.name}}
                    </text>
                </g>

                <g :transform="`rotate(${store.state.squadCreatorStore.settings.pitchOrientation !== 'horizontal' ? '90' : '0'})`">
                    <text fill="var(--light)" font-size="3" opacity="0.5"
                        :x="store.state.squadCreatorStore.settings.pitchOrientation === 'horizontal' ? -store.state.editorStore.pitch.size.x/2 + 1 : -store.state.editorStore.pitch.size.y/2 + 1"
                        :y="store.state.squadCreatorStore.settings.pitchOrientation === 'horizontal' ? store.state.editorStore.pitch.size.y/2 - 1 : store.state.editorStore.pitch.size.x/2 - 1"
                    >
                        {{FormationList[store.state.squadCreatorStore.formation].name}}
                    </text>
                    <text fill="var(--light)" font-size="3" opacity="0.5"
                        :x="store.state.squadCreatorStore.settings.pitchOrientation === 'horizontal' ? -store.state.editorStore.pitch.size.x/2 : -store.state.editorStore.pitch.size.y/2"
                        :y="store.state.squadCreatorStore.settings.pitchOrientation === 'horizontal' ? -store.state.editorStore.pitch.size.y/2 - 1 : -store.state.editorStore.pitch.size.x/2 - 1"
                    >
                        {{store.state.squadCreatorStore.squadName}}
                    </text>
                </g>
            </g>



        </svg>

        <div id="sc-standard-squad-hud">
            <div id="sc-standard-squad-hud-orientation">

            </div>
        </div>
    </div>


    <div id="sc-standard-properties" class="sc-properties">

        <div class="header">
            <div class="toggle">

            </div>
            <div class="tabs">

                <button :class="`pm-nav-button${tabState === TAB_STATE.GENERAL ? '-active' : ''}`" @click="tabState = TAB_STATE.GENERAL">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="var(--light)">
                        <path d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z"/>
                    </svg>
                </button>

                <button :class="`pm-nav-button${tabState === TAB_STATE.PITCH ? '-active' : ''}`" @click="tabState = TAB_STATE.PITCH">
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

                <button :class="`pm-nav-button${tabState === TAB_STATE.PLAYERS ? '-active' : ''}`" @click="tabState = TAB_STATE.PLAYERS">

                </button>
            </div>
        </div>


        <!-- CONTENT -->
        <div class="content" v-if="tabState === TAB_STATE.GENERAL">

            <div class="item flex-column">
                <label class="label-over" for="">SQUAD NAME</label>
                <input class="input-dark-2" type="text" v-model.lazy="store.state.squadCreatorStore.squadName">
            </div>

            <div class="item flex-column">
                <label class="label-over" for="">BASE FORMATION</label>
                <select class="input-select" name="" @change="formationChanged" v-model="store.state.squadCreatorStore.formation">
                    <option v-for="(val,key) in FormationList" :key="'formation-' + key" :value="key">{{val.name}}</option>
                </select>
            </div>

            <div class="item flex-column">
                <label class="label-over" for="">FORMATION NAME</label>
                <input class="input-dark-2" type="text">
            </div>
            
            <div class="item flex-row">
                <input type="checkbox">
                <label class="label-right" for="">Show formation on pitch</label>
            </div>

            <div class="item flex-row">
                <input type="checkbox">
                <label class="label-right" for="">Lock positions</label>
            </div>

            <div class="item flex-column">
                <label class="label-over" for="">PLAYER COUNT</label>
                <input class="input-dark-2" type="number" min="0" max="11">
            </div>

            <div class="item flex-column">
                <label class="label-over" for="">BENCH COUNT</label>
                <input class="input-dark-2" type="number" min="0" max="12">
            </div>

            <div class="item flex-row">
                <input type="checkbox">
                <label class="label-right" for="">Show Logo</label>
            </div>

            <div class="item flex-column">
                <label class="label-over" for="">LOGO POSITION</label>
                <select class="input-select" name="">
                    <option value="up">Up</option>
                    <option value="down">Down</option>
                </select>
            </div>

            <div class="item flex-column">
                Jersey
            </div>

            <div class="item flex-column">
                Logo
            </div>
            

        </div>
        <div class="content" v-else-if="tabState === TAB_STATE.PITCH">
            <div class="item flex-column">
                <label class="label-over" for="">PITCH ORIENTATION</label>
                <select class="input-select" name="" @change="resize" v-model="store.state.squadCreatorStore.settings.pitchOrientation">
                    <option value="horizontal">Horizontal</option>
                    <option value="vertical">Vertical</option>
                </select>
            </div>
        </div>
        <div class="content" v-else-if="tabState === TAB_STATE.PLAYERS">

        </div>

    </div>

</div>

</template>

<script lang="ts" setup>
import { PlayerStyle } from '@/components/helper/enums'
import FormationList from '@/components/helper/FormationList'
import Vector2 from '@/components/math/Vector2'
import store from '@/store'
import { onMounted, onUnmounted, ref } from 'vue-demi'
import Pitch from './standard/Pitch.vue'

interface Props{
    formationChanged: ()=>void
}

const props = defineProps<Props>();

enum TAB_STATE {GENERAL, PITCH, PLAYERS};

const tabState = ref<TAB_STATE>(TAB_STATE.GENERAL);

const width = ref(0);
const height = ref(0);
const scale = ref(1);

onMounted(()=>{
    resize();
    window.addEventListener('resize', resize);
})

onUnmounted(()=>{
    window.removeEventListener('resize', resize);
})

function resize(){
    const content = document.getElementById('sc-content');
    const sc_squad = document.getElementById('sc-standard-squad');
    if(content === undefined || content === null) return;
    if(sc_squad === undefined || sc_squad === null) return;

    height.value = sc_squad.getBoundingClientRect().height;
    width.value = sc_squad.getBoundingClientRect().width;

    const size: Vector2 = store.state.editorStore.pitch.size;
    if(store.state.squadCreatorStore.settings.pitchOrientation === 'horizontal'){
        scale.value = (width.value / size.x) * 0.95;
    }
    else{
        scale.value = (height.value / size.x) * 0.95;

    }
}



</script>



<style lang="scss" scoped>

/* SQUAD */



#sc-standard-squad-hud{
    position: absolute;
    left: 0;
    top: 0;

    width: 100%;
    height: 100%;

    div{
        position: absolute;
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
    background: var(--dark);
    box-shadow: -2px 0 2px var(--dark);

    width: $properties-width;
    height: 100%;
    
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
        padding: 16px;
        .item{
            margin-bottom: 16px;
        }
    }
}

</style>