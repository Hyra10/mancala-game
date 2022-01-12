import { createUseStyles } from 'react-jss'
import woodsvg from '../../assets/wood.svg'

const storeStyle = {
  boxShadow: 'inset 0 0 10px 2px #000',
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  fontSize: 26,
  fontWeight: 'bold',
}

const nameStyles = {
  justifySelf: 'center',
  fontSize: 18,
  fontWeight: 'bold',
  opacity: 0.6,
}

const useStyles = createUseStyles({
  mancalaHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    fontWeight: 'bold',

    '& > button': {
      backgroundColor: '#8C5729',
      border: '2px solid #8C5729',
      color: '#fff',
      padding: '10px 20px',
      fontSize: 16,

      '&:hover': {
        backgroundColor: '#fff',
        color: '#000',
        border: '2px solid #8C5729',
        cursor: 'pointer',
      },
    },
  },
  mancala: {
    border: '1px solid #8C5729',
    display: 'grid',
    gridTemplateAreas: `
      "spName spName spName spName spName spName spName spName"
      "spStore spCup6 spCup5 spCup4 spCup3 spCup2 spCup1 fpStore"
      "spStore fpCup1 fpCup2 fpCup3 fpCup4 fpCup5 fpCup6 fpStore"
      "fpName fpName fpName fpName fpName fpName fpName fpName"
    `,
    padding: 20,
    rowGap: 10,
    columnGap: 20,
    borderRadius: 50,
    gridTemplateRows: '20px 100px 100px 20px',
    gridTemplateColumns: '100px repeat(6, 100px) 100px;',
    backgroundImage: `url(${woodsvg})`,
  },
  firstPlayerName: {
    gridArea: 'fpName',
    alignSelf: 'start',
    ...nameStyles,
  },
  secondPlayerName: {
    gridArea: 'spName',
    alignSelf: 'end',
    ...nameStyles,
  },
  firstPlayerStore: {
    gridArea: 'fpStore',
    ...storeStyle,
  },
  secondPlayerStore: {
    gridArea: 'spStore',
    ...storeStyle,
  },
  active: {
    textShadow: '0px 0px 3px #fff, 0px 0px 3px #fff',
    opacity: 1,
  },
})

export default useStyles
