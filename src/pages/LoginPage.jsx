// src/pages/LoginPage.jsx

import { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";

import { Link, useNavigate } from "react-router-dom";

import { post } from "../services/authService";

function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const { storeToken, authenticateUser } = useContext(AuthContext)

  
  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };
 
    post('/auth/login', requestBody)
      .then((response) => {

        console.log('JWT token', response.data.authToken );
        storeToken(response.data.authToken)
        authenticateUser()
        navigate('/');                             // <== ADD      
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })
  };
  
  return (

<div id="LPBox">

    <div className="LoginPage">
      <h1>Login</h1>

      <form onSubmit={handleLoginSubmit}>
        <div id="EmailBox">
        <label>Email:              </label>
        <input 
        id="Imput"
          type="email"

          name="email"
          value={email}
          onChange={handleEmail}
        />
       

        <label>Password:</label>
        <input  id="Imput"
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />
        </div>
<br /><br />
<div id="ButtonBox">
        <button type="submit">Login</button>
        </div>
      </form>
      { errorMessage && <p className="error-message">{errorMessage}</p> }
<br />
      <p>Don't have an account yet?</p>
      <Link to="/signup"> Sign Up</Link>
      <br />
    </div>
    </div>  
  )
}

export default LoginPage;