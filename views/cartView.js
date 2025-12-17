// cartView.js

export function displayCart(cartItems, container) {
    // Tühjenda konteiner enne uue sisu lisamist
    container.innerHTML = '';

    const cartTitle = document.createElement('h2');
    cartTitle.textContent = 'Ostukorv';
    cartTitle.classList.add('cart-title');
    container.appendChild(cartTitle);

    if (cartItems.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = 'Ostukorv on tühi.';
        container.appendChild(emptyMessage);
        return;
    }

    const cartList = document.createElement('div');
    cartList.classList.add('cart-list');

    let totalPrice = 0;

    cartItems.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        const name = document.createElement('p');
        name.textContent = item.product.title;
        name.classList.add('cart-item-name');

        const quantity = document.createElement('p');
        quantity.textContent = `Kogus: ${item.quantity}`;
        quantity.classList.add('cart-item-quantity');

        const price = document.createElement('p');
        const itemTotal = item.product.price * item.quantity;
        price.textContent = `Hind: $${itemTotal.toFixed(2)}`;
        price.classList.add('cart-item-price');

        totalPrice += itemTotal;

        cartItem.appendChild(name);
        cartItem.appendChild(quantity);
        cartItem.appendChild(price);

        cartList.appendChild(cartItem);
    });

    container.appendChild(cartList);

    const total = document.createElement('h3');
    total.textContent = `Kokku: $${totalPrice.toFixed(2)}`;
    total.classList.add('cart-total');
    container.appendChild(total);
}
