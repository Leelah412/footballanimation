import Pitch from "@/components/model/Pitch";
import Team from "@/components/model/Team";
import { defineStore } from "pinia";

export const useStore = defineStore('editor', {
    state: ()=>({
        home: new Team(),
        away: new Team(),
        database: {},         // database of all players available
        pitch: new Pitch(),
        entityList: {},
        snapshotList: [],
    })
})