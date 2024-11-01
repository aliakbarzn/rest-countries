// Navbar.js
import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import './Navbar.css'
import icon from '../assets/icons/brightness_6_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg'

const Navbar = () => {
    const {isDarkMode, toggleTheme} = useTheme()

    return (
        <nav className={`navbar ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
            <h1 className="navbar-title">Where in the world?</h1>
            <div className="dark-mode-toggle" onClick={toggleTheme}>
                <img
                    src={icon}
                    style={{ filter: isDarkMode ? 'invert(100%)' : 'invert(20%)' }}
                />
                <span>{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>
            </div>
        </nav>
    );
};

export default Navbar;
console.log('a')
