import axios from "axios";
import {MazeMove} from "../types/Move";

function randomMazeLength() {
    return Math.floor(Math.random() * 25) + 15;
}

export async function createMaze(name: string) {
    const randomWidth = randomMazeLength();
    const randomHeight = randomMazeLength();
    const difficulty = 3;
    return axios.post('https://ponychallenge.trustpilot.com/pony-challenge/maze', {
        "maze-width": randomWidth,
        "maze-height": randomHeight,
        "maze-player-name": name,
        "difficulty": difficulty
    })
}

export async function getMaze(mazeId: string) {
    return axios.get(`https://ponychallenge.trustpilot.com/pony-challenge/maze/${mazeId}`);
}

export async function makeNextMoveMaze(mazeId: string, move: MazeMove) {
    return axios.post(`https://ponychallenge.trustpilot.com/pony-challenge/maze/${mazeId}`, {
        direction: move
    })
}