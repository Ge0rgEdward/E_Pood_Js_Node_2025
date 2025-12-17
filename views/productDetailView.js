// productDetailView.js

export function displayProductDetail(product, container) {
    container.innerHTML = '';

    const detailCard = document.createElement('div');
    detailCard.classList.add('product-detail-card');

    const title = document.createElement('h2');
    title.textContent = product.title;
    detailCard.appendChild(title);

    const category = document.createElement('p');
    category.textContent = `Category: ${product.category}`;
    detailCard.appendChild(category);

    const price = document.createElement('p');
    price.textContent = `Price: $${product.price.toFixed(2)}`;
    price.classList.add('product-price');
    detailCard.appendChild(price);

    if (product.description) {
        const description = document.createElement('p');
        description.textContent = `Description: ${product.description}`;
        detailCard.appendChild(description);
    }

    if (product.image) {
        const img = document.createElement('img');
        img.src = product.image;
        img.alt = product.title;
        img.classList.add('product-detail-image');
        detailCard.appendChild(img);
    }

    container.appendChild(detailCard);
}
