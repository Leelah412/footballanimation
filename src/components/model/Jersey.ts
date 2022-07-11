export default class Jersey{
    name: string;               // player name on jersey
    nr: number;                 // player number on jersey

    jerseyType: number;
    palette: string[];          // list of colors to apply to the jersey in order

    constructor(name: string = "", nr: number = 0, jerseyType: number = 0, palette: string[] = []){
        this.name = name;
        this.nr = nr;
        
        this.jerseyType = jerseyType;
        this.palette = palette;
    }


    changeJerseyType(jerseyType: number){
        if(!Number.isInteger(jerseyType) || jerseyType < 0) return;
        
        this.jerseyType = jerseyType;
    }

    // change the jersey color at given index of the palette
    changeColorAt(idx: number, color: string){
        if(!Number.isInteger(idx) || idx < 0 || !(idx < this.palette.length)) return;
        // if string isn't of any given form, return
        // or whatever, not really necessary
        /* if(!/#[0-9a-fA-F]+/.test(color) && !/var\([a-zA-Z0-9_\-]\)/.test(color)) */
        this.palette[idx] = color;
    }

    changePalette(palette: string[]){
        this.palette = palette;
    }


}

// default jersey used for visualization purposes
export const visualizationJersey = new Jersey("", 10);