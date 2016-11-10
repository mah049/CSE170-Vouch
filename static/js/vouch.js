$("#checkAll").click(function () {
    $(".check").prop('checked', $(this).prop('checked'));
});

$('#mostPopular').click(function() {
  if($('#mostPopular').is(':checked')) {    
    $.get("/mostPopular", reRender) 
  }
});

function mostPopular(result) {
  var jsonfile = result;
  var list = jsonfile.deal;
  $("#deal-container").empty();
  for (var i = 0; i < list.length; i++) {
    var location = list[i].Place;
    var deal = list[i].Deal;
    var upvote = list[i].Upvote;
    $("#deal-container").append(
  	"<a href = \""+location+"\"> <p id=\"newDeals\">"+location+" is the place <br>"+deal+" is the deal <br>"+upvote+" is the upvote </p> </a>"); 
  }
}

$('#mostRecent').click(function() {
  if($('#mostRecent').is(':checked')) {
    $.get("/mostRecent", reRender)
  }
});

function reRender(result) {
  var jsonfile = result;
  var list = jsonfile.deal;
  $("#deal-container").empty();
  for (var i=0; i<list.length; i++) {
    $("#deal-container").append(
      "<a href = \""+list[i].Place+"\"> <p id=\"newDeals\">"+list[i].Place+" is the place <br>"+list[i].Deal+" is the deal <br>"+list[i].Upvote+" is the upvote </p> </a>");
  }
}