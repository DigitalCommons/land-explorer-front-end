import constants from '../constants';

export const mapSources = {
    sources: {
        "raster-tiles-night": {
            "type": "raster",
            "tiles": [`https://api2.ordnancesurvey.co.uk/mapping_api/v1/service/zxy/EPSG%3A3857/Night 3857/{z}/{x}/{y}.png?key=${constants.OS_KEY}`],
            "tileSize": 256
        },
        "raster-tiles": {
            "type": "raster",
            "tiles": [`https://api2.ordnancesurvey.co.uk/mapping_api/v1/service/zxy/EPSG%3A3857/Outdoor 3857/{z}/{x}/{y}.png?key=${constants.OS_KEY}`],
            "tileSize": 256
        },
        "mapbox://mapbox.satellite": {
            "url": "mapbox://mapbox.satellite",
            "type": "raster",
            "tileSize": 256
        },
        "mapbox://mapbox.streets": {
            "url": "mapbox://mapbox.streets",
            "type": "raster",
            "tileSize": 256
        },
        "composite": {
            "url": "mapbox://joolzt.ay7acj73,joolzt.9edhyytu,joolzt.6dd4p92w,joolzt.50odxxr1,joolzt.cpacrvmx,joolzt.c3j1rh4t,joolzt.4i2tzpgj,joolzt.75llshed",
            "type": "vector"
        },
    },
    sprite: "mapbox://sprites/joolzt/cjhap78ud0esu2rms1jrh9u3g",
    glyphs: "mapbox://fonts/joolzt/{fontstack}/{range}.pbf",
    satelliteLayer: {
        "id": "mapbox-satellite",
        "type": "raster",
        "source": "mapbox://mapbox.satellite",
        "minzoom": 0,
        "maxzoom": 22,
        "layout": {
            "visibility": "visible"
        },
    },
    topographyLayer: {
        "id": "simple-tiles",
        "type": "raster",
        "source": constants.USE_OS_TILES ? "raster-tiles" : "mapbox://mapbox.streets",
        "minzoom": 0,
        "maxzoom": 22,
        "layout": {
            "visibility": "visible"
        },
    },
}

export default mapSources;