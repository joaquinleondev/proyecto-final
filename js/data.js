const wrapperProductos = document.querySelector(".cardsWrapper"); // Salvamos elementos del documento que necesitaremos
let productos = []; // Variable global

// Constructora de los productos
class Producto {
	constructor(img, price, discount, ship, id, cantidad) {
		this.imagen = img;
		this.precio = price;
		this.descuento = discount;
		this.envio = ship;
		this.id = id;
		this.cantidad = cantidad;
	}
	renderProduct(producto) {
		// Incluimos el renderizado como metodo, aguilizando el proceso
		const card = document.createElement("div");
		card.innerHTML = `<div class="productCard">
      <img src=${producto.imagen} alt="" class="imgProduct">
      <hr>
      <div class="priceWrapper">
        <h3>$${producto.precio} <span>${producto.descuento}</span></h3>
        <p>Envio gratis</p><img src="./img/envio-logo.svg" alt="">
        <a href="#" class="btn-addCart" data-id="${producto.id}">Agregar al carrito</a>
      </div>
    </div>`;
		wrapperProductos.appendChild(card);
		productos.push(producto);
	}
}

// Funcion  para agilizar la creacion de productos
const nuevoProducto = (img, price, discount, ship, id, cantidad) => {
	const producto = new Producto(img, price, discount, ship, id, cantidad);
	producto.renderProduct(producto);
};

// Creacion de productos
nuevoProducto("./img/celular-1.png", 295000, "21%", "Envio gratis", 0, 1);
nuevoProducto("./img/celular-2.png", 95000, "15%", "Envio gratis", 1, 1);
nuevoProducto("./img/computadora-1.png", 193030, "5%", "Envio gratis", 2, 1);
nuevoProducto("./img/computadora-2.png", 450000, "7%", "Envio gratis", 3, 1);
nuevoProducto("./img/teclado-1.png", 5099, "2%", "Envio gratis", 4, 1);
nuevoProducto("./img/teclado-2.png", 8099, "4%", "Envio gratis", 5, 1);
nuevoProducto("./img/televisor-1.png", 140500, "17%", "Envio gratis", 6, 1);

// Pedido de datos localmente
const obtenerProductos = async () => {
  const response = await fetch('js/productos.json')
  const datos = await response.json()
  console.log(datos, 'Datos obtenidos de un archivo local')
}
obtenerProductos()