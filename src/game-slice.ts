import {createAction, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Block, Direction, Game, GameStatus, LoadingStatus, Maze} from "./types/Game";
import {RawMaze} from "./types/RawMaze";
import {createMaze, getMaze} from "./services";
import {RootState} from "./store";


const initialState: Game = {
    gameStatus: GameStatus.noGameStarted,
    loadingStatus: LoadingStatus.idle,
};

export const selectGame = (state: RootState) => state.game;

export const makeMove = createAction<Direction>('game/makeMove');

export const fetchNewMaze = createAsyncThunk('game/fetchNewMaze', async () => {
    const mazeId = await createMaze();
    return getMaze(mazeId);
})

export const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        [makeMove.type]: () => {

        }
    },
    extraReducers: {
        [fetchNewMaze.pending.type]: (state) => {
            state.loadingStatus = LoadingStatus.loading;
        },
        [fetchNewMaze.fulfilled.type]: (state, action) => {
            const payload = action.payload;
            const maze: Maze = {
                difficulty: payload.difficulty,
                domokun: payload.domokun,
                pony: payload.pony,
                exit: payload["end-point"],
                id: payload["maze-id"],
                data: buildBlocks(payload),
                size: {width: payload.size[0], height: payload.size[1]}
            }
            state.loadingStatus = LoadingStatus.loaded;
            state.maze = maze;
        }
    }
});

function buildBlocks(payload: RawMaze) {
    const blocks: Block[][] = payload.data.map(_ => []);

    for (let i = 0; i < payload.size[0]; i++) {
        for (let j = 0; j < payload.size[1]; j++) {
            const {northWallBuilt, westWallBuilt} = getWalls(payload.data[i + j]);
            blocks[i].push({
                westWallBuilt,
                northWallBuilt,
                isDomokunHere: i + j === payload.domokun,
                isExitHere: i + j === payload["end-point"],
                isPonyHere: i + j === payload.pony
            })
        }
    }
    return blocks;
}

function getWalls(rawBlock: string[]) {
    const westWallBuilt = rawBlock.includes('west');
    const northWallBuilt = rawBlock.includes('north');
    return {westWallBuilt, northWallBuilt};
}
