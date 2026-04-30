/// <reference types="vite/client" />

declare module 'uuid';
declare module '@mapbox/mapbox-gl-draw';
declare module '@mapbox/mapbox-gl-draw-static-mode';
declare module 'react-mapbox-gl-draw';
declare module 'react-motion';
declare module 'convert-units';
declare module '@mapbox/mapbox-gl-geocoder';
declare module 'react-responsive';

interface ImportMetaEnv {
  readonly VITE_ROOT_URL: string | undefined;
  readonly VITE_PAYMENTS_URL: string | undefined;
  readonly VITE_OS_KEY: string | undefined;
  readonly VITE_OS_PLACES_KEY: string | undefined;
  readonly VITE_GEOCODER_TOKEN: string | undefined;
  readonly VITE_MAPBOX_TOKEN: string | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
