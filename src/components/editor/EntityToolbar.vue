<template>

<div id="editor-entity-toolbar">
    <!-- <span class="eet-desc">Game Objects</span> -->
    <div class="eet-item" id="eet-ball">
        <svg class="eet-item-svg" width="16px" height="16px" viewBox="0 0 16 16">
            <circle r="8" cx="8" cy="8" :fill="Settings.settings.entityColors.ballColors.main"/>
        </svg>
    </div>
    <div class="eet-item" id="eet-home">
        <svg class="eet-item-svg" width="32px" height="32px" viewBox="0 0 6 6" @mousedown="ev=>newEntity(ev, EntityType.PLAYERAWAY)">
            <!-- <circle r="10" cx="12" cy="12" :fill="settings.entityColors.homeColors.main" :stroke="settings.entityColors.homeColors.secondary" stroke-width="4" /> -->
            <PlayerVue :player="dummyPlayerHome" :asTool="true"/>
        </svg>
    </div>
    <div class="eet-item" id="eet-away">
        <svg class="eet-item-svg" width="32px" height="32px" viewBox="0 0 6 6" @mousedown="ev=>newEntity(ev, EntityType.PLAYERAWAY)">
            <!-- <circle r="10" cx="12" cy="12" :fill="settings.entityColors.awayColors.main" :stroke="settings.entityColors.awayColors.secondary" stroke-width="4" /> -->
            <PlayerVue :player="dummyPlayerAway" :asTool="true" />
        </svg>
    </div>
    <div class="eet-divider"></div>
    <!-- <span class="eet-desc">Drawing Tools</span> -->
    <div :class="`eet-item ${selected === EntityType.LINE ? 'selected' : ''}`" id="eet-line">
        <svg class="eet-item-svg" width="32px" height="32px" viewBox="0 0 6 6" @mousedown="ev=>newEntity(ev, EntityType.LINE)">
            <LineVue :line="dummyLine" :asTool="true"/>
        </svg>
    </div>
</div>

</template>

<script lang="ts" setup>
import { ref } from '@vue/reactivity';
import Vector2 from '../math/Vector2';
import Player from '../model/Player';
import Settings from '../model/Settings';
import PlayerVue from '../view/Player.vue';
import LineVue from '../view/CanvasObject/Line.vue';
import { EntityType } from '../helper/Global';
import Line from '../model/CanvasObject/Line';

interface Props{
    selected: EntityType
}

const props = withDefaults(defineProps<Props>(), {
    selected: EntityType.NONE
});

const dummyPlayerHome = ref(new Player(new Vector2(3,3)));
const dummyPlayerAway = ref(new Player(new Vector2(3,3)));
const dummyLine = ref(new Line(new Vector2(0, 0), new Vector2(32,32), new Vector2()));

const emit = defineEmits(['newEntity']);

function newEntity(ev, entityType: EntityType){
    emit('newEntity', ev, entityType, true);
}

</script>

<style lang="scss" scoped>

#editor-entity-toolbar{
    display: flex;
    flex-direction: column;

    padding: 8px;
}

.eet-item{
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    margin-bottom: 8px;
}

.eet-item-svg{
    -webkit-filter: drop-shadow( 0 0 4px rgba(0, 0, 0, 1));
    filter: drop-shadow( 0 0 4px rgba(0, 0, 0, 1));
}

.eet-divider{
    margin-top: 8px;
    margin-bottom: 8px;
    width: 100%;
    height: 1px;
    background: var(--dark-6);
}

.eet-desc{
    font-size: 12px;
}

.selected{
    background: #cccc;
    border-radius: 4px;
}

</style>