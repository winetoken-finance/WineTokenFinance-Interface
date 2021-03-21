import React from 'react';

export const themes = {
    dark: {
        color: 'white',
        backgroundColor: 'black',
        margen: '4px',
        padding: '4px'
    }, 
    light: {
        color: 'black',
        backgroundColor: 'white',
        margen: '4px',
        padding: '4px'
    }
}

const ThemeContext = React.createContext(themes.light);
export default ThemeContext;