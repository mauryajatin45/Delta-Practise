import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Lottery from './Lottery'
import './styles.css'

function App() {

  return (
    <>
      <Lottery/>
      <div className="alert">
        <p>You will only win if the sum of the number becomes 15</p>
      </div>
    </>
  )
}

export default App