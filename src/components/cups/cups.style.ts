import { createUseStyles } from 'react-jss'

const cupsStyle = {
  boxShadow: 'inset 0 0 10px 2px #000',
  borderRadius: '50%',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  fontSize: 26,
  fontWeight: 'bold',

  '&:hover': {
    background: 'rgba(0, 0, 0, .40)',
  },
}

const useStyles = createUseStyles({
  firstPlayercup1: {
    gridArea: 'fpCup1',
    ...cupsStyle,
  },
  firstPlayercup2: {
    gridArea: 'fpCup2',
    ...cupsStyle,
  },
  firstPlayercup3: {
    gridArea: 'fpCup3',
    ...cupsStyle,
  },
  firstPlayercup4: {
    gridArea: 'fpCup4',
    ...cupsStyle,
  },
  firstPlayercup5: {
    gridArea: 'fpCup5',
    ...cupsStyle,
  },
  firstPlayercup6: {
    gridArea: 'fpCup6',
    ...cupsStyle,
  },
  secondPlayercup1: {
    gridArea: 'spCup1',
    ...cupsStyle,
  },
  secondPlayercup2: {
    gridArea: 'spCup2',
    ...cupsStyle,
  },
  secondPlayercup3: {
    gridArea: 'spCup3',
    ...cupsStyle,
  },
  secondPlayercup4: {
    gridArea: 'spCup4',
    ...cupsStyle,
  },
  secondPlayercup5: {
    gridArea: 'spCup5',
    ...cupsStyle,
  },
  secondPlayercup6: {
    gridArea: 'spCup6',
    ...cupsStyle,
  },
  inactive: {
    opacity: 0.6,
    cursor: 'not-allowed',
    pointerEvents: 'none',
  },
})

export default useStyles
