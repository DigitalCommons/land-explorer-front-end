export const turnOnLayer = (layer) => {
    return {
    type: 'ASSET_TYPE_ON',
    payload: {
        communityAssetsType:   layer,
    }
  }
}

export const turnOffLayer = (layer) => {
    return {
    type: 'ASSET_TYPE_OFF',
    payload: {
        communityAssetsType:   layer,
    }
  }
}