var data = require('../../data.json');

exports.addNew = function(req, res) {
	var timeAdded = new Date();
	var newDeal = {
		"Place": req.query.venue,
		"Deal": req.query.deal,
		"Upvote": 0,
		"Timestamp": timeAdded
	}
	console.log(newDeal);
	data.deal.push(newDeal);
	res.render('index.handlebars', data);
}