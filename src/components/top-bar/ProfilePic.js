import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import analytics from '../../analytics'

const ProfilePic = () => {
    const dispatch = useDispatch();
    const { initials, pic } = useSelector(state => state.user);

    return (
        <div className="topbar--userlogo"
            style={{
                backgroundImage: pic ? `url(${pic})` : 'none',
            }}
            onClick={() => {
                analytics.event(analytics._event.USER_MENU, 'Open');
                dispatch({ type: 'TOGGLE_MENU_PROFILE' })
            }}
        >
            {initials}
        </div>
    );
}

export default ProfilePic;
