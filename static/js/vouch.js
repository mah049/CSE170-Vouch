$("#checkAll").click(function () {
    $(".check").prop('checked', $(this).prop('checked'));
});

$('#mostPopular').click(function() {
   if($('#mostPopular').is(':checked')) {    
     //$.get("/mostPopular",mostPopular) 
     //console.log("Most Popular selected");
     window.location.href = "https://cse170vouch-prod.herokuapp.com/mostPopular";
   }
});

function mostPopular(result){
  res.render('index.handlebars',result);
}