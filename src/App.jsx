import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import { useState, useMemo } from 'react'
import React from 'react'
import './App.css'

const App = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY || "",
  });
  const center = useMemo(() => ({ lat: 41.8781, lng: -87.6298 }), []);

  return (
    <div className="App">
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName="map-container"
          center={center}
          zoom={10}
        >
          <MarkerF position={{ lat: 41.8781, lng: -87.6298 }} icon={"http://maps.google.com/mapfiles/ms/icons/green-dot.png"} />
        </GoogleMap>
      )}
    </div>
  );
};

export default App;