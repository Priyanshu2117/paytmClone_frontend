import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { lazy, Suspense } from "react"
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../pages/dashboard/Dashboard";
import SendMoney from "../pages/sendMoney/SendMoney";

const LazyLoadMe = lazy(()=> import("../pages/LazyLoadedPages/LazyLoadMe"))

const AppRoutes = () => {
  return (
    <BrowserRouter>

        <Navbar />
        <Routes>
            
            {/* public routes */}
            <Route path="/login" element={<Login />}/>
            <Route path="/signup" element={<SignUp />}/>

            {/* protected routes  */}
            <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/send" element={<SendMoney />} />
                <Route path="/lazyLoad" element={<Suspense fallback="Loading.."><LazyLoadMe /></Suspense>} />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

function Navbar(){

  const navigate = useNavigate();

  const login = ()=>{
    navigate("/login")
  }

  const signup = ()=>{
    navigate("/signup")
  }

  return (
    <>
      <button onClick={login}>Login</button>
      <button onClick={signup}>signup</button>
    </>
  )

}

export default AppRoutes
