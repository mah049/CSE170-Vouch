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
  
  //console.log(manipulate);
  //console.log(manipulate.deal);
  //console.log(manipulate.deal[0]);
  //var listLength = manipulate.deal.length;
  //console.log(listLength);
  //var newList = [];
  //for(var i = 0 ; i < listLength ; i++){
  //	newList.push(manipulate.deal[i].Upvote);
  //}
  //newList.sort();

  var asdfjkl = manipulate.deal.sort(function(a, b) {
    return parseFloat(b.Upvote) - parseFloat(a.Upvote);
  });
  var hi = JSON.stringify(asdfjkl);
  console.log(hi);
  var please = "{ \"deal\":"+hi+"}";
  var yes = JSON.stringify(please);
  console.log(yes);
  var ret = JSON.parse(please);
  console.log(typeof ret);
  res.render('index.handlebars', ret);


/*  var newJSON;
  var retList=[];
  console.log(newList);
  for(var i = 0 ; i < newList.length ; i++ ){
    for(var x = 0; x < newList.length; x++){
    if(manipulate.deal[x].Upvote==newList[i]&&i==newList.length-1){
      retList.push("{ Place: '"+manipulate.deal[x].Place+"', Deal: '"
      +manipulate.deal[x].Deal+"', Upvote: "+manipulate.deal[x].Upvote+" },");
    }
    /*else{
      newJSON += "{ Place: '"+manipulate.deal[x].Place+"', Deal: '"
      +manipulate.deal[x].Deal+"', Upvote: "+manipulate.deal[x].Upvote+" }";
    }*/
  //  } 
 // }
  /*newJSON = "{ deal:"+retList+"}";
  console.log(newJSON);
  var jsonObj = new JSONObject(newJSON);
  res.render('index',jsonObj)*/
  //var dataList = JSON.parse(manipulate);
  //console.log(dataList.count);
  //var result = dataList[0];
  //console.log(result);
  //res.json(data);
}
