import * as React from 'react'
import {useEffect, useState} from 'react'
import {Block as BlockType, GameStatus, LoadingStatus} from "../types/Game";
import {useDispatch, useSelector} from "react-redux";
import {fetchNewMaze, selectGame, selectGameStatus} from "../game-slice";
import {Button, Loader, Modal} from "semantic-ui-react";


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
            <GameEndedModal/>
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

const GameEndedModal = () => {
    const dispatch = useDispatch();
    const gameStatus = useSelector(selectGameStatus);
    const isGameOver = gameStatus === GameStatus.gameWon || gameStatus === GameStatus.gameLost;
    const [open, setOpen] = useState(isGameOver);
    const header = gameStatus === GameStatus.gameWon ? "Congratulations ! You saved Fluttershy" : "Oh no the Domokun" +
        " caught you !";

    return <Modal open={open} onClose={() => setOpen(false)} style={{textAlign: "center"}}>
        <Modal.Header>{header}</Modal.Header>
        <Modal.Content>
            <Button primary size="big" onClick={() => {
                dispatch(fetchNewMaze);
                setOpen(false);
            }}>
                Start a new game
            </Button>
        </Modal.Content>
    </Modal>
}