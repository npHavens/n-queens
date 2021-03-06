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



window.findNRooksSolution = n => { //O(!n)
  let solution = undefined; //fixme
  const solutionBoard = new Board({n: n});
  const getSingleSolution = () => solutionBoard.rows().map(row => row.slice());
  solution = findSolution(solutionBoard, 0, n, 'hasAnyRooksConflicts', getSingleSolution);

  console.log(`Single solution for '${n}' rooks:', ${JSON.stringify(solution)}`);
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = n => { //O(!n)
  let solutionCount = 0; //fixme
  const solutionBoard = new Board({n: n});
  //debugger;
  findSolution(solutionBoard, 0, n, 'hasAnyRookConflictsOn', () => {solutionCount++;});
  console.log(`Number of solutions for ${n} rooks: ${solutionCount}`);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = n => {  //O(!n)
  const solutionBoard = new Board({n: n});
  const getSingleSolution = () => solutionBoard.rows().map(row => row.slice());

  solution = findSolution(solutionBoard, 0, n, 'hasAnyQueenConflictsOn', getSingleSolution);
  console.log(`Single solution for ${n} Queens: ${JSON.stringify(solution)}`);
  return solution || solutionBoard.rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) { //O(!n)
  var solutionCount = 0;
  var solutionBoard = new Board({n: n});

  findSolution(solutionBoard, 0, n, 'hasAnyQueenConflictsOn', function() {
    solutionCount++;
  });
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

window.findSolution = function(boardObj, row, n, validator, callBack) { //O(!n)
  //debugger;
  if (row === n) {
    return callBack();
  }
  for (var i = 0; i < n; i++) {
    boardObj.togglePiece(row, i);

    if (!boardObj[validator](row, i)) {
      var result = findSolution(boardObj, row + 1, n, validator, callBack);
    }
    if (result) {
      return result;
    }
    boardObj.togglePiece(row, i);
  }

};
