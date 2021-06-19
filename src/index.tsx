import {render} from "react-dom";
import App from "./app";
import '../semantic/dist/semantic.min.css';
import {Provider} from "react-redux";
import {store} from "./store";


render(
    <Provider store={store}>
        <App/>
    </Provider>
    ,
    document.getElementById("app")
);
