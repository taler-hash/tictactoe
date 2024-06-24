import { useContext, useRef } from "react"
import { ConfigContext } from "../context/config"

function UserName () {
  const {config, setConfig} = useContext(ConfigContext)

  function setUsername(...e) {
    const [ username, player ] = e
    setConfig(prev => ({...prev, [player]: {...prev[player], username: username} }))
  }


  function startGame() {
    const player = randomizedPlayerTurn()
    setConfig((prev) => {
      return {
        ...prev,  
        startGame: true, 
        turn: player,
      }
    })
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

  return (
    <div className="space-y-2 grid">
      <div>
        <p className="font-medium text-xl mb-2">Player 1</p>
        <input 
          onChange={(e) => setUsername(e.target.value, 'player1')} 
          placeholder="Input User name" 
          className="rounded-xl border-[5px] border-gray-800 text-gray-800 bg-gray-500/50 font-bold text-2xl px-2 py-4"/>
      </div>
      <div>
        <p className="font-medium text-xl mb-2">Player 2</p>
        <input 
          onChange={(e) => setUsername(e.target.value, 'player2')} 
          placeholder="Input User name" 
          className="rounded-xl border-[5px] border-gray-800 text-gray-800 bg-gray-500/50 font-bold text-2xl px-2 py-4"/>
      </div>  
      <button 
        disabled={!config.player1.username && !config.player2.username} 
        onClick={startGame} 
        className="px-1 py-2 rounded-xl border-[5px] border-green-800 text-green-800 bg-green-500/50 font-medium text-lg transition-all hover:scale-105 disabled:hover:scale-100">Start</button>
    </div>
  )
}

export default UserName