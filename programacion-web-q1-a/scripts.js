// Obtener los elementos de los botones de los planes de suscripción
const planButtons = document.querySelectorAll('.card-body .btn');

// Agregar un evento de clic a cada botón
planButtons.forEach(button => {
  button.addEventListener('click', addToCart);
});

// Variable para almacenar el plan actual en el carrito
let currentPlan = null;

// Obtén el carrito
const cart = document.getElementById('cart-items');

// Crear el elemento para mostrar el texto dinámico
const cartText = document.createElement('span');
cartText.classList.add('cart-text');

// Función para agregar un plan al carrito
function addToCart(event) {
  event.preventDefault();

  // Obtener el título y el precio del plan seleccionado
  const planTitle = this.parentNode.querySelector('.card-title').textContent;
  const planPrice = this.textContent;

  // Crear un nuevo elemento de lista con los detalles del plan
  const listItem = document.createElement('li');
  listItem.textContent = `${planTitle} - ${planPrice}`;

  // Eliminar el plan actual del carrito, si existe
  if (currentPlan) {
    cart.removeChild(currentPlan);
  }

  // Agregar el nuevo elemento de lista al carrito
  cart.appendChild(listItem);

  // Actualizar el plan actual
  currentPlan = listItem;

  // Actualizar el texto del carrito
  if (cart.children.length > 0) {
    cartText.textContent = "Susbscription added to cart: ";
  }

  // Verificar si el elemento de texto ya está agregado al carrito
  if (!cart.contains(cartText)) {
    cart.insertAdjacentElement('afterbegin', cartText);
  }

  // Almacenar el plan seleccionado y su precio en el almacenamiento local (localStorage)
  localStorage.setItem('selectedPlan', planTitle);
  localStorage.setItem('selectedPrice', planPrice);

  // Mostrar el cuadro de diálogo de confirmación
  const confirmMessage = `¿Deseas realizar la compra del plan "${planTitle} - ${planPrice}"?`;
  const shouldRedirect = confirm(confirmMessage);

  if (shouldRedirect) {
    // Redireccionar a transaccion.html
    window.location.href = 'transaccion.html';
  } else {
    // Permanecer en la página actual (suscripciones.html)
    // Aquí puedes agregar el código adicional que deseas ejecutar
    console.log('Se eligió no realizar la compra. Permaneciendo en suscripciones.html.');
  }
}
