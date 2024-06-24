import MarkIcon from "../components/markIcon"
import { ConfigContext } from "../context/config"
import { useContext, useState } from "react"

function TicTacToe() {
  return (
    <>
      <div>
          <User />
          <Tiles />
      </div>
    </>
  )
}

function Tiles() {
  const renderTiles = () => {
    const tiles = []
    for(let tile = 0; tile < 9; tile++) {
      tiles.push(<div key={tile} className="w-32 h-32 border border-gray-400 cursor-pointer"></div>)
    }

    return tiles
  }
  return (
    <div className="grid grid-cols-3">
      {renderTiles()}
    </div>
  )
}

function User() {
  const { config } = useContext(ConfigContext)
  const player = config[config.turn]
  return(
    
    <div className="flex items-center justify-between mb-2">
      <div className="font-medium text-xl"><span className="font-bold">"{player.username}"</span> Turns</div>
      <div className="font-medium flex items-center gap-x-2">Mark: <span className="p-2 border-2 border-gray-400 rounded-md"><MarkIcon mark={player.mark} /></span></div>
    </div>
  )
}

export default TicTacToe