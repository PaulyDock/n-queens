// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      let row = this.get(rowIndex);
      return row.filter(num => num > 0).length > 1;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      let size = this.get('n');
      let conflictExists = false;
      for (let rowIndex = 0; rowIndex < size; rowIndex++) {
        conflictExists = conflictExists || this.hasRowConflictAt(rowIndex);
      }
      return conflictExists;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var column = [];
      var size = this.get('n');

      for (let rowIndex = 0; rowIndex < size; rowIndex++) {
        column.push(this.get(rowIndex)[colIndex]);
      }
      
      return column.filter(num => num > 0).length > 1;
    },
    
    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      let conflictExists = false;
      let size = this.get('n');
      
      for (let i = 0; i < size; i++) {
        conflictExists = this.hasColConflictAt(i) || conflictExists;
      }

      return conflictExists;
    },
  


    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(colIdx) {
      //majorDiagonalColumnIndexAtFirstRow
      let size = this.get('n');
      let diagonal = []; 
      let rowIdx = 0;
      
      if (colIdx < 0) {
        rowIdx = -colIdx;
      }

      for (let diff = rowIdx; diff < size; diff++) {
        if (colIdx + diff >= size) { break; }

        diagonal.push(this.get(0 + diff)[colIdx + diff]); 
      }
      
      return diagonal.filter(num => num > 0).length > 1;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      let conflictExists = false;
      let size = this.get('n');
      
      for (let i = -size + 1; i < size; i++) {
        conflictExists = this.hasMajorDiagonalConflictAt(i) || conflictExists;
      }
      return conflictExists;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(colIdx) {
      // minorDiagonalColumnIndexAtFirstRow
      let diagonal = [];
      let size = this.get('n');
      let rowIdx = 0;

      if (colIdx >= size) {
        rowIdx = colIdx - (size - 1);
        colIdx = size - 1;
      }


      for (let diff = 0; diff < size; diff++) {
        if (rowIdx + diff >= size) {
          break;
        }
        diagonal.push(this.get(rowIdx + diff)[colIdx - diff]); 
      }
      
      return diagonal.filter(num => num > 0).length > 1;    
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      let conflictExists = false;
      let size = this.get('n');
      
      for (let i = 0; i < size * 2 - 1; i++) {
        conflictExists = this.hasMinorDiagonalConflictAt(i) || conflictExists;
      }
      return conflictExists;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
