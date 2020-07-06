// Dependencies
const express = require("express");
const app = express();
const PORT = 3000;
const fs = require("fs");

// Body Parsing Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static assets
app.use(express.static('public'));

// API Routes
app.get("/api/notes", function (req, res) {
    res.sendFile(__dirname + "/db/db.json");
});

app.post("/api/notes", function (req, res) {
    let newNote = req.body;

    fs.readFile(__dirname + '/db/db.json', "utf8", function (err, data) {
        if (err) {
            console.log(err);
        } else {
            noteArray = JSON.parse(data);
            // Create unique id for new note
            let idArray = [];
            noteArray.forEach(item => idArray.push(item.id));
            idArray.sort();
            console.log(idArray.length);
            if (idArray.length === 0) {
                newNote.id = 1;
            } else {
                let newId = idArray[idArray.length - 1] + 1;
                newNote.id = newId;
                console.log(newNote);
            }
            noteArray.push(newNote);

            fs.writeFile(__dirname + '/db/db.json', JSON.stringify(noteArray), function (err) {
                if (err) {
                    return console.log(err);
                }
                res.sendFile(__dirname + "/db/db.json");
                console.log("Success! Note added");
            });
        }
    });
});

app.delete("/api/notes/:id", function (req, res) {
    let search = req.params;
    console.log(search.id);

    fs.readFile(__dirname + '/db/db.json', "utf8", function (err, data) {
        if (err) {
            console.log(err);
        } else {
            // Delete object from array and json file

            currentArray = JSON.parse(data);

            let newArray = currentArray.filter(item => {
                if (item.id != search.id) {
                    return item
                }
            });
            console.log(newArray);

            fs.writeFile(__dirname + '/db/db.json', JSON.stringify(newArray), function (err) {
                if (err) {
                    return console.log(err);
                }
                res.sendFile(__dirname + "/db/db.json");
                console.log("Success! Note deleted");
            });

        }
    });
});

// HTML Routes
app.get("/notes", function (req, res) {
    res.sendFile(__dirname + "/public/notes.html");
});

app.get("*", function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

// Server listener
app.listen(PORT, function () {
    console.log("Server is listening on: http://localhost:" + PORT);
});