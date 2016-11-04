$("#checkAll").click(function () {
    $(".check").prop('checked', $(this).prop('checked'));
});

$('#mostPopular').click(function() {
   if($('#mostPopular').is(':checked')) {    
     $.get("/mostPopular",mostPopular) 
     console.log("Most Popular selected");
   }
});

function mostPopular(result){
  res.render('index.handlebars',result);
}