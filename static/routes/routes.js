// Get all of our friend data
var data = require('../../data.json');

console.log(data);
exports.getDeals = function(req,res){
  res.render('index.handlebars',{'test' : 'yoyo'})
}

exports.view = function(req, res){
  res.render('index.handlebars', {'deal' : {'place' :'hi'}});
  //res.render('index.handlebars', data );
}

//[{'Place':'hi','Deal':'lol'},
//	{'Place':'bye','Deal':'haha'}]}