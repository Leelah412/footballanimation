export default class Vector2{
    x: number;
    y: number;
    
    constructor(_x: number = 0, _y: number = 0){
        this.x = _x;
        this.y = _y;
    }
    
    length(to: Vector2 = new Vector2()){
        var vec: Vector2 = this.distanceTo(to);
        return Math.sqrt((vec.x*vec.x) + (vec.y*vec.y));
    }

    distanceTo(to: Vector2){
        return new Vector2(to.x - this.x, to.y - this.y);
    }

    angleDeg(to: Vector2 = new Vector2()){
        var vec: Vector2 = this.distanceTo(to);
        return (Math.atan2(vec.y, vec.x) * 180)/Math.PI;
    }

    // return a new copy instance
    copy(): Vector2{
        return new Vector2(this.x, this.y);
    }
}