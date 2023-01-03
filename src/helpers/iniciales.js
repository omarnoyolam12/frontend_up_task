const obtenerIniciales = nombre =>{
    
    const separar = nombre.split(' ');
    const inicial1 = separar[0].charAt(0);
    const inicial2 = separar[1].charAt(0);

    return `${inicial1}${inicial2}`;
}

export default obtenerIniciales;