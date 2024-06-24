import { useState, useContext } from 'react'
import { ConfigContext } from '../context/config'

function PrevGameList() {
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

function List(props) {
  const { config } = useContext(ConfigContext)

  return (
    <div className={'absolute top-0 left-0 z-10 h-screen border bg-gray-200 transition-all overflow-hidden w-56 ' +
      (props.show ? 'translate-x-0' : '-translate-x-56')
    }>
      {/* Header */}
      <div className='p-3 flex items-center justify-between border-b-2 border-gray-500'>
        <p className='font-bold'>Previous Games</p>
        <button onClick={props.closeShow}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      {/* Lists */}
      {
        JSON.stringify(config.prevGameResults)
      }
    </div>
  )
}

export default PrevGameList