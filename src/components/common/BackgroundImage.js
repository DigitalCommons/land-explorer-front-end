import React from 'react';

const images = [
    require('../../assets/img/bg/Image1b.jpg'),
    require('../../assets/img/bg/Image2b.jpg'),
    require('../../assets/img/bg/Image3b.jpg'),
    require('../../assets/img/bg/Image4b.jpg'),
]

const BackgroundImage = ({ image }) =>
    <div style={{
        backgroundColor: '#222'
    }}>
        <div style={{
            ...styles.backgroundImage,
            opacity: image === 0 ? 1 : 0,
            backgroundImage: `url(${images[0]})`
        }} />
        <div style={{
            ...styles.backgroundImage,
            opacity: image === 1 ? 1 : 0,
            backgroundImage: `url(${images[1]})`
        }} />
        <div style={{
            ...styles.backgroundImage,
            opacity: image === 2 ? 1 : 0,
            backgroundImage: `url(${images[2]})`
        }} />
        <div style={{
            ...styles.backgroundImage,
            opacity: image === 3 ? 1 : 0,
            backgroundImage: `url(${images[3]})`
        }} />
    </div>

const styles = {
    backgroundImage: {
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        transition: 'opacity 500ms',
    }
}

export default BackgroundImage;
