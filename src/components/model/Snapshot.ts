import Vector2 from "../math/Vector2";
import CanvasObject from "./CanvasObject";
import Pitch from "./Pitch";
import Player from "./Player";

// we only need to now the visual characteristics of an entity in the snapshot
/* interface EntitySnapshot{
    entity: CanvasObject
    position: Vector2
}

export {EntitySnapshot}; */

// a snapshot of the current screen
export default class Snapshot{
    id: number;
    name: string;
    entities: CanvasObject[];
    pitch: Pitch;

    constructor(entities: CanvasObject[], pitch: Pitch, name: string = ''){
        this.id = Snapshot.snaps++;

        var lst: CanvasObject[] = [];
    
        // create a completely new copy instance for each entity, such that changes to the original instance dont affect changes to the snapshot
        for(var entity in entities){
            if(entities[entity] instanceof Player){
                lst.push((entities[entity] as Player).copy());
            }
        }

        this.entities = lst;
        this.pitch = pitch.copy();

        this.name = name;
        if(name === ''){
            this.name = 'Snap ' + this.id;
        }        
    }
    
    private static snaps = 0;
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