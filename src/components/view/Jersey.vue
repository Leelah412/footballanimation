<template>
    
<div class="jersey">

    <div v-if="jersey.jerseyType === 0">
        <svg
        xmlns:svg="http://www.w3.org/2000/svg"
        :width="(width !== undefined) ? width : 128"
        :height="(height !== undefined) ? height : 128"
        viewBox="0 0 33.866667 33.866668"
        version="1.1">
        <defs
            id="defs2">
            <rect
            x="15.768902"
            y="5.0781212"
            width="54.255714"
            height="10.557146"
            id="rect905" />
            <rect
            x="10.557146"
            y="13.096207"
            width="37.150463"
            height="32.339615"
            id="rect899" />
        </defs>
        <g
            id="layer1"
            transform="translate(-114.85979,-62.366048)">
            <path
            style="fill:#bebebe;fill-opacity:1;stroke:none;stroke-width:0.112939;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
            d="m 126.31615,63.355876 -11.12539,2.831378 c -0.95647,2.381185 0.27012,6.638914 2.26926,8.469009 l 4.69914,-1.109489 v 20.576585 c 0,0 -0.0115,0.649344 1.45216,0.303421 8.98301,-2.123909 11.96184,2.944461 17.81565,-0.303421 l -5e-5,-20.576585 4.6993,1.109489 c 1.99916,-1.830095 3.22574,-6.087824 2.26927,-8.469009 l -11.12556,-2.831378 c -1.45451,0.647444 -3.42431,1.04619 -5.61776,1.107475 -2.46598,-0.140114 -4.07792,-0.56838 -5.33602,-1.107475 z"
            id="jersey"/>
        </g>
        </svg>

    </div>

</div>

</template>

<script lang="ts" setup>
import Jersey from "../model/Jersey";


interface Props{
    jersey: Jersey
    isVisual: boolean
    width?: number
    height?: number
}

const props = withDefaults(defineProps<Props>(), {
    isVisual: false
});


</script>


<style lang="scss" scoped>

</style>