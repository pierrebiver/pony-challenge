import * as React from 'react'
import {Button, Grid, GridColumn, GridRow} from "semantic-ui-react";


export const Commands = () => {

    return <Grid verticalAlign='middle' columns={4} centered>
        <GridRow>
            <GridColumn width={1}>
                <Button icon="arrow left"/>
            </GridColumn>
            <GridColumn width={1}>
                <Button icon="arrow up"/>
                &nbsp;
                <Button icon="arrow down"/>
            </GridColumn>
            <GridColumn width={1}>
                <Button icon="arrow right"/>
            </GridColumn>
        </GridRow>
    </Grid>
}
