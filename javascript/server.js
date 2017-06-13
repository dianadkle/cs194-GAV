const express = require('express');
const app = express()
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;


var db;

MongoClient.connect('mongodb://cs194:dijkstras1@ds123752.mlab.com:23752/users', (err, database) => {
    if (err) return console.log(err);
    db = database;
    app.listen(3000, () => {
   	 	console.log('listening on 3000');
    })
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:8080');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)

    // Pass to next layer of middleware
    next();
});

app.get('/', (req, res) => {
	db.collection('users').find().toArray((err, result) => {
		if (err) return console.log(err);
		res.send(result);
	})
})

app.post('/', (req, res) => {
	console.log('hit');
	console.log(req.body);
	db.collection('users').save(req.body, (err, result) => {
		if (err) return console.log(err);
		console.log("saved to database");
		res.send(result);
	})
}) 

app.put('/', (req, res) => {
	console.log('hello');
	console.log(req.body);
	db.collection('users').findOneAndUpdate({name: req.body.username}, {
		$set: {
			firstname: req.body.firstname,
			password: req.body.password,
			graphs: req.body.graphs,
			achievements: req.body.achievements
		}
	}, {
			sort: {_id: -1},
			upsert:true
		}, (err, result) => {
			if (err) return res.send(err);
			res.send(result);
		})
	})

