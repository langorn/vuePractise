var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var app = express();
var router = express.Router();
var cors = require('cors');

//==== local setup
var config = require('./app/config');
var User = require('./app/models/User');
// var Post = require('./app/models/post');

var port = 3000;



app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
mongoose.connect(config.database, { useNewUrlParser: true });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback){
	console.log("Connection Success");
})

app.set('secretKey', config.secret);
app.use(cors());

app.get('/users',function(req,res){
    User.find({},function(err, users){
    	console.log('yyyyy')
        res.json({'success':true, data:users});
    })
})
// var Todo = require('./models/todo');

app.use('/api', router);


//token verification
router.use(function(req, res, next){
	//get token
	console.log(req);
	var token = req.body.token || req.query.token || req.headers['authorization'];
	//decode token
	if (token) {
		jwt.verify(token, app.get('secretKey'), function(err, decode){
			if (err) {
				return res.json({
					success: false,
					message: 'There was a problem during verification'
				})
			} else {
				req.decode = decode;
				if (decode.exp <= Date.now() / 1000) {
					return res.status(400).send({status: false, message: 'Token has expired'})
				}
				console.log(req.decode, 'success');
				next();
			}
		})
	} else if (req.url =='/login') {
		next();


	} else {
		return res.status(403).send({
			status: false,
			message: 'Token not available'
		})
	}
})

router.post('/login', function( req, res ) {
	console.log(req.body.email);
// 	var newUser = new User({email:'xxx@gmail.com', password:'111'})
// 	newUser.save(function (err) {
//   if (err) return handleError(err);
//   // saved!
// });
	User.findOne({
		email: req.body.email
	}, function (err, user){
		if (err) throw err;
		console.log(err, user)
		if (!user) {
			res.json({
				success: false,
				message: 'User not found'
			})
		} else {
			if ( user.password != req.body.password ) {
				res.json({
					success: false,
					message: 'Wrong password'
				})
			} else {
				var token = jwt.sign(user.toJSON(), app.get('secretKey'), {
					expiresIn: "24h"
				});
				console.log(token)
				res.json({
					success: true,
					message: 'Token has been created',
					token: token
				})
			}
		}
	})

})
router.get('/users', function( req, res ) {
	console.log('users ....')
    User.find({},function(err, users){
    	console.log(users);
    	console.log('xxxxx')
        res.json({success:true, data:users});
    })
})

app.listen(port);