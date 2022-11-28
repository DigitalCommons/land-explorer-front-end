import React, { Component } from 'react';
import { connect } from 'react-redux';

class DrawingTool extends Component {
    constructor(props) {
        super(props);
    }

    handleClick = () => {
        // If you click on a tool you have selected deselect it
        if (this.props.activeTool === this.props.tool) {
            this.props.dispatch({
                type: 'DESELECT_TOOLS',
            });
            setTimeout(() => {
                this.props.drawControl.draw.changeMode('static');
            }, 100);
        } else {
            // Else set the tool as active
            this.props.dispatch({
                type: 'SET_ACTIVE_TOOL',
                payload: this.props.tool
            })
            // If mode is simple_select
            if (this.props.mode === 'simple_select') {
                // if a polygon has been selected in the UI
                if (this.props.activePolygon) {
                    // change to direct_select and set the featureId to the active polygon
                    this.props.drawControl.draw.changeMode('direct_select', {
                        featureId: this.props.activePolygon
                    })
                } else {
                    // change to the specific drawing mode
                    this.props.drawControl.draw.changeMode(this.props.mode);
                }
            } else {
                // change to the specific drawing mode
                this.props.drawControl.draw.changeMode(this.props.mode);
            }
        }
    }

    render() {
        const { activeTool, tool, size, name, drawControl } = this.props;
        const isToolActive = activeTool === tool;
        const image = require(`../../assets/img/icon-${tool}${isToolActive ? '--white' : ''}.svg`);
        return (
            <div
                className={`drawing-tool-section ${isToolActive ? 'active' : ''}`}
                onClick={this.handleClick}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <div
                    className={`drawing-tool ${isToolActive ? 'active' : ''}`}
                    style={{
                        backgroundImage: `url(${image})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        backgroundSize: size ? size : '40%',
                        width: '72px',
                        display: 'inline-block'
                    }}
                >
                </div>
                <div style={{ display: 'inline-block', userSelect: 'none', color: isToolActive ? 'white' : '#78838f' }}>{name}</div>
            </div>
        );
    }
}

const mapStateToProps = ({ navigation, drawings }) => ({
    activeTool: navigation.activeTool,
    active: navigation.active,
    activePolygon: drawings.activePolygon,
});

export default connect(mapStateToProps)(DrawingTool);
