import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { deepClone } from '../../../utils/utils'
import Mancala from '../mancala'
import {
  checkIfEndOfGame,
  moveStones,
  setFirstCupToZeroStones,
  moveRemainingStonesToStores,
} from '../mancala.helper'
import { initialGameState, MancalaStones } from '../mancala.type'

jest.mock('../mancala.helper')

// this is just to keep typescript happy
const moveStonesMock = moveStones as jest.Mock
const checkIfEndOfGameMock = checkIfEndOfGame as jest.Mock
const moveRemainingStonesToStoresMock = moveRemainingStonesToStores as jest.Mock

describe('Mancala', () => {
  beforeEach(() => {
    window.confirm = jest.fn().mockImplementation(() => true)
  })
  describe('onClickCup', () => {
    let gameState: MancalaStones
    beforeEach(() => {
      gameState = deepClone<MancalaStones>(initialGameState)
    })
    it('should empty cup', async () => {
      render(<Mancala />)

      checkIfEndOfGameMock.mockReturnValue(false)
      gameState.firstPlayer.cups[1] = 0
      moveStonesMock.mockReturnValue({ gameState, nextPlayer: 'firstPlayer' })

      const cup = screen.getByTestId('firstPlayercup1')
      fireEvent.click(cup)
      expect(setFirstCupToZeroStones).toHaveBeenCalled()
      expect(moveStones).toHaveBeenCalled()
      await waitFor(() => {
        expect(cup).toHaveTextContent('0')
      })
    })
    it('should finish the game', () => {
      render(<Mancala />)
      checkIfEndOfGameMock.mockReturnValue(true)
      moveStonesMock.mockReturnValue({ gameState, nextPlayer: 'firstPlayer' })
      moveRemainingStonesToStoresMock.mockReturnValue(gameState)

      const cup = screen.getByTestId('firstPlayercup1')
      fireEvent.click(cup)

      expect(moveRemainingStonesToStores).toHaveBeenCalled()
    })
  })
  describe('onRestartClick', () => {
    it('should reset to initial state', () => {
      render(<Mancala />)
      const restartButton = screen.getByTestId('restart-button')
      fireEvent.click(restartButton)
      const activePlayer = screen.getByTestId('active-player')
      expect(activePlayer).toHaveTextContent('Active Player: First Player')
    })
  })
})
