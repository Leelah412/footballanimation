<template>
    
<div class="content">
    <div class="item pp-header">
        <div class="pp-face">
            <img src="" alt="">
        </div>
        <div class="pp-info">
            <div class="pp-number">{{player.number}}</div>
            &ensp;|&ensp;
            <div class="pp-name">{{player.name}}</div>
        </div>
    </div>

    <div class="item flex-column">
        <label for="" class="label-over">PLAYER NAME</label>
        <input type="text" class="input-dark-2" v-model.lazy="player.name">
    </div>
    <div class="item flex-column">
        <label for="" class="label-over">PLAYER NUMBER</label>
        <input type="number" class="input-dark-2" min="1" max="99" @change="changeNumber" v-model.lazy="player.number">
    </div>

</div>

</template>


<script lang="ts" setup>
import Player from "@/components/model/Player";
import { ref } from "vue-demi";

interface Props{
    player: Player
}

const props = defineProps<Props>();

function changeNumber(ev){
    const num = parseInt(ev.target.value);

    props.player.number = num;
    if(num < 1) props.player.number = 1;
    else if (num > 99) props.player.number = 99;
}

</script>



<style lang="scss" scoped>

.pp-header{
    display: flex;
    flex-direction: row;
    .pp-face{
        /* margin-right: 32px; */
        width: 64px;
        height: 64px;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .pp-info{
        margin: auto;
/*         margin-left: auto;
        margin-right: auto; */
        display: flex;
        flex-direction: row;
        .pp-number{
            color: var(--light-6);
        }
        .pp-name{

        }
    }
}

</style>