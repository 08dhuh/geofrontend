import React, { useState } from 'react';
import { MapContainer, TileLayer, useMapEvents, GeoJSON, Marker, Popup } from 'react-leaflet';
import geojsonData from '../assets/Extent_LTA.json'
import { useGlobalConfig } from '../GlobalConfigContext';

const LocationMarker = ({ setCoordinates, markerPosition, setMarkerPosition }) => {
    useMapEvents({
        click(e) {
            //const { lat, lng } = e.latlng;
            const lat = Number(e.latlng.lat.toFixed(5));
            const lng = Number(e.latlng.lng.toFixed(5));

            setCoordinates([lat, lng]);
            setMarkerPosition([lat, lng]);
        },
    });
    return markerPosition ? (<Marker position={markerPosition}>
        <Popup>{`${markerPosition[0].toFixed(5)}, ${markerPosition[1].toFixed(5)}`}</Popup>
    </Marker>) : null;
};

const InteractiveMap = () => {

    const { setCoordinates, setMapInstance } = useGlobalConfig();
    const [markerPosition, setMarkerPosition] = useState(null);
    return (
        <MapContainer
            center={[-38.1950, 146.5400]}
            zoom={13}
            className="leaflet-container"
            // ref={mapRef}
            //whenReady={(e) => onMapCreated(e.target)}
            whenReady={(e) => setMapInstance(e.target)}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <LocationMarker
                setCoordinates={setCoordinates}
                markerPosition={markerPosition}
                setMarkerPosition={setMarkerPosition}
            />
            <GeoJSON data={geojsonData} style={{ color: 'blue', weight: 2 }} />
        </MapContainer>
    );
};

export default InteractiveMap;
//