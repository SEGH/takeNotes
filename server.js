// Dependencies
const express = require("express");
const app = express();
const PORT = 3000;

// Routes
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

// Server listener
app.listen(PORT, function() {
    console.log("Server is listening on: http://localhost:" + PORT);
});