import React from 'react'
import "../css/QuoraBox.css"
import { Avatar } from '@mui/material'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'
const QuoraBox = () => {
  const user = useSelector(selectUser)
  return (
    <div className="quoraBox">
      <div className="quoraBox__info">
        <Avatar
        src = {user.photo}/>
        <h5>{user.displayName}</h5>
      </div>
      <div className='quoraBox__quora'>
        <p>What is your question or link</p>
      </div>
    </div>
  )
}

export default QuoraBox
