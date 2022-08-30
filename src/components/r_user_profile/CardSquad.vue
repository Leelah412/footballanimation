<template>
    
<div class="card-squad noselect">
<!--   -->
    <div class="card" ref="card" @mouseenter="hovering = true" @mouseleave="hovering = false">

        <svg class="card-squad-svg" :width="cardSize.x + 'px'" :height="cardSize.y + 'px'" :viewBox="'0 0 ' + cardSize.x + ' ' + cardSize.y">
            <rect :width="cardSize.x" :height="cardSize.y" :fill="TEST_CARD.pitchColor"/>
            <g :transform="`translate(${cardSize.x/2},${cardSize.y/2}), scale(${pitchScale})`">
                <PitchVue />
                <PlayerVue v-for="(val, key) in TEST_CARD.players" :key="'player-' + key" :player="val"
                     :selected="false" v-on:select="()=>{}"/>
            </g>

        </svg>

<!--         <div v-if="hovering" class="card-squad-details">

        </div> -->

    </div>

    <div class="card-squad-bottom">

        <div class="card-squad-title">
            Squad Number #1
        </div>

        <div class="card-squad-likes">
            <span class="card-squad-likes-count">10.3K</span>
            <svg class="card-squad-likes-svg" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="var(--light-6)">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>

        </div>

    </div>


</div>

</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from "vue-demi";
import Vector2 from "../math/Vector2";
import Player from "../model/Player";
import PitchVue from '@/components/r_squad_creator/types/standard/Pitch.vue'
import PlayerVue from '@/components/r_squad_creator/types/standard/Player.vue'

const cardSize = ref<Vector2>(new Vector2(360, 360 * (9/16)));
const pitchScale = ref(1);
const card = ref(null);

const hovering = ref<boolean>(false);

onMounted(()=>{
    setCardSize();
    window.addEventListener('resize', setCardSize);
});

onUnmounted(()=>{
    window.removeEventListener('resize', setCardSize);


});

function setCardSize(){
    if(card === undefined || card.value === null){
        console.log("WARNING: ref 'card' doesn't exist!");
        return;        
    }

    const card_rect = card.value.getBoundingClientRect();
    cardSize.value.x = card_rect.width;
    cardSize.value.y = card_rect.height;
}

const TEST_CARD = {
    players: [new Player()],
    pitchColor: "var(--green)",
}

</script>


<style lang="scss" scoped>

.card{
    position: relative;
/*     &:hover{
        transform: none;
    } */
    .card-squad-svg, .card-squad-details{
        position: absolute;
        top: 0;
        left: 0;

    }
    .card-squad-details{
        width: 100%;
        height: 100%;
        background: #1a1a1a99;
    }
}


.card-squad-bottom{
    display: flex;
    flex-direction: row;
    margin-top: 8px;

}

.card-squad-title{
    text-align: left;
    font-size: var(--font-size-3);
    margin-right: auto;
}

.card-squad-likes{
    display: flex;
    flex-direction: row;
    .card-squad-likes-count{
        font-size: var(--font-size-3);
        color: var(--light-6);
        margin-top: auto;
        margin-bottom: auto;
        margin-right: 4px;
    }

    .card-squad-likes-svg{

    }
}


</style>


