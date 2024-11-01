
import './HomePage.css'
import icon from '../assets/icons/search_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTheme } from '../contexts/ThemeContext';

const HomePage = () => {
    const navigate = useNavigate();
    const { isDarkMode } = useTheme()

    const [countries, setCountries] = useState([]); // Original list from the database
    const [searchTerm, setSearchTerm] = useState(''); // Holds the search input value
    const [region, setRegion] = useState('Filter by Region'); // Holds the region from the select options

    // Fetch data on component mount
    useEffect(() => {
        const fetchData = () => {
            axios.get('/data.json')
                .then(res => setCountries(res.data))
                .catch(error => console.log('Error fetching data: ', error));
        };

        fetchData();
    }, []);

    // Filter countries based on selected region, or display all if "Filter by Region" is selected
    const filteredCountriesByRegion = region === 'Filter by Region'
        ? countries
        : countries.filter(c => c.region.toLowerCase() === region.toLowerCase())

    // Update the search term as the input changes
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    // Filter countries based on search term
    const filteredCountriesBySearch = filteredCountriesByRegion.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    // Update the region value as the select tag changes
    const handleFilter = (e) => {
        setRegion(e.target.value)
    }

    return (
        <React.Fragment>
            {/* Searchbar and region filter section */}
            <div className={`search-filter-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
                <div className={`search-bar ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
                    <img
                        className={`search-icon ${isDarkMode ? 'dark-mode' : 'light-mode'}`}
                        src={icon}
                        alt="search-icon"
                    />
                    <input
                        type="text"
                        placeholder="Search for a country..."
                        onChange={handleSearch}
                        value={searchTerm}
                    />
                </div>
                <select
                    className={`filter-dropdown ${isDarkMode ? 'dark-mode' : 'light-mode'}`}
                    onChange={handleFilter}
                    value={region}
                >
                    <option value='Filter by Region'>Filter by Region</option>
                    <option value='Africa'>Africa</option>
                    <option value='Americas'>America</option>
                    <option value='Asia'>Asia</option>
                    <option value='Europe'>Europe</option>
                    <option value='Oceania'>Oceania</option>
                </select>
            </div>

            {/* Display filtered countries */}
            <div className={`countries-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
                {filteredCountriesBySearch.map(c => (
                    <div
                        className={`country-card ${isDarkMode ? 'dark-mode' : 'light-mode'}`}
                        key={c.alpha3Code}
                        onClick={() => navigate(`detail-page/${c.alpha3Code}`)}
                    >
                        <img src={c.flag} alt={`${c.name} flag`} />
                        <div className={`country-details ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
                            <h2>{c.name}</h2>
                            <p><strong>Population:</strong> {c.population}</p>
                            <p><strong>Capital:</strong> {c.capital}</p>
                            <p><strong>Region:</strong> {c.region}</p>
                        </div>
                    </div>
                ))}
            </div>
        </React.Fragment>
    );
};

export default HomePage;
