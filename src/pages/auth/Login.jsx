import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginService } from "../../services/auth.services";

import { AuthContext } from "../../context/auth.context";

function Login() {

  const { authenticateUser } = useContext(AuthContext)

  const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("")

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();
    // ... login logic here
    try {
      
      const response = await loginService({
        email, 
        password
      })

      console.log(response)

      // 1. guardamos el token en un lugar seguro del navegador (localStorage)
      localStorage.setItem("authToken", response.data.authToken)

      // 2. Validamos el token para saber quien es el usuario y saber si está logeado
      await authenticateUser()

      navigate("/profile")

    } catch (error) {
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage)
      } else {
        navigate("/error") // 500
      }
    }
  };

  return (
    <div>

      <h1>Log In</h1>

      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />

        <br />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <br />

        {errorMessage && <p style={{color: "red"}}>{errorMessage}</p>}

        <button type="submit">Login</button>
      </form>
      
    </div>
  );
}

export default Login;
