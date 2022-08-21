<template>
    
<div id="sc-standard-player">
    {{player.name}}

</div>

</template>


<script lang="ts" setup>
import Player from "@/components/model/Player";

interface Props{
    player: Player,
}

const props = withDefaults(defineProps<Props>(), {
    
});

</script>


<style lang="scss" scoped>

</style>