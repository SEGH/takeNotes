// Dependencies
const express = require("express");
const app = express();
const PORT = 3000;

// Server listener
app.listen(PORT, function() {
    console.log("Server is listening on: http://localhost:" + PORT);
});