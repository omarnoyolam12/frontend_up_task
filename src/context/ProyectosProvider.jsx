import { createContext, useEffect, useState } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const ProyectosContext = createContext();

const ProyectosProvider = ({children})=>{

    const [modal, setModal] = useState(false);
    const [editar, setEditar] = useState(false);
    const [animarModal, setAnimarModal] = useState(false);
    const [alerta, setAlerta] = useState({});
    const [proyectos, setProyectos] = useState([]);
    const [proyecto, setProyecto] = useState({});
    const [cargando, setCargando] = useState(false);
    const [modalTarea, setModalTarea] = useState(false);
    const [tarea, setTarea] = useState({});

    const navigate = useNavigate(); 

    // *Abrir o Cerrar el formulario de proyecto----------------------
    const abrirCerrarModal = editar=>{

        setModal(!modal);

        if(editar){
            setEditar(editar);
        }
        else{
            setEditar(false);
        }

        setTimeout(()=>{
            setAnimarModal(!animarModal);
        }, 500);
    }

    // *Mostrar Alerta--------------------------------------------------
    const mostrarAlerta = alerta=>{
        setAlerta(alerta);

        setTimeout(()=>{
            setAlerta({});
        }, 3000);
    }

    // *Obtener los proyectos del usuario-------------------------------
    useEffect(()=>{

        const obtenerProyectos = async ()=>{

            try {
                
                const jwt = localStorage.getItem('jwt');

                if(!jwt){
                    return;
                }

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${jwt}`
                    }
                }

                const {data} = await clienteAxios('/proyectos', config);
                setProyectos(data)

            } catch (error) {
                console.log(error);
            }

        }

        obtenerProyectos();

    }, []);

    // *Elegir si edita o crea un proyecto-------------------------------
    const submitProyecto = async proyecto=>{
        
        if(proyecto.id){
            await editarProyecto(proyecto);
        }
        else{
            await nuevoProyecto(proyecto);
        }

        
    }

    // *Editar un proyecto---------------------------------------------
    const editarProyecto = async proyecto=>{

        try {
            
            const jwt = localStorage.getItem('jwt');

            if(!jwt){
                return;
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwt}`
                }
            }

            const {data} = await clienteAxios.put(`/proyectos/${proyecto.id}`, proyecto, config);

            // *Sincronizar el state
            const proyectosActualizados = proyectos.map(proyectoState => proyectoState._id === data._id ? data : proyectoState);

            setProyectos(proyectosActualizados);

            mostrarAlerta({
                msg: 'Proyecto Actualizado Correctamente',
                error: false
            });

            setTimeout(()=>{
                setModal(false);
                setAnimarModal(false);
                navigate(`/dashboard/proyecto/${proyecto.id}`);
            }, 3000);

        } catch (error) {
            console.log(error);
        }

    }

    // *Crear un nuevo proyecto------------------------------------
    const nuevoProyecto = async proyecto=>{

        try {
            
            const jwt = localStorage.getItem('jwt');

            if(!jwt){
                return;
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwt}`
                }
            }

            const {data} = await clienteAxios.post('/proyectos', proyecto, config);

            setProyectos([...proyectos, data]);

            mostrarAlerta({
                msg: 'Proyecto Creado Correctamente',
                error: false
            });

            setTimeout(()=>{
                setModal(false);
                setAnimarModal(false);
                navigate('/dashboard/proyectos');
            }, 3000);

        } catch (error) {
            console.log(error);
        }

    }

    // *Obtener un proyecto por su Id-----------------------------------
    const obtenerProyecto = async id=>{

        setCargando(true);
        
        try {
            
            const jwt = localStorage.getItem('jwt');

            if(!jwt){
                return;
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwt}`
                }
            }

            const {data} = await clienteAxios(`/proyectos/${id}`, config);

            setProyecto(data);

        } catch (error) {
            console.log(error);
        } finally {
            setCargando(false);
        }
    }

    // *Eliminar un proyecto------------------------------------------
    const alertaEliminar = id=>{

        Swal.fire({
            title: 'Eliminar Proyecto?',
            text: "Esta acción, no puede revertirse",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#6366f1',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'Cancelar!',
        }).then((result) => {
            if (result.isConfirmed) {
                eliminarProyecto(id);
            }
        });

    }

    const eliminarProyecto = async id=>{
        
        try {
            
            const jwt = localStorage.getItem('jwt');

            if(!jwt){
                return;
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwt}`
                }
            }

            const {data} = await clienteAxios.delete(`/proyectos/${id}`, config);

            // *Sincronizar el state con los proyectos
            const proyectosActualizados = proyectos.filter(proyectoState => proyectoState._id !== id);

            setProyectos(proyectosActualizados);

            Swal.fire(
                'Eliminado!',
                `${data.msg}`,
                'success'
            );

            
            navigate('/dashboard/proyectos');
            

        } catch (error) {
            console.log(error);
        }

    }

    // *Abrir o cerrar el modal de tareas----------------------------
    const handleModalTarea = ()=>{
        setModalTarea(!modalTarea);
        setTarea({});
    }

    // *Elegir si edita o agrega una tarea nueva---------------------
    const agregarTarea = async tarea=>{

        if(tarea.id){
            await editarTarea(tarea);
        }
        else{
            await crearTarea(tarea);
        }
    }

    // *Crear una nueva tarea----------------------------------------
    const crearTarea = async tarea=>{

        try {
            
            const jwt = localStorage.getItem('jwt');

            if(!jwt){
                return;
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwt}`
                }
            }

            const {data} = await clienteAxios.post('/tareas', tarea, config);

            // *Agregar la tarea al state
            const proyectoActualizado = {...proyecto}
            proyectoActualizado.tareas = [...proyecto.tareas, data];

            setProyecto(proyectoActualizado);

        } catch (error) {
            console.log(error);
        }
    }

    // *Editar una tarea------------------------------------------------
    const editarTarea = async tarea=>{
        
        try {
            
            const jwt = localStorage.getItem('jwt');

            if(!jwt){
                return;
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwt}`
                }
            }

            const {data} = await clienteAxios.put(`/tareas/${tarea.id}`, tarea, config);

            // *Actualizar el DOM
            const proyectoActualizado = {...proyecto};

            proyectoActualizado.tareas = proyectoActualizado.tareas.map(tareaState => tareaState._id === data._id ? data : tareaState);

            setProyecto(proyectoActualizado);

        } catch (error) {
            console.log(error);
        }

    }

    // *Abrir el modal con los campos llenos----------------------------
    const handleModalEditarTarea = tarea=>{
        setTarea(tarea);
        setModalTarea(true);
    }

    // *Alerta eliminar tarea-------------------------------------------
    const alertaEliminarTarea = tarea=>{
        
        Swal.fire({
            title: 'Eliminar Tarea?',
            text: "Esta acción, no puede revertirse",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#6366f1',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'Cancelar!',
        }).then((result) => {
            if (result.isConfirmed) {
                eliminarTarea(tarea);
            }
        });
    }

    // *Eliminar tarea
    const eliminarTarea = async tarea=>{

        try {
            
            const jwt = localStorage.getItem('jwt');

            if(!jwt){
                return;
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwt}`
                }
            }

            const {data} = await clienteAxios.delete(`/tareas/${tarea._id}`, config);

            Swal.fire({
                position: 'center',
                icon: 'success',
                title: data.msg,
                showConfirmButton: false,
                timer: 2000
            });

            // *Actualizar el DOM
            const proyectoActualizado = {...proyecto};
            proyectoActualizado.tareas = proyectoActualizado.tareas.filter(tareaState => tareaState._id !== tarea._id);

            setProyecto(proyectoActualizado);


        } catch (error) {
            console.log(error);
        }

    }

    return (
        <ProyectosContext.Provider
            value={{
                proyectos, 
                modal,
                abrirCerrarModal,
                animarModal,
                alerta,
                mostrarAlerta,
                submitProyecto,
                obtenerProyecto,
                proyecto,
                cargando,
                editar,
                alertaEliminar,
                modalTarea,
                handleModalTarea,
                agregarTarea,
                handleModalEditarTarea,
                tarea,
                alertaEliminarTarea
            }}
        >
            {children}
        </ProyectosContext.Provider>
    )
}

export {
    ProyectosProvider
}

export default ProyectosContext;