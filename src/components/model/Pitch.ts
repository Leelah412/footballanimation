import Vector2 from "../math/Vector2";



// the pitch object, to which everything is relative to
// origin of the coordinate system at upper left of Pitch
export default class Pitch{
    private static _MINSIZEX = 90;
    private static _MAXSIZEX = 120;
    private static _MINSIZEY = 60;
    private static _MAXSIZEY = 90;

    static get MINSIZEX(): number {return Pitch._MINSIZEX};
    static get MAXSIZEX(): number {return Pitch._MAXSIZEX};
    static get MINSIZEY(): number {return Pitch._MINSIZEY};
    static get MAXSIZEY(): number {return Pitch._MAXSIZEY};

    size: Vector2;                      // the size of the pitch in meters
    lineColor: string = '#f2f2f2';
    pitchColor: string = 'var(--green)';

    // TODO: SOON
    //lineStructure = null;       // the chosen line structure
    //pitchBackground: string | HTMLImageElement | null = null;


    constructor(size = new Vector2(105, 68)){
        this.size = size;
    }

    // return a deep copy of this instance
    copy(): Pitch{
        var p = new Pitch(this.size.copy());
        p.lineColor = this.lineColor;
        p.pitchColor = this.pitchColor;
        
        return p;
    }
}

// default pitch for visualization purposes
export const visualizationPitch = new Pitch();