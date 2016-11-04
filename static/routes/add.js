var data = require('../../data.json');

exports.addNew = function(req, res) {
	var newDeal = {
		"Place": req.query.venue,
		"Deal": req.query.deal,
		"Upvote": 0
	}
	data.deal.push(newDeal);
	res.render('index.handlebars', data);
}