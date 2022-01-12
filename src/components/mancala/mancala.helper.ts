import { deepClone, sum } from '../../utils/utils'
import { CupsType, MancalaStones, PlayerType } from './mancala.type'

type moveStonesParams = {
  /**
   * the state of the current game
   */
  gameState: MancalaStones
  /**
   * the active player that clicked the cup
   */
  activePlayer?: PlayerType
  /**
   * the player where the stone is right now
   */
  currentPlayerBoard: PlayerType
  /**
   * the cup where you are in
   */
  cup: CupsType | 0
  /**
   * the number of stones to place
   */
  stones: number
}

type moveStonesResponse = {
  /**
   * the state of the current game
   */
  gameState: MancalaStones
  /**
   * the next player to play
   */
  nextPlayer: PlayerType
}

const oppositeCups = {
  1: 6,
  2: 5,
  3: 4,
  4: 3,
  5: 2,
  6: 1,
}

export const moveStones = ({
  gameState,
  activePlayer,
  currentPlayerBoard,
  cup,
  stones,
}: moveStonesParams): moveStonesResponse => {
  const gameStateCopy = deepClone<MancalaStones>(gameState)
  const oppositePlayer: PlayerType = activePlayer === 'firstPlayer' ? 'secondPlayer' : 'firstPlayer'
  const oneStone = 1

  if (stones === 0) {
    return {
      gameState: gameStateCopy,
      nextPlayer: oppositePlayer,
    }
  }
  cup = (cup + 1) as CupsType

  if (cup > 6) {
    // add stone to store only if it is the same player's store
    if (activePlayer === currentPlayerBoard) {
      const amountInStore = gameStateCopy[currentPlayerBoard].store
      gameStateCopy[currentPlayerBoard].store = amountInStore + oneStone
      --stones

      // if we ran out of stones and
      // this last stone landed in the active player store
      if (stones === 0) {
        return {
          gameState: gameStateCopy,
          nextPlayer: activePlayer,
        }
      }
    }

    //reset to zero because next time we add + 1 stone at the beggining
    cup = 0

    //move to the other player
    currentPlayerBoard = currentPlayerBoard === 'firstPlayer' ? 'secondPlayer' : 'firstPlayer'

    return moveStones({
      gameState: gameStateCopy,
      activePlayer,
      currentPlayerBoard,
      cup,
      stones,
    })
  }

  --stones

  const amountInCup = gameStateCopy[currentPlayerBoard].cups[cup]

  // if last stone lands in an empty space in players side
  // check amount of stones in the other side
  if (amountInCup === 0 && stones === 0 && currentPlayerBoard === activePlayer) {
    const oppositeCupNumber = oppositeCups[cup] as CupsType
    const stonesOnTheOtherSide = gameStateCopy[oppositePlayer].cups[oppositeCupNumber]

    // grab all of the stones from the opposite side if there are any
    // and add them to the active player store
    // if there are no stones skip it
    if (stonesOnTheOtherSide > 0) {
      gameStateCopy[oppositePlayer].cups[oppositeCupNumber] = 0
      const stonesCurrentlyOnStore = gameStateCopy[activePlayer].store
      gameStateCopy[activePlayer].store = stonesCurrentlyOnStore + stonesOnTheOtherSide + oneStone

      return moveStones({
        gameState: gameStateCopy,
        activePlayer,
        currentPlayerBoard,
        cup,
        stones,
      })
    }
  }

  gameStateCopy[currentPlayerBoard].cups[cup] = amountInCup + oneStone

  return moveStones({
    gameState: gameStateCopy,
    activePlayer,
    currentPlayerBoard,
    cup,
    stones,
  })
}

export const setFirstCupToZeroStones = (
  gameState: MancalaStones,
  player: PlayerType,
  cup: CupsType,
): MancalaStones => {
  const gameStateCopy = deepClone<MancalaStones>(gameState)
  gameStateCopy[player].cups[cup] = 0
  return gameStateCopy
}

export const checkIfEndOfGame = (gameState: MancalaStones): boolean => {
  const fpTotalSum = sum(Object.values(gameState.firstPlayer.cups))
  const spTotalSum = sum(Object.values(gameState.secondPlayer.cups))

  if (fpTotalSum === 0 || spTotalSum === 0) {
    return true
  }

  return false
}

export const moveRemainingStonesToStores = (gameState: MancalaStones): MancalaStones => {
  const gameStateCopy = deepClone<MancalaStones>(gameState)

  const fpTotalSum = sum(Object.values(gameStateCopy.firstPlayer.cups))
  const spTotalSum = sum(Object.values(gameStateCopy.secondPlayer.cups))

  gameStateCopy.firstPlayer.store = gameStateCopy.firstPlayer.store + fpTotalSum
  gameStateCopy.secondPlayer.store = gameStateCopy.secondPlayer.store + spTotalSum

  for (let i = 1; i < 7; i++) {
    const index = i as CupsType
    gameStateCopy.firstPlayer.cups[index] = 0
    gameStateCopy.secondPlayer.cups[index] = 0
  }

  return gameStateCopy
}

export const whoWon = (gameState: MancalaStones): PlayerType => {
  if (gameState.firstPlayer.store < gameState.secondPlayer.store) {
    return 'secondPlayer'
  }

  return 'firstPlayer'
}
