const express = require("express");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Set up view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// WebSocket connection
io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Receive location from a client
    socket.on("send-location", (data) => {
        const { latitude, longitude } = data;

        // Broadcast the location to all clients, including the sender
        io.emit("receive-location", {
            id: socket.id,
            latitude,
            longitude,
        });
    });

    // Notify clients when a user disconnects
    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
        io.emit("user-disconnected", socket.id);
    });
});

// Route to render the app
app.get("/", (req, res) => {
    res.render("index");
});

// Start server
server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
