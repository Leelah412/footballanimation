<template>

<div id="property-menu-properties">
    
    <PitchProperties v-if="(selected === null)" />
    <PlayerProperties v-else-if="(selected instanceof Player)" :player="selected"/>

</div>

</template>


<script lang="ts" setup>
import { ref } from '@vue/reactivity';
import store from '@/store/index';
import { Committer } from '@/store/modules/editor_committer';
import CanvasObject from '@/components/model/CanvasObject';
import PlayerProperties from './properties/PlayerProperties.vue';
import Player from '@/components/model/Player';
import PitchProperties from './properties/PitchProperties.vue';
import { onUpdated } from 'vue';

interface Props{
    selected: CanvasObject | null
}

const props = defineProps<Props>();

const pw = ref(store.state.pitch.size.x);
const ph = ref(store.state.pitch.size.y);

function onPitchSizeChange(ev){
    Committer.pitchSizeChange(pw.value, ph.value);
}

interface Default{
    showGrid: boolean
}

const defaultProps = ref<Default>({
    showGrid: false
})

</script>


<style lang="scss" scoped>


</style>