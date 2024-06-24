import { useContext, useRef } from "react"
import { ConfigContext } from "../context/config"

function UserName () {
  const {setConfig} = useContext(ConfigContext)
  const username = useRef()
  return (
    <div className="space-y-2 grid">
      <input placeholder="Input User name" className="rounded-xl border-[5px] border-gray-800 text-gray-800 bg-gray-500/50 font-bold text-2xl px-2 py-4" ref={username}/>
      <button className="px-1 py-2 rounded-xl border-[5px] border-green-800 text-green-800 bg-green-500/50 font-medium text-lg transition-all hover:scale-105">Start</button>
    </div>
  )
}

export default UserName