import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useProyectos from "../hooks/useProyectos";

import Spinner from "../components/Spinner";

import colorLD from "../helpers/colores";
import formatearFecha from "../helpers/formatearFecha";

import editar from "../img/editar.svg";
import basura from "../img/basura.svg";

const Proyecto = () => {

    const params = useParams();

    const {obtenerProyecto, proyecto, cargando, abrirCerrarModal, proyectos, alertaEliminar} = useProyectos();
    
    const [colorP, setColorP] = useState({});

    const {nombre, color, fechaEntrega, _id} = proyecto;

    // *Pasar el Id hacia el provider------------------------------
    useEffect(()=>{
        obtenerProyecto(params.id);
        
    }, [proyectos]);

    // useEffect(()=>{
        
    //     setColorP({
    //         background: `linear-gradient(90deg, ${color} 0%, ${colorLD(color, 15)} 100%)`
    //     });

    // }, [proyecto]);

    return (

        cargando ? (<Spinner/>) 
            : 
        (
            <div className='w-full min-h-56 p-10 bg-gradient-to-tr from-indigo-400 to-indigo-500' style={colorP}>
                <p className="text-white text-xl">Proyecto</p>
                <h1 className="font-bold text-4xl text-white">
                    {nombre}
                </h1>
                <p className="text-white font-bold mt-5">
                    Fecha de entrega: {' '}

                    <span className="font-normal">
                        {formatearFecha(fechaEntrega)}
                    </span>
                </p>

                
                <button 
                    className="bg-white py-3 px-5 mt-5 mr-5"
                    onClick={e => abrirCerrarModal(true)}   
                >
                    <div className="flex items-center gap-3">
                        <img className="h-5 w-5" src={editar} alt="editar" />
                        <span className="uppercase">Editar</span>
                    </div>
                </button>
                
                <button 
                    className="bg-red-400 py-3 px-5 mt-5 text-white"
                    onClick={e => alertaEliminar(params.id)}   
                >
                    <div className="flex items-center gap-3">
                        <img className="h-5 w-5" src={basura} alt="editar" />
                        <span className="uppercase">Eliminar</span>
                    </div>
                </button>
            </div>
        )
        
    )
}

export default Proyecto