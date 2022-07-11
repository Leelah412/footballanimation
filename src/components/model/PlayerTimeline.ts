import Vector2 from "../math/Vector2";
import Player from "./Player";

// the position the player stands on at the given point in time
export interface Frame{
    time: number
    position: Vector2   

    prev: Frame | null
    next: Frame | null

    toNext: PlayerPosition | null      // with what kind of pace the player reaches the position in the next frame
}

export class PlayerPosition{
    start: Vector2;
    end: Vector2;
    points: Frame[];         // the positions inbetween the starting and end position the player reaches in a given time
                            // latter points always greater equal previous points => if no points given, linear speed from "start" to "end" assumed!

/*     private speed: number[];         // the speed inbetween two points
                            // CONSTANTS, THAT ARE CALCED AUTOMATICALLY!!! */

    constructor(start: Vector2, end: Vector2, points: Frame[] = []){
        this.start = start;
        this.end = end;
        this.points = points;
        /* this.calcSpeed(); */
    }

    changeStart(start: Vector2){
        this.start = start;
    }

    changeEnd(end: Vector2){
        this.end = end;
    }

    addPoint(point: Frame){
        this.points.push(point)
    }

    // delete point at index
    deletePoint(idx: number){
        this.points.filter((_, i) => i != idx);
    }

/*     calcSpeed(){
        var _speed = [];
        var current = this.start;
        for(var i = 0; i < this.points.length; i++){
            // basic linear speed calculation, i.e. f(t2) - f(t1) / t2 - t1
            _speed = 
        }
    } */
}

export default class PlayerTimeline{
    player: Player;
    timeline: Frame | null = null;          // should be sorted by time

    constructor(player: Player){
        this.player = player;
    }

    addFrame(frame: Frame){
        // timeline doesnt exist yet -> create new FrameList
        if(this.timeline === null){
            // if for some reason the given frame isnt the very first frame,
            // traverse the list way back to the first one to get the first frame
            var current: Frame = frame;
            while(current.prev !== null){
                current = current.prev;
            }

            this.timeline = {
                time: current.time,
                position: current.position,

                prev: null,
                next: current.next,
                toNext: current.toNext
            }

            return;
        }

        // traverse the timeline, until every next frame happens later than the current
        var current: Frame | null = this.timeline;
        while(current.next !== null){
            if(current.time > current.next.time){
                current = current.next;
            }
        }

        // insert the new frame inbetween the current frame and the next frame
        // and completely recalculate the PlayerPosition stuff!!!
        var next: Frame | null = current.next;
        current.next = frame;

        if(current.toNext !== null)
            current.toNext.changeEnd(frame.position);
        else
            current.toNext = new PlayerPosition(current.position, frame.position);

        if(next !== null){
            next.prev = frame;
            frame.toNext = new PlayerPosition(frame.position, next.position);
        }


    }
}