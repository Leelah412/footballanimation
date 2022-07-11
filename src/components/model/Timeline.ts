import Vector2 from "../math/Vector2";
import PlayerTimeline, { Frame } from "./PlayerTimeline";

export default class Timeline{

    playerTimelines: PlayerTimeline[] = [];                 // list of all players with animations
    start: Frame = {time: 0, position: new Vector2()};      // earliest frame of any object in the timeline
    end: Frame = {time: 0, position: new Vector2()};        // latest frame of any object in the timeline
    
    constructor(){
        
    }
}