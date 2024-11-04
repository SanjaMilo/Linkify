import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import theme from './Theme.js';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer.js';
import PageNotFound from './pages/PageNotFound.js';
import Login from './pages/Login.js';
import Signup from './pages/Signup.js'; 
import CreateShortLink from './pages/CreateShortLink.js';
import MyLinks from './pages/MyLinks.js';
import { useCookies } from 'react-cookie';

function App() {
  const [cookies, _] = useCookies(['access_token']);

  return (
    <ThemeProvider theme={theme}>
        <div className="App">
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/my-links' element={<MyLinks />} />
              <Route path='/create-short-link' element={<CreateShortLink />} />
              <Route path='/login' element={!cookies.access_token ? <Login /> : <Navigate to='/' />} />
              <Route path='/signup' element={!cookies.access_token ? <Signup /> : <Navigate to='/' />} />
              <Route path='*' element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>
          <Footer />
        </div>
    </ThemeProvider>
  );
}

export default App;
