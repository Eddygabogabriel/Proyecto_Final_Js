function renderCarrito() {
    const carrito = obtenerCarritoLS();
    let contenido = "";

    if (cantTotalProductos() > 0) {
        contenido = `<table class="colorFondo">
        <tbody>
        <tr>
        <td colspan='4' class="text-end"><button class="btn colorFondo2 btn-sm" onclick="eliminarCarrito()" title="Eliminar Carrito" >Borrar Carrito </button></td>
        </tr>`;

        for (const producto of carrito) {
            contenido += `<tr class="colorFondo">
            <td class="text-white"><img src="${producto.image}" alt="${producto.title}" width="80" /></td>
            <td class="text-white">${producto.title}</td>
            <td class="text-white"><b>$${producto.price}</b></td>
            <td class="text-end text-white"><button class="btn colorFondo2 btn-sm" onclick="eliminarProductoCarrito(${producto.id})" title="Eliminar"><img src="img/basura.svg" alt="Eliminar" width="20" /></button></td>
            </tr>`;
        }

        contenido += `<tr>
        <td class="text-center text-white" colspan='2'>Total a Pagar</td>
        <td><b>$${sumaTotalProductos()}</b></td>
        <td class="text-end text-white"><button class="btn colorFondo2 btn-sm" onclick="finalizarCompra()" title="Finalizar Compra"><b>Finalizar</b></button></td>
        </tr>
        </tbody>
        </table>`;
    } else {
        contenido = `<h1 class="colorFuente roboto-bold my-5 p-5 text-center text-white">No se encontraron Productos en el Carrito!</h1>`;
    }

    document.getElementById("productos").innerHTML = contenido;
}

renderCarrito();
renderBotonCarrito();