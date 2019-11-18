const INITIAL_STATE = {
    activeCommunityAssets: [],
}
let activeCommunityAssets;
let index;

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'ASSET_TYPE_ON':
            index = state.activeCommunityAssets.indexOf(action.payload.communityAssetsType);
            if(index < 0)
                state.activeCommunityAssets.push(action.payload.communityAssetsType);

            activeCommunityAssets = state.activeCommunityAssets.slice();
            return {
                ...state,
                activeCommunityAssets: activeCommunityAssets,
            };

        case 'ASSET_TYPE_OFF':
            index = state.activeCommunityAssets.indexOf(action.payload.communityAssetsType);
            if(index >= 0)
                state.activeCommunityAssets.splice(index,1);
                
            activeCommunityAssets = state.activeCommunityAssets.slice();

            return {
                ...state,
                activeCommunityAssets: activeCommunityAssets,
            };

        default:
            return state;
    }
}