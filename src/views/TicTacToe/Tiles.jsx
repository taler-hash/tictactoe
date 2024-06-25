import { useState, useEffect, useContext } from "react"
import { ConfigContext } from "../../context/config"
import MarkIcon from "../../components/markIcon"

function Tiles() {
  const { config, setConfig } = useContext(ConfigContext)
  const [ tiles, setTiles ] = useState([])

  // Initializing Tiles
  function initTiles() {
    let _tiles = []
    for(let tile = 0; tile < 9; tile++) {
      _tiles.push({
        tile: tile,
        player:null,
        mark:null
      })
    }

    setTiles(_tiles)
  }

  useEffect(() => {
    initTiles()
  }, [])

  function handleClickTiles(tileNumber) {
    const players = ['player1', 'player2']

    handleMarkTiles(tileNumber)

    setConfig(prev => ({...prev, turn: players.find(player => player !== config.turn)}))
  }

  function handleMarkTiles(tileNumber) {
    let _tiles = tiles
    _tiles[tileNumber] = {
      tile: tileNumber,
      player: config.turn,
      mark: config[config.turn].mark
    }
    

    // Adding Tiles to players
    let _config = config
    _config[config.turn].tiles.push(tileNumber)
    setConfig(_config)

    // Check Winner Combinations
    checkCombinations()

    // Marking tiles to the player
    setTiles(_tiles)
  }

  function checkCombinations() {
    const winningCombinations = [
      [0, 1, 2], // Top row
      [3, 4, 5], // Middle row
      [6, 7, 8], // Bottom row
      [0, 3, 6], // Left column
      [1, 4, 7], // Middle column
      [2, 5, 8], // Right column
      [0, 4, 8], // Diagonal top-left to bottom-right
      [2, 4, 6]  // Diagonal top-right to bottom-left
    ];

    const playerTiles = config[config.turn].tiles
    const won = winningCombinations.some(c => c.every(v => playerTiles.includes(v)))
    const draw = (config.player1.tiles.length + config.player2.tiles.length) === 9

    if(won) {
      config.winner = config.turn
    } else if (draw) {
      config.winner = 'draw'
    }
    if(config.winner) {
      setConfig(prev => ({
        ...prev, 
        prevGameResults: 
          [
            ...prev.prevGameResults, 
            {
              player1: {
                username: prev.player1.username,
                className: prev.winner === 'player1' ? 'text-green-500' : 'text-gray-500'
              },
              player2: {
                username: prev.player2.username,
                className: prev.winner === 'player2' ? 'text-green-500' : 'text-gray-500'
              }
            }
          ]
      }))
    }

  }

  function renderTiles() {
    return(
      <>
        {
          tiles.map((tile) => {
            return <button 
              disabled={tile?.mark}
              key={tile.tile} 
              onClick={() => handleClickTiles(tile.tile)}
              className="w-28 h-28 border border-gray-400 disabled:cursor-not-allowed disabled:bg-gray-200 flex items-center bg-white">
                <MarkIcon mark={tile.mark} size={20} />
              </button>
          })
        }
      </>
    )
  }


  return (
    <div className="w-full grid grid-cols-3">
      {renderTiles()}
    </div>
  )
}


export default Tiles