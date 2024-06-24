import { useContext, useRef } from "react"
import { ConfigContext } from "../context/config"

function UserName () {
  const {config, setConfig, initGame} = useContext(ConfigContext)

  function setUsername(...e) {
    const [ username, player ] = e
    setConfig(prev => ({...prev, [player]: {...prev[player], username: username} }))
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
      <div className="pb-4">
        <p className="font-medium text-xl mb-2">Player 2</p>
        <input 
          onChange={(e) => setUsername(e.target.value, 'player2')} 
          placeholder="Input User name" 
          className="rounded-xl border-[5px] border-gray-800 text-gray-800 bg-gray-500/50 font-bold text-2xl px-2 py-4"/>
      </div>  
      <button 
        disabled={!config.player1.username && !config.player2.username} 
        onClick={initGame('start')} 
        className="btn-success">Start</button>
    </div>
  )
}

export default UserName