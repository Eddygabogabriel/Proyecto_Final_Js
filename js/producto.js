function renderProducto() {
    const producto = buscarProducto();
    let contenido = `<div class='row'>
    <div class="col-md-6 offset-md-3 text-center" >
    <img src="${producto.image}" alt="${producto.title}" class="img-fluid" />
    </div>
    </div>
    <div class='row'>
    <div class="col-md-8 offset-md-2 text-center">
    <h2 class="colorFuente roboto-bold">${producto.title}</h2>
  
    <p class="colorFuente roboto-bold">$${producto.price}</p>
    <p><button class="btn colorFondo2" onclick="agregarProductoCarrito()"> Agregar</button></p>
    </div>
    </div>`;

    document.getElementById("producto").innerHTML = contenido;
}

renderProducto();
renderBotonCarrito();