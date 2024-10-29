import { useEffect, useState } from 'react'

function App() {
  const [enabled, setEnable] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleClick = () => {
    setEnable(!enabled)
  }

  useEffect(() => {
    console.log('useEffect')

    const handleMove = (e) => {
      const { clientX, clientY } = e
      console.log('handleMove: ', { clientX, clientY })
      setPosition({ x: clientX, y: clientY })
    }

    if (enabled) window.addEventListener('pointermove', handleMove)

    //Cleanup: When the component is dismount or dependencies change, before execute the effect again
    return () => {
      window.removeEventListener('pointermove', handleMove)

      //getEventListeners(window)  <-- See suscriptions
    }
  }, [enabled])

  return (
    <main className='row'>
      <div className='col text-center'>
        <h2>Mouse Follower</h2>
        <div
          style={{
            position: 'absolute',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            border: '1px solid #fff',
            borderRadius: '50%',
            opacity: 0.8,
            pointerEvents: 'none',
            left: -25,
            top: -25,
            width: 50,
            height: 50,
            transform: `translate(${position.x}px, ${position.y}px)`
          }}
        ></div>
        <button onClick={handleClick} className='btn btn-primary'>
          {enabled ? 'Disable' : 'Enable'}
        </button>
      </div>
    </main>
  )
}

export default App
