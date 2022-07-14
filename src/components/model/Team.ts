import Jersey from "./Jersey";
import Player, { PlayerList } from "./Player";

// list containing players on the field
export interface OnFieldSquad{
    name: string,
    players: PlayerList,
    // ... something something, will be done later, when i have ideas
}

// players grouped in a list basically
export interface Squad{
    name: string,
    players: PlayerList
}

export interface SquadList{
    firstTeam: OnFieldSquad
    [key: string]: Squad
}

export const defaultSquadList = () => {
    return {
            firstTeam: {
                name: 'First Team',
                players: {}
            }
        }
}

const defaultNonFirstTeamSquadKey = 'other';
const defaultNonFirstTeamSquadName = 'Other';

export default class Team{
    // details
    id: string;                                 // id of the team in the database
    name: string;                               // full name of the club
    short: string;                              // make sure it's 6 letters max.

    playerList: PlayerList = {};                // list of players in the team
    squadList: SquadList = defaultSquadList();  // list of player GROUPS (can contain players not in playerList, i.e. not in club!)

    // visual
    logoPath: string = '';                      // path to the logo file of the club
    // color scheme of the club; importance in descending order of the array; must have at least three colors
    colorPalette: string[] = ['#000', '#fff', '#f00'];
    jerseys: Jersey[] = [];                     // list of available jerseys 
    playerJersey: Jersey | null = null;         // jersey the field players are wearing
    goalkeeperJersey: Jersey | null = null;     // jersey the keeper is wearing; wear player jersey, if null

    constructor(id: string = '', name: string = '', short: string = ''){
        this.id = id;
        this.name = name;
        this.short = short;
    }

    // add a player to the team and a squad, if given (default: other)
    // also possibility to not be added into the player list of team by setting 'addToPlayerList' to false;
    // that way, player will be represented by the default circle/jersey on the pitch, if he is on it 
    addPlayer(player: Player, squad: string = defaultNonFirstTeamSquadKey, addToPlayerList: boolean = true){

        // someone might try to pass an empty string as the player's squad
        // it is our duty to prevents this!
        var _squad: string = squad;
        if(squad === '') _squad = defaultNonFirstTeamSquadKey;

        // create squad, if it doesnt exist
        // but better create the squad first with "addSquad" before adding the player,
        // as the name will be set equal to key name, if squad created here
        if(!(_squad in this.squadList)){
            if(_squad === defaultNonFirstTeamSquadKey)  this.addSquad(defaultNonFirstTeamSquadKey, defaultNonFirstTeamSquadName);
            else                                        this.addSquad(_squad, _squad);
        }
        this.squadList[_squad].players[player.id] = player;

        // add to player list
        if(!addToPlayerList) return;
        this.playerList[player.id] = player;
        player.team = this;                     // dont forget to add this team to player's "team" reference
    }

    // remove the player from the team
    // if squadListKeys empty, remove him from all squads
    // if removeFromTeam false, don't remove him from the playerList (i.e. keep him in the team), AND assign him to 'other' list, if he isn't in it
    removePlayer(player: Player, squadListKeys: string[] = [], removeFromTeam: boolean = true){

        // remove player from all lists
        if(squadListKeys.length === 0){
            var keys = Object.keys(this.squadList);
            for(var i = 0; i < keys.length; i++){
                if(player.id in this.squadList[keys[i]].players){
                    delete this.squadList[keys[i]].players[player.id];
                }
            }
        }
        // only remove from squads with given keys, if they exist
        else{
            for(var i = 0; i < squadListKeys.length; i++){
                if(squadListKeys[i] in this.squadList
                    && player.id in this.squadList[squadListKeys[i]].players)
                    delete this.squadList[squadListKeys[i]].players[player.id];
            }
        }

        // if player should stay in team, keep him in the "other" list
        if(!removeFromTeam){
            // by default, player is added to playerList and squadList['other'], so no need for additional arguments
            this.addPlayer(player);
            return;
        }
                
        delete this.playerList[player.id];
        player.team = null;
    }

    addSquad(key: string, name: string){
        if(!(key in this.squadList)){
            this.squadList[key] = {
                name: name,
                players: {}
            }
        }
    }

    // load the team data
    loadTeam(name: string, short: string, playerList: PlayerList = {}, squadList: SquadList = defaultSquadList()){
        name
        this.playerList = playerList;
    }
    
    // TODO: load the team from the database based on the given id
    loadFromDatabase(id: string){

        // find the team and load all data

        // assign the data to all membervariables
    }
}