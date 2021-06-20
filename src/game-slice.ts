import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Block, Direction, Game, GameStatus, LoadingStatus, Maze} from "./types/Game";
import {RawMaze} from "./types/RawMaze";
import {createMaze, getMaze, makeNextMoveMaze} from "./services";
import {RootState} from "./store";


const initialState: Game = {
    gameStatus: GameStatus.noGameStarted,
    loadingStatus: LoadingStatus.idle,
};

export const selectGame = (state: RootState) => state.game;
export const selectGameStatus = (state: RootState) => state.game.gameStatus;

export const makeMove = createAsyncThunk('game/makeMove',
    async (payload: { mazeId: string, move: Direction }) => {
        await makeNextMoveMaze(payload.mazeId, payload.move);
        return getMaze(payload.mazeId);
    });

export const fetchNewMaze = createAsyncThunk('game/fetchNewMaze', async () => {
    const mazeId = await createMaze();
    return getMaze(mazeId);
})

export const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchNewMaze.pending.type]: (state: Game) => {
            state.loadingStatus = LoadingStatus.loading;
        },
        [fetchNewMaze.fulfilled.type]: fetchNewMazeFulfilled(),
        [makeMove.fulfilled.type]: makeMoveFulfilled()
    }
});

function fetchNewMazeFulfilled() {
    return (state: Game, action: PayloadAction<RawMaze>) => {
        const payload = action.payload;
        const maze: Maze = {
            difficulty: payload.difficulty,
            domokun: payload.domokun[0],
            pony: payload.pony[0],
            exit: payload["end-point"][0],
            id: payload["maze_id"],
            data: buildBlocks(payload),
            size: {width: payload.size[0], height: payload.size[1]}
        }
        state.loadingStatus = LoadingStatus.loaded;
        state.gameStatus = GameStatus.gameInProgress;
        state.maze = maze;
    };
}

function buildBlocks(payload: RawMaze) {
    const height = payload.size[1];
    const width = payload.size[0];
    const blocks: Block[][] = initializeBlocks(height);

    for (let i = 0; i < payload.data.length; i++) {
        const row = Math.floor(i / width);
        const {northWallBuilt, westWallBuilt} = getWalls(payload.data[i]);
        blocks[row].push({
            westWallBuilt,
            northWallBuilt,
            isDomokunHere: i === payload.domokun[0],
            isExitHere: i === payload["end-point"][0],
            isPonyHere: i === payload.pony[0]
        })
    }

    return blocks;
}

function initializeBlocks(size: number) {
    const blocks = [];
    for (let i = 0; i < size; i++) {
        blocks.push([]);
    }
    return blocks;
}

function getWalls(rawBlock: string[]) {
    const westWallBuilt = rawBlock.includes('west');
    const northWallBuilt = rawBlock.includes('north');
    return {westWallBuilt, northWallBuilt};
}

function makeMoveFulfilled() {
    return (state: Game, action: PayloadAction<RawMaze>) => {
        state.maze.domokun = action.payload.domokun[0];
        state.maze.pony = action.payload.pony[0];

        if (state.maze.pony === state.maze.domokun) {
            state.gameStatus = GameStatus.gameLost;
        } else if (state.maze.pony === state.maze.exit) {
            state.gameStatus = GameStatus.gameWon;
        }

        state.maze.data = buildBlocks(action.payload);
    };
}