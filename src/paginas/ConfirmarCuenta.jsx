import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";
import Alerta from "../components/Alerta";

const ConfirmarCuenta = () => {

    const {id} = useParams();

    const [alerta, setAlerta] = useState({});
    const [cuentaConfirmada, setCuentaConfirmada] = useState(false);

    useEffect(()=>{

        const confirmarCuenta = async ()=>{

            try {
                
                const url = `/usuarios/confirmar/${id}`;
                const {data} = await clienteAxios(url);

                setAlerta({
                    msg: data.msg,
                    error: false
                });

                setCuentaConfirmada(true);

            } catch (error) {
                setAlerta({
                    msg: error.response.data.msg,
                    error: true
                });
            }

        }

        confirmarCuenta();
    }, []);

    const {msg} = alerta;

    return (
        <>
            <div className="text-center space-y-5">
                <h1 className="text-indigo-400 font-bold text-6xl">Confirma tu cuenta</h1>
                {/* <p className="text-slate-500 dark:text-slate-400 text-2xl font-light">Reestablece tu contraseña y recupera el acceso a tus proyectos.</p> */}
            </div>

            <div className="mt-20 md:mt10 shadow-lg px-5 py-10 rounded-xl bg-white">
                {msg && <Alerta alerta={alerta}/>}

                {cuentaConfirmada && (
                    <Link
                        className="text-indigo-400 lg:block text-center"
                        to="/"
                    >
                        Inicia Sesión
                    </Link>
                )}
            </div>
        </>
    )
}

export default ConfirmarCuenta