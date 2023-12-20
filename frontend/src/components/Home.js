import React, { useState } from 'react'
import { IconButton } from '@chakra-ui/react'
import { CiSearch } from "react-icons/ci";
import Passenger from './Passenger';

export default function Home() {
    const [routeID, setRouteID] = useState('')
    const [click, setClick] = useState(false)
    const [coords, setCoords] = useState(null)
    const handleChange = (e) => {
        e.preventDefault();
        setRouteID(e.target.value)
      }
      const handleSearch = async () => {
        let headersList = {
          "Accept": "*/*",
          "User-Agent": "Thunder Client (https://www.thunderclient.com)"
         }
         
         let response = await fetch(`http://127.0.0.1:5000/api/bus/${routeID}`, { 
           method: "GET",
           headers: headersList
         });
         
         let data = await response.text();
         if (data === "Invalid Route ID") return 
         let parsedData = JSON.parse(data)
         console.log(parsedData)
         setCoords(parsedData['location'])
         
        setClick(true)
      }
  return (
    <>
        {routeID}
        <input type='text' onChange={handleChange} />
        <IconButton
  isRound={true}
  variant='solid'
  colorScheme='teal'
  aria-label='Done'
  fontSize='20px'
  icon={<CiSearch />}
  onClick={handleSearch}
/>
{click ? <Passenger props={coords} />: null}
    </>
  )
}
