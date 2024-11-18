function toggleMenu() {
    document.querySelector('.nav-links').classList.toggle('active');
}
function openNav() {
    document.getElementById("basket-menu").style.width = "250px";
}
function closeNav() {
    document.getElementById("basket-menu").style.width = "0px";
}
//*** Add product functionality ***/
let Items = [];
updateProductQuantity();
function addToCart(name, price, image) {
    console.log("Button clicked")
    const index = Items.findIndex(item => item.name === name);
    if (index !== -1) {
        // Məhsul artıq səbətdədirsə, onun miqdarını artır
        Items[index].quantity += 1;
        console.log(`${name} miqdarı artırıldı: ${Items[index].quantity}`);
    } else {
        // Məhsul səbətdə yoxdursa, yeni bir obyekt kimi əlavə et
        const item = {
            name: name,
            price: price,
            quantity: 1,
            image: image
        };
        Items.push(item);
        console.log(`${name} added to basket.`);
    }
    updateCartDisplay();
    updateProductQuantity();
    console.log("Current Cart: ", Items);
}
function deleteFromCart(index) {
    Items.splice(index, 1);
    updateCartDisplay();
    updateProductQuantity();
}
function updateQuantity(index, quantity) {
    if (quantity < 1) quantity = 1;
    Items[index].quantity = quantity;
    updateCartDisplay();
    updateProductQuantity();
}
//*** Display product functionality ***/
function updateCartDisplay() {
    const cartElement = document.getElementById('cart-items');
    cartElement.innerHTML = '';
    Items.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = 'cart-item';
        li.innerHTML = `
        <img src="${item.image}" alt="${item.name}" style="width:50px; height:50px; margin-right:10px;">
        <span> Name: ${item.name} - <br> Price: $${item.price.toFixed(2)} x ${item.quantity} </span>
        <div className="quantity">
        <button onclick="updateQuantity (${index}, ${item.quantity + 1})">+</button>
        <input type="number" value="${item.quantity}" min="1" max="10" onchange="updateQuantity(${index}, this.value)"/>
        <button onclick="updateQuantity (${index}, ${item.quantity - 1})">-</button>
        </div>
        <button onclick="deleteFromCart(${index})" class="delete-btn">Sil</button>
        `;
        cartElement.appendChild(li);
    });
}
//*** Display product quantity functionality ***/
function updateProductQuantity() {
    const quantityElement = document.getElementById('productsQuantity');
    // `items` massivindəki bütün məhsulların miqdarını topla
    const totalQuantity = Items.reduce((sum, item) => sum + item.quantity, 0);
    // Nəticəni `productsQuantityElement`-ə yaz
    quantityElement.textContent = totalQuantity;
    if (totalQuantity === 0) {
        // Əgər səbətdə məhsul yoxdursa, elementi gizlət
        quantityElement.style.visibility = "hidden";
        quantityElement.textContent = '';
    } else {
        // Məhsul varsa, elementi göstər və məhsul sayını yenilə
        quantityElement.style.visibility = "visible";
        quantityElement.textContent = totalQuantity;
    }
}