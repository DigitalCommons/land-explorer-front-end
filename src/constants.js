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
    //ROOT_URL: '',
    //ROOT_URL: 'http://localhost:8080',
    //ROOT_URL: 'https://localhost:44344',
    ROOT_URL: 'https://cb016292.ngrok.io',
    //ROOT_URL: 'http://2.101.111.138:8080',
    WP_URL: 'https://www.landexplorer.cc',
    GA_ID: 'UA-25676336-2',
    OS_KEY: "bWhK8FOLoVJUaY6WykmzIzPaD44OnHLF",
    OS_PLACES_KEY: "GByeoRG21I61e4WAlXt5ujtqEZEhojdZ",
    MAPBOX_KEY: "",
    USE_OS_TILES: true,
    MAP_BOUNDS: [{lat: 48.92789850164277, lng: -11.238012966001804}, {
        lat: 61.59762543319033,
        lng: 2.7726241015535606
    }]
}

export const VERSION = "1.00";

export default constants;
