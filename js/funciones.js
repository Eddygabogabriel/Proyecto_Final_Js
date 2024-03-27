


const errorFetchingModal = () => {
   const errorModal = document.querySelector(".errorModal")
   if(errorModal) errorModal.style.display = "block"
}

const guardarProductosLS = async () => {
    fetch("https://fakestoreapi.com/products", {timeout: 5})
    .then(res => {
      if(!res.ok) throw new Error("Error al realizar la solicitud")
      return res.json()
    })
    .then(res => { 
    localStorage.setItem("productos", JSON.stringify(res) )
    renderProductos()
    renderBotonCarrito()
})
    .catch(() => {
        errorFetchingModal()
    })
}

const obtenerProductosLS = () => {
    return JSON.parse(localStorage.getItem("productos")) || [];
}

const guardarCarritoLS = (productos) => {
    localStorage.setItem("carrito", JSON.stringify(productos));
}

const obtenerCarritoLS = () => {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

const obtenerIdProductoLS = () => {
    return JSON.parse(localStorage.getItem("producto")) || 0;
}

const obtenerIdCategoriaLS = () => {
    return JSON.parse(localStorage.getItem("categoria")) || "todos";
}

const cantTotalProductos = () => {
    const carrito = obtenerCarritoLS();

    return carrito.length;
}

const sumaTotalProductos = () => {
    const carrito = obtenerCarritoLS();
    
    return carrito.reduce((acumulador, item) => acumulador += item.price, 0);
}

const eliminarCarrito = () => {
    localStorage.removeItem("carrito");
    renderCarrito();
    renderBotonCarrito();
    notificacion("Carrito Eliminado!");
}

const verProducto = (id) => {
    localStorage.setItem("producto", JSON.stringify(id));
}

const verProductosPorCategoria = (id) => {
    localStorage.setItem("categoria", JSON.stringify(id));
}

const buscarProducto = () => {
    const productos = obtenerProductosLS();
    const id = obtenerIdProductoLS();
    const producto = productos.find(item => item.id === id);

    return producto;
}

const agregarProductoCarrito = () => {
    const producto = buscarProducto();
    const carrito = obtenerCarritoLS();
    carrito.push(producto);
    guardarCarritoLS(carrito);
    renderBotonCarrito();
    notificacion("Producto Agregado!");
}

const eliminarProductoCarrito = (id) => {
    const carrito = obtenerCarritoLS();
    const carritoActualizado = carrito.filter(item => item.id != id);
    guardarCarritoLS(carritoActualizado);
    renderCarrito();
    renderBotonCarrito();
    notificacion("Producto Eliminado!");
}

const renderBotonCarrito = () => {
    let totalCartElement = document.getElementById("totalCarrito") 
    if(totalCartElement) totalCartElement.innerHTML = cantTotalProductos();
}
    

const finalizarCompra = () => {
    Swal.fire({
        title: "Gracias por tu Compra!",
        text: "El total a pagar es $" + sumaTotalProductos() + " pesos.",
        imageUrl: "data:image/png;base64,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",
        imageWidth: 160,
        imageAlt: "Cafe Martinez",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Aceptar"
        }).then((result) => {
            if (result.isConfirmed) {
                eliminarCarrito();
            }
        });
}

const notificacion = (texto) => {
    Swal.fire({
        position: "top-end",
        title: texto,
        showConfirmButton: false,
        timer: 1000
    });
}
const renderProductos = () => {
    const productos = obtenerProductosLS();
    let contenido = "";

        productos?.forEach(product => {
            contenido += `<div class="col-md-4 text-center">
            <a href="producto.html" onclick="verProducto(${product.id});" class="text-decoration-none">
            <img src="${product.image}" alt="${product.title}" height="244" />
            <p class="colorFuente roboto-bold">${product.title}</p>
            </a>
            </div>`;
            
        });
       
    

    document.getElementById("productos").innerHTML = contenido;
}