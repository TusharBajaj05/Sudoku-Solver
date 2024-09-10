const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();

suite('Unit Tests', () => {
let validPuzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'

    suite('UnitTests', () => {
        suite('solver tests', () => {
            test('Logic handles a valid puzzle string of 81 characters', (done) => {
                let complete = '135762984946381257728459613694517832812936745357824196473298561581673429269145378';
                assert.equal(solver.solve(validPuzzle), complete)
                done();
            })

            test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', (done) => {
                let invalidPuzzle = '1.5..2.84..63.12.7.2..5...a.9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
                assert.equal(solver.solve(invalidPuzzle), false);
                done();
            })

            test('Logic handles a puzzle string that is not 81 characters in length', done => {
                let invalidPuzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.';
                assert.equal(solver.solve(invalidPuzzle), false);
                done();
            })
            
            test('Logic handles a valid row placement', done => {
                assert.equal(solver.checkRowPlacement(validPuzzle, 'A', '2', '9'), true);
                done();
            })
            
            test('Logic handles an invalid row placement', done => {
                assert.equal(solver.checkRowPlacement(validPuzzle, 'A', '2', '1'), false);
                done();
            })            

            test('Logic handles a valid column placement', done => {
                assert.equal(solver.checkColPlacement(validPuzzle, 'A', '2', '8'), true);
                done();
            })

            test('Logic handles an invalid column placement', done => {
                assert.equal(solver.checkColPlacement(validPuzzle, 'A', '2', '9'), false);
                done();
            })

            test('Logic handles a valid region (3x3 grid) placement', done => {
                assert.equal(solver.checkRegionPlacement(validPuzzle, 'A', '2', '3'), true);
                done();
            })

            test('Logic handles an invalid region (3x3 grid) placement', done => {
                assert.equal(solver.checkRegionPlacement(validPuzzle, 'A', '2', '1'), false);
                done();
            })

            test('Valid puzzle strings pass the solver', done => {
                assert.equal(solver.solve(validPuzzle), '135762984946381257728459613694517832812936745357824196473298561581673429269145378')
                done();
            })

            test('Invalid puzzle strings fail the solver', done => {
                let invalidPuzzle = ' 115..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
                assert.equal(solver.solve(invalidPuzzle), false)
                done();
            })

            test('Solver returns the expected solution for an incomplete puzzle', done => {
                assert.equal(solver.solve(validPuzzle), '135762984946381257728459613694517832812936745357824196473298561581673429269145378')
                done();
            })
        })
    })
});
