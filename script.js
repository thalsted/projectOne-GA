$(document).ready(function(){
  console.log('JavaScript loaded.')
  var boardStatus = [];
  var p1 = ''
  var p2 = ''
  var turn = Math.round(Math.random())+1; //1 = hillary 2 = trump
  var switcher = function() {
    $('.sidebar').removeAttr('style');
    switch(turn) {
      case 1:
        turn = 2;
        showMsg(p2+" Trump's turn!",3);
        setTimeout(function(){dance($('#trump-sidebar'))},250);
        break;
      case 2:
        turn = 1;
        showMsg(p1+" Clinton's turn!",3);
        setTimeout(function(){dance($('#hillary-sidebar'))},250);
        break;
    }
    $('figure#mouse-pointer').css(cssA(turn));
  }
  var cssA = function(x) {
    switch(x) {
      case 1:
        return {
          'background-image' : 'url("images/hillary-piece.gif")',
          'background-color' : 'rgba(41,95,188,0.6)',
          'border' : '3px solid #295fbc'
        }
        break;
      case 2:
        return {
          'background-image' : 'url("images/trump-piece.gif")',
          'background-color' : 'rgba(216,69,69,0.6)',
          'border' : '3px solid #d84545'
        }
        break;
    }
  }
  var blockUpdate = function(row,col,person) {
    var $block = $('div[class="block"][data-row="'+row+'"][data-column="'+col+'"]')
    var $piece = $('<figure id="piece"></figure>')
    $piece.css(cssA(person))
    $block.append($piece)
  }
  var winCheck = function() {
    var testHor =function(x) {
      for (var i = 0; i<6; i++) {
        for (var j = 0; j<4; j++) {
          if(x[i][j] === x[i][j+1] &&
            x[i][j+1] === x[i][j+2] &&
            x[i][j+2] === x[i][j+3] &&
            x[i][j] != 0) {
            return true;
          }
        }
      }
      return false;
    }
    var testVert =function(x) {
      for (var i = 0; i<7; i++) {
        for (var j = 0; j<3; j++) {
          if(x[j][i] === x[j+1][i] &&
            x[j+1][i] === x[j+2][i] &&
            x[j+2][i] === x[j+3][i] &&
            x[j][i] != 0) {
            return true;
          }
        }
      }
      return false;
    }
    var testDiag1 =function(x) {
      for (var i = 0; i<3; i++) {
        for (var j = 0; j<4; j++) {
          if(x[i][j] === x[i+1][j+1] &&
            x[i+1][j+1] === x[i+2][j+2] &&
            x[i+2][j+2] === x[i+3][j+3] &&
            x[i][j] != 0) {
            return true;
          }
        }
      }
      return false;
    }
    var testDiag2 =function(x) {
      for (var i = 0; i<3; i++) {
        for (var j = 6; j>=3; j--) {
          if(x[i][j] === x[i+1][j-1] &&
            x[i+1][j-1] === x[i+2][j-2] &&
            x[i+2][j-2] === x[i+3][j-3] &&
            x[i][j] != 0) {
            return true;
          }
        }
      }
      return false;
    }
    if (testHor(boardStatus) || testVert(boardStatus) || testDiag1(boardStatus) || testDiag2(boardStatus)) {
      // INSERT WIN FUNCTIONALITY (Pass in 'turn' for the winner)
      setTimeout(function(){
        $('figure#mouse-pointer').remove();
        switch(turn) {
          case 1:
            showMsg(p1+" Clinton wins!",2);
            break;
          case 2:
            showMsg(p2+" Trump wins!",2);
            break;
        }
        setTimeout(function(){showMsg("Do you want to play again?")},3000);
      },250)
    } else {
      switcher();
    }
  }
  var showMsg = function(x,t) {
    $('div#msg').hide();
    $('div#msg').text(x);
    $('div#msg').fadeIn(400);
    if (t != undefined) {
    setTimeout(function(){$('div#msg').fadeOut(400)},t*1000)
    } else {
      $('div#msg')
       .attr('style','cursor: pointer; animation: glimmer 1s linear infinite;')
       .click(function(){
        $('body')
         .fadeOut(400)
         window.location.reload();
      })
    }
  }
  var dance = function(x,t) {
    x.attr('style','animation: wobble 1s linear infinite')
    if (t != undefined) {
    setTimeout(function(){x.removeAttr('style')},t*1000)
    }
  }
  var gameStart = function() {
    dance($('.sidebar'));
    setTimeout(function(){
    p1 = prompt("Player 1, what's your name?");
    p2 = prompt("Player 2, what's your name?");
    if (p1 === null) {p1 = ''};
    if (p2 === null) {p2 = ''};
    switcher();
    },100);
  }
  var makeBoard = function() {
    var $block = $('<div class="block"></div>');

    for (var i = 0; i < 7; i++) {
      var $picker = $('<div class="picker"></div>');
      $picker
      .attr('data-column',i)
      .attr('style','animation: select 1s linear infinite')
      .click(function(){
        var c = $(this).attr('data-column');
        for (var r = 5; r >= 0; r--) {
          if (boardStatus[r][c] === 0) {
            boardStatus[r][c] = turn;
            blockUpdate(r,c,turn);
            winCheck();
            break;
          }
        }
      })
      .mousemove(function(event) {
          $('figure#mouse-pointer')
          .css({
              'top' : event.pageY + -25 + 'px',
              'left' : event.pageX + -25 + 'px'
          });
      })
      // Adapted from: http://creative-punch.net/2014/01/custom-cursors-css-jquery/
      .mouseenter(function() {
        $('.picker').removeAttr('style');
        $('figure#mouse-pointer').show();
      })
      .mouseleave(function() {
        $('figure#mouse-pointer').hide();
      });
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
    gameStart();
  }
  makeBoard();
})
