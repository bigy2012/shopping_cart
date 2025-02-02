const cart = {
    items: JSON.parse(localStorage.getItem('cartItems')) || [],

    renderItems: function() {
        const $cartItems = $('#cartItems');
        
        if (this.items.length === 0) {
            $cartItems.html('<p class="text-muted">Your cart is empty.</p>');
            $('#totalAmount').text('0 AED');
            return;
        }

        const itemsHtml = this.items.map(item => `
            <div class="d-flex align-items-center mb-3">
                <img src="${item.image}" alt="${item.name}" class="cart-item-img me-3">
                <div>
                    <h6>${item.name}</h6>
                    <p class="mb-0">${item.price} ${item.currency} x ${item.quantity}</p>
                </div>
            </div>
        `).join('');

        $cartItems.html(itemsHtml);
        this.updateSummary();
    },

    updateSummary: function() {
        const subtotal = this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
        $('#totalAmount').text(`${subtotal} AED`);
    },

    init: function() {
        this.renderItems();

        $('#checkoutForm').on('submit', function(e) {
            e.preventDefault();

            if (cart.items.length === 0) {
                alert("Your cart is empty. Please add items before proceeding.");
                return;
            }

            const orderData = {
                fullName: $('#fullName').val(),
                email: $('#email').val(),
                phone: $('#phone').val(),
                address: $('#address').val(),
                paymentMethod: $('input[name="paymentMethod"]:checked').val(),
                items: cart.items,
                total: $('#totalAmount').text()
            };

            console.log("Order Data:", orderData);
            alert("Your order has been placed successfully!");

            // ล้างข้อมูลตะกร้าเมื่อสั่งซื้อเสร็จ
            localStorage.removeItem('cartItems');
            cart.items = [];
            cart.renderItems();
        });
    }
};

$(document).ready(() => {
    cart.init();
});
