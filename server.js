// Dependencies
const express = require("express");
const app = express();
const PORT = 3000;

// const data = [{title: "Stuff to jot down", text: "Thought about things", id: "0"}];

// Serve static assets
app.use(express.static('public'));

// HTML Routes
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

app.get("/notes", function(req, res) {
    res.sendFile(__dirname + "/public/notes.html");
});

// API Routes
app.get("/api/notes", function(req, res) {
    res.sendFile(__dirname + "/db/db.json");
});

// Server listener
app.listen(PORT, function() {
    console.log("Server is listening on: http://localhost:" + PORT);
});