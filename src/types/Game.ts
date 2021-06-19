

export enum LoadingStatus  {
    idle,
    loading,
    loaded,
    failed
}

export enum GameStatus {
    noGameStarted,
    gameInProgress,
    gameWon,
    gameLost,
}

export interface Game {
    loadingStatus: LoadingStatus,
    gameStatus: GameStatus,
    maze?: Maze,
}

export enum Direction {
    north = "north",
    south = "south",
    west = "west",
    east = "east"
}

export interface Maze {
    id: string,
    pony: number,
    domokun: number,
    exit: number,
    size: {width: number, height: number},
    difficulty: number,
    data: Block[][]
}

export interface Block {
    northWallBuilt: boolean,
    westWallBuilt: boolean,
    isExitHere: boolean,
    isDomokunHere: boolean,
    isPonyHere: boolean
}