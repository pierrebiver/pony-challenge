import axios from "axios";
import {Direction} from "../types/Game";
import {RawMaze} from "../types/RawMaze";

const maxLengthMaze = 25;
const minLengthMaze = 15

function randomMazeLength() {
    return Math.floor(Math.random() * (maxLengthMaze - minLengthMaze + 1)) + minLengthMaze;
}

export async function createMaze() {
    const randomWidth = randomMazeLength();
    const randomHeight = randomMazeLength();
    const difficulty = 3;
    return axios.post('https://ponychallenge.trustpilot.com/pony-challenge/maze', {
        "maze-width": randomWidth,
        "maze-height": randomHeight,
        "maze-player-name": "Fluttershy",
        "difficulty": difficulty
    },).then(response => response.data.maze_id as string);
}

export async function getMaze(mazeId: string) {
    return axios.get(`https://ponychallenge.trustpilot.com/pony-challenge/maze/${mazeId}`)
        .then((response => response.data as RawMaze));
}

export async function makeNextMoveMaze(mazeId: string, move: Direction) {
    return axios.post(`https://ponychallenge.trustpilot.com/pony-challenge/maze/${mazeId}`, {
        direction: move
    })
}