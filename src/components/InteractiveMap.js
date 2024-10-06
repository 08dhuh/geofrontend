import React from 'react';
import { MapContainer, TileLayer, useMapEvents, GeoJSON } from 'react-leaflet';
import geojsonData from '../assets/Extent_LTA.json'

const LocationMarker = ({ setCoordinates }) => {
    useMapEvents({
        click(e) {
            const { lat, lng } = e.latlng;
            setCoordinates([lat, lng]);
        },
    });
    return null;
};

const InteractiveMap = ({ setCoordinates }) => {
    return (
        <MapContainer center={[-38.1950, 146.5400]} zoom={13} className="leaflet-container">
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <LocationMarker setCoordinates={setCoordinates} />
            <GeoJSON data={geojsonData} style={{ color: 'blue', weight: 2 }} />
        </MapContainer>
    );
};

export default InteractiveMap;
//