<template>

<g>
    <PlayerVue v-for="(player, key) in playerList" :key="key" :id="`player-id-${player.id}`"
        :player="player"/>
</g>

</template>

<script lang="ts" setup>

import Player from '../model/Player';
import PlayerVue from './Player.vue';

const props = defineProps({
    playerList: {
        type: Object,
        default: ()=>{return {}}
    },
});


</script>

<style lang="scss" scoped>

</style>
