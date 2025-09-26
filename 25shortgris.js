/*
 * Archivo: script.js
 *
 * Descripción:
 * Este script maneja la funcionalidad del botón de "Regresar".
 * Cuando el usuario hace clic en el botón, la página regresa al
 * historial de navegación anterior.
 */

// Se obtiene la referencia del botón "Regresar" por su ID.
const botonRegresar = document.getElementById('boton-regresar');

// Se añade un "event listener" para detectar el evento de clic en el botón.
botonRegresar.addEventListener('click', () => {
    // La función 'history.back()' navega a la página anterior en el historial del navegador.
    history.back();
});