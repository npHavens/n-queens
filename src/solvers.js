/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = undefined; //fixme
  var solutionBoard = new Board({n: n});

  findSolution(solutionBoard, 0, n, 'hasAnyRooksConflicts', function() {
    solution = board.rows();
  });

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme
  var solutionBoard = new Board({n: n});
  //debugger;
  findSolution(solutionBoard, 0, n, 'hasAnyRooksConflicts', function() {
    solutionCount++;
  });
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0; //fixme
  var solutionBoard = new Board({n: n});

  findSolution(solutionBoard, 0, n, 'optimizedValidator', function() {
    solutionCount++;
  });
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

window.findSolution = function(boardObj, row, n, validator, callBack) {
  //debugger;
  if (row === n) {
    callBack();
    return;

  }
  for (var i = 0; i < n; i++) {
    boardObj.togglePiece(row, i);

    if (!boardObj[validator](row, i)) {
      findSolution(boardObj, row + 1, n, validator, callBack);
    }
    boardObj.togglePiece(row, i);
  }

};
