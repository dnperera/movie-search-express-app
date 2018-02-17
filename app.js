let express = require('express');
let request = require('request');
let bodyParser = require('body-parser')
//create server
let app = express();
let port = process.env.PORT || 3000;
let ip = process.env.IP || '127.0.0.1';

//Set the static assests
app.use(express.static("public"));

//parse the request
app.use(bodyParser.urlencoded({extended:false}))

//set the View Engine
app.set("view engine","ejs");

app.get('/',function(req,res){
	res.render('search-movie',{movies:[]});
});

app.get('/search',function(req,res){
	let url = `http://www.omdbapi.com/?s=${req.query.title}&apikey=thewdb`;
	//make the search request
	request(url,
		function(error,response,body){
			if(!error && response.statusCode ===200){
				let movieList = JSON.parse(body)['Search'];
				res.render('search-movie',{movies:movieList});
			}else {
				res.render('search-movie',{movies:[]});
				console.log(error);
			}
		})
});

//Start Server
app.listen(port,ip,function(){
	console.log(`Server is listening  on Port ${port} & IP ${ip} `);
})