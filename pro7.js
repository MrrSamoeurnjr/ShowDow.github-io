let productsItems = [
    {
        id:1,
        name:'Product1',
        price:100,
        image:'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/refurb-iphone-13-pro-max-silver-2023?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1679072987085',
        qty:1
    },
    {
        id:2,
        name:'Product2',
        price:100,
        image:'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/refurb-iphone-13-pro-max-silver-2023?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1679072987085',
        qty:1
    },
    {
        id:3,
        name:'Product3',
        price:100,
        image:'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/refurb-iphone-13-pro-max-silver-2023?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1679072987085',
        qty:1
    },
    {
        id:4,
        name:'Product4',
        price:100,
        image:'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/refurb-iphone-13-pro-max-silver-2023?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1679072987085',
        qty:1
    },
]
const openBtn = document.getElementById('open_cart_btn')
const cart = document.querySelector('.sideCard');
const closeBtn = document.querySelector('.close_btn');
const backdrop = document.querySelector('.backdrop');
const productContainer = document.querySelector('.items');
const cartItems = document.querySelector('.cart_items');
const itemNum = document.getElementById('item-num');
const subtotalprice = document.getElementById('subtotal_price');
let cart_data = [
    // {
    //     id:1,
    //     name:'Product1',
    //     price:100,
    //     image:'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/refurb-iphone-13-pro-max-silver-2023?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1679072987085',
    //     qty:1
    // }
]
openBtn.addEventListener('click',openCart);
closeBtn.addEventListener('click',closeCart);
backdrop.addEventListener('click',closeCart)
function openCart(){
    cart.classList.add('open');
    backdrop.style.display = 'block'
    setTimeout(() => {
        backdrop.classList.add('show')
    },0)
}
function closeCart(){
    cart.classList.remove('open')
    backdrop.classList.remove('show')
    setTimeout(() => {
        backdrop.style.display = 'none'
    },500)
}
reloadItem();
function reloadItem(){
    productsItems.forEach((item ,idx) => {
        const itemEl = document.createElement('div')
        itemEl.classList.add('item');
        itemEl.onclick = () => addItem(idx , item.id)
        itemEl.innerHTML = `
        <img src="${item.image}" alt="">
        <button>Add to cart</button>
        `
        productContainer.appendChild(itemEl)
    })
}
let itemCounts = 0 ;
function calculateItem(){
    itemCounts = 0; 
    cart_data.forEach((item) => (itemCounts += item.qty))
    itemNum.innerText = itemCounts;
}
function removeCartItem(itemId){
    cart_data = cart_data.filter((item) => item.id != itemId);
    updateCart();
}
reloadCartItem()
function reloadCartItem(){
    cartItems.innerHTML = ''
    cart_data.forEach((item ) => {
        const cartitem = document.createElement('div');
        cartitem.classList.add('cart_item');
        cartitem.innerHTML = `
        <div class="remove_item" onclick = "removeCartItem(${item.id})">
                        <span>&times;</span>
                    </div>
                    <div class="item1_img">
                        <img src="${item.image}" alt="">
                    </div>
                    <div class="item_details">
                        <p>iphone 13 Pro Max</p>
                        <strong>$${item.price}</strong>
                        <div class="qty">
                            <span onclick = "decreaseQuantity(${item.id})">-</span>
                            <strong>${item.qty}</strong>
                            <span onclick = "increaseQuantity(${item.id})">+</span>
                        </div>
                    </div>
        `
        cartItems.appendChild(cartitem)
    })
}
function increaseQuantity(itemId){
    cart_data = cart_data.map((item) => 
        item.id.toString()  === itemId.toString()
        ? {...item , qty: item.qty + 1 }
        : item
    )
    updateCart()
}
function decreaseQuantity(itemId){
    cart_data = cart_data.map((item) => 
        item.id.toString()  === itemId.toString()
        ? {...item , qty: item.qty > 1 ? item.qty -1 : 0 }
        : item
    )
    updateCart()
}
function addItem(idx , itemId ){
    const foundItem = cart_data.find(
        (item) => item.id.toString() === itemId.toString()
    )
    if(foundItem){
        // Item already exists in the cart. You can update the quantity here.
        increaseQuantity(itemId)
    }
    else {
        cart_data.push(productsItems[idx])
    }
    openCart();
    updateCart();
}
function subtotalPricsOfProducts(){
    let subtotal = 0 ;
    cart_data.forEach((item) => (subtotal += item.price * item.qty))
    subtotalprice.innerText = subtotal;
}
function updateCart(){
    reloadCartItem()
    calculateItem()
    subtotalPricsOfProducts()
}