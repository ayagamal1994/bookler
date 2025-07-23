import { lazy, Suspense } from 'react';
import './App.css'
import { Route, Routes } from 'react-router-dom';
function App() {

  const Home = lazy(() => import("./pages/Home/Home"));
  const Login = lazy(()=> import("./pages/Login/Login"));
  const SignUp = lazy(()=> import("./pages/SignUp/SignUp"));

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />}/>
          <Route path="signup" element={<SignUp />}/>
        </Routes>
      </Suspense>
    </>
  );
}

export default App
