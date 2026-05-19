import { LngLat } from "./types";
/*
    PROD
        if doing a production build, change to true
    ROOT_URL
        if production, should be empty string
        if developing locally, wherever the land-map-server is running on]
    STATIC_SITE_URL
        the url for the static site
    OS_KEY
        ordnance survey Enterprise Maps key
    OS_PLACES_KAY
        ordnance survey Places API key (not needed now, but will be for converting UPRNs to real addresses and vice versa)
    USE_OS_TILES
        if true, use OS raster tiles for Topography layer, otherwise use mapbox street tiles
*/

type Constants = {
  DEV_MODE: boolean;
  STATIC_SITE_URL: string;
  ROOT_URL: string | undefined;
  PAYMENTS_URL: string | undefined;
  OS_KEY: string | undefined;
  OS_PLACES_KEY: string | undefined;
  GEOCODER_TOKEN: string | undefined;
  MAPBOX_TOKEN: string | undefined;
  USE_OS_TILES: boolean;
  MAP_BOUNDS: [LngLat, LngLat];
  LAND_DATA_LAYER_ZOOM_LEVEL: number;
  PROPERTY_BOUNDARIES_ZOOM_LEVELS: {
    all: number;
    pending: number;
    localAuthority: number;
    churchOfEngland: number;
    socialHousing: number;
    unregistered: number;
  };
  MAP_ACCESS_READ_ONLY: number;
  MAP_ACCESS_OWNER: number;
  MAP_ACCESS_READ_WRITE: number;
  DATAGROUP_ACCESS_READ_ONLY: number;
  DATAGROUP_ACCESS_READ_WRITE: number;
};

const constants: Constants = {
  DEV_MODE: import.meta.env.DEV,
  STATIC_SITE_URL: "https://landexplorer.coop",
  ROOT_URL: import.meta.env.VITE_ROOT_URL,
  PAYMENTS_URL: import.meta.env.VITE_PAYMENTS_URL,
  OS_KEY: import.meta.env.VITE_OS_KEY,
  OS_PLACES_KEY: import.meta.env.VITE_OS_PLACES_KEY,
  GEOCODER_TOKEN: import.meta.env.VITE_GEOCODER_TOKEN,
  MAPBOX_TOKEN: import.meta.env.VITE_MAPBOX_TOKEN,
  USE_OS_TILES: true,
  MAP_BOUNDS: [
    { lat: 48.92789850164277, lng: -11.238012966001804 },
    {
      lat: 61.59762543319033,
      lng: 2.7726241015535606,
    },
  ],
  LAND_DATA_LAYER_ZOOM_LEVEL: 9,
  PROPERTY_BOUNDARIES_ZOOM_LEVELS: {
    all: 15,
    pending: 15,
    localAuthority: 14,
    churchOfEngland: 13,
    socialHousing: 13,
    unregistered: 13,
  },
  // These values match up with the backend UserMapAccess enum
  MAP_ACCESS_READ_ONLY: 1,
  MAP_ACCESS_OWNER: 2,
  MAP_ACCESS_READ_WRITE: 3,
  DATAGROUP_ACCESS_READ_ONLY: 1,
  DATAGROUP_ACCESS_READ_WRITE: 3,
};

export const VERSION = "1.1";

export default constants;
