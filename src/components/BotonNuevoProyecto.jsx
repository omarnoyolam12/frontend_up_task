import useProyectos from "../hooks/useProyectos";

import addProyecto from "../img/addProyecto.svg";
import plus from "../img/plus.svg";

const BotonNuevoProyecto = ({lugar}) => {

    const {abrirCerrarModal} = useProyectos();

    return (
        <>
            {lugar === 'header' ? (
                <button
                    type="button"
                    className="px-5 py-2 bg-indigo-400 inline-block text-white rounded-full transition-all hover:bg-indigo-500 text-center"
                    onClick={e => abrirCerrarModal(false)}
                >
                    Nuevo Proyecto
                </button>
            ): (
                <button 
                    className="flex justify-between items-center gap-4 bg-white w-auto px-6 py-3 shadow-lg rounded-md"
                    onClick={e => abrirCerrarModal(false)}
                >
                    <figure className="w-[62px]">
                        <img className="w-full" src={addProyecto} alt="Add Proyecto" />
                    </figure>
        
                    <div className="w-1/2 text-sm text-left">
                        <p className="text-slate-600 font-semibold">
                            Nuevo Proyecto
                        </p>
                        <p className="text-slate-400 leading-3">
                            Crea un proyecto y tareas
                        </p>                                
                    </div>

                    <div className="">
                        <img src={plus} alt="plus" />
                    </div>
                </button>
            )}
        </>
        

        
    )
}

export default BotonNuevoProyecto