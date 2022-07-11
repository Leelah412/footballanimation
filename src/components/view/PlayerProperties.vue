<template>

<div class="player-properties">
    <div class="flex-column">
        <input class="player-property-name" :id="`player-property-name-${player.id}`" :value="player.name" placeholder="Name" @change="nameChanged">
    </div>
    <div class="flex-column">
        <input type="number" min="1" max="99" class="player-property-number" :id="`player-property-number-${player.id}`" :value="getNumberPlaceholder()" placeholder="Nr." @change="numberChanged">
    </div>
</div>

</template>

<script lang="ts" setup>
import { ref } from "@vue/reactivity";
import Player from "../model/Player";


const props = defineProps({
    player: {
        type: Player,
        required: true
    }
});

function nameChanged(ev){
    props.player.name = ev.target.value;
};

function numberChanged(ev){
    var val = parseInt(ev.target.value);
    
    if(ev.target.value < 0){
        props.player.number = 0;
        return;
    }
    if(ev.target.value > 99){
        props.player.number = 99;
        return;
    }
    
    props.player.number = ev.target.value;
};

function getNumberPlaceholder(): string{
    return props.player.number < 1 ? '' : props.player.number.toString();
}


</script>

<style lang="scss" scoped>

.player-properties{
    position: absolute;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background: #333;
    border-radius: 4px;
    padding: 1px;
    opacity: 0.8;
    transition: opacity;
    transition-duration: 0.2s;
}

.player-properties:hover{
    opacity: 1;
}

label{
    letter-spacing: 1px;
    font-size: small;
    font-weight: 300;
}

input{
    background: #1a1a1a;
    border: none;
    padding: 4px;
    margin: 2px;
    border-radius: 4px;
    color: #ccc;
}

.player-property-name{
    width: 192px;
}

.player-property-number{
    width: 48px;
    text-align: center;
}
</style>