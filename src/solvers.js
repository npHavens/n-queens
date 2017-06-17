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
  var solution = undefined;
  var newBoard = new Board({n: n});

  // define a function called trySolution
  var trySolution = function(boardObj, piecesLeft, rowIndex, colIndex) {

    //console.log(JSON.stringify(boardObj.rows()), 'piecesLeft = ', piecesLeft)
  // first arg is current board
  // secord arg is pieces left
  // third arg is colIndex

  // base case
    // check if there are no pieces left
    if (piecesLeft === 0) {
    // if yes, solution = newBoard.rows();
      return boardObj.rows();
    }
  // iterate over newBoard
    for (var rowNum = rowIndex; rowNum < boardObj.rows().length; rowNum++) {
      // iterate over row
      for (var colNum = colIndex; colNum < boardObj.rows()[rowNum].length; colNum++) {
        //debugger;
        // togglePiece at colIndex
        boardObj.togglePiece(rowNum, colNum);
    // check if there is row or column conflict
        if (boardObj.hasRowConflictAt(rowNum) || boardObj.hasRowConflictAt(colNum)) {
          // if there is togglePiece back
          boardObj.togglePiece(rowNum, colNum);
          // call trySolution with current board, n, current colIndex+1
          return trySolution(boardObj, piecesLeft, rowIndex, colNum + 1);
        } else {
          // if there is not a row or column conflict, then we keep that piece in the current space
          return trySolution(boardObj, piecesLeft - 1, rowIndex + 1, colNum + 1);
          // Make a trySolution call with newBoard, n-1, colIndex+1
        }
      }
    }
  };
  // call trySolution with the newBoard, n, 0
  solution = trySolution(newBoard, n, 0, 0);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

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
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
