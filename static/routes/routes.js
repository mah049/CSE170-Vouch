// Get all of our friend data
var data = require('../../data.json');
var test = require('../../test.json');

exports.getDeals = function(req, res) {
  res.render('index.handlebars',data);
}

exports.view = function(req, res) {
  res.render('index.handlebars', data );
}

exports.mostPopular = function(req, res) {  
  var manipulate = data;
  console.log("\n"+manipulate+"\n");
  var sortByUpvote = manipulate.deal.sort(function(a, b) {
    return parseFloat(b.Upvote) - parseFloat(a.Upvote);
  });
  console.log(sortByUpvote);
  var convertToString = JSON.stringify(sortByUpvote);
  console.log(convertToString);
  var convertToJSON = "{ \"deal\":"+convertToString+"}";
  var ret = JSON.parse(convertToJSON);
  console.log(typeof ret);
  res.json(ret);
}

exports.upVote = function(req,res) {
  var place = req.params.places;
  for(var i = 0; i<data.deal.length; i++){
    if(data.deal[i].Place==place){
       data.deal[i].Upvote+=1;
    }   
  }
  res.redirect('/');
}

exports.downVote = function(req,res) {
  var place = req.params.places;
  for(var i = 0; i<data.deal.length; i++){
    if(data.deal[i].Place==place){
      data.deal[i].Upvote-=1;
    }
  }
  res.redirect('/');
}

exports.mostRecent = function(req, res) {
  var manipulate = data;
  var sortByTimestamp = manipulate.deal.sort(function(a, b) {
    return parseFloat(b.Timestamp) - parseFloat(a.Timestamp);
  });
  var convertToString = JSON.stringify(sortByTimestamp);
  console.log(convertToString);
  var convertToJSON = "{ \"deal\":"+convertToString+"}";
  console.log(convertToJSON);
  res.json(JSON.parse(convertToJSON));
}

exports.dealView = function(req,res) {  
  var place = req.params.places;
  for(var i = 0; i<data.deal.length; i++){
    if(data.deal[i].Place==place){
        res.render('dealViews.handlebars', data.deal[i]);
    }
  }
}
