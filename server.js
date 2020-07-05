// Dependencies
const express = require("express");
const app = express();
const PORT = 3000;
const fs = require("fs");

// Body Parsing Middleware
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

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

app.post("/api/notes", function(req, res) {
    let newNote = req.body;
    console.log(newNote);
    fs.readFile(__dirname + '/db/db.json', "utf8", function(err, data) {
        if (err) {
            console.log(err);
        } else {
            noteArray = JSON.parse(data);
            noteArray.push(newNote);
            fs.writeFile(__dirname + '/db/db.json', JSON.stringify(noteArray), function(err) {
                if (err) {
                    return console.log(err);
                }
                console.log("Success! Note added");
            });
        }
    });
});

// Server listener
app.listen(PORT, function() {
    console.log("Server is listening on: http://localhost:" + PORT);
});