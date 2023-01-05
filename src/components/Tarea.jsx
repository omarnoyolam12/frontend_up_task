import formatearFecha from "../helpers/formatearFecha";

import editar from "../img/editar.svg";
import basura from "../img/basura.svg";

const Tarea = ({tarea}) => {

    const {nombre, descripcion, fechaEntrega, prioridad, estado} = tarea;

    return (
        <div className="flex flex-col lg:grid lg:grid-cols-7 p-3 bg-white rounded-lg gap-2 shadow-lg">
            <div className="col-span-2">
                <p className="font-bold text-slate-700">{nombre}</p>
                <p className="text-slate-400 text-sm">{descripcion}</p>
            </div>
            <div className="col-span-1 flex justify-start lg:justify-center items-center text-slate-700 text-sm">
                <p className="font-bold inline-block lg:hidden mr-2">Fecha de entrega: </p>
                <p>{formatearFecha(fechaEntrega)}</p>
            </div>
            <div className="col-span-1 flex justify-start lg:justify-center items-center text-slate-700 text-sm">
                <p className="font-bold inline-block lg:hidden mr-2">Responsable:</p>
                <p>Omar Noyola</p>
            </div>
            <div className="col-span-1 flex justify-start lg:justify-center items-center text-slate-700 text-sm">
                <p className="font-bold inline-block lg:hidden mr-2">Prioridad:</p>
                <p>{prioridad}</p>
            </div>
            <div className="col-span-1 flex justify-start lg:justify-center items-center text-slate-700 text-sm">
                {estado ? 
                    (
                        <button className="bg-green-200 text-green-700 font-semibold py-1 px-3 rounded-full">
                            Completada
                        </button>
                    ) 
                    : 
                    (
                        <button className="bg-indigo-200 text-indigo-700 font-semibold py-1 px-3 rounded-full">
                            En proceso
                        </button>
                    )
                }
            </div>
            <div className="col-span-1 flex justify-start lg:justify-center items-center text-slate-700 text-sm gap-3">
                <button className="w-8 h-8 bg-gray-200 flex justify-center items-start p-1 rounded-md">
                    <img src={editar} alt="editar" />
                </button>

                <button className="w-8 h-8 bg-red-300 flex justify-center items-start p-1 rounded-md">
                    <img src={basura} alt="eliminar" />
                </button>
            </div>
        </div>
    )
}

export default Tarea