import express from "express";
import fs from "fs/promises";

import App from "./App";
import AppContext from "./AppContext";
import ReactDOMServer from "react-dom/server";
import React from "react";

const webapi = express();
webapi.get("/", async (_, res) => {
    const value = new AppContext();
    value.count++;

    const indexHtml = await fs.readFile("static/index.html", "utf-8");
    const init = `var __appContext__ = ${JSON.stringify(value)};`;
    const script = await fs.readFile("dist/client.mjs", "utf-8");

    const jsx =
    <React.StrictMode>
        <AppContext.Provider value={value}>
            <App />
        </AppContext.Provider>
    </React.StrictMode>;

    let html = indexHtml;
    html = html.replace("{CONTEXT}", init);
    html = html.replace("{SCRIPT}", script);
    html = html.replace("{CONTENT}", ReactDOMServer.renderToString(jsx));

    res.statusCode = 200;
    res.setHeader("Cache-Control", "no-cache");
    res.send(html);
});

webapi.use("/assets/", express.static("dist/assets", {
    cacheControl: true,
    immutable: true,
    maxAge: 31536000000,
}));

export function stop() {
    
}

export default webapi;