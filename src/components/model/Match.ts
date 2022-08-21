import Vector2 from "../math/Vector2";
import CanvasObject from "./CanvasObject";

export interface FrameAttributes {
    position: Vector2;
    rotation: number;
}

export interface FrameInterpolation {
    position: Interpolation,
    rotation: Interpolation
}

// the position the player stands on at the given point in time
export interface Frame{
    time: number

    attributes: FrameAttributes;
    interpolation: FrameInterpolation;

    prev: Frame | null;
    next: Frame | null;
}

export class Interpolation{

    // interpolation points, through which the value of an attribute inbetween two attribute values is determined
    // each point must be bigger than the previous one
    // 0 < x < 1                        (value)
    // 0 <= startTime <= y <= endTime   (time in ms)    
    points: Vector2[];

    startTime: number;
    endTime: number;

    constructor(startTime: number, endTime: number, points: Vector2[] = []){
        this.startTime = startTime;
        this.endTime = endTime;

        // startTime and endTime MUST be at least 0!
        if(startTime < 0) startTime = 0;
        if(endTime < 0) endTime = 0;
        // startTime bigger than endTime => switch times and show warning
        if(startTime > endTime){
            console.log("Interpolation warning: startTime smaller than endTime!");
            
            var tmp = startTime;
            startTime = endTime;
            endTime = tmp;
        }
        
        this.points = [];
        points.forEach(p => this.points.push(p.copy()));
    }

    setStartTime(time: number){
        // push all points smaller than the new start time towards the back
    }

    setEndTime(time: number){
        // push all points bigger than the new start time towards the front

    }

    addPoint(point: Vector2){
        // point must be inside constraints given above
        if(point.x >= 1 || point.x <= 0) return;
        if(point.y <= this.startTime || point.y >= this.endTime) return;

        this.points.push(point.copy());
    }

    // delete point at index
    deletePoint(idx: number){
        this.points.splice(idx, -1);
    }

    // return the calculated factor
    calc(time: number): number{
        // time smaller/greater startTime/endTime: return 0/1
        if(time <= this.startTime) return 0;
        if(time >= this.endTime) return 1;

        // get correct points
        var p1: number = 0, p2: number = 1, t1: number = this.startTime, t2: number = this.endTime;
        for(var i = 0; i < this.points.length; i++){
            // if current point smaller than time, first point (p1) must be at least value of current point
            if(this.points[i].y < time){
                p1 = this.points[i].y;
                t1 = this.points[i].x;
            }
            // if current point bigger than time, second point must be at most value of current point
            // and stop, as we've found the correct points
            else if(this.points[i].y > time){
                p2 = this.points[i].y;
                t2 = this.points[i].x;
                break;
            }
        }

        // if time difference is (close to) zero, return max value (i.e. 1)
        if(Math.abs(t2 - t1) < 0.1) return 1;

        // calculate linearly
        var val = ((p2 - p1)/(t2 - t1)) * (time - t1);
        return val;
    }
}

export class ObjectTimeline{

    object: CanvasObject;

    start: Frame | null = null;             // first frame in the list
    end: Frame | null = null;               // last frame in the list

    constructor(object: CanvasObject){
        this.object = object;
    }

    // calculate and return interpolated attributes of the object at given time
    getTimestamp(time: number): Timestamp | null{
        if(time < 0) return null;

        // if not a single frame exists for this object, just return attributes of current CanvasObject
        // if "start" is null, so should be "end"; if not, then there is an error somewhere during frame creation/deletion
        if(this.start === null || this.end === null)
            return {
                object: this.object,
                attributes: {
                    position: this.object.position.copy(),
                    rotation: this.object.rotation
                }
            }

        // if time smaller than start time/ greater than end time, return the attributes of first/last frame
        if(time <= this.start.time)
            return {
                object: this.object,
                attributes: {
                    position: this.start.attributes.position.copy(),
                    rotation: this.start.attributes.rotation
                }
            }

        if(time >= this.end.time)
            return {
                object: this.object,
                attributes: {
                    position: this.end.attributes.position.copy(),
                    rotation: this.end.attributes.rotation
                }
            }        

        // get the correct frame
        var curFrame: Frame = this.start;
        while(curFrame.next !== null){
            // if next frames time is smaller than given time, we've found our frame -> use current frame
            if(time < curFrame.next.time) break;
            
            curFrame = curFrame.next;
        }
        
        // if time exceeds object's timeline, return latest attributes
        // NOTE: since we practically considered this case before with "start" and "end" time, this should never be true; still keep it for safety
        if(curFrame.next === null)
            return {
                object: this.object,
                attributes: {
                    position: curFrame.attributes.position.copy(),
                    rotation: curFrame.attributes.rotation
                }
            }
        
        // based on the current frame's interpolation objects, calculate the following attributes

        // position
        var position: Vector2 = curFrame.attributes.position.copy();
        const p_f = curFrame.interpolation.position.calc(time);
        position.x += (curFrame.next.attributes.position.x - curFrame.attributes.position.x) * p_f;
        position.y += (curFrame.next.attributes.position.y - curFrame.attributes.position.y) * p_f;
        
        console.log("current position: ", curFrame.attributes.position);
        console.log("next position: ", curFrame.next.attributes.position);
        console.log("curFrame.interpolation.position:");
        console.log(curFrame.interpolation.position);
        
        console.log("p_f: ", p_f);
        console.log("interpol value: ", position);
        
        

        // rotation
        var rotation = curFrame.attributes.rotation;
        const r_f = curFrame.interpolation.rotation.calc(time);
        rotation += (curFrame.next.attributes.rotation - curFrame.attributes.rotation) * r_f;

        var timestamp: Timestamp = {
            object: this.object,
            attributes: {
                position: position,
                rotation: rotation
            }
        };

        return timestamp;
    }

    // add frame at the given time and return, if a frame was added
    addFrame(time: number): boolean{
        // cant add negative time
        if(time < 0) return false;

        // default frame; edit, when necessary
        // ALWAYS use current attributes of object (i.e. values used to show on canvas)
        // => only "next", "prev" and "interpolation" values should be changed (if necessary)
        var frame: Frame = {
            time: time,
            attributes: {
                position: this.object.position.copy(),
                rotation: this.object.rotation
            },

            // default interpolations with no effect
            interpolation: {
                position: new Interpolation(time, time),
                rotation: new Interpolation(time, time)
            },
            next: null,
            prev: null
        }

        // if start and end don't exist yet, it means we are creating the first frame
        if(this.start === null || this.end === null){
            if(this.start === null && this.end === null){
                // for single-frame timelines, start and end will be the same one frame
                this.start = frame;
                this.end = frame;
                return true;
            }
            console.log("ObjectTimeline error: only one of start and end is null!");
            return false;
        }
        
        // can't add frame over another frame
        if(time === this.start.time || time === this.end.time) return false;

        // adding a frame at the beginning/end
        if(time < this.start.time){

            frame.interpolation.position = new Interpolation(time, this.start.time);
            frame.interpolation.rotation = new Interpolation(time, this.start.time);
            frame.next = this.start;

            this.start.prev = frame;
            this.start = frame;             // make new frame the new starting point

            return true;
        }
        if(time > this.end.time){

            // set interpolation values of current final frame
            this.end.interpolation.position = new Interpolation(this.end.time, time);
            this.end.interpolation.rotation = new Interpolation(this.end.time, time);

            frame.prev = this.end;
            this.end.next = frame;
            this.end = frame;             // make new frame the new end point

            return true;
        }
        
        // add new frame inbetween two frames, if we are here

        // at the end, "prevFrame" should be the last frame with a time smaller than the given time
        var prevFrame: Frame = this.start;
        while(prevFrame.next !== null){
            // don't allow adding a frame over another frame
            if(prevFrame.time === time) return false;
            if(time < prevFrame.next.time) break;

            prevFrame = prevFrame.next;
        }

        if(prevFrame.next === null){
            console.log("ObjectTimeline error: something wrong with adding frame");
            return false;
        }

        var nextFrame: Frame = prevFrame.next;

        // insert frame inbetween "prevFrame" and "nextFrame"
        prevFrame.interpolation.position = new Interpolation(prevFrame.time, time);
        prevFrame.interpolation.rotation = new Interpolation(prevFrame.time, time);

        frame.interpolation.position = new Interpolation(time, nextFrame.time);
        frame.interpolation.rotation = new Interpolation(time, nextFrame.time);

        frame.next = nextFrame;
        frame.prev = prevFrame;

        prevFrame.next = frame;
        nextFrame.prev = frame;

        return true;
    }

    // move a frame to a given time
    // keep attributes unchanged; only change interpolation objects, if necessary
    // returns "true", if frame was moved
    moveFrame(time: number, frame: Frame): boolean{
        if(time < 0) return false;
        if(time === frame.time) return false;

        // only frame in the list
        if(frame.prev === null && frame.next === null){
            frame.time = time;
            this.resetInterpolation(frame);

            return true;
        }

        // first element in list without change in list position
        if(frame.prev === null && frame.next !== null && time < frame.next.time){
            frame.time = time;
            this.resetInterpolation(frame);

            return true;
        }

        // last frame in the list without change in list position
        // => set correct new times for frame *and* prev
        if(frame.prev !== null && frame.next === null && time > frame.prev.time){
            frame.time = time;
            this.resetInterpolation(frame);
            this.resetInterpolation(frame.prev);

            return true;
        }

        // inbetween two frames at same list position after move
        if(frame.prev !== null && frame.prev.time < time
            && frame.next !== null && frame.next.time > time){

            frame.time = time;
            this.resetInterpolation(frame);
            this.resetInterpolation(frame.prev);

            return true;
        }

        // traverse the list, until correct position for new time found
        var curFrame: Frame = frame;
        // moving right
        if(time > frame.time){

            while(curFrame.next !== null && time > curFrame.next.time){
                curFrame = curFrame.next;
            }

            // if "curFrame" still equals "frame", it means no change in list position
            // => send error, as we've already considered that case previously and that shouldn't happen
            if(curFrame === frame){
                console.log("ObjectTimeline error: curFrame equals frame, even though that shouldn't be possible!");
                return false;
            }
            
            if(frame.next !== null){
                frame.next.prev = frame.prev;

                if(frame.prev !== null){
                    frame.prev.next = frame.next;
                    this.resetInterpolation(frame.prev);
                }

            }

            // assign "frame" to be between "curFrame" and "curFrame.next"
            frame.time = time;
            frame.prev = curFrame;
            frame.next = curFrame.next;

            frame.prev.next = frame;
            if(frame.next !== null)
                frame.next.prev = frame;

            this.resetInterpolation(curFrame);
            this.resetInterpolation(frame);

            return true;
        }

        // moving left
        else{
            while(curFrame.prev !== null && time > curFrame.prev.time){
                curFrame = curFrame.prev;
            }
            
            if(curFrame === frame){
                console.log("ObjectTimeline error: curFrame equals frame, even though that shouldn't be possible!");
                return false;
            }
            
            if(frame.prev !== null){
                frame.prev.next = frame.next;

                if(frame.next !== null){
                    frame.next.prev = frame.prev;
                }
                this.resetInterpolation(frame.prev);
            }

            // assign "frame" to be between "curFrame.prev" and "curFrame"
            frame.time = time;
            frame.prev = curFrame.prev;
            frame.next = curFrame;

            frame.next.prev = frame;
            if(frame.prev !== null)
                frame.prev.next = frame;

            this.resetInterpolation(curFrame);
            this.resetInterpolation(frame);

            return true;

        }

        // For the next part:
        // Frame cant be dragged to same point in time as another frame!
        // To still be able to drag a frame over another one, we need to add/sub a value,
        // such that the given frame "lands" on the other side of the frame:
        // -    move frame to the left of existing frame, if going leftwards
        // -    move frame to the right of existing frame, if going rightwards

    }

    // delete the given frame from the timeline, if possible
    // returns "true", if deletion was successfull
    deleteFrame(frame: Frame): boolean{
        
        var frameInList: boolean = false;
        // deleting first/last frame
        if(this.start === frame){
            var nxt = this.start.next;
            if(nxt !== null) nxt.prev = null;

            this.start = nxt;
            frameInList = true;
        }
        if(this.end === frame){
            var prv = this.end.prev;
            if(prv !== null){
                prv.next = null;
                // reset interpolation too
                prv.interpolation.position = new Interpolation(prv.time, prv.time);
                prv.interpolation.rotation = new Interpolation(prv.time, prv.time);
            }
            
            this.end = prv;
            frameInList = true;
        }

        // Some of the following might seem redundant, but one should always have in mind,
        // that "frame" might not even be part of "timeline".

        var prv: Frame | null = frame.prev, nxt: Frame | null = frame.next;

        if(prv === null || nxt === null){
            // given frame either not in list or was only element in list => no need to delete anything 
            if(prv === nxt) return frameInList;
            
            if(prv === null && nxt !== null){
                nxt.prev = null;
                return true;
            }
            if(prv !== null && nxt === null){
                prv.next = null;
                prv.interpolation.position = new Interpolation(prv.time, prv.time);
                prv.interpolation.rotation = new Interpolation(prv.time, prv.time);
                return true;
            }
            // logically, we shouldn't be able to reach this "return", but TS is annoying, so put it there anyway
            return false;
        };

        nxt.prev = prv;

        prv.next = nxt;
        prv.interpolation.position = new Interpolation(prv.time, nxt.time);
        prv.interpolation.rotation = new Interpolation(prv.time, nxt.time);

        return true;
    }

    // resets the interpolation values depending on the position of the frame in the list to default values
    private resetInterpolation(frame: Frame){

        frame.interpolation.position.points = [];
        frame.interpolation.rotation.points = [];

        // last frame in list
        if(frame.next === null){
            frame.interpolation.position.startTime = frame.time;
            frame.interpolation.position.endTime = frame.time;
            frame.interpolation.rotation.startTime = frame.time;
            frame.interpolation.rotation.endTime = frame.time;

            return;
        }

        frame.interpolation.position.startTime = frame.time;
        frame.interpolation.position.endTime = frame.next.time;
        frame.interpolation.rotation.startTime = frame.time;
        frame.interpolation.rotation.endTime = frame.next.time;
    }

}

// interpolated attributes of an object at a given time
export interface Timestamp{
    object: CanvasObject
    attributes: FrameAttributes
}

export default class Match{

    // list of all canvas objects with animations
    timelines: {[key: string]: ObjectTimeline} = {};
    // track the number of frames at given time
    frametimes: {[key: string]: number} = {};

    currentTime: number = 0;                                // the current time 
    speedFactor: number = 1;                                // how much faster the frames should be played out
    
    constructor(){}

    // add a new CanvasObject to the timeline and return the added ObjectTimeline element
    addObject(object: CanvasObject): ObjectTimeline{
        // no need to add OT, if one already exists for given object
        if(object.id in this.timelines) return this.timelines[object.id];

        var ot: ObjectTimeline = new ObjectTimeline(object);
        this.timelines[object.id] = ot;
        
        return ot;
    }

    // add a frame to the given object
    // IMPORTANT: call THIS function instead of directly calling the "addFrame" of the ObjectTimeline instance,
    // -- as this way we can track the "frametimes"
    addFrame(time: number, object: CanvasObject){
        var ot = this.addObject(object);        // we can do this, as "addObject" returns the correct object anyway, if it exists
        if(!ot.addFrame(time)) return;          // if no frame was added, return

        
        var _t = Math.floor(time);              // MUST be an integer!
        if(!(_t in this.frametimes)) this.frametimes[_t] = 0;
        this.frametimes[_t]++;
    }

    // move the given frame from given object
    moveFrame(time: number, object: CanvasObject, frame: Frame){
        if(!(object.id in this.timelines)) return;

        const t_prev = frame.time;
        if(t_prev === time) return;             // no need for change, if times are the same

        // move frame through object
        if(!this.timelines[object.id].moveFrame(time, frame)) return;

        console.log("moved frame!");
        
        // decrement frametimes value for the previous time
        if(t_prev in this.frametimes){
            this.frametimes[t_prev]--;
            if(this.frametimes[t_prev] <= 0){
                if(this.frametimes[t_prev] < 0) console.log("ERROR: somehow, 'frametimes' at ", t_prev, " is now below zero");
                delete this.frametimes[t_prev];
            }
        }

        // make sure time is an integer!
        var t_new = Math.floor(time);
        if(!(t_new in this.frametimes)) this.frametimes[t_new] = 0;
        this.frametimes[t_new]++;

    }

    // delete a frame from the timeline for a given object
    deleteFrame(frame: Frame, object: CanvasObject){
        if(!(object.id in this.timelines)) return;

        var ot = this.timelines[object.id];
        if(!ot.deleteFrame(frame)) return;          // if no frame was deleted, return

        // delete object's id from list of frametimes
        if(!(frame.time in this.frametimes)) return;
        this.frametimes[frame.time]--;

        if(this.frametimes[frame.time] === 0){
            this.frametimes[frame.time]--;
            if(this.frametimes[frame.time] <= 0){
                if(this.frametimes[frame.time] < 0) console.log("ERROR: somehow, 'frametimes' at ", frame.time, " is now below zero");
                delete this.frametimes[frame.time];
            }
        }
    }

    // assign attributes at time to objects
    showFrameAtTime(time: number){
        if(time < 0) return;
        var timestamps: Timestamp[] | null = this.getAttributesAtTime(time);
        if(timestamps === null) return;

        timestamps.forEach(t => {
            t.object.position = t.attributes.position.copy();
            t.object.rotation = t.attributes.rotation;
        })
    }

    // returns the current attributes (e.g. position) of all elements at given time with their interpolated values
    getAttributesAtTime(time: number): Timestamp[] | null {
        // cant have negative time
        if(time < 0) return null;

        var timestamps: Timestamp[] = [];
        var ts: Timestamp | null;
        for(var ot in this.timelines){
            ts = this.timelines[ot].getTimestamp(time);
            if(ts !== null)
                timestamps.push(ts);
        }

        return timestamps;
    }

}