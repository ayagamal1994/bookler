import { lazy, Suspense } from 'react';
import './App.css'
import { Route, Routes } from 'react-router-dom';
import Booking from './pages/Booking/Booking';
function App() {

  const Home = lazy(() => import("./pages/Home/Home"));
  const Login = lazy(()=> import("./pages/Login/Login"));
  const SignUp = lazy(()=> import("./pages/SignUp/SignUp"));
  const HotelsSearch = lazy(()=> import("./pages/HotelsSearch/HotelsSearch"));
  const HotelDetails = lazy(()=> import("./pages/HotelDetails/HotelDetails"))
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />}/>
          <Route path="signup" element={<SignUp />}/>
          <Route path="hotelssearch" element={<HotelsSearch />}/>
          <Route path="hotelssearch/:id" element={<HotelDetails />}/>
          <Route path="booking/:id" element={<Booking />}/>
        </Routes>
      </Suspense>
    </>
  );
}

export default App
