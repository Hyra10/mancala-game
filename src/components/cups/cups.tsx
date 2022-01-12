import { useMemo } from 'react'
import { Cups as PlayerCups, CupsType, PlayerType } from '../mancala/mancala.type'
import useStyles from './cups.style'
import classnames from 'classnames'

type CupsProps = {
  playerCups: PlayerCups
  onClickCup: (player: PlayerType, cup: CupsType, stones: number) => void
  playerBoard: PlayerType
  activePlayer: PlayerType
}

const Cups = ({ playerCups, onClickCup, playerBoard, activePlayer }: CupsProps) => {
  const classes = useStyles()
  const playerCupsArr = useMemo(() => Object.entries(playerCups), [playerCups])
  const isActive = playerBoard === activePlayer

  return (
    <>
      {playerCupsArr.map(([k, v]) => {
        const key = `${playerBoard}cup${k}`
        const className = classnames((classes as any)[key], { [classes.inactive]: !isActive })
        return (
          <div
            data-testid={key}
            key={key}
            className={className}
            onClick={() => isActive && onClickCup(playerBoard, +k as CupsType, v)}
          >
            {v}
          </div>
        )
      })}
    </>
  )
}

export default Cups
