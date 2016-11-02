$(document).ready(function(){
  console.log('JavaScript loaded.')
  var boardStatus = [];
  var turn = Math.round(Math.random())+1; //1 = hillary 2 = trump
  var switcher = function() {
    if (turn === 1) {
      turn = 2;
    } else {
      turn = 1;
    }
    $('figure#mouse-pointer').css(cssA(turn));
  }
  var cssA = function(x) {
    switch(x) {
      case 1:
        return {
          'background-image' : 'url("images/hillary-piece.gif")',
          'border' : '4px solid #d84545'
        }
        break;
      case 2:
        return {
          'background-image' : 'url("images/trump-piece.gif")',
          'border' : '4px solid #295fbc'
        }
        break;
    }
  }


  var makeBoard = function() {
    var $block = $('<div class="block"></div>');

    for (var i = 0; i < 7; i++) {
      var $picker = $('<div class="picker"></div>');
      $picker
      .attr('data-column',i)
      .click(function(){
        var c = $(this).attr('data-column');
        for (var r = 5; r >= 0; r--) {
          if (boardStatus[r][c] === 0) {
            boardStatus[r][c] = turn;
            blockUpdate(r,c,turn);
            switcher();
            break;
          }
        }
      })
      $('#board').append($picker)
    }

    for (var r = 0; r < 6; r++) {
      boardStatus.push([]);
      for (var c = 0; c < 7; c++) {
        boardStatus[r].push(0)
        var $block = $('<div class="block"></div>');
        $block
          .attr('data-column',c)
          .attr('data-row',r)
        $('#board').append($block)
      }
    }
    switcher();
  }

  $(function (){
    $('.picker')
      .mousemove(function(event) {
          $('figure#mouse-pointer')
          .css({
              'top' : event.pageY - 15 + 'px',
              'left' : event.pageX + 'px'
          });
      })
      // Adapted from: http://creative-punch.net/2014/01/custom-cursors-css-jquery/
      .mouseenter(function() {
        $('figure#mouse-pointer').show();
      })
      .mouseleave(function() {
        $('figure#mouse-pointer').hide();
      });
  });

  var blockUpdate = function(row,col,person) {
    var $block = $('div[class="block"][data-row="'+row+'"][data-column="'+col+'"]')
    var $piece = $('<figure id="piece"></figure>')
    $piece.css(cssA(person))

    $block.append($piece)
  }

  makeBoard();
})
