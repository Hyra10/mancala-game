import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  app: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  header: {
    padding: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
})

export default useStyles
