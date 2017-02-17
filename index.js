  ////////////////////////////\\\\\\\\\\\\\\\\\\\\\
 ////////VARIABLES///////////\\\\\\\\\\\\\\\\\\\\\\\
////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\

var express = require("express");

var app = express();
var messages = [];
var allMessages = [];

  ///////////////////////////\\\\\\\\\\\\\\\\\
 ////////REQ.BODY///////////\\\\\\\\\\\\\\\\\\\
///////////////////////////\\\\\\\\\\\\\\\\\\\\\

var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

  ///////////////////////////\\\\\\\\\\\\\\\\\
 //////SET TO INDEX/////////\\\\\\\\\\\\\\\\\\\
///////////////////////////\\\\\\\\\\\\\\\\\\\\\

app.get("/", function (req, res) {
	res.sendFile(__dirname + "/index.html");
});

  ///////////////////////////\\\\\\\\\\\\\\\\\
 ////////CHAT INFO//////////\\\\\\\\\\\\\\\\\\\
///////////////////////////\\\\\\\\\\\\\\\\\\\\\


app.get("/chat", function (req, res) {
	res.send(JSON.stringify(messages));
});

//post /chat
app.post("/chat", function (req, res) {
	// see above for body-parser
	if (req.body.message) {
		messages.push(req.body.message);
		res.send("success");
	} else {
		res.send("error");
	}
});


  //////////////////////////\\\\\\\\\\\\\\\\\
 ////////USER INFO/////////\\\\\\\\\\\\\\\\\\\
//////////////////////////\\\\\\\\\\\\\\\\\\\\\

app.get('/person/:name', function(req, res){
	var namey  = req.params.name;
	var dumbArr = [];
	for (var i = 0; i < messages.length; i++){
		if (messages[i].name === namey){
			dumbArr.push(messages[i].msg)
		}
	}
	res.send(JSON.stringify(dumbArr));
		
	
});

  ///////////////////////////\\\\\\\\\\\\\\\\\\\\\\
 //////SERVER INFO//////////\\\\\\\\\\\\\\\\\\\\\\\\
///////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\

app.use(function (req, res, next) {
	res.status(404);
	res.send("404 File Not Found");
});

app.use(function (err, req, res, next) {
	console.log(err);
	res.status(500);
	res.send("500 Internal Server Error");
});

app.listen(8080, function () {
	console.log("Server started!");
});

