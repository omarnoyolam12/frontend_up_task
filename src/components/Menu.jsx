import { Link } from "react-router-dom";
import useInteractividad from "../hooks/useInteractividad";

import layout from "../img/layout.svg";
import carpetas from "../img/carpetas.svg";
import tareas from "../img/tareas.svg";
import perfil from "../img/perfil.svg";
import salida from "../img/salida.svg";

const Menu = () => {

    const {menuAbierto, paginaActiva, paginaActual} = useInteractividad();

    return (
        <aside className={`${menuAbierto ? 'w-72' : 'w-[72px] left-[-72px]'} bg-gradient-to-br from-indigo-400 to-indigo-500 flex flex-col justify-between py-5 overflow-hidden transition-all duration-300 md:static absolute top-0 md:left-0 h-full z-20 shadow-2xl`}>
            
            <div>
                <h1 className="text-center text-5xl font-semibold text-white">
                    {menuAbierto ? 'i4Task' : 'i4'}
                </h1>

                <ul className="mt-8 space-y-3">
                    <li className={`px-5 hover:bg-indigo-400 transition-all relative ${paginaActual === 'dashboard' && "after:content-[''] after:block after:w-[5px] after:absolute after:left-0 after:top-0 after:bg-white after:h-full after:rounded-r-full"} `}>
                        <Link 
                            to="/dashboard" 
                            className="flex items-center gap-5"
                            data-pagina="dashboard"
                            onClick={e => paginaActiva(e)}
                        >
                            <img src={layout} alt="layout"/>

                            <p className="text-white">
                                Dashboard
                            </p>
                        </Link>
                    </li>
                    
                    <li className={`px-5 hover:bg-indigo-400 transition-all relative ${paginaActual === 'proyectos' && "after:content-[''] after:block after:w-[5px] after:absolute after:left-0 after:top-0 after:bg-white after:h-full after:rounded-r-full"} `}>
                        <Link 
                            to="/dashboard/proyectos" 
                            className="flex gap-5 items-center"
                            data-pagina="proyectos"
                            onClick={e => paginaActiva(e)}
                        >
                            <img src={carpetas} alt="carpetas" />

                            <p className="text-white">
                                Proyectos
                            </p>
                        </Link>
                    </li>
                    
                    <li className={`px-5 hover:bg-indigo-400 transition-all relative ${paginaActual === 'tareas' && "after:content-[''] after:block after:w-[5px] after:absolute after:left-0 after:top-0 after:bg-white after:h-full after:rounded-r-full"} `}>
                        <Link 
                            to="/dashboard/tareas" 
                            className="flex gap-5 items-center"
                            data-pagina="tareas"
                            onClick={e => paginaActiva(e)}
                        >
                            <img src={tareas} alt="tareas" />

                            <p className="text-white">
                                Tareas
                            </p>
                        </Link>
                    </li>
                    
                    <li className={`px-5 hover:bg-indigo-400 transition-all relative ${paginaActual === 'perfil' && "after:content-[''] after:block after:w-[5px] after:absolute after:left-0 after:top-0 after:bg-white after:h-full after:rounded-r-full"} `}>
                        <Link
                            to="/dashboar/perfil" 
                            className="flex gap-5 items-center"
                            data-pagina="Perfil"
                            onClick={e => paginaActiva(e)}
                        >
                            <img src={perfil} alt="perfil" />

                            <p className="text-white">
                                Perfil
                            </p>
                        </Link>
                    </li>
                </ul> 
            </div>

            <button type="button" className={`${menuAbierto ? 'px-5 gap-5 mx-5 rounded-lg' : 'px-1 w-full'} flex justify-center items-center py-3 bg-indigo-600   transition-all hover:bg-indigo-700 overflow-hidden`}>
                <img src={salida} alt="salida" />

                <p className={`${menuAbierto ? 'block' : 'hidden'} text-white`}>
                    Cerrar Sesión
                </p>
            </button>   
            
        </aside>
    )
}

export default Menu