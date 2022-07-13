import Vector2 from "../math/Vector2";
import CanvasObject from "./CanvasObject";

export interface PlayerList{
    [key: string]: Player
}

export default class Player extends CanvasObject{
    number: number = -1;        // -1 meaning no back number
    name: string = "";

    constructor(position: Vector2 = new Vector2(), rotation: number = 0){
        super(position, rotation);
        console.log("player created");
        
    }

    // returns a copy of this instance
    copy(): Player{
        // IMPORTANT: position must ALSO be a new Vector2, as it is an OBJECT,
        // and passing it directly would be passing it as reference to the current position
        var pl = new Player(new Vector2(this.position.x, this.position.y), this.rotation);
        pl.name = this.name;
        pl.number = this.number;
        return pl;
    }
}