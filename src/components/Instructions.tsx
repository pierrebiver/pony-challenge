import * as React from 'react'
import {Icon} from "semantic-ui-react";
import SvgDomokun from "./Domokun";
import SvgUnicorn from "./Unicorn";


export default () => (
    <div style={{fontSize: "1.2em"}}>
        Lead Fluttershy <SvgUnicorn width={40} height={40}/> to the exit <Icon name={"log out"}/> before the Domokun
        catches you
        &nbsp;
        <SvgDomokun/>
    </div>
)
