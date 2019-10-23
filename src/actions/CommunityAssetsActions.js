export const turnOnLayer = (nodes) => {
    return {
    type: 'ASSET_TYPE_ON',
    payload: {
        communityAssetsType:   "Community Space",
        name:                   nodes,
    }
  }
}

export const turnOffLayer = (nodes) => {
    return {
    type: 'ASSET_TYPE_OFF',
    payload: {
        communityAssetsType:   "Community Space",
        name:                   nodes,
    }
  }
}