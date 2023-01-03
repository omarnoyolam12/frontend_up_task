import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";

const AuthContext = createContext();

const AuthProvider = ({children})=>{

    const [auth, setAuth] = useState({});
    const [cargando, setCargando] = useState(true);

    const navigate = useNavigate();

    useEffect(()=>{

        const autenticarUsuario = async ()=>{
            const jwt = localStorage.getItem('jwt');

            // *Detener si no existe un jwt
            if(!jwt){
                setCargando(false);
                return;
            }

            // *Configuracion del jwt
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwt}`
                }
            }

            // *Autenticar al usuario
            try {
                
                const {data} = await clienteAxios('/usuarios/perfil', config);
                setAuth(data);
                navigate('/dashboard');

            } catch (error) {
                setAuth({});
            } finally {
                setCargando(false);
            }
        }

        autenticarUsuario();

    }, []);

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext;