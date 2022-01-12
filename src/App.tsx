import Mancala from './components/mancala/mancala'
import useStyles from './app.style'

const App = () => {
  const classes = useStyles()
  return (
    <div className={classes.app}>
      <span className={classes.header}>Mancala Game</span>
      <Mancala />
    </div>
  )
}

export default App
