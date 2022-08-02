import { EntityType } from "@/components/helper/Global";
import CanvasObject, { EntityList } from "@/components/model/CanvasObject";
import Player from "@/components/model/Player";
import Snapshot from "@/components/model/Snapshot";
import Team from "@/components/model/Team";
import store from "../index";

// wrapper module for a more "intuitive" store functionality with type support
// store commits done inside the functions
// need to add new function for each new mutation

export const Committer = {

// CANVASOBJECT

addEntity: (entity: CanvasObject) => store.commit('addEntity', {entity: entity}),

setEntityList: (entityList: EntityList) => store.commit('setEntityList', {entityList: entityList}),

deleteEntity(entity: CanvasObject, data: any = undefined){
    // delete the entity
    store.commit('deleteEntity', {entity: entity})

    // TODO: remove this completely, as we essentially only want to
    //       delete an entity from the list of elements to show on the canvas

    // if type is Player, additionally remove from first team
    if(entity instanceof Player){
        // delete from team, keep player in database
        if(data === 'removeFromTeam'){
            // calling another mutation function should be fine, as it should be just like calling a normal function, right?
            // after all, everything still happens inside the scope of the current mutation
            this.removePlayer(entity as Player);
            return;
        }
        // delete completely
        if(data === 'removeCompletely'){
            this.removePlayer(entity as Player, true, true);
            return;
        }
        // delete from squad, keep player in team
        this.removePlayer(entity as Player, false);
    }
},

// PLAYER

addPlayerToTeam: (player: Player, entityType: EntityType) =>
    store.commit('addPlayerToTeam', {player: player, entityType: entityType}),

movePlayer: (player: Player, team: Team | null, squadKey: string = 'firstTeam') => 
    store.commit('movePlayer', {player: player, team: team, squadKey: squadKey}),

removePlayer: (player: Player, removeFromTeam: boolean = true, removeCompletely: boolean = false)=>
    store.commit('removePlayer', {player: player, removeFromTeam: removeFromTeam, removeCompletely: removeCompletely}),

// TEAM

changeTeamVariables: (team: Team, args: {[key: string]: any})=>
  store.commit('changeTeamVariables', {team: team, args: args}),

// PITCH

pitchSizeChange: (x: number, y: number) => store.commit('pitchSizeChange', {x: x, y: y}),

// SNAPSHOT

addSnapshot: (snap: Snapshot, idx: number) => store.commit('addSnapshot', {snap: snap, idx: idx}),
deleteSnapshot: (snap: Snapshot) => store.commit('deleteSnapshot', {snap: snap}),
setSnapshotList: (snapshotList: Snapshot[]) => store.commit('setSnapshotList', {snapshotList: snapshotList}),

// SETTINGS
showTeamName: (show: boolean) => store.commit('showTeamName', {show: show}),
showTeamShort: (show: boolean) => store.commit('showTeamShort', {show: show}),
showTeamLogo: (show: boolean) => store.commit('showTeamLogo', {show: show}),

}