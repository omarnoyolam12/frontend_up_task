import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";

import Validador from "../components/Validador";
import Alerta from "../components/Alerta";

const Resgistrar = () => {

    const [inputNombre, setInputNombre] = useState('');
    const [inputEmail, setInputEmail] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [inputRepetirPassword, setInputRepetirPassword] = useState('');

    const [inputNombreValido, setInputNombreValido] = useState(false);
    const [inputEmailValido, setInputEmailValido] = useState(false);
    const [inputPasswordValido, setInputPasswordValido] = useState(false);
    const [inputRepetirPasswordValido, setInputRepetirPasswordValido] = useState(false);

    const [alerta, setAlerta] = useState({});

    const [botonActivo, setBotonActivo] = useState(false);

    // *Función para validar el nombre-----------------------------
    const validarNombre = valor =>{

        const er = /^[a-zA-Z ]*$/;
        setInputNombre(valor);

        if(er.test(valor) && valor.length >= 3 & valor.length < 40){
            setInputNombreValido(true);
        }
        else{
            setInputNombreValido(false);
        }
        
    }

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

    // *Función para validar repetir password--------------------------
    const validarRepetirPassword = valor =>{

        setInputRepetirPassword(valor);

        if(valor === inputPassword){
            setInputRepetirPasswordValido(true);
        }
        else{
            setInputRepetirPasswordValido(false);
        }
        
    }

    // *Escuchar cambios en la contraseña-----------------------------
    useEffect(()=>{

        if(inputPassword.length > 0 && inputRepetirPassword.length > 0){
            setInputRepetirPassword('');
            setInputRepetirPasswordValido(false);
        }

    }, [inputPassword])

    // *Función para activar boton submit-----------------------------
    useEffect(()=>{

        const activarBoton = ()=>{

            if(inputNombreValido && inputEmailValido && inputPasswordValido && inputRepetirPasswordValido){
                setBotonActivo(true);
            }
            else{
                setBotonActivo(false);
            }
        }

        activarBoton();

    }, [inputNombre, inputEmail, inputPassword, inputRepetirPassword])

    // *Envio de formulario-------------------------------------------
    const handleSubmit = async e =>{
        
        e.preventDefault();
        

        // *Crear usuario en la API
        try {
            
            const {data} = await clienteAxios.post('/usuarios', {
                nombre: inputNombre,
                email: inputEmail,
                password: inputPassword
            });

            setAlerta({
                msg: data.msg,
                error: false
            });

            // *Resetear formulario
            setInputNombre('');
            setInputEmail('');
            setInputPassword('');
            setInputRepetirPassword('');

            setInputNombreValido(false);
            setInputEmailValido(false);
            setInputPasswordValido(false);
            setInputRepetirPasswordValido(false);

            setTimeout(()=>{
                setAlerta({});
            }, 5000);

        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            });
        }
    }

    return (
        <>
            <div className="text-center space-y-5">
                <h1 className="text-indigo-400 font-bold text-6xl">Bienvenido</h1>
                <p className="text-slate-500 dark:text-slate-400 text-2xl font-light">Crea una cuenta y empieza a administrar tus proyectos.</p>
            </div>

            {alerta.msg && <Alerta alerta={alerta}/>}

            <form action="" className="mt-20" onSubmit={handleSubmit}>
                <div className="relative h-12 mb-12">
                    <input 
                        id="text"
                        name="nombre"
                        type="nombre"
                        className="w-full p-3 bg-transparent border-b border-gray-400 outline-none focus:border-indigo-400 focus:border-b-2 transition-all peer/nombre"
                        value={inputNombre}
                        onChange={e => validarNombre(e.target.value)}
                    />
                    <label 
                        htmlFor="text"
                        className={`${inputNombre ? 'top-[-20px] left-0 text-xs' : 'top-3 left-3'} absolute uppercase text-slate-500 font-bold transition-all duration-300 peer-focus/nombre:text-xs peer-focus/nombre:top-[-20px] peer-focus/nombre:left-0`}
                    >
                            Nombre
                    </label>

                    {inputNombre && 
                        <Validador 
                            valido={inputNombreValido}
                        /> 
                    }  
                </div>
                
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

                <div className="relative h-12 mb-12">
                    <input 
                        id="repetirPassword"
                        name="repetirPassword"
                        type="password"
                        className="w-full p-3 bg-transparent border-b border-gray-400 outline-none focus:border-indigo-400 focus:border-b-2 transition-all peer/password2" 
                        value={inputRepetirPassword}
                        onChange={e => validarRepetirPassword(e.target.value)}
                    />
                    <label 
                        htmlFor="repetirPassword"
                        className={`${inputRepetirPassword ? 'top-[-20px] left-0 text-xs' : 'top-3 left-3'} absolute uppercase text-slate-500 font-bold transition-all duration-300 peer-focus/password2:text-xs peer-focus/password2:top-[-20px] peer-focus/password2:left-0`}
                    >
                            Repetir contraseña
                    </label>

                    
                    {inputRepetirPassword && 
                        <Validador 
                            valido={inputRepetirPasswordValido}
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
                    ¿Ya tienes una cuenta? {' '}

                    <Link
                        className="text-indigo-400 lg:block"
                        to="/"
                    >
                        Inicia Sesión
                    </Link>
                </p>
                
                <p className="text-center text-slate-500">
                    ¿Olvidaste tú contraseña? {' '}

                    <Link
                        className="text-indigo-400 lg:block"
                        to="/olvide-password"
                    >
                        Recuperar
                    </Link>
                </p>
            </nav>
        </>
    )
}

export default Resgistrar