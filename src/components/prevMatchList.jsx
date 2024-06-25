import { useState, useContext } from 'react'
import { ConfigContext } from '../context/config'

function PrevMatchList() {
  const [ show, setShow ] = useState(false)
  

  return (
    <>
      <Button openShow={() => setShow(true)}/>
      <List 
        show={show}
        closeShow={() => setShow(false)}/>
    </>
  )
}

function Button(props) {
  return (
    <div>
      <div onClick={props.openShow} className='cursor-pointer'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </div>
    </div>
  )
}

function renderList() {
  const { config } = useContext(ConfigContext)

  let results = config.prevGameResults?.toReversed()

  return results?.map((g, gi) => {
    return (
      <p key={gi} className='font-bold text-2xl'>
        <span className={g.player1.className}>{g.player1.username} </span>
        vs
        <span className={g.player2.className}> {g.player2.username}</span>
      </p>
    )
  })
}

function List(props) {
  

  return (
    <div className={'absolute top-0 left-0 z-10 h-screen border bg-gray-200/30 transition-all overflow-hidden w-56 backdrop-blur-md ' +
      (props.show ? 'translate-x-0' : '-translate-x-56')
    }>
      {/* Header */}
      <div className='p-3 flex items-center justify-between border-b-2 border-gray-500'>
        <p className='font-bold'>Previous Matches</p>
        <button onClick={props.closeShow}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      {/* Lists */}
      <div className="w-full p-2 space-y-2 h-[calc(100%-3rem)] overflow-y-auto">
        {
          renderList()
        }
      </div>
    </div>
  )
}

export default PrevMatchList