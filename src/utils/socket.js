const { Server } = require("socket.io");

let io;

const initializeSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: process.env.REACT_HOST_URI,
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {
        console.log("Client connected");

        socket.on("disconnect", () => {
            console.log("Client disconnected");
        });
    });

    return io;
};

const getIO = () => {
    if (!io) {
        throw new Error("socket.io not started..");
    }
    return io;
};

module.exports = { initializeSocket, getIO };
