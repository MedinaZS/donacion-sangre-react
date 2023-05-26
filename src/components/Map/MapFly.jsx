import { useEffect } from "react"
import { useMap } from "react-leaflet"


const MapFly = ({ latlng }) => {
    const map = useMap()
    useEffect(() => {
        if(latlng)map.flyTo(latlng, map.getZoom())
    }, [latlng])
    
    return null
}

export default MapFly