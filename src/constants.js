/*
    PROD
        if doing a production build, change to true
    ROOT_URL
        if production, should be empty string
        if developing locally, wherever the land-map-server is running on]
    STATIC_SITE_URL
        the url for the static site
    GA_ID
        google analytics
    OS_KEY
        ordnance survey Enterprise Maps key
    OS_PLACES_KAY
        ordnance survey Places API key (not needed now, but will be for converting UPRNs to real addresses and vice versa)
    USE_OS_TILES
        if true, use OS raster tiles for Topography layer, otherwise use mapbox street tiles
*/

const constants = {
  DEV_MODE: process.env.NODE_ENV === "development",
  STATIC_SITE_URL: "https://landexplorer.coop",
  ROOT_URL: process.env.ROOT_URL,
  PAYMENTS_URL: process.env.PAYMENTS_URL,
  GA_ID: process.env.GA_ID,
  OS_KEY: process.env.OS_KEY,
  OS_PLACES_KEY: process.env.OS_PLACES_KEY,
  GEOCODER_TOKEN: process.env.GEOCODER_TOKEN,
  MAPBOX_TOKEN: process.env.MAPBOX_TOKEN,
  USE_OS_TILES: true,
  MAP_BOUNDS: [
    { lat: 48.92789850164277, lng: -11.238012966001804 },
    {
      lat: 61.59762543319033,
      lng: 2.7726241015535606,
    },
  ],
  PROPERTY_BOUNDARIES_ZOOM_LEVELS: {
    all: 15,
    pending: 15,
    localAuthority: 14,
    churchOfEngland: 13,
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
