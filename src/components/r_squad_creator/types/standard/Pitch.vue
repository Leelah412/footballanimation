<template>
    
<g id="sc-standard-pitch" :transform="`rotate(${store.state.squadCreatorStore.settings.pitchOrientation !== 'horizontal' ? '90' : '0'})`">
    
    <Pitch1 />

</g>

</template>

<script lang="ts" setup>
import Pitch1 from '@/components/view/Pitch.vue';
import store from '@/store';


</script>


<style lang="scss" scoped>

</style>