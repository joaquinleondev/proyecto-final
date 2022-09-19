// Definimos variables globales y salvamos elementos del DOM
let carro = [];
const btnsAdd = document.querySelectorAll(".btn-addCart");
const productsWrapper = document.querySelector(".productsWrapper");
let btnDel = [];
const btnVaciarCarro = document.querySelector(".btn-vaciar");
const contadorTotal = document.querySelector(".contador-total");
const cartToogler = document.querySelector(".carro-btn");
const cartWrapper = document.querySelector(".cartWrapper");
const closeCartBtn = document.querySelector(".close-btn ");
const mainWrapper = document.querySelector("main");

// Funciones localStorage
const cargarDato = () => {
	localStorage.setItem("Carrito", JSON.stringify(carro));
};

// Funciones app
const actualizarTotal = () => {
	let total = 0;
	carro.forEach((producto) => {
		total += producto.precio * producto.cantidad;
	});
	contadorTotal.innerHTML = total;
};

const renderizarCarro = () => {
	productsWrapper.innerHTML = "";
	carro.forEach((producto) => {
		const newProducto = document.createElement("div");
		newProducto.innerHTML = `<div class="productCart">
      <img src="${producto.imagen}" alt="" class="prodImg">
      <h5>Iphone Xr<p>Color del producto: Rosa<br>Memoria: 64GB<br>Memoria RAM: 6GB</p></h5>
      <a href="#"><img src="./img/sumar-icon.png" alt="" onclick="modifyUnit(${producto.id}, 'suma')"></a>
      <span class="cantidad">${producto.cantidad}</span>
      <a href="#"><img src="./img/restar-icon.png" alt="" onclick="modifyUnit(${producto.id}, 'resta')"></a>
      <a href="#"><img src="./img/eliminar-icon.png" alt="" class="btn-delete" onclick="eliminarDelCarro(${producto.id})"></a>
      <span class="precio">$${producto.precio}</span>
    </div>`;
		productsWrapper.appendChild(newProducto);
	});
	actualizarTotal();
};

const eliminarDelCarro = (productoId) => {
	const item = carro.find((producto) => producto.id === productoId);
	const index = carro.indexOf(item);
	carro.splice(index, 1);
	item.cantidad = 1;
	renderizarCarro();
	cargarDato();
	if (localStorage.getItem("Carrito") === "[]") {
		localStorage.clear();
	}
};

const vaciarCarro = () => {
	carro = [];
	renderizarCarro();
	localStorage.clear();
};

const modifyUnit = (productoId, accion) => {
	const item = carro.find((producto) => producto.id === productoId);
	switch (accion) {
		case "suma":
			carro[carro.indexOf(item)].cantidad += 1;
			renderizarCarro();
			cargarDato();
			break;
		case "resta":
			if (carro[carro.indexOf(item)].cantidad > 1) {
				carro[carro.indexOf(item)].cantidad -= 1;
				renderizarCarro();
				cargarDato();
			}
			break;
		default:
			break;
	}
};

// Funcionalidad boton addToCart
btnsAdd.forEach((boton) => {
	boton.addEventListener("click", (e) => {
		if (
			!carro.some(
				(producto) => producto.id === Number(e.target.getAttribute("data-id"))
			)
		) {
			carro.push(productos[e.target.getAttribute("data-id")]);
			cargarDato();
			renderizarCarro();
		} else {
			Swal.fire({
				title: "Error al agregar al carrito",
				text: "El producto seleccionado ya se encuentra en el carrito",
				icon: "error",
				confirmButtonText: "Cerrar",
			});
		}
	});
});

// Funcionalidad boton Vaciar carro
btnVaciarCarro.addEventListener("click", vaciarCarro);

// Funcionalidad toggle cart view
cartToogler.addEventListener("click", () => {
	cartWrapper.classList.toggle("active");
	mainWrapper.classList.toggle("blur");
});
closeCartBtn.addEventListener("click", () => {
	cartWrapper.classList.toggle("active");
	mainWrapper.classList.toggle("blur");
});

// Ejecuciones de condicionales
if (localStorage.getItem("Carrito")) {
	carro = JSON.parse(localStorage.getItem("Carrito"));
	renderizarCarro();
}
