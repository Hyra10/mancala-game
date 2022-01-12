import { deepClone, sum } from '../../../utils/utils'
import {
  checkIfEndOfGame,
  moveRemainingStonesToStores,
  moveStones,
  setFirstCupToZeroStones,
  whoWon,
} from '../mancala.helper'
import { CupsType, initialGameState, MancalaStones } from '../mancala.type'

describe('Mancala Helpers', () => {
  let initialState: MancalaStones
  beforeEach(() => {
    initialState = deepClone<MancalaStones>(initialGameState)
  })
  describe('moveStones', () => {
    it('should return opposite player and plus one in next cup', () => {
      const { gameState, nextPlayer } = moveStones({
        activePlayer: 'firstPlayer',
        currentPlayerBoard: 'firstPlayer',
        stones: 1,
        gameState: initialState,
        cup: 1,
      })

      expect(nextPlayer).toBe('secondPlayer')
      expect(gameState.firstPlayer.cups[2]).toBe(5)
    })
    it('should be last turn and landing on store, active player should play again', () => {
      const { gameState, nextPlayer } = moveStones({
        activePlayer: 'firstPlayer',
        currentPlayerBoard: 'firstPlayer',
        stones: 1,
        gameState: initialState,
        cup: 6,
      })

      expect(nextPlayer).toBe('firstPlayer')
      expect(gameState.firstPlayer.store).toBe(1)
    })
    it('should move to other player board to set stones', () => {
      const { gameState, nextPlayer } = moveStones({
        activePlayer: 'firstPlayer',
        currentPlayerBoard: 'firstPlayer',
        stones: 3,
        gameState: initialState,
        cup: 6,
      })

      expect(nextPlayer).toBe('secondPlayer')
      expect(gameState.firstPlayer.store).toBe(1)
      expect(gameState.secondPlayer.cups[1]).toBe(5)
    })
    it('should steal other player stones if cup is empty', () => {
      initialState.firstPlayer.cups[5] = 0

      const { gameState, nextPlayer } = moveStones({
        activePlayer: 'firstPlayer',
        currentPlayerBoard: 'firstPlayer',
        stones: 1,
        gameState: initialState,
        cup: 4,
      })

      expect(nextPlayer).toBe('secondPlayer')
      expect(gameState.firstPlayer.store).toBe(5)
      expect(gameState.secondPlayer.cups[2]).toBe(0)
    })

    it('should not steal and not move to store if other player cup is empty', () => {
      initialState.secondPlayer.cups[5] = 0
      initialState.firstPlayer.cups[2] = 0

      const { gameState, nextPlayer } = moveStones({
        activePlayer: 'secondPlayer',
        currentPlayerBoard: 'secondPlayer',
        stones: 1,
        gameState: initialState,
        cup: 4,
      })

      expect(nextPlayer).toBe('firstPlayer')
      expect(gameState.firstPlayer.store).toBe(0)
    })
  })
  describe('setFirstCupToZero', () => {
    it('should set the specified cup to zero stones', () => {
      const gameState = setFirstCupToZeroStones(initialState, 'firstPlayer', 1)

      expect(gameState.firstPlayer.cups[1]).toBe(0)
    })
  })
  describe('moveRemainingStonesToStores', () => {
    it('should move all stones to each player store', () => {
      const gameState = moveRemainingStonesToStores(initialState)

      expect(sum(Object.values(gameState.firstPlayer.cups))).toBe(0)
      expect(sum(Object.values(gameState.secondPlayer.cups))).toBe(0)
      expect(gameState.firstPlayer.store).toBe(24)
      expect(gameState.secondPlayer.store).toBe(24)
    })
  })
  describe('whoWon', () => {
    it('should returns firstPlayer', () => {
      initialState.firstPlayer.store = 48

      const whoHasWon = whoWon(initialState)
      expect(whoHasWon).toBe('firstPlayer')
    })
    it('should returns secondPlayer', () => {
      initialState.secondPlayer.store = 48

      const whoHasWon = whoWon(initialState)
      expect(whoHasWon).toBe('secondPlayer')
    })
  })
  describe('checkIfEndOfGame', () => {
    it('should returns true', () => {
      for (let i = 1; i < 7; i++) {
        const index = i as CupsType
        initialState.firstPlayer.cups[index] = 0
      }

      const gameHasFinished = checkIfEndOfGame(initialState)
      expect(gameHasFinished).toBe(true)
    })
    it('should returns false', () => {
      const gameHasFinished = checkIfEndOfGame(initialState)
      expect(gameHasFinished).toBe(false)
    })
  })
})
