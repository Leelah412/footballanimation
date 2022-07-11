import Vector2 from "../../math/Vector2";
import CanvasObject from "../CanvasObject";

export default class Line extends CanvasObject{
    start: Vector2;
    end: Vector2;

    constructor(start: Vector2, end: Vector2, pos: Vector2){
        super(pos);
        this.start = start;
        this.end = end;
    }
}