import * as React from 'react'
import {Commands} from "./components/Commands";
import Instructions from "./components/Instructions";
import Header from "./components/Header";
import {Grid, GridRow} from "semantic-ui-react";
import {Maze} from "./components/Maze";


export default () => {

    return <Grid container stackable verticalAlign="middle" centered relaxed style={{marginTop: 60}}>
        <GridRow>
            <Header/>
        </GridRow>
        <GridRow>
            <Instructions/>
        </GridRow>
        <GridRow>
            <Commands/>
        </GridRow>
        <GridRow style={{marginBottom: 60}}>
            <Maze/>
        </GridRow>
    </Grid>;
}