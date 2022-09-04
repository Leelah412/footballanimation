<template>

<!-- TODO: refactor this, such that logo, squad name and formation are all in one translated g element -->
<g :transform="`rotate(${squadCreatorStore.settings.pitchOrientation !== 'horizontal' ? '90' : '0'})`">

    <image width="8" height="8" :xlink:href="squadCreatorStore.squadLogo" 
    :x="squadCreatorStore.settings.pitchOrientation === 'horizontal' ? -squadCreatorStore.settings.pitchSize.x/2 : -squadCreatorStore.settings.pitchSize.y/2"
            :y="squadCreatorStore.settings.pitchOrientation === 'horizontal' ? -squadCreatorStore.settings.pitchSize.y/2 - 10 : -squadCreatorStore.settings.pitchSize.x/2 - 10"
            />

    <g :transform="`translate(${squadCreatorStore.squadLogo !== '' ? '8' : '0'},0)`">
        <text v-if="squadCreatorStore.settings.showFormation" fill="var(--light)" font-size="2" opacity="0.5" font-family="Unispace"
        :x="squadCreatorStore.settings.pitchOrientation === 'horizontal' ? -squadCreatorStore.settings.pitchSize.x/2 + 2 : -squadCreatorStore.settings.pitchSize.y/2 + 2"
            :y="squadCreatorStore.settings.pitchOrientation === 'horizontal' ? -squadCreatorStore.settings.pitchSize.y/2 - 2 : -squadCreatorStore.settings.pitchSize.x/2 - 2"
        >
            {{squadCreatorStore.formationName === '' ? FormationList[squadCreatorStore.formationKey].name : squadCreatorStore.formationName}}
        </text>
        <text v-if="squadCreatorStore.settings.showSquadName" fill="var(--light)" font-size="3" opacity="0.75" font-family="Unispace"
            :x="squadCreatorStore.settings.pitchOrientation === 'horizontal' ? -squadCreatorStore.settings.pitchSize.x/2 + 2 : -squadCreatorStore.settings.pitchSize.y/2 + 2"
            :y="squadCreatorStore.settings.pitchOrientation === 'horizontal' ? -squadCreatorStore.settings.pitchSize.y/2 - 6 : -squadCreatorStore.settings.pitchSize.x/2 - 6"
        >
            {{squadCreatorStore.squadName}}
        </text>

    </g>
</g>

</template>


<script lang="ts" setup>
import FormationList from "@/components/helper/FormationList";
import store from "@/store";
import { onMounted, ref } from "vue-demi";

const squadCreatorStore = ref(store.state.squadCreatorStore);

</script>


<style lang="scss" scoped>



</style>