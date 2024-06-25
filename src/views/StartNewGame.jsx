import { useContext } from "react"
import { ConfigContext } from "../context/config"

function StartNewGame() {
  const { setConfig } = useContext(ConfigContext)

  return  (
    <>
      <div className="grid place-items-center">
        <button onClick={() => setConfig((prev) => ({...prev, started:true}))} className="btn-primary">
            Start New Game
        </button>
      </div>
    </>
  )
}

export default StartNewGame