<template>
<!-- should only be seen, when needed (at least for smaller screen sizes) -->
<div id="editor-tools">
    <div id="et-switch">
        <button class="btn-editor-tool-switch">Timeline</button>
        <button class="btn-editor-tool-switch">Scenario Graph</button>
        <button class="btn-editor-tool-switch">Snapshot Editor</button>
    </div>
    <div id="et-content">
        <SnapshotEditor v-if="selected === Tool.SNAPSHOT" :snapshot-list="snapshotList" :take-snapshot="takeSnapshot" v-on:show-snapshot="showSnapshot"/>
        
    </div>
</div>
</template>

<script lang="ts" setup>
import { ref } from '@vue/reactivity';
import Vector2 from '../math/Vector2';
import CanvasObject, { EntityList } from '../model/CanvasObject';
import Pitch from '../model/Pitch';
import Player from '../model/Player';
import Snapshot, { EntitySnapshot } from '../model/Snapshot';
import SnapshotEditor from '../view/SnapshotEditor.vue';

interface Props{
    entityList: EntityList
    pitch: Pitch

    snapshotList: Snapshot[]
}

const props = defineProps<Props>();
const emit = defineEmits(['showSnapshot']);

enum Tool {TIMELINE, SNAPSHOT, SCENARIO};

const selected = ref(Tool.SNAPSHOT);

const _entityList = ref(props.entityList);


// returns an array of snapshots, i.e. entity-position pairs (and maybe rotation, scale n stuff further on)
function takeSnapshot(): Snapshot{
    var lst: CanvasObject[] = [];
    
    // create a completely new copy instance for each entity, such that changes to the original instance dont affect changes to the snapshots
    for(var entity in props.entityList){
        if(props.entityList[entity] instanceof Player){
            lst.push((props.entityList[entity] as Player).copy());
        }
    }

    return new Snapshot(lst, props.pitch);
}

// show the snapshot on screen
// might not work, and we might have to push it further down to Editor and change the values there
function showSnapshot(snap: Snapshot){
    console.log(snap);
    
    emit('showSnapshot', snap);
}

</script>

<style lang="scss" scoped>


#editor-tools{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background: var(--dark-3);
    box-shadow: 0 0 4px var(--dark);
    height: var(--editor-tools-height);
}

#et-content{
    box-sizing: border-box;
    background: var(--dark-3);
    flex-grow: 100;
    height: 100%;
    padding: 8px;
}

$container-width: 64px;
#et-switch{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    box-sizing: border-box;
    width: $container-width;

    background: var(--accent);
    padding: 0 4px;
    height: 100%;
    .btn-editor-tool-switch{
        &:first-child{
            border-top: 4px solid var(--accent);
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
        }
        &:last-child{
            border-bottom-left-radius: 8px;
            border-bottom-right-radius: 8px;
        }
        background: var(--dark);
        /* border-top: 1px solid var(--dark); */
        border-bottom: 4px solid var(--accent);
        /* border-radius: 4px; */
        height: 33%;
        width: 100%;
        font-size: 12px;
        color: var(--accent);

        &:hover{
            background: var(--accent);
            color: var(--dark);
        }
    }
}



</style>