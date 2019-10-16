export const turnOnLayer = (nodes) => ({
    type: 'ASSET_TYPE_ON',
    payload: {
        communityAssetsType:   "Community Space",
        name:                   nodes,
    }
  })