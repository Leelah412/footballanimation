import { LockedPositions, Position } from "../helper/FormationList";
import Vector2 from "../math/Vector2";
import CanvasObject from "./CanvasObject";
import Team from "./Team";

export default class Player extends CanvasObject{
    number: number = -1;                // -1 meaning no back number
    name: string = "Player " + this.id;
    avatar: Blob | string | null = null;
    positionName: string = "";
    positionShort: string = "";

    team: Team | null = null;           // the team this player belongs to
    isGoalkeeper: boolean = false;      // necessary to differentiate, which jersey to use for this player
    isDummy: boolean = false;           // if true, visualize players with standard dummy object

    constructor(position: Vector2 = new Vector2(), rotation: number = 0, team: Team | null = null){
        super(position, rotation);
        this.team = team;
    }

    // returns a copy of this instance
    copy(): Player{
        // IMPORTANT: position must ALSO be a new Vector2, as it is an OBJECT,
        // and passing it directly would be passing it as reference to the current position
        var pl = new Player(new Vector2(this.position.x, this.position.y), this.rotation);

        pl.name = this.name;
        pl.number = this.number;
        pl.team = this.team;

        return pl;
    }
}

export interface PlayerList{
    [key: string]: Player
}

function createPlaceholders(): PlayerList{
    var players: PlayerList = {};
    const lpkeys = Object.keys(LockedPositions);

    for(var key in lpkeys){
        const val: Position = LockedPositions[lpkeys[key]];        
        const pl: Player = new Player(val.position.copy(), 0, null);
        pl.isGoalkeeper = (val.isGoalkeeper !== undefined ? val.isGoalkeeper : false);
        pl.isDummy = true;
        pl.positionName = lpkeys[key];
        players[pl.id] = pl;
    }
 
    return players;
}

export const SquadCreatorPlaceholderPlayers = createPlaceholders(); 