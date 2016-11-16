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
      case 3:
        return {
          'background-image' : 'url("images/harambe-piece.gif")',
          'background-color' : 'rgba(50, 150, 45,0.6)',
          'border' : '3px solid #32962d'
        }
        break;
    }
  }
  var flash = function(x) {
    for (var i = 0; i<25; i+=2) {
      setTimeout(function(){$('html').attr('style','background: '+x)},i*50)
      setTimeout(function(){$('html').attr('style','background: white')},i*50+50)
    }
  }
  var randBetween = function(min,max) {
    var ans = Math.floor(Math.random()*(max-min+1))+min;
    return ans;
  }
  var colSwitch = function() {
    var c1 = randBetween(0,6);
    var c2 = c1;
    while (c2 === c1) {
      c2 = randBetween(0,6);
    }
    for (var i = 0; i < 6; i++) {
      var holder = boardStatus[i][c1];
      boardStatus[i][c1] = boardStatus[i][c2];
      boardStatus[i][c2] = holder;
    }
    for (var i = 0; i < 6; i++) {
      var $block = $('div[data-row="'+i+'"][data-column="'+c1+'"]');
      $block.children('figure#piece').fadeOut("slow").remove();
      var $piece = $('<figure id="piece"></figure>');
      var pos = boardStatus[i][c1];
      if (pos > 0) {
        $piece.css(cssA(pos));
        $block.append($piece).children('figure#piece').fadeIn("slow");
      }
    }
    for (var i = 0; i < 6; i++) {
      var $block = $('div[data-row="'+i+'"][data-column="'+c2+'"]');
      $block.children('figure#piece').fadeOut("slow").remove();
      var $piece = $('<figure id="piece"></figure>');
      var pos = boardStatus[i][c2];
      if (pos > 0) {
        $piece.css(cssA(pos));
        $block.append($piece).children('figure#piece').fadeIn("slow");
      }
    }
  }
  var wildcard = function(x,y,r,c){
    if ($('figure#piece').length > 15) {
      var rand = Math.round(Math.random())
    } else {
      var rand = 0
    }
    switch(rand) {
      case 0:
        boardStatus[r][c] = 3;
        x.css(cssA(3));
        y.append(x).children('figure#piece').fadeIn("slow");
        alert('Harambe surges in the polls!');
        flash('#32962d');
        break;
      case 1:
        boardStatus[r][c] = turn;
        x.css(cssA(turn));
        y.append(x).children('figure#piece').fadeIn("slow");
        colSwitch();
        alert('FBI investigation! Pieces fly everywhere!');
        flash('#5e646d');
        break;
    }
  }
  var blockUpdate = function(row,col) {
    var $block = $('div[data-row="'+row+'"][data-column="'+col+'"]')
    var $piece = $('<figure id="piece"></figure>')
    if (Math.random() > 0.15) {
      boardStatus[row][col] = turn;
      $piece.css(cssA(turn));
      $block.append($piece).children('figure#piece').fadeIn("slow");
    } else {
      wildcard($piece,$block,row,col);
    }
  }
  var drawCheck = function() {
    var ans = 0;
    for (var i = 0; i < boardStatus.length; i++) {
      if (boardStatus[i].indexOf(0) != -1) {
        ans++;
      }
    }
    return ans === 0;
  }
  var winCheck = function() {
    var testHor =function(x) {
      for (var i = 0; i<6; i++) {
        for (var j = 0; j<4; j++) {
          if(x[i][j] === x[i][j+1] &&
            x[i][j+1] === x[i][j+2] &&
            x[i][j+2] === x[i][j+3] &&
            x[i][j] != 0) {
            return x[i][j];
          }
        }
      }
      return 0;
    }
    var testVert =function(x) {
      for (var i = 0; i<7; i++) {
        for (var j = 0; j<3; j++) {
          if(x[j][i] === x[j+1][i] &&
            x[j+1][i] === x[j+2][i] &&
            x[j+2][i] === x[j+3][i] &&
            x[j][i] != 0) {
            return x[i][j];
          }
        }
      }
      return 0;
    }
    var testDiag1 =function(x) {
      for (var i = 0; i<3; i++) {
        for (var j = 0; j<4; j++) {
          if(x[i][j] === x[i+1][j+1] &&
            x[i+1][j+1] === x[i+2][j+2] &&
            x[i+2][j+2] === x[i+3][j+3] &&
            x[i][j] != 0) {
            return x[i][j];
          }
        }
      }
      return 0;
    }
    var testDiag2 =function(x) {
      for (var i = 0; i<3; i++) {
        for (var j = 6; j>=3; j--) {
          if(x[i][j] === x[i+1][j-1] &&
            x[i+1][j-1] === x[i+2][j-2] &&
            x[i+2][j-2] === x[i+3][j-3] &&
            x[i][j] != 0) {
            return x[i][j];
          }
        }
      }
      return 0;
    }
    var winner = (testHor(boardStatus) || testVert(boardStatus) || testDiag1(boardStatus) || testDiag2(boardStatus))
    if (winner > 0) {
      setTimeout(function(){
        $('figure#mouse-pointer').remove();
        switch(winner) {
          case 1:
            flash('#295fbc');
            alert(p1+" Clinton connects four! Everyone loses.");
            break;
          case 2:
            flash('#d84545');
            alert(p2+" Trump connects four! Everyone loses.");
            break;
          case 3:
            flash('#32962d');
            alert("HARAMBE WINS! AMERICA IS SAVED!");
            break;
        }
        setTimeout(function(){showMsg("Do you want to play again?")},5000);
      },250)
    } else if (drawCheck()) {
      alert("It's a draw! Mitt Romney and Bernie Sanders are elected the first joint-presidents of the United States!");
      window.location.reload();
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
  var emCheck = function(x,y) {
    if (x.toLowerCase() === "emily") {
      var ans = prompt("Wait, wait, wait... what's your last name?");
      if (ans.toLowerCase() === "siegel") {
        alert('\u2764'.repeat(28));
        if (y === 1) {
          $('img#hillary-sidebar').attr('src','images/emily-sidebar.gif');
        } else {
          $('img#trump-sidebar').attr('src','images/emily-sidebar.gif');
        }
      }
    }
  }
  var gameStart = function() {
    dance($('.sidebar'));
    setTimeout(function(){
    p1 = prompt("Player 1, what's your name?");
    emCheck(p1,1);
    p2 = prompt("Player 2, what's your name?");
    emCheck(p2,2);
    p1 = p1[0].toUpperCase() + p1.slice(1,p1.length);
    p2 = p2[0].toUpperCase() + p2.slice(1,p2.length);
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
            blockUpdate(r,c);
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
    $(window)
      .load(function(){
        if (window.innerWidth < 1170) {
         alert("Uh oh... Your browser window isn't quite wide enough to show the game. Mind adjusting it?")
        }
      })
      .resize(function(){
        if (window.innerWidth > 1170) {
          gameStart();
        }
      });
    }
  makeBoard();
})
