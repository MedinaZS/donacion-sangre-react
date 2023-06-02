import { useEffect, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet'
import MapFly from './MapFly'

const Map = ({ locales, latlng, link }) => {

    const ZOOM_LEVEL = 15

    const [center, setCenter] = useState(null)


    useEffect(() => {
        if (locales) {
            // console.log(locales)
            let position = [locales[0].latitud, locales[0].longitud]
            // console.log(position)
            setCenter(position)
        }
    }, [locales])
   
    function LocationMarker() {
        const [position, setPosition] = useState(null)
        const map = useMapEvents({
            click() {
                map.locate()
            },
            locationfound(e) {
                setPosition(e.latlng)
                // console.log(e.latlng)
                map.flyTo(e.latlng, map.getZoom())
            },
        })

        return position === null ? null : (
            <Marker position={position}>
                <Popup>Estas aquí</Popup>
            </Marker>
        )
    }


    return (
        <>
            {(center && locales) &&
                (
                    <>
                        <MapContainer center={center} zoom={ZOOM_LEVEL} scrollWheelZoom={false}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                        
                            {locales && locales.map((item, index) => (
                                <Marker key={index} position={[item.latitud, item.longitud]}>
                                    <Popup>
                                        <span className="fw-bold">{item.local_donacion}</span> <br />
                                        {item.direccion ? <>{item.direccion} <br /> </> : ''}
                                        Horario : {item.hora_apertura ? item.hora_apertura + ':00 ' : '00:00 '} a {item.hora_cierre ? item.hora_cierre + ':00 ' : '00:00'} <br />
                                        <a target="_blank" rel="noreferrer" href={link + item.latitud + '%2C' + item.longitud}>Ver en Google Maps</a>
                                    </Popup>
                                </Marker>
                            ))}
                            <LocationMarker />
                            <MapFly latlng={latlng}/>
                        </MapContainer>
                        <p className='text-end small text-body-secondary mb-4'>Haz un solo click en el mapa para redireccionarte a tu posición actual</p>
                    </>
                )
            }

        </>
    )
}

export default Map