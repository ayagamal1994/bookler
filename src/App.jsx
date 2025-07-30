import { lazy, Suspense } from 'react';
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
function App() {

  const Home = lazy(() => import("./pages/Home/Home"));
  const Login = lazy(()=> import("./pages/Login/Login"));
  const SignUp = lazy(()=> import("./pages/SignUp/SignUp"));
  const HotelsSearch = lazy(()=> import("./pages/HotelsSearch/HotelsSearch"));
  const HotelDetails = lazy(()=> import("./pages/HotelDetails/HotelDetails"));
  const Booking = lazy(()=> import("./pages/Booking/Booking"))
  const MyBookings = lazy(()=> import("./pages/MyBookings/MyBookings"));
  const NotFound = lazy(()=> import("./pages/NotFound/NotFound"));

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />}/>
          <Route path="signup" element={<SignUp />}/>
          <Route path="hotelssearch" element={<HotelsSearch />}/>
          <Route path="hotelssearch/:id" element={<HotelDetails />}/>
          <Route path="booking/:id" 
          element={ <ProtectedRoute>  <Booking /> </ProtectedRoute>}/>
          <Route path="mybookings/" element={<ProtectedRoute><MyBookings /></ProtectedRoute>}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
        </BrowserRouter>
      </Suspense>
    </>
  );
}

export default App
