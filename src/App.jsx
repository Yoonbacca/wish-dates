import { GoogleMap, MarkerF, useJsApiLoader, Autocomplete, DirectionsRenderer} from "@react-google-maps/api";
import { React, useState, useMemo, useRef } from 'react'
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  Text,
} from '@chakra-ui/react'
import { FaLocationArrow, FaTimes } from 'react-icons/fa'

const center = {lat: 41.8781, lng: -87.6298}

const App = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY || "",
    libraries: ['places'], // Enables places api
  })

  const [map, setMap] = useState( /** @type google.maps.Map */ (null)) // Study this more later

  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')

  /** @type React.MutableRefobject<HTMLInputElement> */
  const originRef = useRef()
  /** @type React.MutableRefobject<HTMLInputElement> */
  const destinationRef = useRef()

  if (!isLoaded) {
    return <div>Loading</div>
  }

  async function calculateRoute() {
    if (originRef.current.value === "" || destinationRef.current.value === "") {
      return
    }
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value(),
      travelMode: google.maps.TravelMode.DRIVING
    })
    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)

  }

  function clearRoute() {
    setDirectionsResponse(null)
    setDistance("")
    setDuration("")
    originRef.current.value = ""
    destinationRef.current.value = ""
  }

  return (
    <Flex
      position='relative'
      flexDirection='column'
      alignItems='center'
      bgColor='blue.200'
      h='100vh'
      w='100vw'
    >
      <Box position='absolute' left={0} top={0} h='100%' w='100%'>
        {/* Google Map Box */}
        <GoogleMap 
          center={center} 
          zoom={15} 
          mapContainerStyle={{width: '100%', height: '100%'}}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={(map)=> setMap(map)}
          >
            <MarkerF position={center} />
            {directionsResponse && (<DirectionsRenderer directions={directionsResponse}/>)}
          {/* Display markers or directions */}
        </GoogleMap>
      </Box>

      <Box
        p={4}
        borderRadius='lg'
        mt={4}
        bgColor='white'
        shadow='base'
        minW='container.md'
        zIndex='1'
      >
        <HStack spacing={4}>
          <Autocomplete style={{ position: 'absolute', zIndex: 999 }}>
            <Input type='text' placeholder='Origin' ref={originRef}/>
          </Autocomplete>
          <Autocomplete style={{ position: 'absolute', zIndex: 999 }}>
            <Input type='text' placeholder='Destination' ref={destinationRef}/>
          </Autocomplete>
          <ButtonGroup>
            <Button colorScheme='pink' type='submit' onClick={calculateRoute}>
              Calculate Route
            </Button>
            <IconButton
              aria-label='center back'
              icon={<FaTimes />}
              onClick={clearRoute}
            />
          </ButtonGroup>
        </HStack>
        <HStack spacing={4} mt={4} justifyContent='space-between'>
          <Text>Distance: </Text>
          <Text>Duration: </Text>
          <IconButton
            aria-label='center back'
            icon={<FaLocationArrow />}
            isRound
            onClick={() => map.panTo(center)}
          />
        </HStack>
      </Box>
    </Flex>
  );
};

export default App;