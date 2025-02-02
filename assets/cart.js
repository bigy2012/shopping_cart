   // Sample data (normally this would come from localStorage or an API)
   const cart = {
    items: [],

    renderItems: function() {
        const $cartItems = $('#cartItems');
        
        if (this.items.length === 0) {
            $cartItems.html(`
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart fa-3x mb-3"></i>
                    <h4>Your cart is empty</h4>
                    <p>Browse our products and add items to your cart</p>
                    <a href="index.html" class="btn btn-primary mt-3">Start Shopping</a>
                </div>
            `);
        } else {
            const itemsHtml = this.items.map(item => `
                <div class="card mb-3" data-product-id="${item.id}">
                    <div class="card-body">
                        <div class="row align-items-center">
                            <div class="col-md-2">
                                <img src="./${item.image}" alt="${item.name}" class="cart-item-img">
                            </div>
                            <div class="col-md-4">
                                <h5 class="card-title">${item.name}</h5>
                                <p class="card-text text-muted">${item.price} ${item.currency}</p>
                            </div>
                            <div class="col-md-3">
                                <div class="input-group">
                                    <button class="btn btn-outline-secondary quantity-btn" data-action="decrease">
                                        <i class="fas fa-minus"></i>
                                    </button>
                                    <input type="number" class="form-control quantity-input" 
                                        value="${item.quantity}" min="1" max="99">
                                    <button class="btn btn-outline-secondary quantity-btn" data-action="increase">
                                        <i class="fas fa-plus"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <p class="fw-bold">${item.price * item.quantity} ${item.currency}</p>
                            </div>
                            <div class="col-md-1 text-end">
                                <i class="fas fa-trash remove-item"></i>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('');
            
            $cartItems.html(itemsHtml);
        }

        this.updateSummary();
    },

    updateSummary: function() {
        const subtotal = this.items.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);

        $('#subtotal').text(`${subtotal} AED`);
        $('#totalAmount').text(`${subtotal} AED`);
    },

    removeItem: function(productId) {
        this.items = this.items.filter(item => item.id !== productId.toString());
        this.renderItems();
        this.saveToStorage();
    },

    updateQuantity: function(productId, newQuantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity = Math.max(1, Math.min(99, newQuantity));
            this.renderItems();
            this.saveToStorage();
        }
    },

    saveToStorage: function() {
        localStorage.setItem('cartItems', JSON.stringify(this.items));
    },

    loadFromStorage: function() {
        const savedItems = localStorage.getItem('cartItems');
        if (savedItems) {
            this.items = JSON.parse(savedItems);
        }
    },

    init: function() {
        this.loadFromStorage();
        this.renderItems();

        // Event Handlers
        $('#cartItems').on('click', '.remove-item', (e) => {
            const $card = $(e.target).closest('.card');
            const productId = $card.data('product-id').toString();
            this.removeItem(productId);
            // window.location.reload()
        });

        $('#cartItems').on('click', '.quantity-btn', (e) => {
            const $btn = $(e.currentTarget);
            const $card = $btn.closest('.card');
            const productId = $card.data('product-id').toString();
            const item = this.items.find(item => item.id === productId);
            const action = $btn.data('action');

            if (item) {
                if (action === 'increase') {
                    this.updateQuantity(productId, item.quantity + 1);
                } else {
                    this.updateQuantity(productId, item.quantity - 1);
                }
            }
        });

        $('#cartItems').on('change', '.quantity-input', (e) => {
            const $input = $(e.currentTarget);
            const $card = $input.closest('.card');
            const productId = $card.data('product-id').toString();
            const quantity = parseInt($input.val());
            this.updateQuantity(productId, quantity);
        });

        $('#checkoutBtn').on('click', () => {
            // alert('Proceeding to checkout...');
            window.location = './checkout.html'
        });
    }
};

// Initialize when document is ready
$(document).ready(function() {
    cart.init();
});