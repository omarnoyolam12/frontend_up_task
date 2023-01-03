import { useState } from "react";
import { Link } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";

import Validador from "../components/Validador";
import Alerta from "../components/Alerta";

const OlvidePassword = () => {

    const [inputEmail, setInputEmail] = useState('');
    const [inputEmailValido, setInputEmailValido] = useState(false);

    const [botonActivo, setBotonActivo] = useState(false);
    const [alerta, setAlerta] = useState({});

    // *Función para validar el email------------------------------
    const validarEmail = valor =>{

        const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 

        setInputEmail(valor);

        if(er.test(valor)){
            setInputEmailValido(true);
            setBotonActivo(true);
        }
        else{
            setInputEmailValido(false);
            setBotonActivo(false);
        }
        
    }

    const handleClick = async e =>{

        e.preventDefault();

        try {
            
            const {data} = await clienteAxios.post('/usuarios/olvide-password', {
                email: inputEmail
            });

            setAlerta({
                msg: data.msg,
                error: false
            });

            // *Resetear el formulario
            setInputEmail('');
            setInputEmailValido(false);
            setBotonActivo(false);

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

    const {msg} = alerta;

    return (
        <>
            <div className="text-center space-y-5">
                <h1 className="text-indigo-400 font-bold text-6xl">Oh no!</h1>
                <p className="text-slate-500 dark:text-slate-400 text-2xl font-light">Recupera tu acceso y no pierdas tus proyectos.</p>
            </div>

            {msg && <Alerta alerta={alerta}/>}

            <form action="" className="mt-20" onSubmit={handleClick}>                
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

                <input 
                    type="submit" 
                    value="Enviar instrucciones"
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
                    ¿No tienes una cuenta? {' '}

                    <Link
                        className="text-indigo-400 lg:block"
                        to="/registrar"
                    >
                        Crea una
                    </Link>
                </p>
            </nav>
        </>
    )
}

export default OlvidePassword
