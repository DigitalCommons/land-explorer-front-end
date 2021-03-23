import constants from '../constants';

export const mapSources = {
    sources: {
        "raster-tiles": {
            "type": "raster",
            "tiles": [`https://api.os.uk/maps/raster/v1/zxy/Outdoor_3857/{z}/{x}/{y}.png?key=${constants.OS_KEY}`],
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
            "url": "mapbox://joolzt.ay7acj73,joolzt.9edhyytu,joolzt.6dd4p92w,joolzt.50odxxr1,joolzt.cpacrvmx,joolzt.c3j1rh4t,joolzt.4i2tzpgj,joolzt.75llshed,kingmob.8cgpa2xi,kingmob.3mzcsn3y,kingmob.13t9w8d9,kingmob.cwck8dxg,kingmob.4v2uu2el,kingmob.8jl57qha",
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