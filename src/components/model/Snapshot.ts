import Vector2 from "../math/Vector2";
import CanvasObject from "./CanvasObject";
import Pitch from "./Pitch";

// we only need to now the visual characteristics of an entity in the snapshot
/* interface EntitySnapshot{
    entity: CanvasObject
    position: Vector2
}

export {EntitySnapshot}; */

// a snapshot of the current screen
export default class Snapshot{
    entities: CanvasObject[];
    pitchSize: Vector2;

    constructor(entities: CanvasObject[], pitch: Pitch){
        this.entities = entities;
        this.pitchSize = pitch.size.copy();
    }
}

/* class SnapshotList{
    snapshot: Snapshot;

    private _prev: SnapshotList | null;
    private _next: SnapshotList | null;

    constructor(snapshot: Snapshot, prev: SnapshotList | null = null, next: SnapshotList | null = null){
        this.snapshot = snapshot;
        this._prev = prev;
        this._next = next;
    }

    
    insert()

    get prev(): SnapshotList | null {
        return this._prev;
    }

    get next(): SnapshotList | null {
        return this._next;
    }

} */