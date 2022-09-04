<template>
    
<g id="sc-standard-pitch" class="noselect" :transform="`translate(${-store.state.squadCreatorStore.settings.pitchSize.x/2}, ${-store.state.squadCreatorStore.settings.pitchSize.y/2})`">
    
   <!-- BACKGROUND -->
   <rect
       style="stroke-width:0.5;stroke-linecap:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
       :fill="store.state.squadCreatorStore.settings.pitchColor"
       stroke="#0006"
       :width="store.state.squadCreatorStore.settings.pitchSize.x + 16 + (store.state.squadCreatorStore.settings.pitchOrientation !== 'horizontal' ? 4 : 0)"
       :height="store.state.squadCreatorStore.settings.pitchSize.y + 16 + (store.state.squadCreatorStore.settings.pitchOrientation === 'horizontal' ? 4 : 0)"
       :x="-8"
       :y="-8 - (store.state.squadCreatorStore.settings.pitchOrientation === 'horizontal' ? 4 : 0)" 
       :rx="2"
       :ry="2"/>


    <!-- STYLES -->

   <!-- NOTE:  To get the number of possible pitch styles, we want to get the number of "sc-pitch-style" elements.
               To do that, we MUST make sure the <g> elements with the class are ALWAYS shown, even if they aren't selected.
               That's why we use an extra <g> element inside for the v-if check! -->

    <!-- Style 0 -->
    <g class="sc-pitch-style">
         <!-- (nothing) -->
    </g>

    <!-- Style 1 -->
    <g class="sc-pitch-style">
      <g v-if="store.state.squadCreatorStore.settings.pitchStyle === 1">
         <rect v-for="i in 8" :key="`style-1-rect-${i}`"
            :x="(store.state.squadCreatorStore.settings.pitchSize.x / 8) * (i-1)" y="0"
            :width="(store.state.squadCreatorStore.settings.pitchSize.x / (8 * 2))" :height="store.state.squadCreatorStore.settings.pitchSize.y" fill="#0002"/>

         <rect v-for="i in 4" :key="`style-1-rect-${i + store.state.squadCreatorStore.settings.pitchSize.x}`"
            x="0" :y="(store.state.squadCreatorStore.settings.pitchSize.y / 4) * (i-1) + 4"
            :width="store.state.squadCreatorStore.settings.pitchSize.x" :height="(store.state.squadCreatorStore.settings.pitchSize.y / (4 * 2))" fill="#0002"/>
      </g>
    </g>


    <!-- PITCH -->

    <rect
       style="stroke-width:0.25;stroke-linecap:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
       fill="#0000"
       :stroke="store.state.squadCreatorStore.settings.lineColor"
       id="outer-lines"
       :width="store.state.squadCreatorStore.settings.pitchSize.x"
       :height="store.state.squadCreatorStore.settings.pitchSize.y"
       :x="0"
       :y="0" />

    <path
       style="fill:none;stroke-width:0.25;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
       :stroke="store.state.squadCreatorStore.settings.lineColor" :d="`m ${store.state.squadCreatorStore.settings.pitchSize.x/2},0 v ${store.state.squadCreatorStore.settings.pitchSize.y}`"
       id="center-line" />
    <g
       id="center-circle" :transform="`translate(${store.state.squadCreatorStore.settings.pitchSize.x/2},${store.state.squadCreatorStore.settings.pitchSize.y/2})`">
      <circle
         style="fill:none;stroke-width:0.25;stroke-linecap:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         :stroke="store.state.squadCreatorStore.settings.lineColor" 
         id="path1079"
         cx="0"
         cy="0"
         r="9.15" />
      <circle
         style="fill-opacity:1;stroke:none;"
         :fill="store.state.squadCreatorStore.settings.lineColor"
         id="path1079-5"
         cx="0"
         cy="0"
         r="0.4" />
    </g>
    <g
       id="penarea-left" :transform="`translate(0, ${store.state.squadCreatorStore.settings.pitchSize.y/2 - 20.15})`">
      <rect
         style="fill:none;stroke-width:0.25;stroke-linecap:round;stroke-miterlimit:4;stroke-dasharray:none"
         :stroke="store.state.squadCreatorStore.settings.lineColor" 
         id="area-left"
         width="16.5"
         height="40.3"
         x="0"
         y="0" />
      <rect
         style="fill:none;stroke-width:0.25;stroke-linecap:round;stroke-miterlimit:4;stroke-dasharray:none"
         :stroke="store.state.squadCreatorStore.settings.lineColor" 
         id="five-m-left"
         width="5.5"
         height="18.32"
         x="0"
         y="11" />
      <path
         id="half-circle-left"
         style="fill:none;stroke-width:0.25;stroke-linecap:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         :stroke="store.state.squadCreatorStore.settings.lineColor" 
         d="m 16.5,20.15 v 8.25 a 9.15,9.15 0 0 0 4.89737,-8.1008 9.15,9.15 0 0 0 -4.89737,-8.10131 z" />
      <circle
         style="fill-opacity:1;stroke:none;stroke-width:0.0111663;stroke-linecap:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         :fill="store.state.squadCreatorStore.settings.lineColor"
         id="path1079-5-8"
         cx="11"
         cy="20.15"
         r="0.4" />
    </g>
    <g
       id="penarea-right" :transform="`translate(${store.state.squadCreatorStore.settings.pitchSize.x}, ${store.state.squadCreatorStore.settings.pitchSize.y/2 - 20.15}), scale(-1,1)`">
      <rect
         style="fill:none;stroke-width:0.25;stroke-linecap:round;stroke-miterlimit:4;stroke-dasharray:none"
         :stroke="store.state.squadCreatorStore.settings.lineColor" 
         id="area-left"
         width="16.5"
         height="40.3"
         x="0"
         y="0" />
      <rect
         style="fill:none;stroke-width:0.25;stroke-linecap:round;stroke-miterlimit:4;stroke-dasharray:none"
         :stroke="store.state.squadCreatorStore.settings.lineColor" 
         id="five-m-left"
         width="5.5"
         height="18.32"
         x="0"
         y="11" />
      <path
         id="half-circle-left"
         style="fill:none;stroke-width:0.25;stroke-linecap:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         :stroke="store.state.squadCreatorStore.settings.lineColor" 
         d="m 16.5,20.15 v 8.25 a 9.15,9.15 0 0 0 4.89737,-8.1008 9.15,9.15 0 0 0 -4.89737,-8.10131 z" />
      <circle
         style="fill-opacity:1;stroke:none;stroke-width:0.0111663;stroke-linecap:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         :fill="store.state.squadCreatorStore.settings.lineColor"
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
import Pitch1 from '@/components/view/Pitch.vue';
import store from '@/store';


</script>


<style lang="scss" scoped>

</style>