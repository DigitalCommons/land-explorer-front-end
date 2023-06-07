export const closeMenus = () => {
    return dispatch => {
        dispatch({ type: 'CLOSE_MENUS' })
    }
}
