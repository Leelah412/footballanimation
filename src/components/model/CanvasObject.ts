import Vector2 from "../math/Vector2";

// keep track of all Canvas objects
export interface EntityList{
    [key: string]: CanvasObject
}

export default class CanvasObject{
    private _id: number;
    get id(): number {
        return this._id;
    }
    set id(value: number) {
        this._id = value;
    }

    // position of the object in "meter" (as everything is supposed to happen relative to the pitch, whose dimensions are given in )
    position: Vector2;
    // rotation of the object in degrees
    rotation: number;
    
    constructor(position: Vector2 = new Vector2(), rotation: number = 0){
        this._id = CanvasObject.objectCount++;
        this.position = position;
        this.rotation = rotation;
    }

    copy(){};

    private static objectCount = 0;
}