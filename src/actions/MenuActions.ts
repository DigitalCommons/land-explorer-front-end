export const closeMenus = () => {
    return (dispatch: any) => {
        dispatch({ type: 'CLOSE_MENUS' })
    }
}
