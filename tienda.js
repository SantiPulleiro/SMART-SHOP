// Variables para almacenar los productos seleccionados y el monto total
var selectedProducts = [];
var totalAmount = 0;

// Obtener todos los botones de "AÑADIR AL CARRITO"
var buttons = document.querySelectorAll('.boton_añadir_carrito');
const enviarMensajeBoton = document.querySelectorAll('.boton_carrito_compra');

// Recorrer cada botón y agregar un evento de clic a cada uno
buttons.forEach(function(button) {
    button.addEventListener('click', addToCart);
});

// Función para agregar un producto al carrito
function addToCart(event) {
    // Obtener el elemento del botón clickeado
    var button = event.target;

    // Obtener el contenedor del producto
    var product = button.closest('.card');

    // Obtener el nombre y el precio del producto
    var productName = product.querySelector('.PRENDA').innerText;
    var productPrice = parseFloat(product.querySelector('.precio').innerText.replace('$', ''));

    // Crear un nuevo elemento para el producto en el carrito
    var cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
        ${productName} - $${productPrice.toFixed(2)} 
        <button class="remove-item-btn">Eliminar</button>
    `;

    // Agregar el evento para eliminar el producto
    cartItem.querySelector('.remove-item-btn').addEventListener('click', function() {
        removeFromCart(cartItem, productName, productPrice);
    });

    // Agregar el producto al contenedor del carrito
    var cartItems = document.getElementById('cart-items');
    cartItems.appendChild(cartItem);

    // Agregar el producto a la lista de productos seleccionados
    selectedProducts.push({ name: productName, price: productPrice });

    // Calcular el nuevo precio total del carrito
    updateCartTotal();
}

// Función para eliminar un producto del carrito
function removeFromCart(cartItem, productName, productPrice) {
    // Eliminar el producto de la lista de productos seleccionados
    selectedProducts = selectedProducts.filter(function(product) {
        return product.name !== productName || product.price !== productPrice;
    });

    // Eliminar el elemento del carrito en la interfaz
    cartItem.remove();

    // Actualizar el precio total
    updateCartTotal();
}

// Función para calcular y actualizar el precio total del carrito
function updateCartTotal() {
    // Inicializar el precio total del carrito
    totalAmount = selectedProducts.reduce((total, product) => total + product.price, 0);

    // Mostrar el precio total en el contenedor correspondiente
    document.getElementById('cart-total').innerText = 'Total: $' + totalAmount.toFixed(2);
}

// Función para vaciar el carrito
function clearCart() {
    // Obtener el contenedor de los productos en el carrito
    var cartItems = document.getElementById('cart-items');

    // Vaciar el contenedor de los productos
    cartItems.innerHTML = '';

    // Vaciar la lista de productos seleccionados
    selectedProducts = [];

    // Actualizar el precio total del carrito (que ahora será cero)
    updateCartTotal();
}

// Función para realizar la compra
function purchase() {
    // Construir el mensaje con todos los productos y el monto total
    var message = "¡Gracias por tu compra!\n\nProductos seleccionados:\n";
    selectedProducts.forEach(function(product, index) {
        message += (index + 1) + ". " + product.name + " - $" + product.price.toFixed(2) + "\n";
    });
    message += "\nMonto total: $" + totalAmount.toFixed(2);

    // Crear el enlace de WhatsApp con el mensaje concatenado
    var whatsappUrl = "https://api.whatsapp.com/send?phone=5491166212002&text=" + encodeURIComponent(message);

    // Redirigir al usuario al enlace de WhatsApp
    window.open(whatsappUrl, '_blank');

    // Aquí puedes enviar los datos del carrito a un servidor o procesarlos como desees
    console.log('Mensaje de compra:', message);

    // Vaciar el carrito después de la compra
    clearCart();
}

// Agregar evento al botón de realizar compra
document.querySelector('.boton_carrito_compra').addEventListener('click', purchase);

// Obtener los elementos del DOM
const carrito = document.getElementById("carrito");
const abrirCarrito = document.getElementById("abrirCarrito");
const cerrarCarrito = document.getElementById("cerrarCarrito");

// Función para abrir el carrito
abrirCarrito.addEventListener("click", () => {
    carrito.style.display = "block"; // Mostrar el carrito
});

// Función para cerrar el carrito
cerrarCarrito.addEventListener("click", () => {
    carrito.style.display = "none"; // Ocultar el carrito
});
