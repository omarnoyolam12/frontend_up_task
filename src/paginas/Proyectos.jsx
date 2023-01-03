import { useState } from "react";
import useProyectos from "../hooks/useProyectos";

import TarjetaProyecto from "../components/TarjetaProyecto";
import BotonNuevoProyecto from "../components/BotonNuevoProyecto";

const Proyectos = () => {

    const {proyectos} = useProyectos();

    return (
        <div>
            <BotonNuevoProyecto lugar="proyectos"/>

            <h1 className="text-4xl font-black text-indigo-400 mt-10">
                Proyectos
            </h1>

            {proyectos.length ? 
                (
                    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {proyectos.map(proyecto=>(
                            <TarjetaProyecto
                                key={proyecto._id}
                                proyecto={proyecto}
                            />
                        ))}
                    </div>
                ) 
                : 
                (
                    <div className="mt-10 bg-white p-5 rounded-lg">
                        <p className="text-slate-500 text-center font-bold uppercase">
                            No tienes proyectos aún
                        </p>
                    </div>
                )
            }
        </div>
    )
}

export default Proyectos