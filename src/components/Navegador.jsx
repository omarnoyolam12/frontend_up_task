import useInteractividad from "../hooks/useInteractividad";

import menu from "../img/menu.svg";
import lupa from "../img/lupa.svg";

const Navegador = () => {

    const {abrirCerrar} = useInteractividad();

    return (
        <nav className="flex justify-between items-center py-5 flex-row-reverse md:flex-row">
            <div className="cursor-pointer" onClick={abrirCerrar}>
                <img src={menu} alt="menu" />
            </div>

            <div className="w-2/3 lg:w-96 relative">
                <input
                    className="px-3 w-full py-1 rounded-md outline-none focus:border-indigo-400 focus:border-b-2" 
                    type="text" 
                    name="buscador" 
                    id="buscador"
                    placeholder="Buscar proyecto" 
                />

                <div className="absolute right-3 top-1 w-[24px] h-[24px]">
                    <img src={lupa} alt="lupa" />
                </div>
            </div> 
        </nav>
    )
}

export default Navegador