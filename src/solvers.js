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
  var solution = new Board({n: n});
  // console.log(solution);
  // if (n === 1) {
  //   solution.togglePiece(0, 0);
  //   return solution;
  // }
    

  for (var topRowIdx = 0; topRowIdx < n; topRowIdx++) {
    var countRooksPlaced = 0;
    
    solution.togglePiece(0, topRowIdx);
    countRooksPlaced++;
    for (var rowIdx = 1; rowIdx < n; rowIdx++) {
      for (var colIdx = 0; colIdx < n; colIdx++) {
        solution.togglePiece(rowIdx, colIdx);
        
        if (solution.hasAnyRooksConflicts()) {
          solution.togglePiece(rowIdx, colIdx);
        } else {
          countRooksPlaced++;
          
          if (countRooksPlaced === n) { console.log('this is console logging the solution ' + solution); }
          if (countRooksPlaced === n) { return solution.rows(); }
        }
        
        //if (countRooksPlaced === n) { console.log('count = n solution', solution.rows()); }
        //if (countRooksPlaced === n) { return solution.rows(); }
      }
    }
  } 
  //   solution.togglePiece(0, topRowIdx);
  //   countRooksPlaced--;
  // }


  // iterate through each row up to n-1
    // iterate through each column up to n-1
      // place a rook (toggle?)
      // check if board has conflicts
      // if board has no conflicts
        // countRooksPlaced++;
        // break (that row only?)
        // if countRooksPlaced = n
          // return board;
      // else 
        //toggle piece
  



  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution.rows()));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) { //fixme
  var solutionCount = undefined;

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
