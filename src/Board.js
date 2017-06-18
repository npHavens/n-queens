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
      var row = this.get(rowIndex);
      //iterate through the row
      //find if there is more than one 1 then return true
      //otherwise return false
      var pieceCount = 0;
      for (var i = 0; i < row.length; i++) {
        pieceCount += row[i];
        if (pieceCount > 1) {
          return true;
        }
      }
      return false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var length = this.get('n');
      for (var i = 0; i < length; i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var pieceCount = 0;
      var length = this.get('n');

      for (var i = 0; i < length; i++) {
        pieceCount+= this.get(i)[colIndex];
        if (pieceCount > 1) {
          return true;
        }
      }
      return false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var length = this.get('n');

      for (var i = 0; i < length; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict

    // hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
    //   var pieceCount = 0;
    //   // loop through the board array
    //   // build a new row called diagonal
    //   // board at each column index + each row index
    //   var diagonal = this.rows().map(function(row,rowIndex){
    //     return row[majorDiagonalColumnIndexAtFirstRow+rowIndex];
    //   })
    //   for (var i=0; i < diagonal.length; i++) {
    //     if(diagonal[i] !== undefined) {
    //       pieceCount+= diagonal[i];
    //     }
    //   }
    //   return pieceCount > 1; // fixme
    // },



    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var n = this.get('n');
      var colIndex = majorDiagonalColumnIndexAtFirstRow;
      var count = 0;
      //iterate through board

      for (var i = 0; i < n && colIndex < n; i++, colIndex++) {
        var row = this.get(i);
        //console.log(row[colIndex])
        count += row[colIndex];
        if (count > 1) {
          return true;
        }
      }
      return false;
    },


    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      // Solution #2:
      // set variable for first row
      var length = this.get('n');
      if (length > 1) {

      // check if first row has a length property
        // if true, iterate over first row
        for (var i = 0 ; i < length - 1; i++) {
          // check if current board has hasMajorDiagonalConflictAt at current colIndex
          if (this.hasMajorDiagonalConflictAt(i)) {
            // if true, return true
            return true;
          }
          // set variable to define rest of board
          var restOfBoard = new Board(this.rows().slice(1));
          // do a recursive call of hasAnyMajorDiagonalConflicts on rest of board
          if (restOfBoard.hasAnyMajorDiagonalConflicts()) {
            return true;
          }
          // if the recursive function returns true, then return true
          // if false, fall back to 224
        }
      }
      // if not, return false
      return false;
    },


    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var colIndex = minorDiagonalColumnIndexAtFirstRow;
      var count = 0;
      var length = this.get('n');
      for (var i = 0 ; i < length && colIndex >= 0 ; i++, colIndex--) {
        var row = this.get(i);
        count += row[colIndex];
        if (count > 1) {
          return true;
        }
      }
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      // Solution #2:
      // set variable for first row
      var rowCount = this.get('n');
      if (rowCount > 1) {
        var colCount = this.get('0').length;
      // check if first row has a length property

        // if true, iterate over first row
        for (var i = 1; i < colCount; i++) {
          // check if current board has hasMinorDiagonalConflictAt at current colIndex
          if (this.hasMinorDiagonalConflictAt(i)) {
            // if true, return true
            return true;
          }
          // set variable to define rest of board
          var restOfBoard = new Board(this.rows().slice(1));
          // do a recursive call of hasAnyMinorDiagonalConflicts on rest of board
          if (restOfBoard.hasAnyMinorDiagonalConflicts()) {
            return true;
          }
          // if the recursive function returns true, then return true
          // if false, fall back to 224
        }
      }
      // if not, return false
      return false;
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
