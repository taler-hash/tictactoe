import { useEffect, useState, lazy, Suspense } from 'react'
import './App.css'
import { ConfigContext } from './context/config'
import LoadingScreen from './components/loadingScreen'

const StartNewGame = lazy(() => import('./views/StartNewGame')) 
const UserName = lazy(() => import('./views/UserName')) 
const TicTacToe = lazy(() => import('./views/TicTacToe')) 
const Navbar = lazy(() => import('./components/Navbar')) 
const Winner = lazy(() => import('./views/Winner')) 
const Footer = lazy(() => import('./components/footer')) 

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
    } else {
      _config.prevGameResults = config.prevGameResults
      setConfig(_config)
    }
    
  }

  function initGame(type) {
    const player = randomizedPlayerTurn()

    if(type === 'start') {
      setConfig((prev) => {
        return {
          ...prev,  
          startGame: true, 
          turn: player,
        }
      })
    
    } else {
      setConfig(prev => {
        return {
          ...prev,
          turn:player,
          winner: null,
          started: true,
        startGame:true,
        player1: {
          ...prev.player1,
          username: config.player1?.username,
          tiles: []
        },
        player2: {
          ...prev.player2,
          username: config.player2?.username,
          tiles: []
        },
        prevGameResults: config.prevGameResults
        }
      })
    }

    randomizedMarks()
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
    <main className={'w-full h-screen ' + `bg-[url('./assets/marksbg-5.png')]`} >
      <ConfigContext.Provider value={{config, setConfig, initConfig, initGame}}>
        
          <Navbar />
          <div className='relative h-[calc(100%-4.5rem)] grid place-items-center'>
            <div className="">
              <Suspense fallback={<LoadingScreen />}>
                {isStarted()}
              </Suspense> 
            </div>
            <Footer />
          </div>    
      </ConfigContext.Provider>
    </main>
  )
}

export default App
