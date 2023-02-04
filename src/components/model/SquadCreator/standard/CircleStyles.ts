export function getCircleStyle(idx: number, firstColor: string, secondColor: string, selected: boolean): string{
    
    const list = [
        `
        <circle class="player-circle${selected ? '-active' : ''}" @mousedown="onMouseDown" cx="0" cy="0" r="2" fill="${firstColor}" stroke="${secondColor}" stroke-width="1" />
        `
    ]

    return list[idx];
}

export default [
]