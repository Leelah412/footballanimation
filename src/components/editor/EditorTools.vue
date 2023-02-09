<template>
<!-- should only be seen, when needed (at least for smaller screen sizes) -->
<div id="editor-tools">
    <div id="et-switch">
        <button class="btn-editor-tool-switch" @click="ev => selected = Tool.MATCH">Match Editor</button>
        <button class="btn-editor-tool-switch">Scenario Graph</button>
        <button class="btn-editor-tool-switch" @click="ev => selected = Tool.SNAPSHOT">Snapshot Editor</button>
    </div>
    <div id="et-content">
        <SnapshotEditor v-if="selected === Tool.SNAPSHOT" />
        <MatchEditor v-if="selected === Tool.MATCH" />
    </div>
</div>
</template>

<script lang="ts" setup>
import { ref } from '@vue/reactivity';
import Vector2 from '../math/Vector2';
import CanvasObject, { EntityList } from '../model/CanvasObject';
import Pitch from '../model/Pitch';
import Player from '../model/Player';
import Snapshot from '../model/Snapshot';
import SnapshotEditor from '../view/SnapshotEditor.vue';
import MatchEditor from '../view/MatchEditor.vue';

interface Props{
    
}

const props = defineProps<Props>();

enum Tool {MATCH, SNAPSHOT, SCENARIO};
const selected = ref(Tool.SNAPSHOT);

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

    overflow: hidden;
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

<style lang="scss">
.tool-header{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    letter-spacing: 2px;
    height: 32px;
    h5{
        font-weight: 300;
        margin-left: 8px;
        margin-right: auto;
    }

    overflow: hidden;
}

.tool-content{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    padding: 8px;
    margin: 8px;
    height: 100%;
    border-radius: 2px;

    background: var(--secondary);
    box-shadow: inset 0 0 4px var(--dark);

    overflow: hidden;
}
</style>