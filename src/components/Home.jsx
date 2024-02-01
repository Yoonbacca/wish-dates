import { useLoadScript } from "@react-google-maps/api";

export default function Home() {
    const {isLoaded} = useLoadScript({
        
    });

   return (
    <div>Map</div>
   ) 
}