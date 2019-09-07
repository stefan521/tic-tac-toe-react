import { getGameStatus } from './helper.js';

describe('Testing the game status helper function', () => {

   it('identifies a draw', () => {
      const drawBoard = ['X', 'O', 'O',
                         'O', 'X', 'X',
                         'X', 'X', 'O'];

      expect(getGameStatus(drawBoard)).toEqual({
         gameEnded: true,
         winner: null,
         line: null,
      });
   });

   it('lets the game continue', ()=> {
      const board = ['X', null, null,
                     'O', 'X', null,
                     null, null, null];

      expect(getGameStatus(board)).toEqual({
         gameEnded: false,
         winner: null,
         line: null,
      });
   });

   it('identifies horizontal win', () => {
      const horizontalWin = ['X', 'O', 'O',
                             'X', 'X', 'X',
                             null, 'O', null];

      expect(getGameStatus(horizontalWin)).toEqual({
         gameEnded: true,
         winner: 'X',
         line: [3, 4, 5],
      });
   });

   it('identifies vertical win', () => {
      const verticalWin = ['O', null, 'X',
                           'O', 'X', null,
                           'O', null, null];

      expect(getGameStatus(verticalWin)).toEqual({
         gameEnded: true,
         winner: 'O',
         line: [0, 3, 6],
      });
   });

   it('identifies diagonal win', () => {
      const diagonalWin = ['X', null, null,
                           'O', 'X', 'O',
                           null, null, 'X'];

      expect(getGameStatus(diagonalWin)).toEqual({
         gameEnded: true,
         winner: 'X',
         line: [0, 4, 8],
      });
   });

});
