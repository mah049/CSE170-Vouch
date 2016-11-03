// Get all of our friend data
var data = require('../../data.json');

exports.getDeals = function(req,res){

}

exports.view = function(req, res){
  res.render('index.handlebars', {'deal' : [{'name':'Mc','deal':'20dollars'},{'name':'Mc','deal':'20dollars'}]});
};