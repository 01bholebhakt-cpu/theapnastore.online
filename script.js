// Product Data
const products = [
    { id: 1, name: "Minimalist Gold Watch", price: 299.00, category: "Accessories", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80" },
    { id: 2, name: "Premium Leather Tote", price: 450.00, category: "Fashion", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=500&q=80" },
    { id: 3, name: "Elite Wireless Pods", price: 199.00, category: "Electronics", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80" },
    { id: 4, name: "Signature Velvet Blazer", price: 890.00, category: "Fashion", image: "https://images.unsplash.com/photo-1594932224010-75f1262ec609?auto=format&fit=crop&w=500&q=80" },
    { id: 5, name: "Arctic Smart Speaker", price: 150.00, category: "Electronics", image: "https://images.unsplash.com/photo-1589003077984-844134d6882e?auto=format&fit=crop&w=500&q=80" },
    { id: 6, name: "Modernist Sun Glasses", price: 210.00, category: "Accessories", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=500&q=80" },
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Initialize Page
document.addEventListener('DOMContentLoaded', () => {
    displayProducts(products);
    updateCartUI();
    
    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.navbar');
        if (window.scrollY > 50) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');
    });

    // Theme Toggle
    const themeBtn = document.getElementById('theme-toggle');
    themeBtn.addEventListener('click', () => {
        document.body.setAttribute('data-theme', 
            document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
        );
        themeBtn.classList.toggle('fa-sun');
    });
});

// Display Products
function displayProducts(items) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = items.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <p style="font-size: 0.7rem; color: #888; text-transform: uppercase;">${product.category}</p>
                <h3>${product.name}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <button class="btn btn-primary" style="width: 100%; margin-top: 10px;" onclick="addToCart(${product.id})">
                    Add To Cart
                </button>
            </div>
        </div>
    `).join('');
}

// Cart Logic
function toggleCart() {
    document.getElementById('cart-sidebar').classList.toggle('active');
    document.getElementById('cart-overlay-bg').classList.toggle('active');
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existing = cart.find(item => item.id === id);
    
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    saveAndUpdate();
    // Notification
    alert(`${product.name} added to bag!`);
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveAndUpdate();
}

function saveAndUpdate() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
}

function updateCartUI() {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    
    cartCount.innerText = cart.reduce((acc, item) => acc + item.quantity, 0);
    
    let total = 0;
    cartItems.innerHTML = cart.map(item => {
        total += item.price * item.quantity;
        return `
            <div class="cart-item" style="display:flex; gap:15px; margin-bottom:20px; align-items:center;">
                <img src="${item.image}" width="60" style="border-radius:5px">
                <div style="flex:1">
                    <h4 style="font-size:0.9rem">${item.name}</h4>
                    <p>$${item.price} x ${item.quantity}</p>
                </div>
                <i class="fas fa-trash" onclick="removeFromCart(${item.id})" style="cursor:pointer; color:red"></i>
            </div>
        `;
    }).join('');
    
    cartTotal.innerText = `$${total.toFixed(2)}`;
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align:center; margin-top:50px;">Your bag is empty.</p>';
    }
}

// Smooth Reveal Animation
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "1s ease-out";
    observer.observe(el);
});
