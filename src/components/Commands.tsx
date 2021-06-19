import * as React from 'react'
import {Button, Grid, GridColumn, GridRow} from "semantic-ui-react";
import {useSelector} from "react-redux";
import {makeMove, selectGame} from "../game-slice";
import {Direction, GameStatus} from "../types/Game";


export const Commands = () => {
    const game = useSelector(selectGame);
    const noGameInProgress = game.gameStatus !== GameStatus.gameInProgress;

    return <Grid stackable verticalAlign='middle' columns={5} centered>
        <GridRow>
            <GridColumn width={1}>
                <Button onClick={() => makeMove(Direction.west)} disabled={noGameInProgress} icon="arrow left"/>
            </GridColumn>
            <GridColumn width={1}>
                <Button onClick={() => makeMove(Direction.north)} disabled={noGameInProgress} icon="arrow up"/>
                &nbsp;
                <Button onClick={() => makeMove(Direction.south)} disabled={noGameInProgress} icon="arrow down"/>
            </GridColumn>
            <GridColumn width={1}>
                <Button onClick={() => makeMove(Direction.east)} disabled={noGameInProgress} icon="arrow right"/>
            </GridColumn>
        </GridRow>
    </Grid>
}
