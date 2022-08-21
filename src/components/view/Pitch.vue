<template>

<g id="svg-pitch" class="noselect" :transform="`translate(${-store.state.editorStore.pitch.size.x/2}, ${-store.state.editorStore.pitch.size.y/2})`">
    <rect
       style="stroke-width:0.25;stroke-linecap:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
       :fill="store.state.editorStore.pitch.pitchColor"
       :stroke="store.state.editorStore.pitch.lineColor"
       id="outer-lines"
       :width="store.state.editorStore.pitch.size.x"
       :height="store.state.editorStore.pitch.size.y"
       :x="0"
       :y="0" />
    <path
       style="fill:none;stroke-width:0.25;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
       :stroke="store.state.editorStore.pitch.lineColor" :d="`m ${store.state.editorStore.pitch.size.x/2},0 v ${store.state.editorStore.pitch.size.y}`"
       id="center-line" />
    <g
       id="center-circle" :transform="`translate(${store.state.editorStore.pitch.size.x/2},${store.state.editorStore.pitch.size.y/2})`">
      <circle
         style="fill:none;stroke-width:0.25;stroke-linecap:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         :stroke="store.state.editorStore.pitch.lineColor" 
         id="path1079"
         cx="0"
         cy="0"
         r="9.15" />
      <circle
         style="fill-opacity:1;stroke:none;"
         :fill="store.state.editorStore.pitch.lineColor"
         id="path1079-5"
         cx="0"
         cy="0"
         r="0.4" />
    </g>
    <g
       id="penarea-left" :transform="`translate(0, ${store.state.editorStore.pitch.size.y/2 - 20.15})`">
      <rect
         style="fill:none;stroke-width:0.25;stroke-linecap:round;stroke-miterlimit:4;stroke-dasharray:none"
         :stroke="store.state.editorStore.pitch.lineColor" 
         id="area-left"
         width="16.5"
         height="40.3"
         x="0"
         y="0" />
      <rect
         style="fill:none;stroke-width:0.25;stroke-linecap:round;stroke-miterlimit:4;stroke-dasharray:none"
         :stroke="store.state.editorStore.pitch.lineColor" 
         id="five-m-left"
         width="5.5"
         height="18.32"
         x="0"
         y="11" />
      <path
         id="half-circle-left"
         style="fill:none;stroke-width:0.25;stroke-linecap:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         :stroke="store.state.editorStore.pitch.lineColor" 
         d="m 16.5,20.15 v 8.25 a 9.15,9.15 0 0 0 4.89737,-8.1008 9.15,9.15 0 0 0 -4.89737,-8.10131 z" />
      <circle
         style="fill-opacity:1;stroke:none;stroke-width:0.0111663;stroke-linecap:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         :fill="store.state.editorStore.pitch.lineColor"
         id="path1079-5-8"
         cx="11"
         cy="20.15"
         r="0.4" />
    </g>
    <g
       id="penarea-right" :transform="`translate(${store.state.editorStore.pitch.size.x}, ${store.state.editorStore.pitch.size.y/2 - 20.15}), scale(-1,1)`">
      <rect
         style="fill:none;stroke-width:0.25;stroke-linecap:round;stroke-miterlimit:4;stroke-dasharray:none"
         :stroke="store.state.editorStore.pitch.lineColor" 
         id="area-left"
         width="16.5"
         height="40.3"
         x="0"
         y="0" />
      <rect
         style="fill:none;stroke-width:0.25;stroke-linecap:round;stroke-miterlimit:4;stroke-dasharray:none"
         :stroke="store.state.editorStore.pitch.lineColor" 
         id="five-m-left"
         width="5.5"
         height="18.32"
         x="0"
         y="11" />
      <path
         id="half-circle-left"
         style="fill:none;stroke-width:0.25;stroke-linecap:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         :stroke="store.state.editorStore.pitch.lineColor" 
         d="m 16.5,20.15 v 8.25 a 9.15,9.15 0 0 0 4.89737,-8.1008 9.15,9.15 0 0 0 -4.89737,-8.10131 z" />
      <circle
         style="fill-opacity:1;stroke:none;stroke-width:0.0111663;stroke-linecap:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         :fill="store.state.editorStore.pitch.lineColor"
         id="path1079-5-8"
         cx="11"
         cy="20.15"
         r="0.4" />
      <!-- <rect
         style="fill:none;stroke:#f2f2f2;stroke-width:0.25;stroke-linecap:round;stroke-miterlimit:4;stroke-dasharray:none"
         id="rect833-6-6-2"
         width="16.443743"
         height="40.243744"
         x="88.496895"
         y="13.910954" />
      <rect
         style="fill:none;stroke:#f2f2f2;stroke-width:0.25;stroke-linecap:round;stroke-miterlimit:4;stroke-dasharray:none"
         id="rect833-6-6-8-4"
         width="5.1574454"
         height="17.977446"
         x="99.78318"
         y="25.044102" />
      <path
         id="path1079-2-6"
         style="fill:none;stroke:#f2f2f2;stroke-width:0.25;stroke-linecap:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 88.480747,25.93177 v 16.20211 a 9.1499996,9.1499996 0 0 1 -4.89738,-8.1008 9.1499996,9.1499996 0 0 1 4.89738,-8.10131 z" />
      <circle
         style="fill:#f2f2f2;fill-opacity:1;stroke:none;stroke-width:0.0111663;stroke-linecap:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         id="path1079-5-8-2"
         cx="94.474678"
         cy="34.032825"
         r="0.40868619" /> -->
    </g>
<!--     <path
       style="fill:none;stroke:#f2f2f2;stroke-width:0.25;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
       d="M 0,1.73726 C 1.00314,1.73726 1.73726,0.99793 1.73726,0"
       id="corner-ul"
       sodipodi:nodetypes="cc" />
    <path
       style="fill:none;stroke:#f2f2f2;stroke-width:0.25;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
       d="m 105.06563,1.73726 c -1.00314,0 -1.73726,-0.73933 -1.73726,-1.73726"
       id="corner-ur"
       sodipodi:nodetypes="cc" />
    <path
       style="fill:none;stroke:#f2f2f2;stroke-width:0.25;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
       d="m 105.06563,66.32837 c -1.00314,0 -1.73726,0.73933 -1.73726,1.73726"
       id="corner-lr"
       sodipodi:nodetypes="cc" />
    <path
       style="fill:none;stroke:#f2f2f2;stroke-width:0.25;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
       d="m 0,66.32837 c 1.00314,0 1.73726,0.73933 1.73726,1.73726"
       id="corner-ll"
       sodipodi:nodetypes="cc" /> -->
  </g>

</template>

<script lang="ts" setup>
import store from '@/store/index';
import { ref } from '@vue/reactivity';
import Vector2 from '../math/Vector2';
import Pitch from '../model/Pitch';

// pitch size calculation based on real pitches
//
// field rect
// w = size.x
// h = size.y
// x = 0
// y = 0
//
// penarea-left
// y = size.y/2 - 20.15
// x = 0
//
// penarea-right
// x = size.x - 20.15
// y = size.y/2 - 20.15
//
// center-line
// w = [constant]
// h = size.y
// x = size.x/2
// y = 0
// 
// circle
// r = 9.15
// x = size.x/2
// y = size.y/2

const props = defineProps({
/*     position: {
       type: Vector2,
       default: ()=>{return new Vector2()}
    }, */
    scale: {
        type: Number,
        default: 1
    }
})


</script>

<style lang="scss" scoped>

</style>