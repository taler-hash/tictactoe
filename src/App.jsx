import { useEffect, useState} from 'react'
import './App.css'
import { ConfigContext } from './context/config'

import StartNewGame from './views/StartNewGame'
import UserName from './views/UserName'
import TicTacToe from './views/TicTacToe'
import Navbar from './components/Navbar'
import Winner from './views/Winner'

function App() {
  const [ config, setConfig ] = useState({})

  function initConfig(type) {
    let _config = {
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
      prevGameResults: []
    }

    if(type === 'new') {
      setConfig(_config)
    } else if(type === "stop") {
      _config.prevGameResults = config.prevGameResults
      setConfig(_config)
    } else {
      _config = {
        ..._config,
        started: true,
        startGame:true,
        player1: {
          ..._config.player1,
          username: config.player1?.username
        },
        player2: {
          ..._config.player2,
          username: config.player2?.username
        },
        prevGameResults: config.prevGameResults

      }
    }
  }

  function initGame(type) {
    if(type === 'start') {
      const player = randomizedPlayerTurn()
      setConfig((prev) => {
        return {
          ...prev,  
          startGame: true, 
          turn: player,
        }
      })
    randomizedMarks()
    } else {

    }
  }

  function randomizedMarks() {
    const marks = ['circle', 'x']

    const player1Mark =  marks[Math.floor(Math.random() * marks.length)]  
    const player2Mark = marks.filter(mark => mark !== player1Mark)[0]

    setConfig(prev => ({
      ...prev,
      player1: {...prev.player1, mark: player1Mark},
      player2: {...prev.player2, mark: player2Mark}
    }))
  }

  function randomizedPlayerTurn() {
    const playerNumber = Math.floor(Math.random() * 2) + 1;
    return `player${playerNumber}`
  }


  useEffect(() => {
    initConfig('new')
  },[])

  function isStarted() {
    if(!config.started) {
      return <StartNewGame />
    } else {
      if(!config.startGame) {
        return <UserName/>
      } else {
        if(config.winner) {
          return <Winner />
        }
        return <TicTacToe />
      }
    }
  }

  return (
    <main className='w-full h-screen'>
      <ConfigContext.Provider value={{config, setConfig, initConfig, initGame}}>
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
