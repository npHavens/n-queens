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
        // togglePiece at colIndex
      boardObj.togglePiece(rowNum, colIndex);
      // check if there is row or column conflict
      if (boardObj.hasRowConflictAt(rowNum) || boardObj.hasColConflictAt(colIndex)) {
        // if there is togglePiece back
        boardObj.togglePiece(rowNum, colIndex);
        // call trySolution with current board, n, current colIndex+1
        //return trySolution(boardObj, piecesLeft, rowIndex, colIndex + 1);
      } else {
        // if there is not a row or column conflict, then we keep that piece in the current space
        return trySolution(boardObj, piecesLeft - 1, rowIndex + 1, colIndex + 1);
        // Make a trySolution call with newBoard, n-1, colIndex+1
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
  //iterate over board
    //iterate over row
      //toggle current piece
        //check if trySolution with current board returns true
          //if true, increment solutionCount
          //if false, toggle piece back
          // check if trySolution on same row and next column returns true
            // increment solution count

  //instantiate new board
  var newBoard = new Board({n: n});
  var solutionCount = 0;
  // define a function called trySolution
  var trySolution = function(boardObj, piecesLeft, rowNum) {
  // first arg is current board
  // secord arg is pieces left
  // third arg is colIndex

  // base case
    // check if there are no pieces left
    if (piecesLeft === 0) {
    // if yes, solution = newBoard.rows();
      //return boardObj.rows();
      //console.log(JSON.stringify(boardObj.rows()))
      solutionCount++;
      return;
    }
    //[[1,0],[0,1]]
  // iterate over newBoard

    for (var colNum = 0; colNum < boardObj.rows().length; colNum++) {
      // iterate over row
        // togglePiece at colIndex
      boardObj.togglePiece(rowNum, colNum);
      // check if there is row or column conflict
      if (!boardObj.hasRowConflictAt(rowNum) && !boardObj.hasColConflictAt(colNum)) {
        // if there is togglePiece back
        trySolution(boardObj, piecesLeft - 1, rowNum + 1);
        // call trySolution with current board, n, current colIndex+1
        // trySolution(boardObj, piecesLeft, rowNum + 1, colNum + 1);
      }
      boardObj.togglePiece(rowNum, colNum);

    }
  };
  //iterate over board
  trySolution(newBoard, n, 0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var newBoard = new Board({n: n});
  var solution;
  // define a function called trySolution

  var trySolution = function(boardObj, piecesLeft, rowNum) {
  // first arg is current board
  // secord arg is pieces left
  // third arg is colIndex

  // base case
    // check if there are no pieces left
    if (piecesLeft === 0) {
    // if yes, solution = newBoard.rows();
      //return boardObj.rows();
      //console.log(JSON.stringify(boardObj.rows())
      //console.log(JSON.stringify(boardObj.rows()));
      return boardObj.rows();
    }
    //[[1,0],[0,1]]
  // iterate over newBoard

    for (var colNum = 0; colNum < boardObj.rows().length; colNum++) {
      // iterate over row
        // togglePiece at colIndex
      boardObj.togglePiece(rowNum, colNum);
      // check if there is row or column conflict
      if (!boardObj.hasRowConflictAt(rowNum) && !boardObj.hasColConflictAt(colNum)) {

        // if there is togglePiece back
        if (!boardObj.hasAnyMajorDiagonalConflicts() && !boardObj.hasAnyMinorDiagonalConflicts()) {
         //console.log('went here')
          return trySolution(boardObj, piecesLeft - 1, rowNum + 1);
        }


        // call trySolution with current board, n, current colIndex+1
        // trySolution(boardObj, piecesLeft, rowNum + 1, colNum + 1);
      }
      boardObj.togglePiece(rowNum, colNum);
      //return trySolution(boardObj, piecesLeft, rowNum + 1);

    }
  };
  //iterate over board
  solution = trySolution(newBoard, n, 0);
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;

};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
