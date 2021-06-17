import {render} from "react-dom";
import App from "./app";
import {Provider} from "react-redux";
import '../semantic/dist/semantic.min.css';

//TODO add store
render(
    <div>
        <App/>
    </div>
    ,
    document.getElementById("app")
);
