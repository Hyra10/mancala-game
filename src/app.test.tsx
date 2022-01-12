import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  describe('should render correclty', () => {
    it('should reset to initial state', async () => {
      render(<App />)
      const mancalaGameText = await screen.findByText('Mancala Game')
      expect(mancalaGameText).toBeDefined()
    })
  })
})
