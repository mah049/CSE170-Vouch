$("#checkAll").click(function () {
    $(".check").prop('checked', $(this).prop('checked'));
});

$('#mostPopular').click(function() {
   if($('#mostPopular').is(':checked')) {    
     $.get("/mostPopular", mostPopular) 
     //console.log("Most Popular selected");
     //window.location.href = "https://cse170vouch-prod.herokuapp.com/mostPopular";
   }
});

function mostPopular(result){
  //res.render('index.handlebars',result);
  var jsonfile = result;
  var list = jsonfile.deal;
  $("#deal-container").empty();
  for(var i = 0 ; i < list.length ; i++ ){
    var location = list[i].Place;
    var deal = list[i].Deal;
    var upvote = list[i].Upvote;
    $("#deal-container").append(
  	"<a href = \"dealView.html\" > <p id=\"newDeals\">"+ location + " is the place <br>"+ deal+ " is the deal <br>"+upvote+" is the upvote </p> </a>"); 
  }
}