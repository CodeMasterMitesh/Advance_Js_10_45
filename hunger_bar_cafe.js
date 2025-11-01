// Menu Data
const menuData = {
  coffee: [
    {
      id: 1,
      name: "Espresso",
      description: "Rich and bold Italian espresso",
      price: 3.99,
      image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400"
    },
    {
      id: 2,
      name: "Cappuccino",
      description: "Classic cappuccino with steamed milk",
      price: 4.99,
      image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400"
    },
    {
      id: 3,
      name: "Latte",
      description: "Smooth latte with your choice of milk",
      price: 4.99,
      image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400"
    },
    {
      id: 4,
      name: "Iced Coffee",
      description: "Refreshing cold brew over ice",
      price: 4.49,
      image: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400"
    }
  ],
  food: [
    {
      id: 5,
      name: "Club Sandwich",
      description: "Triple-decker with chicken, bacon, and veggies",
      price: 8.99,
      image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400"
    },
    {
      id: 6,
      name: "Burger Deluxe",
      description: "Juicy beef burger with cheese and special sauce",
      price: 10.99,
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400"
    },
    {
      id: 7,
      name: "Caesar Salad",
      description: "Fresh romaine with parmesan and croutons",
      price: 7.99,
      image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400"
    },
    {
      id: 8,
      name: "Pasta Carbonara",
      description: "Creamy pasta with bacon and parmesan",
      price: 11.99,
      image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400"
    }
  ],
  desserts: [
    {
      id: 9,
      name: "Chocolate Cake",
      description: "Rich chocolate cake with ganache",
      price: 5.99,
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400"
    },
    {
      id: 10,
      name: "Cheesecake",
      description: "New York style cheesecake",
      price: 6.99,
      image: "https://images.unsplash.com/photo-1533134486753-c833f0ed4866?w=400"
    },
    {
      id: 11,
      name: "Tiramisu",
      description: "Classic Italian dessert with coffee",
      price: 6.49,
      image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400"
    },
    {
      id: 12,
      name: "Ice Cream Sundae",
      description: "Three scoops with toppings",
      price: 5.49,
      image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400"
    }
  ]
};

// Shopping Cart
let cart = [];

// Load cart from localStorage on page load
function loadCart() {
  const savedCart = localStorage.getItem('hungerBarCart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCartDisplay();
  }
}

// Save cart to localStorage
function saveCart() {
  localStorage.setItem('hungerBarCart', JSON.stringify(cart));
}

// Create menu item card
function createMenuItem(item) {
  return `
    <div class="col-md-6 col-lg-3 mb-4">
      <div class="menu-card">
        <img src="${item.image}" alt="${item.name}" class="menu-item-img" onerror="this.src='https://via.placeholder.com/400x200?text=${item.name}'">
        <div class="p-3">
          <h5 class="fw-bold">${item.name}</h5>
          <p class="text-muted small">${item.description}</p>
          <div class="d-flex justify-content-between align-items-center mt-3">
            <span class="price-tag">$${item.price.toFixed(2)}</span>
            <button class="btn btn-add-cart btn-sm" onclick="addToCart(${item.id})">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Render menu items
function renderMenu() {
  const coffeeContainer = document.getElementById('coffee-menu');
  const foodContainer = document.getElementById('food-menu');
  const dessertContainer = document.getElementById('dessert-menu');

  coffeeContainer.innerHTML = menuData.coffee.map(item => createMenuItem(item)).join('');
  foodContainer.innerHTML = menuData.food.map(item => createMenuItem(item)).join('');
  dessertContainer.innerHTML = menuData.desserts.map(item => createMenuItem(item)).join('');
}

// Find item by ID
function findItemById(id) {
  const allItems = [...menuData.coffee, ...menuData.food, ...menuData.desserts];
  return allItems.find(item => item.id === id);
}

// Add item to cart
function addToCart(itemId) {
  const item = findItemById(itemId);
  if (!item) return;

  const existingItem = cart.find(cartItem => cartItem.id === itemId);
  
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({
      ...item,
      quantity: 1
    });
  }

  saveCart();
  updateCartDisplay();
  showNotification(`${item.name} added to cart!`);
}

// Remove item from cart
function removeFromCart(itemId) {
  cart = cart.filter(item => item.id !== itemId);
  saveCart();
  updateCartDisplay();
}

// Update item quantity
function updateQuantity(itemId, change) {
  const item = cart.find(cartItem => cartItem.id === itemId);
  if (!item) return;

  item.quantity += change;
  
  if (item.quantity <= 0) {
    removeFromCart(itemId);
  } else {
    saveCart();
    updateCartDisplay();
  }
}

// Update cart display
function updateCartDisplay() {
  const cartCount = document.getElementById('cartCount');
  const cartItems = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  cartCount.textContent = totalItems;
  cartTotal.textContent = `$${totalPrice.toFixed(2)}`;

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="text-center text-muted">Your cart is empty</p>';
  } else {
    cartItems.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <h6 class="mb-1">${item.name}</h6>
            <small class="text-muted">$${item.price.toFixed(2)} each</small>
          </div>
          <div class="d-flex align-items-center">
            <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(${item.id}, -1)">-</button>
            <span class="mx-3 fw-bold">${item.quantity}</span>
            <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(${item.id}, 1)">+</button>
            <button class="btn btn-sm btn-danger ms-2" onclick="removeFromCart(${item.id})">×</button>
          </div>
        </div>
        <div class="text-end mt-2">
          <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
        </div>
      </div>
    `).join('');
  }
}

// Clear cart
function clearCart() {
  if (cart.length === 0) return;
  
  if (confirm('Are you sure you want to clear your cart?')) {
    cart = [];
    saveCart();
    updateCartDisplay();
    showNotification('Cart cleared!');
  }
}

// Checkout
function checkout() {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  const orderSummary = `
Order Summary:
${cart.map(item => `${item.quantity}x ${item.name} - $${(item.price * item.quantity).toFixed(2)}`).join('\n')}

Total Items: ${itemCount}
Total Amount: $${totalPrice.toFixed(2)}

Thank you for your order!
  `;

  alert(orderSummary);
  
  // Clear cart after checkout
  cart = [];
  saveCart();
  updateCartDisplay();
  
  // Close modal
  const cartModal = bootstrap.Modal.getInstance(document.getElementById('cartModal'));
  if (cartModal) {
    cartModal.hide();
  }
  
  showNotification('Order placed successfully! 🎉');
}

// Show notification
function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'alert alert-success position-fixed top-0 start-50 translate-middle-x mt-3';
  notification.style.zIndex = '9999';
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, 2000);
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  renderMenu();
  loadCart();
  
  console.log('The Hunger Bar Café is ready! 🍔☕');
});
