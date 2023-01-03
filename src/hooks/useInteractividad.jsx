import { useContext } from "react";
import InteractividadContext from "../context/InteractividadProvider";

const useInteractividad = ()=>{
    return useContext(InteractividadContext);
}

export default useInteractividad;