import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Motion, spring} from 'react-motion';
import {range} from 'lodash';

function reinsert(arr, from, to) {
    const _arr = arr.slice(0);
    const val = _arr[from];
    _arr.splice(from, 1);
    _arr.splice(to, 0, val);
    return _arr;
}

function clamp(n, min, max) {
    return Math.max(Math.min(n, max), min);
}

const springConfig = {stiffness: 300, damping: 50};

class Draggable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topDeltaY: 0,
            mouseY: 0,
            isPressed: false,
            originalPosOfLastPressed: 0,
            order: range(this.props.children.length),
            itemsCount: this.props.children.length
        }
        this.draggableRef = null;
    }

    componentDidMount() {
        this.draggableRef.addEventListener('touchmove', this.handleTouchMove);
        this.draggableRef.addEventListener('touchend', this.handleMouseUp);
        this.draggableRef.addEventListener('mousemove', this.handleMouseMove);
        this.draggableRef.addEventListener('mouseup', this.handleMouseUp);
        this.draggableRef.addEventListener('mouseleave', this.handleMouseLeave);
    };

    handleTouchStart = (key, pressLocation, e) => {
        e.preventDefault();
        this.handleMouseDown(key, pressLocation, e.touches[0]);
    };

    handleTouchMove = (e) => {
        e.preventDefault();
        this.handleMouseMove(e.touches[0]);
    };

    handleMouseDown = (pos, pressY, {pageY}) => {
        this.setState({
            topDeltaY: pageY - pressY,
            mouseY: pressY,
            isPressed: true,
            originalPosOfLastPressed: pos,
        });
    };

    handleMouseUp = () => {
        this.setState({isPressed: false, topDeltaY: 0});
    };

    handleMouseLeave = () => {
        this.setState({isPressed: false, topDeltaY: 0});
    }

    handleMouseMove = ({pageY}) => {

        const {isPressed, topDeltaY, order, originalPosOfLastPressed, itemsCount} = this.state;

        if (isPressed) {
            const mouseY = pageY - topDeltaY;
            const currentRow = clamp(Math.round(mouseY / 58), 0, itemsCount - 1);
            let newOrder = order;
            if (currentRow !== order.indexOf(originalPosOfLastPressed)) {
                newOrder = reinsert(order, order.indexOf(originalPosOfLastPressed), currentRow);
            }
            this.setState({mouseY: mouseY, order: newOrder});
        }

    };

    render() {
        let {itemHeight} = this.props;
        let {mouseY, isPressed, originalPosOfLastPressed, order} = this.state;
        return (
            <div className="draggable-container"
                 ref={(elem) => this.draggableRef = elem}
                 style={{
                     height: `${this.props.children.length * itemHeight}px`
                 }}
            >
                <div>
                    {React.Children.map(this.props.children, (child, i) => {
                        const style = originalPosOfLastPressed === i && isPressed
                            ? {
                                scale: spring(1, springConfig),
                                shadow: spring(4, springConfig),
                                y: mouseY,
                            }
                            : {
                                scale: spring(1, springConfig),
                                shadow: spring(0, springConfig),
                                y: spring(order.indexOf(i) * itemHeight, springConfig),
                            };
                        return (
                            <Motion style={style} key={i}>
                                {({scale, shadow, y}) =>
                                    <div
                                        className="draggable-item"
                                        style={{
                                            boxShadow: `rgba(0, 0, 0, 0.2) 0px ${shadow}px ${2 * shadow}px 0px`,
                                            transform: `translate3d(0, ${y}px, 0) scale(${scale})`,
                                            WebkitTransform: `translate3d(0, ${y}px, 0) scale(${scale})`,
                                            zIndex: i === originalPosOfLastPressed ? 99 : i,
                                            background: originalPosOfLastPressed === i && isPressed ? '#eff0f2' : '#f4f5f7',
                                            transition: 'background 300ms'
                                        }}>
                                        <div
                                            className="tray-item-drag draggable"
                                            onMouseDown={this.handleMouseDown.bind(null, i, y)}
                                            onTouchStart={this.handleTouchStart.bind(null, i, y)}
                                        />
                                        {child}
                                    </div>
                                }
                            </Motion>
                        )
                    })}
                </div>
            </div>
        );
    }
}

export default Draggable;