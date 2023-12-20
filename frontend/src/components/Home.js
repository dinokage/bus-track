import React, { useState } from 'react'

export default function Home() {
    const [routeID, setRouteID] = useState('')
    const handleChange = (e) => {
        e.preventDefault();
        setRouteID(e.target.value)
      }
      const handleSearch = () => {
        return <div>
            button clicked with val {routeID}
        </div>
      }
  return (
    <>
        {routeID}
        <input type='text' onChange={handleChange} />
        <button onClick={handleSearch}>search</button>
    </>
  )
}
