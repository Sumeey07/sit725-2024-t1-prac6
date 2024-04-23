var express = require("express")
var { MongoClient } = require("mongodb");
var clickController = require("./public/js/controllers/clickController");
var formController = require("./public/js/controllers/formController");
var cardController = require("./public/js/controllers/cardController");
var path = require("path");

var server = express()

server.use(express.static(__dirname + '/public'))
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

var uri = "mongodb://localhost:27017";
var client = new MongoClient(uri);

client.connect()
  .then(() => {
    console.log("Connected to MongoDB");

    const db = client.db("serverliedSoftwareEngineering");
    const collection = db.collection("Task6.2D");

    // Insert test data for MongoDB
    collection.insertOne({
      first_name: "Sumeet",
      last_name: "Kumar",
      password: "test12345",
      email: "test@example.com"
    });

    server.post('/api/projects/insert', formController.submitForm.bind(null, collection));
    server.get('/api/projects', cardController.getProjects.bind(null, collection));

    server.get("/", (req, res) => {
      res.sendFile(path.join(__dirname, "view.html"));
    });

    // Start the server after MongoDB connection
    const port = process.env.PORT || 3000;
    server.listen(port, () => {
      console.log("server listening to port: " + port);
    });
  })
  .catch(err => {
    console.error("Error connecting to MongoDB:", err);
  });

module.exports = server; // Export the server object for testing

    // --reporter spec test/apiTests.test.js
