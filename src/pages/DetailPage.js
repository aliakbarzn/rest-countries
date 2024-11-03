
import axios from 'axios'
import './DetailPage.css'
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from 'react'
import { useTheme } from '../contexts/ThemeContext'
import lightArrowIcon from '../assets/icons/arrow_back_dark.svg'
import darkArrowIcon from '../assets/icons/arrow_back_light.svg'

const DetailPage = (c) => {

    const navigate = useNavigate()
    const [country, setCountry] = useState([])
    const { countrycode } = useParams()
    const { isDarkMode } = useTheme()
    const [countries, setCountries] = useState([])

    useEffect(() => {
        const fetchCountry = async () => {
            try {
                const response = await axios.get('/data.json')
                setCountries(response.data)
                const foundCountry = response.data.find(c => c.alpha3Code === countrycode)
                setCountry(foundCountry)
            }
            catch (error) {
                console.log('error fetching country data: ', error)
            }

        }

        fetchCountry()

    }, [countrycode])



    return (
        <div className={`country-detail ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
            <button
                className={isDarkMode ? 'dark-mode' : 'light-mode'}
                onClick={() => window.history.back()}
            >
                <img src={isDarkMode ? darkArrowIcon : lightArrowIcon} /> <span>Back</span>
            </button>

            <div className={`flag-and-details-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
                <img src={country.flag} alt={`${country.name} flag`} className="country-flag" />

                <div className={`details-section ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
                    <h1>{country.name}</h1>
                    <div className={`detail-info ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
                        <div className={`detail-info-left ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
                            <p><strong>Native Name:</strong> {country.nativeName}</p>
                            <p><strong>Population:</strong> {country.population}</p>
                            <p><strong>Region:</strong> {country.region}</p>
                            <p><strong>Sub Region:</strong> {country.subregion}</p>
                            <p><strong>Capital:</strong> {country.capital}</p>
                        </div>
                        <div className={`detail-info-right ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
                            <p><strong>Top Level Domain:</strong> {country.topLevelDomain}</p>
                            <p><strong>Currencies:</strong> {country.currencies
                                ? country.currencies.map(c => <span key={c.name}>{c.name}, </span>)
                                : null
                            }</p>
                            <p><strong>Languages:</strong> {country.languages
                                ? country.languages.map(l => <span key={l.name}>{l.name}, </span>)
                                : null
                            }</p>

                        </div>

                    </div>

                    <div className={`border-countries ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
                        <span className={`border-countries-title ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>Border Countries: </span>
                        {country.borders
                            ? country.borders.map(border => {
                                const borderCountry = countries.find(c => c.alpha3Code === border)
                                return <span
                                    key={border}
                                    className={`border-country ${isDarkMode ? 'dark-mode' : 'light-mode'}`}
                                    onClick={() => navigate(`/detail-page/${border}`)}
                                >
                                    {borderCountry.name}
                                </span>
                            })
                            : <p>The country has no land border countries.</p>}
                    </div>
                </div>
            </div>
        </div >
    );
}

export default DetailPage