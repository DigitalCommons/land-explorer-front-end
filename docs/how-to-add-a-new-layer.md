## How to add a new layer

This guide explains how to create a vector tileset in Mapbox studio and how to use this tileset to create a new map layer in Land Explorer.

If your data file is < 300 MB, this process is much more straightforward as you can upload your data file directly via Mapbox studio and create your tileset. 
Your data file needs to be either GeoJSON, Shapefile (zipped), KML, GPX or CSV format. Jump to step 6 below to see how to wire it into Land Explorer.

Otherwise, you need to use the [Mapbox Tiling Service (MTS)](https://docs.mapbox.com/mapbox-tiling-service/guides) to create your tileset. [Here is a tutorial of how to upload a new tileset using this service.](https://docs.mapbox.com/help/tutorials/get-started-mts-and-tilesets-cli.)

Below are the key steps documented.

### Prerequisites
You'll need:
- a token with the following permissions:
`tilesetswrite`, `tilesetsread`, and `tilesetslist` (There is a `Tileset MTS` key in Bitwarden - under the mapbox account entry that has these permissions)
- to install this CLI https://github.com/mapbox/tilesets-cli

### Process
#### 1. Download and convert the source data
You need your source data file to be in line-delimited GeoJSON format.

The Mapbox docs state
>Please note that if your source data is a FeatureCollection, tilesets must read it all into memory to split it up into separate features before uploading it to the Tilesets API. You are strongly encouraged to provide your data in line-delimited GeoJSON format instead, especially if it is large.

If your file is in regular GeoJSON format, you can use the following command to convert your file to be line-delimited GeoJSON.
```bash
ogr2ogr -f GeoJSONSeq ~/Downloads/data.geojson.ld ~/Downloads/data.geojson
```

#### 2. Upload the tileset
Ensure you've set your `MAPBOX_ACCESS_TOKEN` as an environment variable in your terminal.

Use the line-delimited GeoJSON file and upload the tileset via:

`tilesets upload-source <username> <source_id> <filepath>` 

(docs for this https://github.com/mapbox/tilesets-cli/blob/master/README.md#upload-source)

This will take a while if your file is large. Mapbox recommends splitting very large sources into chunks if it times out.
You may want to use the `--no-validation` flag if you have issues. The docs state that this can be helpful for large file uploads but it will not validate source data locally before uploading.

#### 3. Create a recipe 
This is a config file that tells mapbox how to transform the tileset that we uploaded in step 2.

See the docs https://docs.mapbox.com/mapbox-tiling-service/recipe-specification/vector

Below is an example recipe. We can change the recipe whenever we want so if we don't get this right the first time, that's fine!

Example:
```json
{
  "version": 1,
  "layers": {
    "{layer_name}": {
      "source": "mapbox://tileset-source/{username}/{source_id}",
      "minzoom": 8,
      "maxzoom": 13
    }
  }
}

```

Note that high zoom levels may incur higher costs.

#### 4. Create the tileset
Run the following
`tilesets create <username.tileset id> --recipe <path to recipe> --name "<name of tileset>"`

docs are here - https://github.com/mapbox/tilesets-cli#create

#### 5. Publish the tileset
Run the following

`tilesets publish <username.tileset id>`

docs are here - https://github.com/mapbox/tilesets-cli#publish

This starts a job, so to check the status, you can run
`tilesets status <username.tileset id>`

Once completed, you can see the new tileset in the mapbox studio 🎉

> **Note on costs:** Uploading source data and creating the tileset (steps 2–4) are free. Charges are incurred when you publish (this step): a one-time processing fee based on file size, plus an ongoing daily hosting fee per tileset. There is a free tier which at the time of writing is 10,000 MB/month and 20 CUs a month free. 


#### 6. Wire it into LandExplorer

**src/data/mapSources.ts**:
Append the <username.tileset ID> to the hardcoded composite URL 
`mapbox://joolzt.ay7acj73,...existing-ids...,username.tilesetId`

**src/components/map/MapLandDataLayers.tsx** - two changes needed:
1. Append the <username.tileset ID> to the hardcoded composite URL 
`mapbox://joolzt.ay7acj73,...existing-ids...,username.tilesetId`

2. Add a `Layer` after the existing ones. 
You can match on certain fields to style them differently. 
For data sets with overlapping data, you may need to use multiple Layer components so you have control over which layer sits on top. See the example for `flood-risk-level`:

```jsx
const floodRiskVisible = landDataLayers.includes("flood-risk-zone");

<Layer // Zone 1 must render below Zone 2 so Zone 2 fills overlap correctly
    id="flood-risk-zone-1"
    type="fill"
    sourceId="composite"
    sourceLayer="flood-risk-zone"
    minZoom={8}
    layout={{
      visibility: "visible",
    }}
    filter={["==", ["get", "flood-risk-level"], "1"]}
    paint={{
      "fill-color": "#F6D55C",
      "fill-opacity": floodRiskVisible ? 0.4 : 0,
    }}
  />
<Layer // Zone 2 must render below Zone 3 so Zone 3 fills overlap correctly
  id="flood-risk-zone-2"
  type="fill"
  sourceId="composite"
  sourceLayer="flood-risk-zone"
  minZoom={8}
  layout={{
    visibility: "visible",
  }}
  filter={["==", ["get", "flood-risk-level"], "2"]}
  paint={{
    "fill-color": "#F28E2B",
    "fill-opacity": floodRiskVisible ? 0.4 : 0,
  }}
/>
<Layer
  id="flood-risk-zone-3"
  type="fill"
  sourceId="composite"
  sourceLayer="flood-risk-zone"
  minZoom={8}
  layout={{
    visibility: "visible",
  }}
  filter={["==", ["get", "flood-risk-level"], "3"]}
  paint={{
    "fill-color": "#E03B33",
    "fill-opacity": floodRiskVisible ? 0.4 : 0,
  }}
/>
```

**src/components/left-pane/LeftPaneLandData.tsx** - add a toggle inside the `<Draggable>` block within the **Land Data** `DataLayersContainer`:

Example:
```jsx
<LandDataLayerToggle
  draggable
  title="Flood risk zones"
  layerId="flood-risk-zone"
/>
```

**src/data/mapLayerKeyConfig.ts** - add the legend entry:

Example:
```js
"flood-risk-zone": {
  name: "Flood risk zones",
  data: {
    "Zone 1 (low)": "#F6D55C",
    "Zone 2 (medium)": "#F28E2B",
    "Zone 3 (high)": "#E03B33",
  },
},
```

