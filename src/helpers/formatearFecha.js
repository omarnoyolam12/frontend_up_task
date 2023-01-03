const formatearFecha = fecha =>{
    const fechaNueva = new Date(fecha);

    // *Arreglas el desface de la zona horaria
    fechaNueva.setMinutes(fechaNueva.getMinutes() + fechaNueva.getTimezoneOffset());

    const opciones = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: '2-digit',
    }

    return fechaNueva.toLocaleDateString('es-ES', opciones);
}

export default formatearFecha;