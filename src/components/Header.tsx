import * as React from 'react'
import {Button, Divider, Header} from "semantic-ui-react";


export default () => (
    <div style={{marginBottom: 60}}>
        <Header size={"huge"}>Maze Game</Header>
        <Header sub>Solve Trustpilot's Pony Challenge &nbsp; <Button as={"a"} icon="github" basic target="_blank"
                                                                     href={"https://github.com/pierrebiver/pony-challenge"}/></Header>
        <Divider clearing/>
    </div>
)
