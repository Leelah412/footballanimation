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
    // also possibility to not be added into the player list of team by setting 'addToPlayerList' to false
    addPlayer(player: Player, squad: string = 'other', addToPlayerList: boolean = true){

        // create squad, if it doesnt exist
        if(!(squad in this.squadList)){
            this.squadList[squad] = {
                name: squad,
                players: {}
            }
        }
        this.squadList[squad].players[player.id] = player;

        // add to player list
        if(!addToPlayerList) return;
        this.playerList[player.id] = player;
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