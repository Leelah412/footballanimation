<template>
    
<g :transform="`rotate(${store.state.squadCreatorStore.settings.pitchOrientation !== 'horizontal' ? '90' : '0'})`">
    <text v-if="store.state.squadCreatorStore.settings.showFormation" fill="var(--light)" font-size="3" opacity="0.5"
        :x="store.state.squadCreatorStore.settings.pitchOrientation === 'horizontal' ? -store.state.squadCreatorStore.settings.pitchSize.x/2 + 1 : -store.state.squadCreatorStore.settings.pitchSize.y/2 + 1"
        :y="store.state.squadCreatorStore.settings.pitchOrientation === 'horizontal' ? store.state.squadCreatorStore.settings.pitchSize.y/2 - 1 : store.state.squadCreatorStore.settings.pitchSize.x/2 - 1"
    >
        {{store.state.squadCreatorStore.formationName === '' ? FormationList[store.state.squadCreatorStore.formation].name : store.state.squadCreatorStore.formationName}}
    </text>
    <text v-if="store.state.squadCreatorStore.settings.showSquadName" fill="var(--light)" font-size="3" opacity="0.5"
        :x="store.state.squadCreatorStore.settings.pitchOrientation === 'horizontal' ? -store.state.squadCreatorStore.settings.pitchSize.x/2 : -store.state.squadCreatorStore.settings.pitchSize.y/2"
        :y="store.state.squadCreatorStore.settings.pitchOrientation === 'horizontal' ? -store.state.squadCreatorStore.settings.pitchSize.y/2 - 1 : -store.state.squadCreatorStore.settings.pitchSize.x/2 - 1"
    >
        {{store.state.squadCreatorStore.squadName}}
    </text>
</g>

</template>


<script lang="ts" setup>
import FormationList from "@/components/helper/FormationList";
import store from "@/store";


</script>


<style lang="scss" scoped>



</style>