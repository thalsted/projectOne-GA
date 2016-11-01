$(document).ready(function(){
  console.log('JavaScript loaded.')

  var makeBoard = function() {
    var $block = $('<div class="block"></div>');

    for (var i = 0; i < 7; i++) {
      var $picker = $('<div class="picker"></div>');
      $picker.attr('data-column',i)
      $('#board').append($picker)
    }

    for (var r = 0; r < 6; r++) {
      for (var c = 0; c < 7; c++) {
        var $block = $('<div class="block"></div>');
        $block
          .attr('data-column',c)
          .attr('data-row',r)
        $('#board').append($block)
      }
    }
  }


  makeBoard();
})
