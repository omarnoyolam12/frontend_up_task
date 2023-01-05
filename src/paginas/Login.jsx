import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import clienteAxios from "../config/clienteAxios";

import useAuth from "../hooks/useAuth";
import Validador from "../components/Validador";
import Alerta from "../components/Alerta";


const Login = () => {

    const [inputEmail, setInputEmail] = useState('');
    const [inputPassword, setInputPassword] = useState('');

    const [inputEmailValido, setInputEmailValido] = useState(false);
    const [inputPasswordValido, setInputPasswordValido] = useState(false);

    const [alerta, setAlerta] = useState({});
    const [botonActivo, setBotonActivo] = useState(false);

    const {setAuth} = useAuth();

    const navigate = useNavigate();

    // *Función para validar el email------------------------------
    const validarEmail = valor =>{

        const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 

        setInputEmail(valor);

        if(er.test(valor)){
            setInputEmailValido(true);
        }
        else{
            setInputEmailValido(false);
        }
        
    }

    // *Función para validar password-----------------------------------
    const validarPassword = valor =>{

        setInputPassword(valor);

        if(valor.length >= 8){
            setInputPasswordValido(true);
        }
        else{
            setInputPasswordValido(false);
        }
        
    }

    // *Envio de formulario-------------------------------------------
    const handleSubmit = async e =>{
        
        e.preventDefault();
        
        try {
            
            const {data} = await clienteAxios.post('/usuarios/login', {
                email: inputEmail,
                password: inputPassword
            });

            localStorage.setItem('jwt', data.token);
            setAlerta({});
            setAuth(data);
            navigate('/dashboard');

        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
        
    }

    // *Función para activar boton submit-----------------------------
    useEffect(()=>{

        const activarBoton = ()=>{

            if(inputEmailValido && inputPasswordValido){
                setBotonActivo(true);
            }
            else{
                setBotonActivo(false);
            }
        }

        activarBoton();

    }, [inputEmail, inputPassword]);

    const {msg} = alerta;

    return (
        <>
            <div className="text-center space-y-5">
                <h1 className="text-indigo-400 font-bold text-6xl">Hey, Hola!</h1>
                <p className="text-slate-500 dark:text-slate-400 text-2xl font-light">Inicia sesión y administra tus proyectos.</p>
            </div>

            {msg && <Alerta alerta={alerta}/>}

            <form action="" className="mt-20" onSubmit={handleSubmit}>
                <div className="relative h-12 mb-12">
                    <input 
                        id="email"
                        name="email"
                        type="email"
                        className="w-full p-3 bg-transparent border-b border-gray-400 outline-none focus:border-indigo-400 focus:border-b-2 transition-all peer/email"
                        value={inputEmail}
                        onChange={e => validarEmail(e.target.value)}
                    />
                    <label 
                        htmlFor="email"
                        className={`${inputEmail ? 'top-[-20px] left-0 text-xs' : 'top-3 left-3'} absolute uppercase text-slate-500 font-bold transition-all duration-300 peer-focus/email:text-xs peer-focus/email:top-[-20px] peer-focus/email:left-0`}
                    >
                            Email
                    </label>  

                    {inputEmail && 
                        <Validador 
                            valido={inputEmailValido}
                        /> 
                    }  
                </div>

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

            <nav className="lg:flex justify-between mt-12 gap-3">
                <p className="text-center text-slate-500">
                    ¿No tienes una cuenta? {' '}

                    <Link
                        className="text-indigo-400 lg:block"
                        to="registrar"
                    >
                        Registrate
                    </Link>
                </p>
                
                <p className="text-center text-slate-500">
                    ¿Olvidaste tú contraseña? {' '}

                    <Link
                        className="text-indigo-400 lg:block"
                        to="olvide-password"
                    >
                        Recuperar
                    </Link>
                </p>
            </nav>
        </>
    )
}

export default Login