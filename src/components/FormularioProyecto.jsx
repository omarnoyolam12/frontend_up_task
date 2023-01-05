import { useState, useEffect } from "react";
import useProyectos from "../hooks/useProyectos";
import useInteractividad from "../hooks/useInteractividad";

import Alerta from "../components/Alerta";

const FormularioProyecto = () => {

    const [id, setId] = useState(null);
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fechaEntrega, setFechaEntrega] = useState('');
    const [cliente, setCliente] = useState('');
    const [color, setColor] = useState('#4338ca');

    const {alerta, submitProyecto, editar, proyecto: proyectoActual} = useProyectos();
    const {setPaginaActual} = useInteractividad();

    // *Verificar si se esta creando o editando un proyecto----------------
    useEffect(()=>{

        if(editar){

            setId(proyectoActual._id);
            setNombre(proyectoActual.nombre);
            setDescripcion(proyectoActual.descripcion);
            setFechaEntrega(proyectoActual.fechaEntrega.split('T')[0]);
            setCliente(proyectoActual.cliente);
            setColor(proyectoActual.color);

        }

    }, [])


    // *Funcion al dar click al boton submit-------------------------------
    const handleSubmit = async e =>{

        e.preventDefault();

        const datos = [nombre, descripcion, fechaEntrega, cliente, color];

        if(datos.includes('')){
            mostrarAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            });

            return;
        }

        // *Pasar los datos al provider de proyectos
        await submitProyecto({nombre, descripcion, fechaEntrega, cliente, color, id});

        // *Resetear los valores de los inputs
        setId('');
        setNombre('');
        setDescripcion('');
        setFechaEntrega('');
        setCliente('');

        setTimeout(()=>{
            setPaginaActual('proyectos');
        }, 3000);
    }

    const {msg} = alerta;

    return (
        <form 
            onSubmit={handleSubmit}
            className="space-y-5"
        >
            {msg && <Alerta alerta={alerta}/>}

            <div>
                <label 
                    htmlFor="nombre"
                    className="font-semibold"
                >
                    Nombre
                </label>

                <input
                    id="nombre" 
                    type="text" 
                    className="w-full p-2 bg-gray-100 outline-none focus:border-b-2 border-indigo-400 mt-2"
                    placeholder="Nombre del proyecto"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />
            </div>
            
            <div>
                <label 
                    htmlFor="descripcion"
                    className="font-semibold"
                >
                    Descripción
                </label>

                <textarea
                    id="descripcion"
                    className="w-full p-2 bg-gray-100 outline-none focus:border-b-2 border-indigo-400 mt-2 h-40"
                    placeholder="Descripción del proyecto"
                    value={descripcion}
                    onChange={e => setDescripcion(e.target.value)}
                />
            </div>

            <div>
                <label 
                    htmlFor="fecha-entrega"
                    className="font-semibold"
                >
                    Fecha de Entrega
                </label>

                <input
                    id="fecha-entrega" 
                    type="date" 
                    className="w-full p-2 bg-gray-100 outline-none focus:border-b-2 border-indigo-400 mt-2"
                    value={fechaEntrega}
                    onChange={e => setFechaEntrega(e.target.value)}
                />
            </div>

            <div>
                <label 
                    htmlFor="cliente"
                    className="font-semibold"
                >
                    Cliente
                </label>

                <input
                    id="cliente" 
                    type="text" 
                    className="w-full p-2 bg-gray-100 outline-none focus:border-b-2 border-indigo-400 mt-2"
                    placeholder="Nombre del cliente"
                    value={cliente}
                    onChange={e => setCliente(e.target.value)}
                />
            </div>

            <div>
                <p
                    className="font-semibold"
                >
                    Color
                </p>

                <input 
                    type="color" 
                    name="color" 
                    id="color"
                    value={color}
                    onChange={e => setColor(e.target.value)} 
                />
            </div>

            <input 
                type="submit" 
                value={editar ? 'Actualizar Proyecto' : 'Crear Proyecto'}
                className="p-3 w-full bg-indigo-500 text-white transition-all duration-300 hover:bg-indigo-600 cursor-pointer" 
            />
        </form>
    )
}

export default FormularioProyecto