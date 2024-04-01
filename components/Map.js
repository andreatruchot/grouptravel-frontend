// components/Map.js
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
// Configuration des icônes de marqueur Leaflet
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/images/marker-icon-2x.png',
  iconUrl: '/images/marker-icon.png',
  shadowUrl: '/images/marker-shadow.png',
});

const UpdateMapCenter = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, 13);
    }
  }, [center, map]);

  return null;
};

const Map = ({ location }) => {
  const [center, setCenter] = useState(null);

  useEffect(() => {
    const fetchCoordinates = async () => {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${location}`);
      const data = await response.json();
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        setCenter([parseFloat(lat), parseFloat(lon)]);
      }
    };

    if (location) {
      fetchCoordinates();
    }
  }, [location]);

  return center ? (
    <MapContainer center={center} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={center}>
        <Popup>{location}</Popup>
      </Marker>
      <UpdateMapCenter center={center} />
    </MapContainer>
  ) : (
    <p>Chargement de la carte...</p>
  );
};

export default Map;
