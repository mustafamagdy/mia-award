$(document).ready(() => {
  $("#months").change(function () {
    //alert("here");
    var today = new Date()
    var daysOfMonth = new Date(today.getFullYear(), parseInt($("#months").val()), 0).getDate();
    var $dropdown = $("#days");
    $dropdown.empty();
    for (var i = 1; i <= parseInt(daysOfMonth); i++) {
      $dropdown.append($("<option />").val(i).text(i));
    }
  });

})
