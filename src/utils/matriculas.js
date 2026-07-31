const TIPO_MASTER = 'master';
const PRECIO_POR_CREDITO_MASTER = 78;
const PRECIO_POR_CREDITO_OTRO = 45;
const DESCUENTO_ANTIGUO = 0.15;
const DESCUENTO_PRONTO = 0.05;

export function calcularPrecio(tipo, creditos, antiguo, pronto) {
    const precioBase =
        tipo === TIPO_MASTER
            ? creditos * PRECIO_POR_CREDITO_MASTER
            : creditos * PRECIO_POR_CREDITO_OTRO;

    let precio = precioBase;

    if (antiguo === true) {
        precio = precio - precio * DESCUENTO_ANTIGUO;
    }

    if (pronto === true) {
        precio = precio - precio * DESCUENTO_PRONTO;
    }

    return precio;
}
