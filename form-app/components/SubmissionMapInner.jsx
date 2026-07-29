'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const markerIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function SubmissionMapInner({ latitude, longitude, label }) {
  if (latitude == null || longitude == null) {
    return (
      <div className="flex h-[420px] items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-sm text-white/40">
        No location data available
      </div>
    );
  }

  const position = [latitude, longitude];

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white">
      <MapContainer
        center={position}
        zoom={14}
        scrollWheelZoom={false}
        style={{ height: '420px', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={markerIcon}>
          <Popup>{label || 'Submission location'}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}