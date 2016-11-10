// Get all of our friend data
var data = require('../../data.json');
var test = require('../../test.json');
var mostRecentFilter = clone(data);
var mostRecentCategory = clone(data);

exports.getDeals = function(req, res) {
  res.render('index.handlebars',data);
}

exports.view = function(req, res) {
  res.render('index.handlebars', data );
}

exports.categories = function(req, res) {
  res.json(mostRecentFilter);
}

exports.restaurants = function(req, res) {
  console.log("wtf");
  mostRecentCategory = clone(mostRecentFilter);
  var list = mostRecentCategory.deal;
  for(var i=0; i<list.length; i++) {
    if(mostRecentCategory.deal[i].Category!="Restaurants") {
      delete mostRecentCategory.deal[i];
      console.log("deleted some shit\n");
    }
  }
  console.log("\n" + JSON.stringify(data) + "\n");
  res.json(mostRecentCategory);
}

exports.events = function(req, res) {

}

exports.groceries = function(req, res) {

}

exports.mostPopular = function(req, res) {  
  var manipulate = data;
  var sortByUpvote = manipulate.deal.sort(function(a, b) {
    return parseFloat(b.Upvote) - parseFloat(a.Upvote);
  });
  var convertToString = JSON.stringify(sortByUpvote);
  var convertToJSON = "{ \"deal\":"+convertToString+"}";
  var ret = JSON.parse(convertToJSON);
  mostRecentFilter = ret;
  res.json(ret);
}

exports.mostRecent = function(req, res) {
  var manipulate = data;
  var sortByTimestamp = manipulate.deal.sort(function(a, b) {
    return parseFloat(b.Timestamp) - parseFloat(a.Timestamp);
  });
  var convertToString = JSON.stringify(sortByTimestamp);
  var convertToJSON = "{ \"deal\":"+convertToString+"}";
  var ret = JSON.parse(convertToJSON);
  mostRecentFilter = ret;
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

exports.dealView = function(req,res) {  
  var place = req.params.places;
  for(var i = 0; i<data.deal.length; i++){
    if(data.deal[i].Place==place){
        res.render('dealViews.handlebars', data.deal[i]);
    }
  }
}

function clone(obj) {
    var copy;

    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}
