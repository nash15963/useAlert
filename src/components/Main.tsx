import React from 'react'
import { useAlert } from './useAlert'

const Main = () => {
    const alert = useAlert().showAlert
    const handleClick = () => {
        alert("hello world")
    }
    const handleConfirmClick = () => {
        alert("hello world",()=>{console.log("see devTool console")})
    }
  return (
    <div>
        <div>
        <p>show alert</p>
        <button onClick={handleClick}>alert</button>
        </div>
        <div>
        <p>show confirm</p>
        <button onClick={handleConfirmClick}>confirm</button>
        </div>
    </div>
  )
}

export default Main