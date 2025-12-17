// allProductView.js

export function displayProductCard(product) {
    const card = document.createElement('div');
    card.classList.add('product-card');

    const title = document.createElement('h2');
    title.textContent = product.title;
    card.appendChild(title);

    const category = document.createElement('p');
    category.textContent = `Category: ${product.category}`;
    card.appendChild(category);

    const price = document.createElement('p');
    price.textContent = `$${product.price.toFixed(2)}`;
    price.classList.add('product-price');
    card.appendChild(price);

    return card;
}

// --- Uus funktsioon, mis kuvab kõik tooted kategooriate kaupa ---
export function displayAllProducts(products, container) {
    // Tühjenda konteiner enne uue sisu lisamist
    container.innerHTML = '';

    // Toooted kategooria järgi
    const categories = {};
    products.forEach(product => {
        if (!categories[product.category]) {
            categories[product.category] = [];
        }
        categories[product.category].push(product);
    });

    // Loome ja lisame iga kategooria ja selle tooted konteinerisse
    for (const categoryName in categories) {
        const categoryHeader = document.createElement('h2');
        categoryHeader.textContent = categoryName;
        categoryHeader.classList.add('category-header');
        container.appendChild(categoryHeader);

        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container');

        categories[categoryName].forEach(product => {
            const card = displayProductCard(product);
            categoryContainer.appendChild(card);
        });

        container.appendChild(categoryContainer);
    }
}
