import PrevGameList from "./prevGameList"

function Navbar() {
  return (
    <div className="w-full p-4">
      <div className="flex items-center gap-x-4">
        <PrevGameList />
        <div>
          <p className="animate-pulse font-mono font-black text-center text-4xl">Tic Tac Toe</p>
        </div>
      </div>
    </div>
  )
}

export default Navbar