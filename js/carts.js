let productsincart = localStorage.getItem("productsincart");
let allproducts = document.querySelector(".productscart");
let totalpriceDiv = document.querySelector(".total_price");

// إذا لم يكن العنصر موجودًا في HTML، قم بإنشائه وإضافته أسفل المنتجات
if (!totalpriceDiv) {
  totalpriceDiv = document.createElement("div");
  totalpriceDiv.classList.add("total_price");
  allproducts.insertAdjacentElement('afterend', totalpriceDiv); // إضافة العنصر بعد جميع المنتجات
}

var totalprice = 0;

if (productsincart) {
  let item = JSON.parse(productsincart);
  item = item.map(product => ({
    ...product,
    price: typeof product.price === "number" && !isNaN(product.price) ? product.price : 0
  }));

  drawcartproducts(item);
  calculateTotal(item); 
}

function drawcartproducts(productscart) {
  let y = productscart.map((item) => {
    let totalItemPrice = item.price * item.quantity; // حساب السعر بناءً على الكمية
    return `
      <div class="productItemcart" id="cart-item-${item.id}">
        <img class="product_item_img_cart" src="${item.imageUrl}">
        <div class="product_item_desc_cart">
          <h2>${item.title}</h2>
          <p>new car lamborghini</p>
          <p>${item.color}</p>
          <p class="prices" id="price-${item.id}">$${item.price}</p> 
        </div>
        <div class="product_item_action_cart">
          <div class="quantity-control">
            <button class="minus" onclick="updateQuantity(${item.id}, -1)">-</button>
            <span class="quantity" id="quantity-${item.id}">${item.quantity}</span>
            <button class="plus" onclick="updateQuantity(${item.id}, 1)">+</button>
          </div>
          <button class="remove_from_cart" onClick="removefromcart(${item.id}, ${item.price}, ${item.quantity})">Remove from cart</button>
        </div>
      </div>`;
  });
  allproducts.innerHTML = y.join("");
}

function updateQuantity(id, change) {
  let quantityElement = document.getElementById(`quantity-${id}`);
  let currentQuantity = parseInt(quantityElement.innerHTML) || 1;

  // تعديل الكمية بناءً على الضغط على الزر
  currentQuantity += change;

  // التأكد أن الكمية لا تقل عن 1
  if (currentQuantity < 1) currentQuantity = 1;

  // تحديث العرض في الواجهة
  quantityElement.innerHTML = currentQuantity;

  // الحصول على السلة من localStorage
  let addeditem = JSON.parse(localStorage.getItem("productsincart")) || [];

  // العثور على المنتج في السلة
  let productIndex = addeditem.findIndex((item) => item.id == id);
  if (productIndex !== -1) {
      // تحديث الكمية في السلة
      addeditem[productIndex].quantity = currentQuantity;
      localStorage.setItem("productsincart", JSON.stringify(addeditem));

      // تحديث السعر في الـ "Total Price" بناءً على الكمية
      calculateTotal(addeditem);  // تحديث الإجمالي هنا فقط
  }
}

// حساب الإجمالي فقط
function calculateTotal(products) {
  totalprice = products.reduce((acc, product) => {
    // ضرب السعر في الكمية لتحديث الإجمالي
    return acc + (product.price * product.quantity);
  }, 0);

  // تحديث الإجمالي في الواجهة
  totalpriceDiv.innerHTML = `Total Price: $${totalprice}`;
}

function removefromcart(id, price, quantity) {
  let productElement = document.getElementById(`cart-item-${id}`);
  if (productElement) {
    productElement.remove();
  }

  // تحديث السعر الإجمالي عند الحذف
  totalprice -= (price * quantity);
  totalpriceDiv.innerHTML = `Total Price: $${totalprice}`;

  // إزالة المنتج من السلة
  let updatedCart = JSON.parse(localStorage.getItem("productsincart")).filter(item => item.id !== id);
  localStorage.setItem("productsincart", JSON.stringify(updatedCart));

  // تحديث العرض الإجمالي
  calculateTotal(updatedCart);
}
