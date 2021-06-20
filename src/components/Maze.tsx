import * as React from 'react'
import {useEffect, useState} from 'react'
import {Block as BlockType, GameStatus, LoadingStatus} from "../types/Game";
import {useDispatch, useSelector} from "react-redux";
import {fetchNewMaze, selectGame, selectGameStatus} from "../game-slice";
import {Button, Grid, Icon, Loader, Modal} from "semantic-ui-react";
import SvgDomokun from "./Domokun";
import SvgUnicorn from "./Unicorn";


export const Maze = () => {
    const dispatch = useDispatch();
    const game = useSelector(selectGame);

    useEffect(() => {
        if (game.loadingStatus === LoadingStatus.idle) {
            dispatch(fetchNewMaze());
        }
    }, [dispatch, game.loadingStatus]);

    return <>
        <Loader active={game.loadingStatus === LoadingStatus.loading}/>
        <GameEndedModal/>
        <Grid>
            {game?.maze?.data.map((b, i) => <BlockRow buildSouth={i === game.maze.size.height - 1} key={i}
                                                      blocks={b}/>)}
        </Grid>
    </>
}

const BlockRow = ({blocks, buildSouth}: { blocks: BlockType[], buildSouth: boolean }) => {
    return <Grid.Row stretched style={{padding: 0, height: 25, flexWrap: "nowrap"}}>
        {blocks.map((b, j) => <Block key={j} buildSouth={buildSouth} buildEast={j === blocks.length - 1} block={b}/>)}
    </Grid.Row>
}

const Block = ({block, buildEast, buildSouth}: { block: BlockType, buildSouth: boolean, buildEast: boolean }) => {
    const westWall = block.westWallBuilt ? 'solid' : "none";
    const northWall = block.northWallBuilt ? 'solid' : "none";
    const eastWall = buildEast ? 'solid' : "none";
    const southWall = buildSouth ? 'solid' : "none";

    return <Grid.Column width={1} style={{borderStyle: `${northWall} ${eastWall} ${southWall} ${westWall}`}}>
        <Player block={block}/>
    </Grid.Column>
}

const Player = ({block}: { block: BlockType }) => {
    if (block.isDomokunHere) {
        return <SvgDomokun width={30} height={30}/>
    } else if (block.isPonyHere) {
        return <SvgUnicorn width={30} height={30}/>
    } else if (block.isExitHere) {
        return <Icon name="log out"/>
    }

    return <></>;
}

const GameEndedModal = () => {
    const dispatch = useDispatch();
    const gameStatus = useSelector(selectGameStatus);
    const isGameOver = gameStatus === GameStatus.gameWon || gameStatus === GameStatus.gameLost;

    const header = gameStatus === GameStatus.gameWon ? "Congratulations ! You saved Fluttershy" : "Oh no the Domokun" +
        " caught you !";

    return <Modal open={isGameOver} closeIcon style={{textAlign: "center"}}>
        <Modal.Header>{header}</Modal.Header>
        <Modal.Content>
            <Button primary size="big" onClick={() => {
                dispatch(fetchNewMaze());
            }}>
                Start a new game
            </Button>
        </Modal.Content>
    </Modal>
}