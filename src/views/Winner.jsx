import ConfettiExplosion from 'react-confetti-explosion';
import { ConfigContext } from '../context/config';
import { useContext, useEffect, useState } from 'react';
function Winner() {
  const [showFooter, setShowFooter ] = useState(false)
  const { config, initConfig } = useContext(ConfigContext)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowFooter(true)
    },1000)

    return () => clearTimeout(timeout)
  },[])

  function isDraw() {
    if(config.winner === 'draw') {
      return <p className='font-bold text-4xl'>Draw</p>
    }
    return (
      <>
        <ConfettiExplosion />
        <p className='font-bold text-4xl'>Player "{config[config.winner].username}" win</p>
      </>
    )
  }

  return(
    <div className='flex flex-col items-center'>
      {isDraw()}
      <div className={'flex items-center space-x-2 transition-all duration-1000 pt-2 ' + (showFooter ? 'scale-100' : 'scale-0')}>
            <button className='btn-sm-success'>Continue</button>
            <button onClick={() => initConfig('stop')} className='btn-sm-danger'>Stop</button>
        </div>
    </div>
  )
}


export default Winner