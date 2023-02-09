import { LockedPositions, Position } from "../util/FormationList";
import Vector2 from "../math/Vector2";
import CanvasObject from "./CanvasObject";
import Team from "./Team";

export default class Player extends CanvasObject{
    number: number = -1;                // -1 meaning no back number
    name: string = "Player " + this.id;
    avatar: Blob | string | null = null;
    positionKey: string = "";           // Key of the position fo the placeholder list
    positionName: string = "";
    positionShort: string = "";

    team: Team | null = null;           // Team this player belongs to
    isGoalkeeper: boolean = false;      // Necessary to differentiate, which jersey to use for this player
    isDummy: boolean = false;           // Visualize players with standard dummy object, if true

    constructor(position: Vector2 = new Vector2(), rotation: number = 0, team: Team | null = null){
        super(position, rotation);
        this.team = team;
    }

    // Sets the position by the given key value
    // Position can also be scaled by the given values
    setPosition(positionKey: string, xScale: number = 1.0, yScale: number = 1.0){
        if(!(positionKey in LockedPositions)){
            console.warn("Trying to set position, that doesn't exist!");
            return;
        }        
        const pos = LockedPositions[positionKey];
        this.positionKey = positionKey;
        this.position = new Vector2(pos.position.x * xScale, pos.position.y * yScale);
        this.positionName = pos.name;
        this.positionShort = pos.short;
        this.isGoalkeeper = pos.isGoalkeeper !== undefined ? pos.isGoalkeeper : false;
    }
    // Sets the position freely
    // TODO: approximate position names
    setPositionFree(position: Vector2, positionName: string = "", positionShort: string = "", isGoalkeeper: boolean = false){
        this.positionKey = "";
        this.position = position.copy();
        this.positionName = positionName;
        this.positionShort = positionShort;
        this.isGoalkeeper = isGoalkeeper;
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

export function createPlaceholders(positions: {[key: string]: Position}): PlayerList{
    var players: PlayerList = {};
    const lpkeys = Object.keys(positions);

    for(var key in lpkeys){
        const val: Position = positions[lpkeys[key]];        
        const pl: Player = new Player();
        pl.setPosition(lpkeys[key]);
        pl.isDummy = true;
        players[pl.id] = pl;
    }
 
    return players;
}