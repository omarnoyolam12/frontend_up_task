const colorLD = (color, porcentaje)=>{

    // *Extraer los colores y quitar numeral
    const rojo = color.substring(1, 3);
    const verde = color.substring(3, 5);
    const azul = color.substring(5);

    // *Sacar el % a oscurecer
    const cantidad = parseInt((porcentaje * 255) / 100);
    
    // *Convertir a enteros y aumentar intensidad
    const entRojo = parseInt(rojo, 16) + cantidad;
    const entVerde = parseInt(verde, 16) + cantidad;
    const entAzul = parseInt(azul, 16) + cantidad;

    // *Evitar que pasen los 255
    const rojoE = (entRojo > 255) ? 255 : entRojo;
    const verdeE = (entVerde > 255) ? 255 : entVerde;
    const azulE = (entAzul > 255) ? 255 : entAzul;

    // *Regresar a hexadecimal
    const rojoHex = rojoE.toString(16).length > 1 ? rojoE.toString(16) : `0${rojoE.toString(16)}`;
    const verdeHex = verdeE.toString(16).length > 1 ? verdeE.toString(16) : `0${verdeE.toString(16)}`;
    const azulHex = azulE.toString(16).length > 1 ? azulE.toString(16) : `0${azulE.toString(16)}`;

    return `#${rojoHex}${verdeHex}${azulHex}`;
}

export default colorLD