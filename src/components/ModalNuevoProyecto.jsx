import useProyectos from "../hooks/useProyectos";

import FormularioProyecto from "./FormularioProyecto";
import close from "../img/close.svg";

const ModalNuevoProyecto = () => {

    const {animarModal, abrirCerrarModal, editar} = useProyectos();

    return (
        <div className={`w-full min-h-full absolute z-50 bg-[#00000080] transition-all duration-300 ${animarModal ? 'opacity-100' : 'opacity-0'} flex justify-center items-center`}>
            <div className="bg-white p-5 w-[95%] sm-[80%] md:w-[60%] lg:w-[50%] xl:w-[40%] rounded-lg">
                <div className="flex justify-between items-center mb-10">
                    <h2 className="text-indigo-500 font-semibold text-2xl">
                        {editar ? 'Editando Proyecto' : 'Nuevo Proyecto'}
                    </h2>

                    <button 
                        className="bg-gray-100 w-[32px] h-[32px] rounded-full flex justify-center items-center p-1"
                        onClick={abrirCerrarModal}
                    >
                        <img src={close} alt="close" />
                    </button>
                </div>

                <FormularioProyecto/>
            </div>
        </div>
    )
}

export default ModalNuevoProyecto