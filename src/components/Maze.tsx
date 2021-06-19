import * as React from 'react'
import {useEffect} from 'react'
import {Block as BlockType, LoadingStatus} from "../types/Game";
import {useDispatch, useSelector} from "react-redux";
import {fetchNewMaze, selectGame} from "../game-slice";
import {Loader} from "semantic-ui-react";


export const Maze = () => {
    const dispatch = useDispatch();
    const game = useSelector(selectGame);

    useEffect(() => {
        if (game.loadingStatus === LoadingStatus.idle) {
            dispatch(fetchNewMaze());
        }
    }, [dispatch, game.loadingStatus]);

    if (game.loadingStatus === LoadingStatus.loading) {
        return <Loader active/>
    } else if (game.loadingStatus === LoadingStatus.loaded) {
        return <>
            {game.maze.data.map((b, i) => <BlockRow key={i} blocks={b}/>)}
        </>
    }

    return <></>;
}

const BlockRow = ({blocks}: { blocks: BlockType[] }) => (
    <div>
        {blocks.map((b, j) => <Block key={j} block={b}/>)}
    </div>
)

const Block = ({block}: { block: BlockType }) => {
    const westWall = block.westWallBuilt ? '+\n|\n+' : undefined;
    const northWall = block.westWallBuilt ? '+---+' : undefined;

    return <div style={{whiteSpace: "pre-wrap"}}>
        {westWall} &nbsp;
        {northWall}
    </div>
}
