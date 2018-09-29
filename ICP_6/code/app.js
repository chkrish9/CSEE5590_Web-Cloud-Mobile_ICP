var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
const MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

// Connection URL
const url = 'mongodb://muraliicp:Welcome123@ds119323.mlab.com:19323/web-icp';

// Database Name
const dbName = 'web-icp';

//Body Parser is used to parse the incomeing request.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Cors is used to allow all domain
app.use(cors());

//Get method is used to fetch the data from database.
app.get("/", (req, res, next) => {
    //Connecting the mongodb
    MongoClient.connect(url, function (err, client) {
        //If connection failed the it will go to if condition.
        if (err) {
            res.write("connecting to Database failed");
            res.end();
        }
        const db = client.db(dbName);
        //Fectching the data
        db.collection('books').find().toArray(function (err, result) {
            if (err) {
                res.write("fetching  books failed");
                res.end();
            } else {

                res.send(JSON.stringify(result));
            }
        });
    });
});

//Post method is used to add the book in the database.
app.post("/create", (req, res, next) => {
    //Connecting to database
    MongoClient.connect(url, { useNewUrlParser: true },function (err, client) {
        //If connection failed the it will go to if condition.
        if (err) {
            res.write("connecting to Database failed");
            res.end();
        }
        const db = client.db(dbName);
        console.log(req.body);
        //Inserting the record in the database.
        db.collection('books').insertOne(req.body, function (err, result) {
            if (err) {
                res.send("Registration Failed, Error While Registering "+err);
                res.end();
            }
            res.send("Inserted a document into the books collection.");
        });
    });
});

//Updating the record in the database using id.
app.put("/update/:id", (req, res, next) => {
    //Connecting to database
    MongoClient.connect(url, { useNewUrlParser: true },function (err, client) {
        //If connection failed the it will go to if condition.
        if (err) {
            res.send("connecting to Database failed");
            res.end();
        }
        const db = client.db(dbName);
        console.log(req.body);
        //Updating the record using id.
        db.collection('books').updateOne({_id:ObjectId( req.params.id)},{ $set: req.body }, function (err, result) {
            if (err) {
                res.send("Error while updating"+err);
                res.end();
            }
            res.send("Updated");
        });
    });
});


//Deleting the record in the database using id.
app.delete("/delete/:id", (req, res, next) => {
     //Connecting to database
    MongoClient.connect(url, { useNewUrlParser: true },function (err, client) {
        //If connection failed the it will go to if condition.
        if (err) {
            res.send("connecting to Database failed");
            res.end();
        }
        const db = client.db(dbName);
        console.log(req.params.id);
        //Deleteing the record.
        db.collection('books').deleteOne({_id:ObjectId( req.params.id)}, function (err, result) {
            if (err) {
                res.send("Error while deleting : "+err);
                res.end();
            }
            res.send("Deleted");
        });
    });
});

//Created the node server adn listing at port 3001 
app.listen("3001", () => {
    console.log("localhost:3001");
});