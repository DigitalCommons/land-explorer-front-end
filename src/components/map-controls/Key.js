import React from 'react';

const Key = ({ data, name }) =>
    <div style={{
        marginBottom: '24px'
    }}>
        <div style={{
            display: 'inline-block',
            paddingBottom: '6px',
            marginTop: 0,
            marginBottom: 0,
        }}>{name}</div>
        <div style={{
            borderBottom: '1px solid #d0d0d0',
            width: '100%',
            marginBottom: '12px',
        }} />
        {Object.keys(data).map((key, i) => {
            return (
                <div key={i}
                    style={{
                        display: 'flex',
                        marginBottom: '6px'
                    }}
                >
                    <div style={{
                        backgroundColor: data[key],
                        opacity: '1',
                        height: '16px',
                        width: '16px',
                        marginRight: '6px'
                    }} />
                    <div style={{ fontSize: '14px' }}>{key}</div>
                </div>
            )
        })}
    </div>


export default Key;
