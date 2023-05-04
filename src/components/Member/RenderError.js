import React from 'react';

const RenderError = (props) => {
    const error = props.error
    const errorStyle = {
        color: 'red',
        listStyle: 'none'
    }
    return Object.keys(error).map(function(key, index) {
        return (
            <li key={index} style={errorStyle}>{error[key]} </li>
        )
    })
};

export default RenderError;