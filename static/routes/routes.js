// Get all of our friend data
var data = require('../../data.json');
var test = require('../../test.json');
var categorized = clone(data);

exports.getDeals = function(req, res) {
  res.render('index.handlebars', data);
}

exports.view = function(req, res) {
  var temp = data;
  if (data.isCategorized) {
    temp = categorized;
  }
  res.render('index.handlebars', temp);
}

exports.view_test = function(req, res) {
  var temp = data;
  if (data.isCategorized) {
    temp = categorized;
  }
  res.render('index_test.handlebars', temp);
}

exports.categories = function(req, res) {
  data.isCategorized = false;
  var all = false, rest = false; events = false, groc = false;
  if (req.query.all=="on") {
    data.all = "checked";
    all = true;
    data.isCategorized = true;
  } else {
    data.all = "";
  }
  if (req.query.restaurants=="on") {
    data.restaurants = "checked";
    rest = true;
    data.isCategorized = true;
  } else {
    data.restaurants = "";
  }
  if (req.query.events=="on") {
    data.events = "checked";
    events = true;
    data.isCategorized = true;
  } else {
    data.events = "";
  }
  if (req.query.groceries=="on") {
    data.groceries = "checked";
    groc = true;
    data.isCategorized = true;
  } else {
    data.groceries = "";
  }
  
  categorized = clone(data);
  var list = categorized.deal;
  var i = list.length;
  while (i--) {
    if (all) continue;
    if (!all && !rest && !events && !groc) continue;
    if ((list[i].Category=="Restaurants" && rest) ||
        (list[i].Category=="Events" && events) ||
        (list[i].Category=="Groceries" && groc)) {
      continue;
    }
    list.splice(i,1);
  }
  res.render('index.handlebars', categorized);
}

exports.searchJson = function(req,res) {
  var manipulate = data.deal;
  console.log(manipulate);
  res.json(manipulate);
}

exports.mostPopular = function(req, res) {
  data.mostPopular = "checked";
  categorized.mostPopular = "checked";
  data.mostRecent = "";
  categorized.mostRecent = "";
  data.leastDistance = "";  
  categorized.leastDistance = "";
  var manipulate = data;
  var retCategorized;
  if (data.isCategorized) {
    var sortByUpvote = categorized.deal.sort(function(a, b) {
      return parseFloat(b.Upvote) - parseFloat(a.Upvote);
    });
    var convertToString = JSON.stringify(sortByUpvote);
    var convertToJSON = "{ \"deal\":"+convertToString+"}";
    retCategorized = JSON.parse(convertToJSON);
  }
  var sortByUpvote = manipulate.deal.sort(function(a, b) {
    return parseFloat(b.Upvote) - parseFloat(a.Upvote);
  });
  var convertToString = JSON.stringify(sortByUpvote);
  var convertToJSON = "{ \"deal\":"+convertToString+"}";
  var ret = JSON.parse(convertToJSON);
  if (data.isCategorized)
    res.json(retCategorized);
  else
    res.json(ret);
}

exports.mostRecent = function(req, res) {
  data.mostPopular = "";
  categorized.mostPopular = "";
  data.mostRecent = "checked";
  categorized.mostRecent = "checked";
  data.leastDistance = "";
  categorized.leastDistance = "";
  var manipulate = data;
  var retCategorized;
  if (data.isCategorized) {
    var sortByTimestamp = categorized.deal.sort(function(a, b) {
      return parseFloat(b.Timestamp) - parseFloat(a.Timestamp);
    });
    var convertToString = JSON.stringify(sortByTimestamp);
    var convertToJSON = "{ \"deal\":"+convertToString+"}";
    retCategorized = JSON.parse(convertToJSON);
  }
  var sortByTimestamp = manipulate.deal.sort(function(a, b) {
    return parseFloat(b.Timestamp) - parseFloat(a.Timestamp);
  });
  var convertToString = JSON.stringify(sortByTimestamp);
  var convertToJSON = "{ \"deal\":"+convertToString+"}";
  var ret = JSON.parse(convertToJSON);
  if (data.isCategorized)
    res.json(retCategorized);
  else
    res.json(ret);
}

exports.upVote = function(req,res) {
  var place = req.params.places;
  for(var i=0; i<categorized.deal.length; i++) {
    if(categorized.deal[i].Place==place) {
      categorized.deal[i].Upvote+=1;
    }
  }
  for(var i=0; i<data.deal.length; i++){
    if(data.deal[i].Place==place){
       data.deal[i].Upvote+=1;
    }   
  }
  res.redirect('/');
}

exports.downVote = function(req,res) {
  var place = req.params.places;
  for(var i=0; i<categorized.deal.length; i++) {
    if(categorized.deal[i].Place==place) {
      categorized.deal[i].Upvote-=1;
    }
  }
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

exports.login = function(req,res) {
  for(var i = 0; i<data.login.length; i++){
    if(data.login[i].username==req.query.username
      &&data.login[i].password==req.query.password){
      console.log("Login successful");
      data.currentUsername=req.query.username;
      data.loggedIn=true;
      res.render('index.handlebars',data);
      return;
    }
  }
  res.redirect('/failedLogin');   
}

exports.signOut = function(req,res) {
  data.loggedIn=false;
  res.redirect('/');
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
