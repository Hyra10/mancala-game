export type CupsType = 1 | 2 | 3 | 4 | 5 | 6

export type Cups = {
  [cups in CupsType]: number
}

export type PlayerType = 'firstPlayer' | 'secondPlayer'

export type Player = {
  cups: Cups
  store: number
}

export type MancalaStones = {
  [player in PlayerType]: Player
}

export const initialGameState: MancalaStones = {
  firstPlayer: {
    cups: {
      1: 4,
      2: 4,
      3: 4,
      4: 4,
      5: 4,
      6: 4,
    },
    store: 0,
  },
  secondPlayer: {
    cups: {
      1: 4,
      2: 4,
      3: 4,
      4: 4,
      5: 4,
      6: 4,
    },
    store: 0,
  },
}
