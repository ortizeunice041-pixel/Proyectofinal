const productoItems = document.querySelectorAll(".producto-item");
const tipoButtons = document.querySelectorAll(".filter-btn[data-filter]");
const colorButtons = document.querySelectorAll(".filter-btn[data-color]");

let tipoActivo = "all";
let colorActivo = "all";

function filtrarProductos() {
  productoItems.forEach(item => {
    const tipo = item.classList.contains(tipoActivo) || tipoActivo === "all";
    const color = item.dataset.color === colorActivo || colorActivo === "all";

    if (tipo && color) {
      item.classList.remove("hidden");
    } else {
      item.classList.add("hidden");
    }
  });
}

tipoButtons.forEach(button => {
  button.addEventListener("click", () => {
    tipoButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    tipoActivo = button.dataset.filter;
    filtrarProductos();
  });
});

colorButtons.forEach(button => {
  button.addEventListener("click", () => {
    const selectedColor = button.dataset.color;

    // Si el color ya está activo, desactívalo
    if (colorActivo === selectedColor) {
      colorActivo = "all";
      colorButtons.forEach(btn => btn.classList.remove("active"));
    } else {
      colorActivo = selectedColor;
      colorButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
    }

    filtrarProductos();
  });
});

function goBack() {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        window.location.href = '/'; // Página de inicio si no hay historial
      }
    }