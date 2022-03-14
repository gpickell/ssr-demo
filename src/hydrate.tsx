import App from "./App";
import AppContext from "./AppContext";
import React from "react";
import ReactDOM from "react-dom";

const value = new AppContext(__appContext__);
const jsx =
<React.StrictMode>
    <AppContext.Provider value={value}>
        <App />
    </AppContext.Provider>
</React.StrictMode>;

const dom = document.querySelector("#root");
ReactDOM.hydrate(jsx, dom);
