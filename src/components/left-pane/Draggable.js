import React, { useState } from 'react';
import { Motion, spring } from 'react-motion';
import { range } from 'lodash';

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

const springConfig = { stiffness: 300, damping: 50 };

const Draggable = ({ children, itemHeight }) => {
    const [topDeltaY, setTopDeltaY] = useState(0);
    const [mouseY, setMouseY] = useState(0);
    const [isPressed, setIsPressed] = useState(false);
    const [originalPosOfLastPressed, setOriginalPosOfLastPressed] = useState(0);
    const [order, setOrder] = useState(range(children.length));
    const itemsCount = children.length;

    const handleTouchStart = (key, pressLocation, e) => {
        e.preventDefault();
        handleMouseDown(key, pressLocation, e.touches[0]);
    };

    const handleTouchMove = (e) => {
        console.log("touch move")
        e.preventDefault();
        handleMouseMove(e.touches[0]);
    };

    const handleMouseDown = (pos, pressY, { pageY }) => {
        setTopDeltaY(pageY - pressY);
        setMouseY(pressY);
        setIsPressed(true);
        setOriginalPosOfLastPressed(pos);
    };

    const handleMouseUp = () => {
        setIsPressed(false);
        setTopDeltaY(0);
    };

    const handleMouseLeave = () => {
        setIsPressed(false);
        setTopDeltaY(0);
    };

    const handleMouseMove = ({ pageY }) => {
        if (isPressed) {
            console.log(isPressed)
            const mouseY = pageY - topDeltaY;
            const currentRow = clamp(Math.round(mouseY / 58), 0, itemsCount - 1);
            let newOrder = order;
            if (currentRow !== order.indexOf(originalPosOfLastPressed)) {
                newOrder = reinsert(order, order.indexOf(originalPosOfLastPressed), currentRow);
            }
            setMouseY(mouseY);
            setOrder(newOrder);
        }
    };

    return (
        <div
            className="draggable-container"
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUp}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            style={{
                height: `${children.length * itemHeight}px`
            }}
        >
            <div>
                {children.map((child, i) => {
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
                            {({ scale, shadow, y }) => (
                                <div
                                    className="draggable-item"
                                    style={{
                                        boxShadow: `rgba(0, 0, 0, 0.2) 0px ${shadow}px ${2 * shadow}px 0px`,
                                        transform: `translate3d(0, ${y}px, 0) scale(${scale})`,
                                        WebkitTransform: `translate3d(0, ${y}px, 0) scale(${scale})`,
                                        zIndex: i === originalPosOfLastPressed ? 99 : i,
                                        background: originalPosOfLastPressed === i && isPressed ? '#eff0f2' : '#f4f5f7',
                                        transition: 'background 300ms'
                                    }}
                                >
                                    <div
                                        className="tray-item-drag draggable"
                                        onMouseDown={handleMouseDown.bind(null, i, y)}
                                        onTouchStart={handleTouchStart.bind(null, i, y)}
                                    />
                                    {child}
                                </div>
                            )}
                        </Motion>
                    );
                })}
            </div>
        </div>
    );
}

export default Draggable;