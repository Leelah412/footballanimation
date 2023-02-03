<template>

<div id="property-menu-properties">
    <PlayerProperties v-if="(selected instanceof Player)" :player="selected"/>
</div>

</template>


<script lang="ts" setup>
import { ref } from '@vue/reactivity';
import store from '@/store/index';
import { Committer } from '@/store/modules/editor_committer';
import CanvasObject from '@/components/model/CanvasObject';
import PlayerProperties from './properties/PlayerProperties.vue';
import Player from '@/components/model/Player';
import { onUpdated } from 'vue';

interface Props{
    selected: CanvasObject | null
}

const props = defineProps<Props>();

interface Default{
    showGrid: boolean
}

const defaultProps = ref<Default>({
    showGrid: false
})

</script>


<style lang="scss" scoped>


</style>