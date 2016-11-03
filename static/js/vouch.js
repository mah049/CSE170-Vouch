var	vouch_funcs = require('../routes/routes.js');

window.onload=function() { 
   alert ('hello world');
   vouch_funcs.view();
};

$("#checkAll").click(function () {
    $(".check").prop('checked', $(this).prop('checked'));
});