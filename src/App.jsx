import { useState} from 'react'
import './App.css'
import { ConfigContext } from './context/config'

import StartNewGame from './views/StartNewGame'
import UserName from './views/UserName'
import TicTacToe from './views/TicTacToe'
import Navbar from './components/Navbar'

function App() {
  const [ config, setConfig ] = useState({
    started: false,
    startGame: false,
    player1: {
      tiles: [],
      username: null,
      mark: null
    },
    player2: {
      tiles: [],
      username: null,
      mark: null
    },
    turn: null,
    winner: null,
    showPrevGames: false
  })

  function isStarted() {
    if(!config.started) {
      return <StartNewGame />
    } else {
      if(!config.startGame) {
        return <UserName/>
      } else {
        return <TicTacToe />
      }
    }
  }

  return (
    <main className='w-full h-screen'>
      <ConfigContext.Provider value={{config, setConfig}}>
        <Navbar />
        <div className='relative h-[calc(100%-4.5rem)] grid place-items-center'>
          <div className="">
            {isStarted()}
          </div>
        </div>    
      </ConfigContext.Provider>
    </main>
  )
}

export default App
