import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import "./MapaCuritiba.css";
import 'leaflet/dist/leaflet.css';

const MapaCuritiba = () => {
  const position = [-25.4284, -49.2733]; // Coordenadas de Curitiba

  const pinIcon = new L.DivIcon({
    className: 'leaflet-div-icon', // Classe padrão do Leaflet
    html: '<i class="fas fa-map-marker-alt" style="font-size: 32px; color: red;"></i>', // Ícone FontAwesome
    iconSize: [32, 32], // Tamanho do ícone
    iconAnchor: [16, 32], // Posição do ícone (onde o marcador deve se ancorar)
    popupAnchor: [0, -32], // Posição do popup
  });

  return (
    <div className="map-wrapper">
    <div className="map-container">
      <MapContainer center={position} zoom={13} style={{ width: '100%', height: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={pinIcon}>
          <Popup>
            Curitiba, Paraná
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  </div>
  );
};

export default MapaCuritiba;
