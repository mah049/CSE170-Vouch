$('#checkAll').click(function () {
  $('.check').prop('checked', $(this).prop('checked'));
});

$('.check').click(function () {
  var rest = false, events = false, groc = false;
  if($('#restaurants').is(':checked')) {
    rest = true;
  } 
  if($('#events').is(':checked')) {
    events = true;
  }
  if($('#groceries').is(':checked')) {
    groc = true;
  }

  
});

$('#mostPopular').click(function() {
  if($('#mostPopular').is(':checked')) {    
    $.get("/mostPopular", reRender) 
  }
});

$('#mostRecent').click(function() {
  if($('#mostRecent').is(':checked')) {
    $.get("/mostRecent", reRender)
  }
});

function reRender(result) {
  console.log(result);
  var jsonfile = result;
  var list = jsonfile.deal;
  $("#deal-container").empty();
  for (var i=0; i<list.length; i++) {
    if (list[i]==null) continue;
    $("#deal-container").append(
      "<a href = \"dealView/"+list[i].Place+"\"> <div class=\"well\"> <p id=\"newDeals\">"+list[i].Place+" is the place <br>"+list[i].Deal+" is the deal <br>"+list[i].Upvote+" is the number of upvotes </p> </div> </a>");
  }
}