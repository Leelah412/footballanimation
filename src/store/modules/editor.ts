import { EntityType } from "@/components/util/Global";
import CanvasObject, { EntityList } from "@/components/model/CanvasObject";
import Pitch from "@/components/model/Pitch";
import Player, { PlayerList } from "@/components/model/Player";
import CanvasSettings from "@/components/model/CanvasSettings";
import Snapshot from "@/components/model/Snapshot";
import Team from "@/components/model/Team";
import Match from "@/components/model/Match";

export interface State{
    home: Team,
    away: Team,
    database: PlayerList,
    pitch: Pitch,
    entityList: EntityList,
    snapshotList: Snapshot[],
    match: Match,

    settings: CanvasSettings,
}

///////////////
// MUTATIONS //
///////////////

export const mutations = {

//////////////////
// CANVASOBJECT //
//////////////////

// add an entity into the entity list visible on the canvas
// do NOTHING about adding a player into a team or so, it's not this function's job
addEntity(state: State, args: {entity: CanvasObject}){
    state.entityList[args.entity.id] = args.entity;
},

// assign a completely new list
setEntityList(state: State, args: {entityList: EntityList}){
    state.entityList = args.entityList;
},

// deletes given canvas object from entity list, assuming all elements in it are on canvas
// can take in additional data to be processed for specific kinds of entities
deleteEntity(state: State, args: {entity: CanvasObject}){
    if(!(args.entity.id in state.entityList)) return;
    delete state.entityList[args.entity.id];
},

////////////
// PLAYER //
////////////

addPlayerToTeam(state: State, args: {player: Player, entityType: EntityType}){
    switch(args.entityType){
        case EntityType.PLAYERHOME: {
            state.home.addPlayer(args.player, 'firstTeam'); 
            state.database[args.player.id] = args.player;       // add to database too     
            break;
        }
        case EntityType.PLAYERAWAY: {
            state.away.addPlayer(args.player, 'firstTeam');
            state.database[args.player.id] = args.player;
            break;
        }
    }
},

// move a player to another team and squad
// TODO: currently using 'team' from 'args' to assign player to team and squad
// -- if that doesn't cause a state change, find the correct team from 'state' and assign it to that!
movePlayer(state: State, args: {player: Player, team: Team | null, squadKey: string}){
/*     var player = args.player, team = args.team, squadKey = args.squadKey;
    // no need to change anything, if player already in correct team and squad
    if(player.team === team && team !== null &&
        squadKey in team.squadList && player.id in team.squadList[squadKey].players) return;

    // delete all records of the player from his team first, if he has one
    if(player.team !== null){
        const keys = Object.keys(player.team.squadList);
        for(var i = 0; i < keys.length; i++){
            if(player.id in player.team.squadList[keys[i]].players){
                delete player.team.squadList[keys[i]].players[player.id];
            }
        }
        player.team = null;
    }

    // if move to no team, just return
    if(team === null) return;

    // otherwise add player to new team
    // if squad key doesnt exist, return;
    if(!(squadKey in team.squadList)) return;
    team.squadList[squadKey].players[player.id] = player;
    team.playerList[player.id] = player;
    player.team = team; */
    var player = args.player, team = args.team, squadKey = args.squadKey;
    // no need to change anything, if player already in correct team and squad
    if(player.team === team && team !== null &&
        squadKey in team.squadList && player.id in team.squadList[squadKey].players) return;
    
    // delete all records of the player from his team first, if he has one
    if(player.team !== null){
        player.team.removePlayer(player);
    }
    
    // if move to no team, just return
    if(team === null) return;
    
    // otherwise add player to new team
    team.addPlayer(player, squadKey);
    
    state.entityList[player.id] = player;
},

/* var player = args.player, team = args.team, squadKey = args.squadKey;
// no need to change anything, if player already in correct team and squad
if(player.team === team && team !== null &&
    squadKey in team.squadList && player.id in team.squadList[squadKey].players) return;

// delete all records of the player from his team first, if he has one
if(player.team !== null){
    player.team.removePlayer(player);
}

// if move to no team, just return
if(team === null) return;

// otherwise add player to new team
team.addPlayer(player, squadKey);

if(team === state.home) state.home.addPlayer(player, squadKey);
else if(team === state.away) state.away.addPlayer(player, squadKey); */

// removes player from squad, team, or completely
// default: delete from squad team, push player to 'others' squad
// if player not supposed to be removed completely, push him to database
// if 'removeFromTeam' false and 'removeCompletely' true, ignore 'removeCompletely'
removePlayer(state: State,
    args: {player: Player, removeFromTeam: boolean, removeCompletely: boolean}){
    // remove player from entity list
    if(args.player.id in state.entityList)
        delete state.entityList[args.player.id];

    var team: Team | null = args.player.team;
    if(team !== null)
        team.removePlayer(args.player, [], args.removeFromTeam);
    else{
        // make sure, that player REALLY has no team
        var lst = state.home.playerList;
        var keys: string[] = Object.keys(lst);
        for(var i = 0; i < keys.length; i++){
            if(lst[keys[i]] === args.player){
                state.home.removePlayer(args.player, [], args.removeFromTeam);
                break;
            }
        }

        lst = state.away.playerList;
        keys = Object.keys(lst);
        for(var i = 0; i < keys.length; i++){
            if(lst[keys[i]] === args.player){
                state.away.removePlayer(args.player, [], args.removeFromTeam);
                break;
            }
        }
    }

    // dont push into db and dont delete completely
    if(!args.removeFromTeam) return;
    // remove player completely, including database
    if(args.removeCompletely){
        if(args.player.id in state.database)
            delete state.database[args.player.id];
        return;
    }
    
    state.database[args.player.id] = args.player;
},

//////////
// TEAM //
//////////

changeTeamVariables(state: State, args: {team: Team, args: {[key: string]: any}}){
    
    if('name' in args.args){
        args.team.name = args.args.name;
    }
    if('short' in args.args){
        args.team.short = args.args.short;
    }
},

///////////
// PITCH //
///////////

// call this anytime there is a change in the pitch size e.g. through v-model
// to make sure the size doesn't exceed the limits
pitchSizeChange(state: State, args: {x: number, y: number}){
    if(args.x < Pitch.MINSIZEX)         state.pitch.size.x = Pitch.MINSIZEX;
    else if(args.x > Pitch.MAXSIZEX)    state.pitch.size.x = Pitch.MAXSIZEX;
    else                                state.pitch.size.x = args.x;
    
    if(args.y < Pitch.MINSIZEY)         state.pitch.size.y = Pitch.MINSIZEY;
    else if(args.y > Pitch.MAXSIZEY)    state.pitch.size.y = Pitch.MAXSIZEY;
    else                                state.pitch.size.y = args.y;
},


//////////////
// SNAPSHOT //
//////////////

// add the snapshot at the given index
addSnapshot(state: State, args: {snap: Snapshot, idx: number}){
    state.snapshotList.splice(args.idx, 0, args.snap);
},

deleteSnapshot(state: State, args: {snap: Snapshot}){
    state.snapshotList = state.snapshotList.filter(s => s !== args.snap);
},

deleteSnapshotByIndex(state: State, args: {idx: number}){
    /* state.snapshotList = state.snapshotList.filter(s => s !== args.snap); */
},

setSnapshotList(state: State, args: {snapshotList: Snapshot[]}){
    state.snapshotList = args.snapshotList;
},

///////////
// MATCH //
///////////

setMatch(state: State, args: {match: Match}){
    state.match = args.match;
},

////////////////////
// CANVASSETTINGS //
////////////////////

showTeamName(state: State, args: {show: boolean}){
    console.log("changing tema name to: ", args.show);
    
    state.settings.showTeamName = args.show;
},
showTeamShort(state: State, args: {show: boolean}){
    state.settings.showTeamShort = args.show;
},
showTeamLogo(state: State, args: {show: boolean}){
    state.settings.showTeamLogo = args.show;
},

}


export default {
    namespaced: true,
    state: {
        home: new Team(),
        away: new Team(),
        database: {},         // database of all players available
        pitch: new Pitch(),
        entityList: {},
        snapshotList: [],
        match: new Match(),
    
        settings: new CanvasSettings(),
    } as State,
    
    mutations: mutations,
}