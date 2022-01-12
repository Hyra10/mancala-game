import { useState } from 'react'
import Cups from '../cups/cups'
import {
  checkIfEndOfGame,
  moveRemainingStonesToStores,
  moveStones,
  setFirstCupToZeroStones,
  whoWon,
} from './mancala.helper'
import useStyles from './mancala.style'
import { CupsType, initialGameState, MancalaStones, PlayerType } from './mancala.type'
import classnames from 'classnames'
import { toSentenceCase } from '../../utils/utils'

const Mancala = () => {
  const classes = useStyles()
  const [mancalaStones, setMancalaStones] = useState<MancalaStones>(initialGameState)
  const [activePlayer, setActivePlayer] = useState<PlayerType>('firstPlayer')

  const onClickCup = (player: PlayerType, cup: CupsType, stones: number) => {
    if (stones === 0) {
      return
    }

    let newMancalaStones = setFirstCupToZeroStones(mancalaStones, player, cup)
    const { gameState, nextPlayer } = moveStones({
      gameState: newMancalaStones,
      activePlayer,
      currentPlayerBoard: player,
      cup,
      stones,
    })
    newMancalaStones = gameState
    setActivePlayer(nextPlayer)

    if (checkIfEndOfGame(newMancalaStones)) {
      newMancalaStones = moveRemainingStonesToStores(newMancalaStones)
      const playerWhoWon = whoWon(newMancalaStones)

      const clickedOk = window.confirm(`
        The game has finished
        ${toSentenceCase(playerWhoWon)} has won the game
        Do you want to reset the game?
      `)

      if (clickedOk) {
        restartGame()
        return
      }
    }

    setMancalaStones(newMancalaStones)
  }

  const restartGame = () => {
    setActivePlayer('firstPlayer')
    setMancalaStones(initialGameState)
  }

  return (
    <div>
      <div className={classes.mancalaHeader}>
        <div data-testid="active-player">Active Player: {toSentenceCase(activePlayer)}</div>
        <button data-testid="restart-button" onClick={restartGame}>
          Restart Game
        </button>
      </div>
      <div className={classes.mancala}>
        <span
          className={classnames(classes.firstPlayerName, {
            [classes.active]: activePlayer === 'firstPlayer',
          })}
        >
          First Player
        </span>
        <Cups
          playerCups={mancalaStones.firstPlayer.cups}
          onClickCup={onClickCup}
          playerBoard="firstPlayer"
          activePlayer={activePlayer}
        />
        <div className={classes.firstPlayerStore}>{mancalaStones.firstPlayer.store}</div>
        <span
          className={classnames(classes.secondPlayerName, {
            [classes.active]: activePlayer === 'secondPlayer',
          })}
        >
          Second Player
        </span>
        <Cups
          playerCups={mancalaStones.secondPlayer.cups}
          onClickCup={onClickCup}
          playerBoard="secondPlayer"
          activePlayer={activePlayer}
        />
        <div className={classes.secondPlayerStore}>{mancalaStones.secondPlayer.store}</div>
      </div>
    </div>
  )
}

export default Mancala
