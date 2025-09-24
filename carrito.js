// =========================
// VARIABLES
// =========================

// Carrito
const carritoContainer = document.getElementById("carritoContainer");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cartTotal");
const vaciarCarritoBtn = document.getElementById("vaciarCarrito");
const checkoutBtn = document.getElementById("checkout");

// Formulario de contacto
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

// =========================
// FUNCIONES DEL CARRITO
// =========================

// Obtener carrito del localStorage
function obtenerCarrito() {
  return JSON.parse(localStorage.getItem("carrito")) || [];
}

// Guardar carrito en localStorage
function guardarCarrito(carrito) {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Actualizar contador de carrito
function actualizarContador() {
  if(cartCount) { // Verifica que exista el elemento
    const carrito = obtenerCarrito();
    cartCount.textContent = carrito.length;
  }
}

// Calcular total
function calcularTotal() {
  if(cartTotal) {
    const carrito = obtenerCarrito();
    const total = carrito.reduce((sum, item) => sum + item.precio, 0);
    cartTotal.textContent = total.toFixed(2);
  }
}

// Mostrar carrito en la página
function mostrarCarrito() {
  if(carritoContainer) {
    const carrito = obtenerCarrito();
    carritoContainer.innerHTML = "";

    if (carrito.length === 0) {
      carritoContainer.innerHTML = "<p>El carrito está vacío.</p>";
      if(cartTotal) cartTotal.textContent = "0.00";
      return;
    }

    carrito.forEach((item, index) => {
      const div = document.createElement("div");
      div.classList.add("carrito-item");
      div.innerHTML = `
        <span>${item.nombre} - $${item.precio.toFixed(2)}</span>
        <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
      `;
      carritoContainer.appendChild(div);
    });

    calcularTotal();
  }
}

// Agregar producto al carrito
function agregarAlCarrito(nombre, precio) {
  const carrito = obtenerCarrito();
  carrito.push({ nombre, precio });
  guardarCarrito(carrito);
  actualizarContador();
  mostrarCarrito();
}

// Eliminar producto del carrito
function eliminarDelCarrito(index) {
  const carrito = obtenerCarrito();
  carrito.splice(index, 1);
  guardarCarrito(carrito);
  actualizarContador();
  mostrarCarrito();
}

// Vaciar carrito
if(vaciarCarritoBtn) {
  vaciarCarritoBtn.addEventListener("click", () => {
    localStorage.removeItem("carrito");
    actualizarContador();
    mostrarCarrito();
  });
}

// Finalizar compra
if(checkoutBtn) {
  checkoutBtn.addEventListener("click", () => {
    alert("¡Compra finalizada! Gracias por tu compra.");
    localStorage.removeItem("carrito");
    actualizarContador();
    mostrarCarrito();
  });
}

// Inicialización del carrito
actualizarContador();
mostrarCarrito();

// =========================
// FUNCIONES FORMULARIO DE CONTACTO
// =========================
if(contactForm) {
  contactForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    if(name === "" || email === "" || subject === "" || message === "") {
      formMessage.style.color = "red";
      formMessage.textContent = "Por favor, completa todos los campos.";
      formMessage.style.display = "block";
      return;
    }

    // Mensaje de éxito
    formMessage.style.color = "green";
    formMessage.textContent = "¡Mensaje enviado correctamente!";
    formMessage.style.display = "block";

    contactForm.reset();
  });
}
