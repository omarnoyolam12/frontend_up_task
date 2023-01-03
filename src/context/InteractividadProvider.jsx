import { useState, createContext } from "react";

const InteractividadContext = createContext();

const InteractividadProvider = ({children})=>{

    const [menuAbierto, setMenuAbierto] = useState(false);
    const [paginaActual, setPaginaActual] = useState('dashboard');

    // *Función de abrir y cerrar el menu
    const abrirCerrar = ()=>{
        setMenuAbierto(!menuAbierto);
    }

    // *Detectar al dar click en el link la página
    const paginaActiva = e =>{

        const elemento = e.target;  
        let pagina = e.target.dataset.pagina;
        
        if(!pagina){
            
            const elementoPadre = elemento.parentNode;
            pagina = elementoPadre.dataset.pagina;

        }

        setPaginaActual(pagina);
    }

    return (
        <InteractividadContext.Provider
            value={{
                menuAbierto,
                abrirCerrar,
                paginaActiva,
                paginaActual,
                setPaginaActual
            }}
        >
            {children}
        </InteractividadContext.Provider>
    )
}

export {
    InteractividadProvider
}

export default InteractividadContext;