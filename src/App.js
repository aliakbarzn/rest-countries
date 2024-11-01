
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import Navbar from './components/Navbar';
import { useTheme } from './contexts/ThemeContext';

function App() {

  const { isDarkMode } = useTheme()

  return (
    <div className={`App ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/detail-page/:countrycode' element={<DetailPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
