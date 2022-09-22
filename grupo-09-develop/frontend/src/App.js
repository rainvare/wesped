import React, { useState, useEffect } from "react";
import Home from './pages/home/Home'
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import ProductDetails from "./pages/product/productDetails/ProductDetails";
import Booking from "./pages/booking/Booking";
import BookingS from "./pages/successfulBooking/BookingS"
import ProductS from "./pages/successfulProduct/ProductS";
import { Routes, Route } from 'react-router-dom'
import { theme } from './ui/theme'
import { ThemeProvider } from 'styled-components';
import jwt_decode from 'jwt-decode'
import LocalStorageHelper from "./helpers/LocalStorageHelper";
import { UserContext, SelectedDatesContext } from "./hooks/UseContext";
import MakeProduct from "./pages/makeProduct/MakeProduct";

const user = LocalStorageHelper.getItem('Token') ? jwt_decode(LocalStorageHelper.getItem('Token'))["user_info"] : null;

function App() {
  const [loggedUser, setLoggedUser] = useState(null);
  const [selectedDatesContext, setSelectedDatesContext] = useState(null)
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);

  const handleWindowSizeChange = () => setWidth(window.innerWidth);

  useEffect(() => {
    if (user) setLoggedUser({ id: user?.id, name: user?.name, surname: user?.surname, email: user?.email, city: user?.city, rol: user?.authorities[0].authority })
  }, [])

  return (
    <UserContext.Provider value={{ loggedUser, setLoggedUser }}>
      <SelectedDatesContext.Provider value={{ selectedDatesContext, setSelectedDatesContext }}>
        <ThemeProvider theme={theme}>
          <Header />
          <Routes>
            <Route path="/" element={<Home isMobile={width <= 580} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Register />} />
            <Route path='/producto/:productId' element={<ProductDetails isMobile={width <= 580} />} />
            <Route path='/producto/:productId/reservas' element={<Booking isMobile={width <= 580} />} />
            <Route path='/producto/:productId/reservas/reserva-exitosa' element={<BookingS />} />
            <Route path='/administracion' element={<MakeProduct />} />
            <Route path='/administracion/producto-exitoso' element={<ProductS />} />
          </Routes>
          <Footer />
        </ThemeProvider>
      </SelectedDatesContext.Provider>
    </UserContext.Provider>
  );

}

export default App;