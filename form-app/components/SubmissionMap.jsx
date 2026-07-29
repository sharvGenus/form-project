export default function SubmissionMap({ latitude, longitude, label }) {
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
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        //   url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={markerIcon}>
          <Popup>{label || 'Submission location'}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}