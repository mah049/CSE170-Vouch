$('#checkAll').click(function () {
  $('.check').prop('checked', $(this).prop('checked'));
});

$(document).ready(function (e) {
  $('.check').click(function (e) {
    $("#categories").submit();
  });
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

 $('#search').keyup(function(){
            var searchField = $('#search').val();
            var regex = new RegExp(searchField, "i");
            var output = '<div class="row">';
            var count = 1;
            if($('#search').val().length > 0){
            $.getJSON('/searchJson', function(data) {
              $.each(data, function(key, val){
                if ((val.Place.search(regex) != -1) || (val.Category.search(regex) != -1)) {
                  output += '<div class="col-md-6 well">';
                  output += '<div class="col-md-3"></div>';
                  output += '<div class="col-md-7">';
                  output += '<h5 align=\"middle\"><a href=\"dealView/'+ val.ID + '">'+val.Place+'</a></h5>';
                  output += '<h5 align="middle">'+ val.Upvote + ' vouches</h5>'
                  output += '</div>';
                  output += '</div>';
                  if(count%2 == 0){
                    output += '</div><div class="row">'
                  }
                  count++;
                }
              });
              output += '</div>';
              $('#update').html(output);
            });
          }
            console.log($("#search").val().length);
            if($('#search').val().length == 0){
              console.log("hello");
              $("#update").empty();
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
      "<a href = \"dealView/"+list[i].ID+"\"> <div class=\"well\"> <p id=\"newDeals\">"+list[i].Place+"<br>"+list[i].Deal+"<br>"+list[i].Upvote+" Vouches</p> </div> </a>");
  }
}
