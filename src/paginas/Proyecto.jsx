import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useProyectos from "../hooks/useProyectos";

import Spinner from "../components/Spinner";
import Tarea from "../components/Tarea";
import ModalTarea from "../components/ModalTarea";

import colorLD from "../helpers/colores";
import formatearFecha from "../helpers/formatearFecha";

import editar from "../img/editar.svg";
import basura from "../img/basura.svg";
import addProyecto from "../img/addProyecto.svg";

const Proyecto = () => {

    const params = useParams();

    const {obtenerProyecto, proyecto, cargando, abrirCerrarModal, proyectos, alertaEliminar, handleModalTarea} = useProyectos();
    
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
            <>
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
                        className="flex w-full justify-center items-center md:inline-block md:w-auto bg-white py-3 px-5 mt-5 mr-5"
                        onClick={e => abrirCerrarModal(true)}   
                    >
                        <div className="flex items-center gap-3">
                            <img className="h-5 w-5" src={editar} alt="editar" />
                            <span className="uppercase">Editar</span>
                        </div>
                    </button>
                    
                    <button 
                        className="flex w-full justify-center items-center md:inline-block md:w-auto bg-red-400 py-3 px-5 mt-5 text-white"
                        onClick={e => alertaEliminar(params.id)}   
                    >
                        <div className="flex items-center gap-3">
                            <img className="h-5 w-5" src={basura} alt="editar" />
                            <span className="uppercase">Eliminar</span>
                        </div>
                    </button>
                </div>

                <button 
                    className="mt-10 px-5 py-3 flex justify-center items-center gap-3 bg-indigo-400 shadow-md transition-all duration-300 hover:bg-indigo-500"
                    onClick={handleModalTarea}
                >
                    <img className="w-7 h-7" src={addProyecto} alt="Proyecto" />
                    <p className="font-semibold text-white">Nueva tarea</p>
                </button>

                <div className="mt-10 space-y-5">
                    {proyecto.tareas?.length ? 
                        <div className="space-y-5">
                            <div className="hidden lg:grid grid-cols-7 p-3 bg-indigo-100 text-indigo-600 font-bold rounded-full gap-2 uppercase text-sm">
                                <div className="col-span-2 flex justify-center items-center">
                                    <p className="text-center">Tarea</p>
                                </div>
                                <div className="col-span-1 flex justify-center items-center">
                                    <p className="text-center">Fecha de entrega</p>
                                </div>
                                <div className="col-span-1 flex justify-center items-center">
                                    <p className="text-center">Responsable</p>
                                </div>
                                <div className="col-span-1 flex justify-center items-center">
                                    <p className="text-center">Prioridad</p>
                                </div>
                                <div className="col-span-1 flex justify-center items-center">
                                    <p className="text-center">Estado</p>
                                </div>
                                <div className="col-span-1 flex justify-center items-center">
                                    <p className="text-center">Acciones</p>
                                </div>
                            </div>

                            {proyecto.tareas?.map(tarea=>(
                                <Tarea 
                                    key={tarea._id}
                                    tarea={tarea}
                                />
                            ))}

                        </div>
                    : 
                        (<div className="p-3 bg-white rounded-lg shadow-lg flex justify-center items-center">
                            <p className="text-slate-700 font-semibold">
                                Aun no hay tareas 
                            </p>
                        </div>)
                    }
                </div>

                <ModalTarea/>
            </>
        )
        
    )
}

export default Proyecto