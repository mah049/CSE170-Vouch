// Get all of our friend data
var data = require('../../data.json');
var test = require('../../test.json');

exports.getDeals = function(req,res){
  res.render('index.handlebars',data);
}

exports.view = function(req, res){
  res.render('index.handlebars', data );
}

exports.mostPopular = function(req,res){  
  var manipulate = data;
  var sortByUpvote = manipulate.deal.sort(function(a, b) {
    return parseFloat(b.Upvote) - parseFloat(a.Upvote);
  });
  var convertToString = JSON.stringify(sortByUpvote);
  console.log(convertToString);
  var convertToJSON = "{ \"deal\":"+convertToString+"}";
  var yes = JSON.stringify(convertToJSON);
  console.log(yes);
  var ret = JSON.parse(convertToJSON);
  console.log(typeof ret);
  res.json(ret);
}

exports.dealView = function(req,res){  
  
  var place = req.params.places;
  for(var i = 0; i<data.deal.length;i++){
    if(data.deal[i].Place==place){
        res.render('dealViews.handlebars',data.deal[i]);
    }
  }
}
