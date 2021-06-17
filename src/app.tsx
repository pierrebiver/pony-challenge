import * as React from 'react'
import {Commands} from "./components/Commands";
import Instructions from "./components/Instructions";
import Header from "./components/Header";
import {Grid, GridRow} from "semantic-ui-react";


export default () => {

    return <Grid container verticalAlign="middle" centered relaxed style={{marginTop: 60}}>
        <GridRow>
            <Header/>
        </GridRow>
        <GridRow>
            <Instructions/>
        </GridRow>
        <GridRow>
            <Commands/>
        </GridRow>
    </Grid>;
}