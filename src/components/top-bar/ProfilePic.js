import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import analytics from '../../analytics'

class ProfilePic extends Component {
    render() {
        let { pic, initials } = this.props;

        return (
            <div className="topbar--userlogo"
                style={{
                    backgroundImage: pic ? `url(${pic})` : 'none',
                }}
                onClick={() => {
                    analytics.event(analytics._event.USER_MENU, 'Open');
                    this.props.dispatch({ type: 'TOGGLE_MENU_PROFILE' })
                }}
            >
                {initials}
            </div>
        );
    }
}

ProfilePic.propTypes = {
    pic: PropTypes.string,
};

const mapStateToProps = ({ user }) => ({
    initials: user.initials,
    pic: user.pic,
});

export default connect(mapStateToProps)(ProfilePic);
