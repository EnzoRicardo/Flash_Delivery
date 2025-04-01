import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px"
};

const center = { lat: -25.4284, lng: -49.2733 }; // Exemplo: Curitiba

const ServiceArea = () => {
  return (
    <div className="service-area">
      <h2>Área de Cobertura</h2>
      <LoadScript googleMapsApiKey="SUA_CHAVE_DA_API">
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
          <Marker position={center} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default ServiceArea;
