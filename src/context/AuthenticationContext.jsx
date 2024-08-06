import React, { createContext, useContext, useEffect, useState } from "react";
import { LoginRequest } from "../api/authentication.js";
import Cookies from 'js-cookie'

export const AuthenticationContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthenticationContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthenticationProvider");
  }

  return context;
};

export const AuthenticationProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorRequest, setErrorRequest] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [successfullyRequest, setSuccessfullyRequest] = useState(false);
  const [messageSuccessfully, setMessageSuccessfully] = useState("");
  const [nombre_usuario, setNombre_usuario] = useState("")
  const [rol, setRol] = useState("")
  const Login = async (usuario) => {
    try {
      const res = await LoginRequest(usuario);

      setIsAuthenticated(true);
      setSuccessfullyRequest(true)
      setMessageSuccessfully(res.data.message);
      setNombre_usuario(res.data.user[0].nombre_usuario)
      setRol(res.data.user[0].rol)
      setTimeout(() => {
        setSuccessfullyRequest(false);
      }, 1000);
      console.log(res.data.message);
    } catch (error) {
      setMessageError(error.response.data.message);
      console.log(error.response.data.message);
      setErrorRequest(true)
      setMessageSuccessfully(false);
      setIsAuthenticated(false)
      setTimeout(() => {
        setErrorRequest(false);
      }, 1000);
    }
  };
 
  const Logout = async () => {

    Cookies.remove("Token")
    return setIsAuthenticated(false)
  }

  useEffect(()=>{
const checkLogin =() =>{
const cookie = Cookies.get()

if(!cookie.Token){
return setIsAuthenticated(false)

}
return setIsAuthenticated(true)
}

checkLogin()
  },[])
  return (
    <AuthenticationContext.Provider
      value={{
        Login,
        isAuthenticated,
        nombre_usuario,
        rol,
        messageSuccessfully,
        successfullyRequest,
        messageError,
        errorRequest,
        Logout
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
