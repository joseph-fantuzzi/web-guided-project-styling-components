import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL, API_KEY } from '../constants'
import Details from './Details'
import Friend from './Friend'

import { Spinner } from 'reactstrap';

export default function App() {
  const [friends, setFriends] = useState(null)
  const [currentFriendId, setCurrentFriendId] = useState('1')

  const openDetails = id => {
    setCurrentFriendId(id)
  }

  const closeDetails = () => {
    setCurrentFriendId(null)
  }

  useEffect(() => {
    axios.get(`${BASE_URL}/friends?api_key=${API_KEY}`)
      .then(res => {
        setTimeout(() => {
          setFriends(res.data)
        }, 5000)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <div className='container'>
      <h1>My friends:</h1>
      {
        friends 
        ? friends.map(fr => {
          return <Friend besty={fr.id % 2 === 0} key={fr.id} info={fr} action={openDetails} />
        })
        : <Spinner>Loading...</Spinner>
      }
      {
        currentFriendId && <Details friendId={currentFriendId} close={closeDetails} />
      }
    </div>
  )
}
