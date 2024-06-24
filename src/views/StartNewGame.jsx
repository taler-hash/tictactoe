import { useContext } from "react"
import { ConfigContext } from "../context/config"

import PrevGameList from "../components/prevGameList"

function StartNewGame() {
  const { setConfig } = useContext(ConfigContext)

  return  (
    <>
      <div className="grid place-items-center">
        <button onClick={() => setConfig((prev) => ({...prev, started:true}))} className="rounded-full border-[5px] border-gray-800 text-gray-800 bg-gray-500/50 font-bold text-2xl px-2 py-4 transition-all hover:scale-105 duration-1000">
            Start New Game
        </button>
      </div>
    </>
  )
}

export default StartNewGame