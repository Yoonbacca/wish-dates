import { useLoadScript } from "@react-google-maps/api";

export default function Home() {
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: ["places"],

    });
    if (!isLoaded) return <div>Loading...</div>
   return (
    <div>Map</div>
   ) 
}