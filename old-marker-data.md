## Data Points

as taken from reverse engineering the old site at 

https://github.com/tableflip/landexplorer

###About This Land

https://www.dropbox.com/s/xlk53bq31prsx34/Screenshot%202018-05-17%2015.35.50.png?dl=0

main rendering done in **place-intro.js**

**index.js - lookupPlaceInfo(), getPlaceData(), getWikiEntry()**


Given the Lat and Long the code is using MAPBOX.js functionality through **MapboxClient.geocodeReverse**
getPlaceData() getPlaceData.js
reverseGeo() reverseGeo.js

>**Note:** a potential replacement for this service could be OS https://apidocs.os.uk/docs/os-places-nearest
>However, the service requires the lat/long be converted into BNG first http://www.bgs.ac.uk/data/webservices/convertform.cfm

```
<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
<script type="text/javascript">
$(document).ready(function() {
  var url = 'https://api.ordnancesurvey.co.uk/places/v1/addresses/nearest?point=361326,407160&radius=1000';
  var apiKey = '&key=API_KEY';
  $.getJSON(url + apiKey, function(data){
    console.log(data);
  });
});
</script>
```


https://www.dropbox.com/s/cpbv9zxjtvy4lhk/Screenshot%202018-05-17%2015.53.27.png?dl=0
https://www.dropbox.com/s/ll9qfrb4pam1qqs/Screenshot%202018-05-17%2015.54.20.png?dl=0

Given some address details about the point on the map a WIKIPEDIA lookup is done through the API
It will take, in order of preference, the 
const wikiQuery = placeData.place || placeData.address || placeData.postcode;

**getWikiEntry() getWikiEntry.js**

https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=wigan

the code parses out some unwanted text with regex

`str.replace(/\s*\([^)]*\)/g, '')`

it uses the 'place' first as the address (or postcode for that matter) is very very unlikely to have a wiki entry worth outputing

https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=Sussex%20Close


###Features


Compare
https://www.dropbox.com/s/cj01a5ff8y6qudm/Screenshot%202018-05-17%2016.16.53.png?dl=0
https://www.dropbox.com/s/v8paj86mirkaz0u/Screenshot%202018-05-17%2016.16.39.png?dl=0

code it's using...
https://www.mapbox.com/mapbox-gl-js/api/
queryRenderedFeatures(point,features);

same json coming back which is then converted into what we want against a set of layers
```  
const layers = [
      'landcover_crop',
      'landcover_wood',
      'landcover_grass',
      'landcover_scrub',
      'landcover_snow',
      'national_park',
      'wetlands',
      'park',
      'sand',
      'glacier',
      'agriculture'
    ]
```
    
it seems the only features from the VectorTileFeatures we are interested in are....
```
const sources = { landcover: [], landuse: [], landuse_overlay: [], contour: [] }
```

###Elevation

Taken from the contour feature property 'ele'
https://www.dropbox.com/s/2whoalatxz2fb3d/Screenshot%202018-05-17%2016.27.29.png?dl=0

** WE SHOULD BE ABLE TO QUERY THIS Mapbox Terrain Layer**

###Land Type

This is pulled from the features.



https://www.dropbox.com/s/3kejkm3iztv8f2i/Screenshot%202018-05-17%2016.20.29.png?dl=0
https://www.dropbox.com/s/bel2crf973svzeq/Screenshot%202018-05-17%2016.23.38.png?dl=0

Has a resultant class that is worked out which then just references a SVG
eg grass.svg crop.svg

** WE SHOULD BE ABLE TO QUERY THIS Mapbox Terrain Layer**

In Querying the MapBox Terrain layer my guess is it is a 'free' API call as you specify which layers you want to filter.
We need to run at least one query to get the 'land grade' so if we query the Mapbox Terrain Layer as well we'd get the elevation and land type back in the feature set.


###Inspire ID

https://github.com/tableflip/landexplorer-api

The service has been withdrawn for now so we wito look into reinstating or writing our own.

