const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const next = require("next");

async function main() {
    const dev = process.env.NODE_ENV !== "production";
    const nextApp = next({ dev });
    const nextHandler = nextApp.getRequestHandler();

    const port = 3000;
    const host = "localhost";

    const app = express();
    const server = http.Server(app);
    const io = socketio(server);
    io.on("connect", socket => {
        socket.emit("hello", { message: "podium " });
    });

    await nextApp.prepare();
    app.get("*", nextHandler);
    const p = new Promise((resolve, reject) => {
        server.listen(port, host, error => {
            if (error) {
                reject(error);
            } else {
                resolve(server);
            }
        });
    });
    await p;
    const address = server.address();
    console.log(`Listening on http://${address.address}:${address.port}/ ...`);
}

main();
