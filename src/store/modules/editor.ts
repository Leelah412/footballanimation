import { EntityType } from "@/components/helper/Global";
import CanvasObject, { EntityList } from "@/components/model/CanvasObject";
import Pitch from "@/components/model/Pitch";
import { PlayerList } from "@/components/model/Player";
import Team from "@/components/model/Team";

export interface State{
    home: Team,
    away: Team,
    database: PlayerList,
    pitch: Pitch,
    entityList: EntityList
}

///////////////
// MUTATIONS //
///////////////

export const mutations = {

addEntity(state: State, args: {entity: CanvasObject, entityType?: EntityType}){
    console.log("add entity called from store");
    console.log("entity: ");
    console.log(args.entity);
    console.log("entityType: ");
    console.log(args.entityType);   

},

/* addPlayerToTeam(state, args){

} */


}