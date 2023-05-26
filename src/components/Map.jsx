import { useEffect, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet'

const Map = ({ locales }) => {

    // console.log(locales)
    const ZOOM_LEVEL = 13

    const [center, setCenter] = useState(null)

    const link = 'https://www.google.com/maps/search/?api=1&query='

    useEffect(() => {

        if (locales) {
            console.log(locales)
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
                map.flyTo(e.latlng, map.getZoom())
            },
        })

        return position === null ? null : (
            <Marker position={position}>
                <Popup>You are here</Popup>
            </Marker>
        )
    }

    return (
        <>
            {(center && locales) &&
                (<MapContainer center={center} zoom={ZOOM_LEVEL} scrollWheelZoom={false}>
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
                </MapContainer>)
            }

        </>
    )
}

export default Map