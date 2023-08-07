import "./App.css";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SingupPage";
import LoginPage from "./pages/LoginPage";
import AllSneakers from "./pages/AllSneakers";
import AddSneaker from "./pages/AddSneaker";
import EditSneaker from "./pages/EditSneaker";
import SneakerDetails from "./pages/SneakerDetails"
 
function App() {

  const getToken = () => {
    return localStorage.getItem('authToken')
  }

  const LoggedIn = () => {
    return getToken() ? <Outlet /> : <Navigate to='/login' />
  }

  const NotLoggedIn = () => {
    return !getToken() ? <Outlet /> : <Navigate to='/' />
  }

  return (
    <div className="App">
      
      <Navbar />
 
      <Routes>      
        <Route path="/" element={ <HomePage /> } />
        <Route path="/all-sneakers" element={ <AllSneakers />} />
        <Route path="/sneaker-details/:sneakerId" element={<SneakerDetails />} />

        <Route element={<LoggedIn />}>

          <Route path="/add-sneaker" element={<AddSneaker />} />
          <Route path="/edit-sneaker/:sneakerId" element={<EditSneaker />} />
         
        </Route>

        <Route element={<NotLoggedIn />}>

          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />

        </Route>

      </Routes>
      
    </div>
  );
}
export default App;


