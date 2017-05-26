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
          if (countRooksPlaced === n) { 
            console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution.rows()));
            return solution.rows(); 
          }
        }
      }
    }
  } 

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution.rows()));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) { //fixme
  var currentBoard = new Board({n: n});
  var solutionCount = 0;
  
  var searchBoard = function(board, row) { 
    if (row === n) {
      solutionCount++;
      return;
    } else {
      for (var colIdx = 0; colIdx < n; colIdx++) {
        currentBoard.togglePiece(row, colIdx);

        if (currentBoard.hasColConflictAt(colIdx)) {
          currentBoard.togglePiece(row, colIdx);
          continue;
        }

        searchBoard(currentBoard, row + 1);
        currentBoard.togglePiece(row, colIdx);
      }      
    } 
  };

  searchBoard(currentBoard, 0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) { 
  var solution = null;
  if (n === 1) { return [[1]]; }
  if (n <= 3) { return new Board({n: n}).rows(); } // if (n === 0, 2, 3) { return []; }
  
  var buildBoard = function(board, row) {
    var currentBoard = new Board(board);
    if (row === n) {
      solution = currentBoard.rows();
    } else {
      for (var colIdx = 0; colIdx < n; colIdx++) {
        currentBoard.togglePiece(row, colIdx);
        
        if (currentBoard.hasAnyQueensConflicts()) {
          currentBoard.togglePiece(row, colIdx);
          continue;
        }
        
        buildBoard(currentBoard.rows(), row + 1);
        if (solution !== null) { return; }
        currentBoard.togglePiece(row, colIdx);
      }
    }
  };
  buildBoard(new Board({n: n}).rows(), 0);
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution)); // [[0]]
  return solution;
};



// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;

  var buildBoard = function(board, row) {
    var currentBoard = new Board(board);
    if (row === n) {
      if (!currentBoard.hasAnyQueensConflicts()) {
        solutionCount++;
        return;
      }
    } else {
      for (var colIdx = 0; colIdx < n; colIdx++) {
        currentBoard.togglePiece(row, colIdx);
        
        if (currentBoard.hasAnyQueensConflicts()) {
          currentBoard.togglePiece(row, colIdx);
          continue;
        }
        
        buildBoard(currentBoard.rows(), row + 1);
        currentBoard.togglePiece(row, colIdx);
      }
    }
  };
  
  buildBoard(new Board({n: n}).rows(), 0);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
