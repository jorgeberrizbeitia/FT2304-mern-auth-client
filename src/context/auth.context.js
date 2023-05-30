import { createContext, useEffect, useState } from "react";
import { verifyService } from "../services/auth.services";

const AuthContext = createContext()

function AuthWrapper(props) {

  // 1. los estados o funciones a exportar
  const [ isLoggedIn, setIsLoggedIn ] = useState(false)
  const [ user, setUser ] = useState(null)
  const [ isLoading, setIsLoading ] = useState(true) // la app empieza validando el token

  useEffect(() => {
    authenticateUser()
  }, [])

  // funcion que va a invocar el servicio de verify para validar el token del usuario y recibir el payload
  const authenticateUser = async () => {

    try {
      
      const response = await verifyService()
      console.log("token validado")
      console.log(response)
      setIsLoggedIn(true)
      setUser(response.data.payload)
      setIsLoading(false)

    } catch (error) {
      console.log("token invalido o no hay token")
      console.log(error)
      setIsLoggedIn(false)
      setUser(null)
      setIsLoading(false)
    }

  }

  // 2. el objecto de contexto que pasaremos
  const passedContext = {
    isLoggedIn,
    user,
    authenticateUser
  }

  if (isLoading) {
    return (
      <div className="App">
        <h3>... validando credenciales</h3>
      </div>
    )
  }

  // la renderización de la App con el contexto
  return (
    <AuthContext.Provider value={passedContext}>
      {props.children}
    </AuthContext.Provider>
  )
}

export {
  AuthContext,
  AuthWrapper
}