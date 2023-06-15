import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { openModal } from '../../actions/ModalActions';
import analytics from '../../analytics';
import constants from '../../constants';

const MenuProfile = () => {
    const dispatch = useDispatch();
    const open = useSelector(state => state.menu.profile);

    return (
        <div style={{
            display: open ? 'block' : 'none',
        }}>
            <div className="tooltip-menu tooltip-menu-profile modal">
                <Link to="/app/my-account">
                    <div className="tooltip-menu-item">
                        My Account
                    </div>
                </Link>
                <div className="tooltip-menu-item"
                    onClick={() => {
                        analytics.pageview('/app/my-maps');
                        dispatch(openModal('myMaps'));
                    }}
                >
                    My Maps
                </div>
                <div className="tooltip-menu-item"
                    onClick={() => {
                        analytics.pageview('/app/my-shared-maps');
                        dispatch(openModal('mySharedMaps'));
                    }}
                >
                    Shared Maps
                </div>
                <div className="tooltip-menu-item no-hover"
                    style={{
                        marginTop: '10px'
                    }}
                >

                    <div className="button button-medium"
                        onClick={(e) => {
                            e.preventDefault();
                            window.open(constants.STATIC_SITE_URL + '/#donate');
                        }}
                    >Donate</div>
                </div>
                <div className="tooltip-menu-item no-hover"
                    style={{
                        marginBottom: '10px'
                    }}
                >
                    <div className="button button-medium"
                        onClick={() => dispatch({ type: 'LOG_OUT' })}
                    >Logout</div>
                </div>
            </div>
        </div>
    );
}

export default MenuProfile;