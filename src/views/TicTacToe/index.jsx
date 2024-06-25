
import Tiles from './Tiles'
import UserTurn from "./UserTurn"

function TicTacToe() {
  return (
    <>
      <div className='w-80 grid place-items-center'>
          <UserTurn />
          <Tiles />
      </div>
    </>
  )
}

export default TicTacToe