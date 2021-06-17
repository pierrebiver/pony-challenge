import axios from "axios";
import {MazeMove} from "../types/Move";

export async function createMaze(width: number, height: number, difficulty: number, name: string) {
    return axios.post('https://ponychallenge.trustpilot.com/pony-challenge/maze', {
        "maze-width": width,
        "maze-height": height,
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