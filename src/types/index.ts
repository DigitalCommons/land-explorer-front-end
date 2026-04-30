// Shared type definitions used across multiple files

export type Action<T = unknown> = {
  type: string;
  payload?: T;
};

export type LngLat = {
  lng: number;
  lat: number;
};
