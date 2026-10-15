import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { APIProvider, Map, AdvancedMarker, Pin, ColorScheme } from '@vis.gl/react-google-maps';
const KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const calculateDistanceKm = (p1, p2) => {
  const R = 6371;
  const dLat = ((p2.lat - p1.lat) * Math.PI) / 180;
  const dLng = ((p2.lng - p1.lng) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((p1.lat * Math.PI) / 180) *
      Math.cos((p2.lat * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return (R * c).toFixed(1);
};

export const GoogleMapContainer = ({garages, selectedLocation, setSelectedLocation}) => {
  const API_KEY =KEY;
  const [currentPosition, setCurrentPosition] = useState({ lat: 32.0853, lng: 34.7818 });
  

  useEffect(() => {
    if (!('geolocation' in navigator)) return;

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentPosition({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error('שגיאה במעקב אחר המיקום:', error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return (
    <Card className="fluid shadow-sm p-0 m-0">
      <Card.Body className="p-0">
        <APIProvider apiKey={API_KEY}>
          <div style={{ width: '100%', height: '800px' }}>
            <Map
              defaultCenter={currentPosition}
              defaultZoom={20}
              gestureHandling={'greedy'}
              disableDefaultUI={false}
              mapId={'DEMO_MAP_ID'}
              colorScheme={ColorScheme.DARK}
            >
              <AdvancedMarker position={currentPosition} title="המיקום שלך">
                <Pin background={'#0284c7'} glyphColor={'white'} borderColor={'#0369a1'} />
              </AdvancedMarker>

              {garages.map((loc) => (
                <AdvancedMarker
                  key={loc.id}
                  position={loc.location.position}
                  onClick={() => setSelectedLocation(selectedLocation?.id === loc.id ? null : loc)}
                >
                  <Pin background={'white'} glyphColor={'black'} borderColor={'orange'} />
                </AdvancedMarker>
              ))}

              {selectedLocation && (
                <AdvancedMarker
                  position={selectedLocation.location.position}
                  zIndex={1000}
                >
                  <div
                    className='d-flex align-items-center gap-2 px-3 py-2'
                    onClick={() => setSelectedLocation(null)}
                    style={{
                      position: 'relative',
                      bottom: '50px',
                      backgroundColor: 'rgba(15, 23, 42, 0.65)',
                      backdropFilter: 'blur(8px)',
                      borderRadius: '8px',
                      border: '1px solid #334155',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
                      whiteSpace: 'nowrap',
                      cursor: 'pointer',
                      transform: 'translateX(-50%)'
                    }}
                  >
                    <div style={{ fontWeight: 'bold', color: 'white' }}>{selectedLocation.location.title}</div>
                    <div style={{ fontWeight: 'bold', color: 'orange' }}>⬤</div>
                    <div style={{ fontWeight: 'bold', color: 'white' }}>
                      {calculateDistanceKm(currentPosition, selectedLocation.location.position)} ק"מ
                    </div>
                  </div>
                </AdvancedMarker>
              )}
            </Map>
          </div>
        </APIProvider>
      </Card.Body>
    </Card>
  );
};

export default GoogleMapContainer;
