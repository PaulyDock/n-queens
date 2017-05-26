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
  var board = new Board({n: n});
  var solutionCount = 0;
  
  var searchBoard = function(board, row) { 
    var currentBoard = new Board(board);

    if (row === n) {
      if (!currentBoard.hasAnyRooksConflicts()) { solutionCount++; }
      return;
    } else {
      for (var colIdx = 0; colIdx < n; colIdx++) {
        debugger;
        currentBoard.togglePiece(row, colIdx);
        if (currentBoard.hasAnyRooksConflicts()) {
          currentBoard.togglePiece(row, colIdx);
          continue;
        }
        searchBoard(currentBoard.rows(), row + 1);
        currentBoard.togglePiece(row, colIdx);
      }      
    }
    
  };

  searchBoard(board.rows(), 0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) { 
  //n = 6;
  var solution = null;
  //if (n === 0) { return []; }
  //if (n === 1) { return [[1]]; }

  var buildBoard = function(board, row) {
    var currentBoard = new Board(board);
    if (row === n) {
      if (!currentBoard.hasAnyQueensConflicts()) {
        console.log('Single solution for ' + n + ' queens:', JSON.stringify(currentBoard.rows())); // [[1]]
        //debugger;
        var temp = new Board({n: n});
        
        if (JSON.stringify(temp.rows()) !== JSON.stringify(currentBoard.rows())) {
          console.log('this is the temp arr ' + JSON.stringify(temp.rows()));
          console.log('this is the solution arr ' + JSON.stringify(currentBoard.rows()));
          solution = currentBoard.rows();
          return;
        }
        
      }
    } else {
      for (var colIdx = 0; colIdx < n; colIdx++) {
        //debugger;
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

  console.log('this is the solution being returned ' + JSON.stringify(solution)); // [[0]]
  return solution;
};

  // for (var topRowIdx = 0; topRowIdx < n; topRowIdx++) {
  //   if (topRowIdx === 1) { debugger; }    
  //   solution = new Board({n: n});
  //   var countQueensPlaced = 0;
    
  //   solution.togglePiece(0, topRowIdx);
  //   countQueensPlaced++; //1
  //   for (var rowIdx = 1; rowIdx < n; rowIdx++) {
  //     for (var colIdx = 0; colIdx < n; colIdx++) {
  //       if (solution === undefined) { debugger; }
  //       solution.togglePiece(rowIdx, colIdx);
  //       //debugger;
  //       if (solution.hasAnyQueensConflicts()) {
  //         solution.togglePiece(rowIdx, colIdx);
  //       } else {
  //         countQueensPlaced++; //3
  //         if (countQueensPlaced === n) { 
  //           console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution.rows()));
  //           return solution.rows(); 
  //         }
  //         // continue;
  //         rowIdx++;
  //         colIdx = -1;
  //       }
  //     }
  //   }
    //solution.togglePiece(0, topRowIdx);

  //console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution.rows()));


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  // if (n === 0) { return 0; }
  // if (n === 1) { return [[1]]; }

  var buildBoard = function(board, row) {
    var currentBoard = new Board(board);
    if (row === n) {
      if (!currentBoard.hasAnyQueensConflicts()) {
        //debugger;
        solutionCount++;
        return;
      }
      //return;
    } else {
      for (var colIdx = 0; colIdx < n; colIdx++) {
        //debugger;
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
