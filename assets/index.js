// Mock data for categories
const categories = [
  { id: 1, name: "Today Deal" },
  { id: 2, name: "Best Sellers" },
  { id: 3, name: "Gift Sets" },
  { id: 4, name: "Popular Products" },
  { id: 5, name: "Top Brand" },
  { id: 6, name: "Clearance Sale" }
];

// Mock data for products
const products = [
  {
    id: 1,
    name: "Nike Air Max 2017 Kpu Blue Red Men Running Shoes Sneakers",
    price: 170,
    currency: "AED",
    image: "./image/footwear.jpg",
    category: "Running Shoes"
  },
  {
    id: 2,
    name: "Nike Air Max 2017 Kpu Grey Black Men Running Shoes Sneakers",
    price: 170,
    currency: "AED",
    image: "./image/running_0.jpg",
    category: "Running Shoes"
  },
  {
    id: 3,
    name: "Nike Air Max 2017 Kpu Darkblue Men Running Shoes Sneakers",
    price: 170,
    currency: "AED",
    image: "./image/running.jpg",
    category: "Running Shoes"
  },
  {
    id: 4,
    name: "Nike Air Max 2017 Kpu Black Red Men Running Shoes Sneakers",
    price: 170,
    currency: "AED",
    image: "./image/shoes-346986_1280.jpg",
    category: "Running Shoes"
  },
  {
    id: 5,
    name: "Vans Women Old Skool",
    price: 130,
    currency: "AED",
    image: "./image/shoes-584850_1280.jpg",
    category: "Casual Shoes"
  }
];

// Function to render categories
function renderCategories() {
  const categoryHtml = $.map(categories, function(category) {
    return `
                <li class="nav-item">
                    <a class="nav-link" href="#" data-category-id="${category.id}">
                        ${category.name}
                    </a>
                </li>
            `;
  }).join("");

  $("#categoryNav").html(categoryHtml);
}

function addToCart(product) {
  // ดึงข้อมูลตะกร้าปัจจุบันจาก localStorage
  let cart = JSON.parse(localStorage.getItem("cartItems")) || [];

  // ตรวจสอบว่าสินค้ามีในตะกร้าแล้วหรือไม่
  const existingItem = cart.find(item => item.id === product.id);

  if (existingItem) {
    // ถ้ามีแล้ว เพิ่มจำนวน
    existingItem.quantity += 1;
  } else {
    // ถ้ายังไม่มี เพิ่มสินค้าใหม่พร้อมจำนวน 1 ชิ้น
    cart.push({
      id: product.id,
      image: product.image,
      name: product.name,
      price: product.price,
      currency: product.currency,
      quantity: 1
    });
  }

  // บันทึกลง localStorage
  localStorage.setItem("cartItems", JSON.stringify(cart));

  // แสดงการแจ้งเตือน (optional)
  alert("เพิ่มสินค้าลงตะกร้าแล้ว");
  window.location.reload();
}

// Function to render products
function renderProducts() {
  const productsHtml = $.map(products, function(product) {
    return `
                <div class="col-md-3">
                    <div class="product-card">
                        <img src="${product.image}" alt="${product.name}" class="product-img">
                        <h5 class="product-title">${product.name}</h5>
                        <p class="product-price">${product.price} ${product.currency}</p>
                        <button class="btn btn-info text-white" onclick="addToCart({
                            id: '${product.id}',
                            image: '${product.image}',
                    name: '${product.name}',
                    price: ${product.price},
                    currency: '${product.currency}'
                })">
                    Add to Cart
                </button>
                    </div>
                </div>
            `;
  }).join("");

  $("#productsContainer").html(productsHtml);
}

// ฟังก์ชันสำหรับแสดงจำนวนสินค้าในตะกร้า (optional)
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cartItems")) || [];
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  $(".badge").text(totalItems);
}

// เรียกใช้ฟังก์ชันเมื่อโหลดหน้า
$(document).ready(function() {
  renderProducts();
  updateCartCount(); // ถ้าต้องการแสดงจำนวนสินค้าในตะกร้า
});

// Initialize when document is ready
$(document).ready(function() {
  // Render initial data
  renderCategories();
  renderProducts();

  // Add event listener for category filtering
  $("#categoryNav").on("click", ".nav-link", function(e) {
    e.preventDefault();
    const categoryId = $(this).data("category-id");
    console.log("Selected category:", categoryId);

    // You can implement filtering logic here
    // Example:
    // filterProducts(categoryId);
  });
});

// Optional: Example of filtering function
function filterProducts(categoryId) {
  const filteredProducts = categoryId
    ? products.filter(product => product.categoryId === categoryId)
    : products;

  const productsHtml = $.map(filteredProducts, function(product) {
    return `
                <div class="col-md-3">
                    <div class="product-card">
                        <img src="${product.image}" alt="${product.name}" class="product-img">
                        <h5 class="product-title">${product.name}</h5>
                        <p class="product-price">${product.price} ${product.currency}</p>
                    </div>
                </div>
            `;
  }).join("");

  $("#productsContainer").html(productsHtml);
}
