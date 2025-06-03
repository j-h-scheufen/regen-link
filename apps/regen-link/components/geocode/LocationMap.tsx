import { createMapLibreGlMapController } from '@maptiler/geocoding-control/maplibregl-controller';
import { GeocodingControl } from '@maptiler/geocoding-control/react';
import type { Feature, MapController } from '@maptiler/geocoding-control/types';
import maplibregl from 'maplibre-gl';
import { useEffect, useRef, useState } from 'react';

import '@maptiler/geocoding-control/style.css';
import 'maplibre-gl/dist/maplibre-gl.css';

import ENV from '@/config/environment';

type Props = {
  initialFeature?: Feature | null;
  onSelectionChange: (feature: Feature, coordinates: [number, number]) => void;
};

const LocationMap = ({ onSelectionChange }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [controller, setController] = useState<MapController | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: `https://api.maptiler.com/maps/basic/style.json?key=${ENV.mapTilerKey}`,
      center: [4.35, 50.85],
      zoom: 12,
      attributionControl: false,
    });

    const handleControllerLoading = () => {
      setController(createMapLibreGlMapController(map, maplibregl));
    };

    map.on('style.load', handleControllerLoading);

    return () => {
      setController(null);

      // make sure the map is destroyed AFTER the controller has time to unmount
      setTimeout(() => {
        map.off('style.load', handleControllerLoading);
        map.remove();
      }, 0);
    };
  }, []);

  return (
    <div
      style={{
        width: '100%',
        height: 400,
        position: 'relative',
        borderRadius: 8,
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 1 }}>
        {controller && (
          <GeocodingControl
            mapController={controller}
            apiKey={ENV.mapTilerKey}
            placeholder="Search address…"
            language="en"
            limit={5}
            debounceSearch={1200}
            onSelect={(feature) => {
              if (
                feature?.feature &&
                feature.feature.geometry?.type === 'Point' &&
                Array.isArray(feature.feature.geometry.coordinates)
              ) {
                const coords = feature.feature.geometry.coordinates as [number, number];
                onSelectionChange(feature.feature, coords);
              }
            }}
          />
        )}
      </div>
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default LocationMap;
