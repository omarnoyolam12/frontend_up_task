import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useProyectos from "../hooks/useProyectos";
import Navegador from "../components/Navegador";

import Menu from "../components/Menu";
import ModalNuevoProyecto from "../components/ModalNuevoProyecto";

const RutaProtegida = () => {

    const {auth, cargando} = useAuth();
    const {modal} = useProyectos();

    if(cargando) return 'Cargando...'

    return (
        <>
            {auth._id ? 
                <div className={`h-screen flex relative ${modal && 'overflow-hidden'}`}>
                    <Menu/>

                    <div className="flex-1 pb-5 h-screen overflow-y-scroll">
                        <div className="w-[90%] max-w-[1536px] mx-auto">
                            <Navegador/>

                            
                            <Outlet/>
                        </div>
                    </div>

                    {modal && <ModalNuevoProyecto/>}
                </div>
            : 
            
                <Navigate to="/" /> 
            }
        </>
    )
}

export default RutaProtegida