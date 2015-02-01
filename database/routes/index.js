var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Chorq' });
});

router.get('/addsong', function(req, res) {
    res.render('addsong', { title: 'Add Song' });
});

router.get('/songlist', function(req, res){
	var db = req.db;
	var collection = db.get('usercollection');
	collection.find({}, {}, function(e, docs){
		res.render('songlist',{
			"songlist" :docs
		});
	});
});

router.post('/addsong', function(req, res){
	var db = req.db;

	//get form values
	var title = req.body.sheetTitle;
	var artist = req.body.sheetArtist;

	var collection = db.get('usercollection');

	//insert into db
	collection.insert({
		"sheetTitle": title,
		"sheetArtist": artist
	}, function(err, doc){
		if(err){
			res.send("Good job. You fucked up somehow.");
		} else{
			res.location("songlist");
			res.redirect("songlist");
		}
	});
});

module.exports = router;