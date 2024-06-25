import MarkIcon from "../../components/markIcon"
import { ConfigContext } from "../../context/config"
import { useContext } from "react"

function UserTurn() {
  const { config } = useContext(ConfigContext)
  const player = config[config.turn]
  return(
    
    <div className="w-full flex items-center justify-between mb-2 flex-wrap">
      <div className="font-medium text-xl"><span className="font-bold">"{player.username}"</span> Turns</div>
      <div className="font-medium flex items-center gap-x-2">Mark: <span className="p-2 border-2 border-gray-400 rounded-md bg-white"><MarkIcon mark={player.mark} /></span></div>
    </div>
  )
}

export default UserTurn