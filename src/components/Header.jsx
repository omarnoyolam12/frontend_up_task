import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import BotonNuevoProyecto from "./BotonNuevoProyecto";

import obtenerIniciales from "../helpers/iniciales";

import team from "../img/team.svg";
import editar from "../img/editar.svg";
import addTask from "../img/addTask.svg";


const Header = () => {

    const {auth} = useAuth();
    const {nombre, email} = auth;

    return (
        <header className="grid grid-cols-4 gap-5">

            <div className="bg-gradient-to-br from-indigo-400 to-indigo-500 p-5 xl:col-[1_/_span_2] col-[1_/_span_4] rounded-lg flex justify-evenly items-center flex-col sm:flex-row text-white gap-5 shadow-lg">
                <div className="w-full sm:w-2/3 self-start space-y-5">
                    <h2 className="text-4xl">
                        Bienvenido, {' '}

                        <span className="font-semibold">
                            {nombre.split(' ')[0]}!
                        </span>
                    </h2>
                    
                    <p>
                    Manténgase al tanto y al día. Cree nuevos proyectos, invite a colaboradores, deje comentarios y añada fechas de vencimiento.
                    </p>
                </div>

                <figure className="w-2/3 sm:w-1/3">
                    <img className="w-full" src={team} alt="team" />
                </figure>
            </div>

            <div className="bg-white p-5 xl:col-[3_/_span_1] sm:col-[1_/_span_2] col-[1_/_span_4] rounded-lg shadow-lg flex flex-col justify-center">
                <figure className="xl:w-full lg:1/2 md:w-2/3 mx-auto">
                    <img className="w-full" src={addTask} alt="team" />
                </figure>

                <div className="mt-5 flex justify-center">
                    <BotonNuevoProyecto lugar="header"/>
                </div>
            </div>

            <div className="bg-white p-5 xl:col-[4_/_span_1] sm:col-[3_/_span_2] col-[1_/_span_4] rounded-lg shadow-lg text-slate-700">
                <div className="flex justify-between items-center">
                    <p>
                        Perfil
                    </p>

                    <Link className="block w-[24px] h-[24px]">
                        <img src={editar} alt="Editar Perfil" />
                    </Link>
                </div>

                <div className="flex flex-col justify-center items-center">
                    <div className="w-[72px] h-[72px] rounded-full flex justify-center items-center bg-pink-700 text-2xl font-semibold text-white my-5">
                        {obtenerIniciales(nombre)}
                    </div>

                    <p>{nombre}</p>
                    <p>{email}</p>
                </div>
            </div>

        </header>
        
    )
}

export default Header