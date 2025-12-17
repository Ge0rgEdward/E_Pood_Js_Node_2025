export function displayProductCard(product) {
    const card = document.createElement('div');
    card.classList.add('product-card');


    const title = document.createElement('h2');
    title.textContent = product.title;
    card.appendChild(title);

    const category = document.createElement('p');
    category.textContent = `Category ${product.category}`;
    card.appendChild(category);

    const price = document.createElement('p');
    price.textContent = `$${product.price.toFixed(2)}`;
    price.classList.add('product-price');
}