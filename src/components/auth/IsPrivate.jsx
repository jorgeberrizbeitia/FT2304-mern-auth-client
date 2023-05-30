// este componente será un envoltorio a otros componentas para renderizarlos unicamente si el usuario está logeado

import { useContext } from "react"
import { AuthContext } from "../../context/auth.context"
import { Navigate } from "react-router-dom"

// HOC => Higher Order Component

function IsPrivate(props) {

  const { isLoggedIn } = useContext(AuthContext)

  if (isLoggedIn) {
    // si el usuario está logeado, renderiza el componente children
    return props.children
  } else {
    // si no está logeado redirecciona a otro lugar
    // React no nos permite usar navigate en la base del componente
    // Entonces en estos casos usamos el component Navigate
    return <Navigate to="/"/>
  }
}

export default IsPrivate