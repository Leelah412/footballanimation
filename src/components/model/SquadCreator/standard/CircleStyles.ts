// List of circle styles for the standard squad creator
export default [
    (col1: string, col2: string) => {
        return `
        <circle class="player-circle" cx="0" cy="0" r="2" fill="${col1}" stroke="${col2}" stroke-width="1" />
        `;
    },
    (col1: string, col2: string) => {
        return `
        <circle class="player-circle" cx="0" cy="0" r="2" fill="${col2}" stroke="${col1}" stroke-width="1" />
        `;
    }
];