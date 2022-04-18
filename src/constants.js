/*
    PROD
        if doing a production build, change to true
    ROOT_URL
        if production, should be empty string
        if developing locally, wherever the land-map-server is running on]
    WP_URL
        the wordpress url
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
    PROD: true,
    WP_URL: 'https://www.landexplorer.cc',
    ROOT_URL: process.env.ROOT_URL,
    PAYMENTS_URL: process.env.PAYMENTS_URL,
    GA_ID: process.env.GA_ID,
    OS_KEY: process.env.OS_KEY,
    OS_PLACES_KEY: process.env.OS_PLACES_KEY,
    GEOCODER_TOKEN: process.env.GEOCODER_TOKEN,
    MAPBOX_TOKEN: process.env.MAPBOX_TOKEN,
    USE_OS_TILES: true,
    MAP_BOUNDS: [{ lat: 48.92789850164277, lng: -11.238012966001804 }, {
        lat: 61.59762543319033,
        lng: 2.7726241015535606
    }],
    LR_POLYGONS_ENABLED: true,
    PROPERTY_BOUNDARIES_ZOOM_LEVEL: 15,
}

export const VERSION = "1.1";

export default constants;
