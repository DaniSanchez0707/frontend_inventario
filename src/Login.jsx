import {React, useEffect} from 'react';
import image from './assets/2897785.png'
import { useAuth } from './context/AuthenticationContext';
import { useNavigate } from 'react-router-dom';
import {useForm} from 'react-hook-form'
import toast, {Toaster} from 'react-hot-toast'
function Login() {
  const { isAuthenticated, Login, successfullyRequest, messageSuccessfully, errorRequest,
    messageError

   } = useAuth();
  const {register, handleSubmit, formState:{errors}} = useForm()

  const LoginRequest = handleSubmit(data=>{
     Login(data)
  })


  useEffect(()=>{
if(successfullyRequest){
  toast.success(messageSuccessfully)
}
},[successfullyRequest])

useEffect(()=>{
  if(errorRequest){
    toast.error(messageError)
  }
  },[errorRequest])

  const navigate = useNavigate()

  useEffect(()=>{
if(isAuthenticated) navigate ('/dashboard')
  },[isAuthenticated])

  if (isAuthenticated) {
    return null; // o algún tipo de loader/spinner
  }

  console.log(isAuthenticated)
  return (
    <>
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img alt="Your Company" src={image} className="mx-auto h-20 w-auto" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white bg-sky-900 rounded-full">
          Login
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form  onSubmit={LoginRequest} className="space-y-6">
          <div>
            <label htmlFor="text" className="block text-sm font-medium leading-6 text-gray-900">
              Usuario
            </label>
            <div className="mt-2">
              <input
              {...register('nombre_usuario', {required: true})}
            
                id="nombre_usuario"
                name="nombre_usuario"
                type="text"
                required
                autoComplete="nombre_usuario"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
             
             />
                {errors.nombre_usuario && (<p> El nombre usuario de es requerido</p>)}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Contraseña
              </label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-sky-900 hover:text-gray-900">
                  Olvido su contraseña?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
               {...register('contrasena', {required: true})}
            
                id="contrasena"
                name="contrasena"
                type="password"
                required
                autoComplete="current-password"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
                  {errors.contrasena && (<p> la contrasena es requerida</p>)}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-sky-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:bg-gray-900"
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
    <Toaster/>
    </>
  );
}

export default Login;
