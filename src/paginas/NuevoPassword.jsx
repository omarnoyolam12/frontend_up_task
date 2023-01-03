import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";

import Validador from "../components/Validador";
import Alerta from "../components/Alerta";

const NuevoPassword = () => {

    const {token} = useParams();

    const [tokenValido, setTokenValido] = useState(false);
    const [passwordModificado, setPasswordModificado] = useState(false);

    const [inputPassword, setInputPassword] = useState('');
    const [inputPasswordValido, setInputPasswordValido] = useState(false);

    const [botonActivo, setBotonActivo] = useState(false);
    const [alerta, setAlerta] = useState({});

    useEffect(()=>{

        const comprobarToken = async ()=>{

            try {
                const url = `/usuarios/olvide-password/${token}`;
                await clienteAxios(url);

                setTokenValido(true);

            } catch (error) {
                setAlerta({
                    msg: error.response.data.msg,
                    error: true
                });
            }
        }

        comprobarToken();

    }, []);

    // *Función para validar password-----------------------------------
    const validarPassword = valor =>{

        setInputPassword(valor);

        if(valor.length >= 8){
            setInputPasswordValido(true);
            setBotonActivo(true);
        }
        else{
            setInputPasswordValido(false);
            setBotonActivo(false);
        }
        
    }

    // *Guardar nuevo password------------------------------------------
    const handleSubmit = async e =>{
        
        e.preventDefault();

        try {
            
            const url = `/usuarios/olvide-password/${token}`;

            const {data} = await clienteAxios.post(url, {
                password: inputPassword
            });

            setAlerta({
                msg: data.msg,
                error: false
            });

            // *Desaparecer el formulario
            setTokenValido(false);

            // *Mostrar iniciar sesión
            setPasswordModificado(true);

        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            });
        }

    }

    const {msg} = alerta;

    return (
        <>
            <div className="text-center space-y-5">
                <h1 className="text-indigo-400 font-bold text-6xl">Nueva contraseña</h1>
                <p className="text-slate-500 dark:text-slate-400 text-2xl font-light">Reestablece tu contraseña y recupera el acceso a tus proyectos.</p>
            </div>

            {msg && <Alerta alerta={alerta}/>}

            {tokenValido && (
                <form action="" className="mt-20" onSubmit={handleSubmit}>

                    <div className="relative h-12 mb-12">
                        <input 
                            id="password"
                            name="password"
                            type="password"
                            className="w-full p-3 bg-transparent border-b border-gray-400 outline-none focus:border-indigo-400 focus:border-b-2 transition-all peer/password" 
                            value={inputPassword}
                            onChange={e => validarPassword(e.target.value)}
                        />
                        <label 
                            htmlFor="password"
                            className={`${inputPassword ? 'top-[-20px] left-0 text-xs' : 'top-3 left-3'} absolute uppercase text-slate-500 font-bold transition-all duration-300 peer-focus/password:text-xs peer-focus/password:top-[-20px] peer-focus/password:left-0`}
                        >
                                Contraseña
                        </label>   

                        {inputPassword && 
                            <Validador 
                                valido={inputPasswordValido}
                            /> 
                        } 
                    </div>

                    <input 
                        type="submit" 
                        value="Crer Cuenta"
                        className={`w-full py-3 text-white uppercase font-bold rounded-full transition-all ${botonActivo ? 'cursor-pointer bg-indigo-400 hover:bg-indigo-500' : 'cursor-not-allowed bg-indigo-200'}`}
                        disabled={!botonActivo}
                    />
                </form>
            )}

            {passwordModificado && (
                <Link
                    className="text-indigo-400 lg:block text-center"
                    to="/"
                >
                    Inicia Sesión
                </Link>
            )}
        </>
    )
}

export default NuevoPassword