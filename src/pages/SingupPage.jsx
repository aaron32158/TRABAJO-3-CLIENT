// src/pages/SignupPage.jsx

import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../context/auth.context"; 

import { post } from "../services/authService";



function SignupPage() {

  const [user, setUser] = useState({
    email: "",
    password: "",
    fullName: "",
    username: ""
  })

  const [errorMessage, setErrorMessage] = useState(undefined);

  const { storeToken, authenticateUser } = useContext(AuthContext)

  const navigate = useNavigate();

  const handleTextChange = (e) => {
    setUser((prev) => ({...prev, [e.target.name]: e.target.value}))
  }
  
  const handleSignupSubmit = (e) => {
    e.preventDefault();

    post('/auth/signup', user)
      .then((response) => {
        console.log('JWT token', response.data.authToken );
        storeToken(response.data.authToken)
        authenticateUser()
        navigate('/');     
      })
      .catch((error) => {
        console.log("Error", error)
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })
  };

  
  return (

    <div id="BoxSIGN">
    <div className="SignupPage">
      <h1>Sign Up</h1>

      <form onSubmit={handleSignupSubmit}>
        <div id="EmailSingup">
        <label>Email:</label>
        <input 
        id="Imput2"
          type="email"
          name="email"
          value={user.email}
          onChange={handleTextChange}
        />

        <label>Password:</label>
        <input 
         id="Imput2"
          type="password"
          name="password"
          value={user.password}
          onChange={handleTextChange}
        />

        <label>Full Name:</label>
        <input 
         id="Imput2"
          type="text"
          name="fullName"
          value={user.fullName}
          onChange={handleTextChange}
        />

        <label>Username:</label>
        <input 
         id="Imput2"
          type="text"
          name="username"
          value={user.username}
          onChange={handleTextChange}
        />
        </div>
<div id="ButtonBox2">
        <button type="submit">Sign Up</button>
        </div>
      </form>

      { errorMessage && <p className="error-message">{errorMessage}</p> }

      <p>Already have account?</p>
      <Link to="/login"> Login</Link>

    </div>
</div>
  )
}

export default SignupPage;