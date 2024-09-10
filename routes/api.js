'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      let {puzzle, coordinate, value} = req.body;

      let row = coordinate.split('')[0];
      let col = coordinate.split('')[1];

      if(/[^0-9.]/g.test(puzzle)) {
        res.json({error: 'Invalid characters in puzzle'});
        return
      }

      if(puzzle.length != 81) {
        res.json({error: 'Expected puzzle to be 81 characters long'})
        return
      }

      if(!puzzle || !coordinate || !value) {
        res.json({error: 'Required field(s) missing'})
        return
      }
      
      if(coordinate.length !== 2 || !/[a-i]/i.test(row) || !/[1-9]/i.test(col)) {
        res.json({error: 'Invalid coordinate'})
      }

      if(!/[1-9]/i.test(value)) {
        res.json({error: 'Invalid value'})
        return
      }

      let validCol = solver.checkColPlacement(puzzle, row, col, value);
      let validRow = solver.checkRowPlacement(puzzle, row, col, value);
      let validReg = solver.checkRegionPlacement(puzzle, row, col, value);
      let conflicts = [];

      if(validCol && validReg && validReg) {
        res.json({valid: true});
        return
      }

      if(!validRow)
        conflicts.push('row');

      if(!validCol)
        conflicts.push('column');

      if(!validReg)
        conflicts.push('region');

      res.json({valid: false, conflict: conflicts});
    });
    
  app.route('/api/solve')
    .post((req, res) => {
      let puzzle = req.body.puzzle
      let regex = /[^0-9.]/g

      if(!puzzle) {
        res.json({error: 'Required field missing'})
        return
      }

      if(regex.test(puzzle)) {
        res.json({ error: 'Invalid characters in puzzle' })
        return
      }

      if(puzzle.length != 81) {
        res.json({ error: 'Expected puzzle to be 81 characters long' })
        return
      }

      let solvedPuzzle = solver.solve(puzzle)

      console.log(solvedPuzzle)

      if(!solvedPuzzle) {
        res.json({ error: 'Puzzle cannot be solved' })
        return
      }
      res.json({ solution: solvedPuzzle })
    });
};
