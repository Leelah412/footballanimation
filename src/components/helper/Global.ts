import Rect from "../math/Rect";
import Vector2 from "../math/Vector2";

export enum EntityType {NONE, BALL, PLAYERHOME, PLAYERAWAY, LINE};

// static class holding global variables for easier access and less calculation
export default class Global{
    constructor(){}

    // project the viewport position to the pitch coordinates
    static viewportToPitch(pos: Vector2): Vector2{
        // multiply scale and zoom to get the scaling factor
        var sz = this.scale * this.zoom;
        // viewport position of the entity relative to viewport position of pitch
        var p: Vector2 = new Vector2(pos.x - this.origin.x, pos.y - this.origin.y);
        // divide viewport position by the scaling factor to get the unscaled pitch coordinates in meters
        p.x /= sz;
        p.y /= sz;
        return p;
    }

    // other way round, i.e. pos = metric position of entity (NOT VIEWPORT POSITION)
    static pitchToViewport(pos: Vector2): Vector2{
        // multiply scale and zoom to get the scaling factor
        var sz = this.scale * this.zoom;
        // multiply the current position by the scaling factor to get the viewport position
        var p = new Vector2(pos.x * sz, pos.y * sz);
        p.x += this.origin.x;
        p.y += this.origin.y;
        return p;
    }

    static scale: number = 1;
    static zoom: number = 1;
    static origin: Vector2 = new Vector2(0, 0);
    static canvasPosition: Vector2 = new Vector2(0, 0);
    // the position and size of the pitch relative to the viewport
    /* static pitchRect: Rect = {x: 0, y: 0, width: 0, height: 0}; */
}