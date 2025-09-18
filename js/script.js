// localStorage.setItem("firstcar","bmw")
// console.log(localStorage.getItem("firstcar"))

// localStorage.setItem("secondcar","marcidies")
//  localStorage.removeItem("secondcar")

//  localStorage.setItem("car3","dddd")
//  localStorage.clear()


// /////////////////////////////////////////////////////////////

let userinfo = document.querySelector("#user_info");
let userdata = document.querySelector("#user");
let links = document.querySelector("#links");
let logoutbtn = document.querySelector("#logout");

if (localStorage.getItem("email")) {
    links.remove(); 
    userinfo.style.display = "flex"; 
    userdata.innerHTML = localStorage.getItem("firstname"); 
}

logoutbtn.addEventListener("click", function () {
    localStorage.clear();
    setTimeout(() => {
        window.location = "login.html";
    }, 1500);
});


// //////////////////////////////////////////////////////////////////////

let allproducts = document.querySelector(".products")
let products = [
    {
    id:1,
    title:"Prada Vitello Bucket Bag",
    color:"beige",
    price:350,
    imageUrl : "image/3.jpeg"
    },

    {
        id:2,
        title:"Short Black Boots",
        color:"black",
        price:120,
        imageUrl : "image/WhatsApp Image 2024-12-20 at 8.27.34 PM.jpeg"
    },

    {
        id:3,
        title:"Prada Lambskin Hobo Bag",
        color:"Pink",
        price:220,
        imageUrl : "image/4.jpeg"
    },

    {
        id:4,
        title:"Gravity Estrella Emerald Ring",
        color:"Gold",
        price:900,
        imageUrl : "image/5.jpeg"
    },

    {
        id:5,
        title:"Saint Laurent",
        color:"white",
        price:745,
        imageUrl : "image/18.jpeg"
    },

    {
        id:6,
        title:"Large Woody Tote Bag",
        color:"light brown",
        price:550,
        imageUrl : "image/2.jpeg"
    },

    {
        id:7,
        title:"Sterling Silver Band Ring",
        color:"Silver",
        price:65,
        imageUrl : "image/6.jpeg"
    },

    {
        id:8,
        title:"SHEGLAM Liquid Blush",
        color:"Flirty",
        price:8,
        imageUrl : "image/7.jpeg"
    },
    {
        id:9,
        title:"Shiglam concealer",
        color:" Medium 25",
        price:349,
        imageUrl : "image/8.jpeg"
    },
    {
        id:10,
        title:"jacket",
        color:"Green",
        price:550,
        imageUrl : "image/9.jpeg"
    },
    {
        id:11,
        title:"Fur coat",
        color:"light brown",
        price:530,
        imageUrl : "image/10.jpeg"
    },
    {
        id:12,
        title:"Fur coat",
        color:"dark brown",
        price:560,
        imageUrl : "image/11.jpeg"
    },
    {
        id:13,
        title:"shoulder sweater top.",
        color:"red",
        price:520,
        imageUrl : "image/12.jpeg"
    },
    {
        id:14,
        title:"Dipliner Liquid Eyeliner – 5 ml",
        color:"Black",
        price:250,
        imageUrl : "image/13.jpeg"
    },
    {
        id:15,
        title:"Saint Laurent",
        color:"Black",
        price:850,
        imageUrl : "image/19.jpeg"
    },
    {
        id:16,
        title:"freshness Sun",
        color:"Gold",
        price:150,
        imageUrl : "image/20.jpeg"
    },
    {
        id:17,
        title:"matte liquid lipstick 12",
        color:"Peaches",
        price:320,
        imageUrl : "image/16.jpeg"
    },
    {
        id:18,
        title:"Sheglam baked glow powder.",
        color:"beige",
        price:740,
        imageUrl : "image/17.jpeg"
    }
    
]


// ////////////////

// تعديل الدالة لتقبل قائمة منتجات مخصصة
function drawItems(filteredProducts = products) {
    let y = filteredProducts.map((item) => {
        return `
        <div class="productItem col-12 col-sm-6 ${item.color}">
            <img class="product_item_img" src="${item.imageUrl}">
            <div class="product_item_desc">
                <h2>${item.title}</h2>
                <p>Color: ${item.color}</p>
                <p class="price">$${item.price}</p>
            </div>
            <div class="product_item_action">
                <button class="add_to_cart" onClick="addToCart(${item.id})">Add to cart</button>
                <i class="fa-solid fa-heart fav"></i>
            </div>
        </div>`;
    });
    allproducts.innerHTML = y.join("");
}

drawItems();

let badge = document.querySelector(".badge");
let cartproductsDiv = document.querySelector(".carts_product div");

// استرجاع المنتجات من localStorage أو تعيين مصفوفة فارغة في البداية
let addeditem = localStorage.getItem("productsincart") ? JSON.parse(localStorage.getItem("productsincart")) : [];

// إذا كانت هناك منتجات في السلة، نعرضها في الواجهة
if (addeditem.length > 0) {
    addeditem.forEach(item => {
        cartproductsDiv.innerHTML += `
            <div class="cart-item" id="cart-item-${item.id}">
                <img src="${item.imageUrl}" alt="${item.title}" class="cart-item-img">
                <div class="cart-item-details">
                    <h3>${item.title}</h3>
                    <p>Color: <span>${item.color}</span></p>
                    <p class="cart-item-price">$${item.price}</p>
                    <div class="quantity-control">
                        <button class="minus" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span class="quantity" id="quantity-${item.id}">${item.quantity || 1}</span>
                        <button class="plus" onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
            </div>
        `;
    });

    badge.style.display = "block";
    badge.innerHTML = addeditem.length;
}

if (localStorage.getItem("firstname")) {

    function addToCart(id) {
        let chooseitem = products.find((item) => item.id === id);

        let existingItem = addeditem.find(item => item.id === chooseitem.id);

        if (existingItem) {
            // إذا كان المنتج موجودًا بالفعل، نزيد الكمية
            updateQuantity(chooseitem.id, 1);
        } else {
            // إضافة المنتج الجديد إلى السلة
            chooseitem.quantity = 1; // تعيين الكمية الافتراضية إلى 1
            addeditem.push(chooseitem);
            localStorage.setItem("productsincart", JSON.stringify(addeditem));

            cartproductsDiv.innerHTML += `
                <div class="cart-item" id="cart-item-${chooseitem.id}">
                    <img src="${chooseitem.imageUrl}" alt="${chooseitem.title}" class="cart-item-img">
                    <div class="cart-item-details">
                        <h3>${chooseitem.title}</h3>
                        <p>Color: <span>${chooseitem.color}</span></p>
                        <p class="cart-item-price">$${chooseitem.price}</p>
                        <div class="quantity-control">
                            <button class="minus" onclick="updateQuantity(${chooseitem.id}, -1)">-</button>
                            <span class="quantity" id="quantity-${chooseitem.id}">${chooseitem.quantity}</span>
                            <button class="plus" onclick="updateQuantity(${chooseitem.id}, 1)">+</button>
                        </div>
                    </div>
                </div>
            `;
        }

        // تحديث البادج لعدد المنتجات في السلة
        badge.style.display = "block";
        badge.innerHTML = addeditem.length;
    }

    // دالة لتحديث الكمية
    function updateQuantity(id, change) {
        let quantityElement = document.getElementById(`quantity-${id}`);
        let currentQuantity = parseInt(quantityElement.innerHTML) || 1;
    
        // تعديل الكمية بناءً على الضغط
        currentQuantity += change;
    
        // التأكد أن الكمية لا تقل عن 1
        if (currentQuantity < 1) currentQuantity = 1;
    
        // تحديث العرض في الواجهة
        quantityElement.innerHTML = currentQuantity;
    
        // تحديث الكمية في الـ localStorage
        let productIndex = addeditem.findIndex((item) => item.id == id);
        if (productIndex !== -1) {
            addeditem[productIndex].quantity = currentQuantity;
            localStorage.setItem("productsincart", JSON.stringify(addeditem));
        }
    
        // تحديث السعر الإجمالي بناءً على الكمية الجديدة
        calculateTotal(addeditem);
    }
    function calculateTotal(products) {
        totalprice = products.reduce((acc, product) => {
            return acc + (product.price * product.quantity); // ضرب السعر في الكمية
        }, 0);
    
        // تحديث عرض السعر الإجمالي في الواجهة
        totalpriceDiv.innerHTML = `Total Price: $${totalprice}`;
    }

    // ظظظظظظظظظظظظظظظظظظظظظظظظظظ
let dropdownBtn = document.getElementById("drop-text");
let list = document.getElementById("list");
let icon = document.getElementById("icon");
let span = document.getElementById("span");
let input = document.getElementById("searchBar");
let listitems = document.querySelectorAll(".dropdown-list-item");

// عرض جميع المنتجات
const displayProducts = (items) => {
    allproducts.innerHTML = items
        .map(product => {
            return `
               <div class="productItem col-12 col-sm-6 ${product.color}">
            <img class="product_item_img" src="${product.imageUrl}">
            <div class="product_item_desc">
                <h2>${product.title}</h2>
                <p>Color: ${product.color}</p>
                <p class="price">$${product.price}</p>
            </div>
            <div class="product_item_action">
                <button class="add_to_cart" onClick="addToCart(${product.id})">Add to cart</button>
                <i class="fa-solid fa-heart fav"></i>
            </div>
        </div>
            `;
        })
        .join("");
};

// عامل تصفية المنتجات
const filterProducts = () => {
    let searchValue = input.value.toLowerCase(); // النص المكتوب في شريط البحث
    let selectedCategory = span.innerText.toLowerCase(); // الفئة المختارة

    let filteredProducts = products.filter(product => {
        // التحقق من الفئة المختارة
        if (selectedCategory === "title") {
            return product.title.toLowerCase().includes(searchValue);
        } else if (selectedCategory === "color") {
            return product.color.toLowerCase().includes(searchValue);
        } else if (selectedCategory === "price") {
            return product.price.toString().includes(searchValue);
        } else {
            // البحث في كل الفئات
            return (
                product.title.toLowerCase().includes(searchValue) ||
                product.color.toLowerCase().includes(searchValue) ||
                product.price.toString().includes(searchValue)
            );
        }
    });

    displayProducts(filteredProducts); // عرض المنتجات المصفاة
};

// تحديث النص في الزر بناءً على اختيار الفئة
listitems.forEach(item => {
    item.addEventListener("click", (e) => {
        span.innerText = e.target.innerText; // تحديث النص في الزر
        let selectedCategory = e.target.innerText.toLowerCase(); // اختيار الفئة

        // تحديث النص التوضيحي في شريط البحث
        if (selectedCategory === "all categories") {
            input.placeholder = "Search"; // يظهر كلمة "Search" فقط
        } else {
            input.placeholder = `Search by ${selectedCategory}...`; // يظهر "Search by ..."
        }

        filterProducts(); // تحديث المنتجات بعد اختيار الفئة
    });
});


// إظهار القائمة عند الضغط على الزر
dropdownBtn.onclick = function () {
    list.classList.toggle("show");
    icon.style.rotate = list.classList.contains("show") ? "-180deg" : "0deg";
};

// إخفاء القائمة عند الضغط خارجها
window.onclick = function (e) {
    if (!dropdownBtn.contains(e.target)) {
        list.classList.remove("show");
        icon.style.rotate = "0deg";
    }
};

// تحديث المنتجات عند الكتابة في شريط البحث
input.addEventListener("input", filterProducts);

// عرض جميع المنتجات عند التحميل
displayProducts(products);


    

} else {
    // إعادة توجيه المستخدم إلى صفحة تسجيل الدخول إذا لم يكن مسجلًا
    window.location = "login.html";
}


// ///////////////////////////////////////////////////////////////////////

let shoppingcarticon = document.querySelector(".shopping_cart")
let cartProduct = document.querySelector(".carts_product")

shoppingcarticon.addEventListener("click",opencart)

function opencart(){
    if (cartproductsDiv.innerHTML !=""){
        if(cartProduct.style.display=="block"){
            cartProduct.style.display="none"
        }else{
            cartProduct.style.display="block";
        }
    }

}


