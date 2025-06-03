import type { Feature } from 'maplibre-gl';

export type EntityFormValues = {
  name: string;
  description?: string;
  location: [number, number] | null; // [lng, lat]
  feature: Feature | null;
};
