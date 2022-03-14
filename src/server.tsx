import fs from "fs/promises";
import http from "http";

let delay: any;
let module: any;

async function load() {
    const code = await fs.readFile("dist/webhot.mjs", "utf-8");
    const fn = new Function(`return ${code}`);
    const next = await fn();
    if (next !== module) {
        const last = module;
        module = next;
        delay = last?.stop();
    }

    await delay;
    return next.default;
}

const server = http.createServer();
server.on("request", async (req, res) => {
    const webapi = await load();
    webapi(req, res);
});

server.listen(7180);
