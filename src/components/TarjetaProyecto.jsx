import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import colorLD from "../helpers/colores";

const TarjetaProyecto = ({proyecto}) => {

    const {nombre, cliente, color, descripcion, fechaEntrega, _id} = proyecto;

    const [colorPrincipal, setColorPrincipal] = useState({});
    const [colorOscurecido1, setColorOscurecido1] = useState({});
    const [colorOscurecido2, setColorOscurecido2] = useState({});
    const [colorBarra, setColorBarra] = useState({})
    const [porcentaje, setPorcentaje] = useState(50);

    useEffect(()=>{

        const asignarColor = ()=>{

            const css1 = {
                background: color
            }

            const css2 = {
                background: colorLD(color, 20),
                clipPath: 'polygon(100% 0, 75% 100%, 100% 100%)'
            }

            const css3 = {
                background: colorLD(color, 10),
                clipPath: 'polygon(100% 0, 100% 15%, 75% 100%, 70% 100%)'
            }

            setColorPrincipal(css1);
            setColorOscurecido1(css2);
            setColorOscurecido2(css3);
            setColorBarra(css1);

        }

        asignarColor();

    }, []);

    return (
        <div className="bg-white p-5 rounded-2xl shadow-md">
            <div 
                className="overflow-hidden relative p-3 text-white text-center rounded-2xl" 
                style={colorPrincipal}
            >
                <div
                    className="w-full h-full absolute top-0 left-0" 
                    style={colorOscurecido1}
                >        
                </div>

                <div
                    className="w-full h-full absolute top-0 left-0" 
                    style={colorOscurecido2}
                >        
                </div>

                <h3 className="relative z-10 font-bold line-clamp-1">
                    {nombre}
                </h3>

            </div>

            <div className="flex flex-col mt-5">
                <h3 className=" text-slate-700 text-lg line-clamp-2">
                    {descripcion} 
                </h3>
            </div>

            <div className="w-full flex justify-between items-center gap-5 mt-5">
                <div className="w-3/4 h-1 bg-gray-300 relative">
                    <div className={`w-[50%] h-full absolute top-0 left-0`} style={colorBarra}></div>
                </div>

                <p className="flex-1 text-slate-900 font-semibold text-xl">50%</p>
            </div>

            <div className="mt-2 flex justify-between items-center gap-5">
                <div className="">
                    <p className="text-slate-500">Cliente</p>
                    <p className="font-semibold text-slate-800 line-clamp-1">{cliente}</p>
                </div>

                <Link
                    className="w-9 h-9 relative flex justify-center items-center bg-gray-100 overflow-hidden rounded-full transition-all duration-300 delay-500 before:w-3 before:h-3 before:absolute before:right-4 before:transition-all before:duration-300 before:border-t-2 before:border-r-2 before:border-slate-700 before:rotate-45 after:w-3 after:h-3 after:absolute after:-left-12 after:transition-all after:duration-300 after:border-t-2 after:border-r-2 after:border-slate-700 after:rotate-45 hover:w-52 hover:before:translate-x-12 hover:after:translate-x-14 hover:after:delay-1000 group"
                    to={`/dashboard/proyecto/${_id}`}
                >
                    <span className="text-center leading-3 invisible opacity-0 font-semibold text-slate-700 transition-all duration-500 group-hover:visible group-hover:opacity-100 group-hover:delay-700">
                        Ver Proyecto
                    </span>
                </Link>
            </div>

        </div>
    )
}

export default TarjetaProyecto