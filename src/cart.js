let cart = JSON.parse(localStorage.getItem("cartData")) || [];
// console.log(cart);
let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping-cart");

let calculation =()=> {
    cartAmount.innerHTML = cart.map((allItems) => allItems.item).reduce( (x , y) => x + y, 0 );
     // console.log(cart.map((allItems)=> allItems.item).reduce((x,y)=> x +y, 0));
}

calculation();

let generateCartItems = () => {
    if (cart.length !==0){
        // console.log("cart has a different items of " + cart.length);
        return shoppingCart.innerHTML = cart.map((x) => {
            //console.log(shopItemsData);
            let {id,item} = x;
            let search = shopItemsData.find((y)=> y.id === id) || []
            let {productImg,price,productName} = search;
            return `
            <div class="cart-card">
                <div class="cart-item leaf-radius">
            
                    <img class="imgItemSmall" src="${productImg}" alt="" />
                    
                    
                    <div class="details">

                        <h4 class="title-price">
                            <p>${productName}</p>
                        </h4>

                        <div class="title-price-x">
                            <p class="cart-item-price">$${price}</p>
                 
                        </div>

                        <div class="button">
                            <i onclick="removeFromCart(${id})" class="bi bi-dash-square-dotted"></i>                        
                                <div id=${id} class="quantity">${item}</div>
                            <i onclick="addToCart(${id})" class="bi bi-plus-square-dotted"></i>
                        
                        </div>

                        <h3>$${item * price}</h3>
                    </div>

                </div>
                
                <div class="removeItemButton">
                    <i onclick="removeItem(${id})" class="bi bi-x-circle"></i>
                 </div>

             </div>

      

            `
        }).join('\n');

    }    // <h3>${$item}</h3>
    else{
        shoppingCart.innerHTML = ``;
        label.innerHTML =`
        <h2 class="darker-text">Cart is Empty</h2>
        <a href="index.html">
        <button class="HomeBtn">Home</button></a>
        `;
        
        // console.log("cart is empty");
    }

};

generateCartItems();

let addToCart = (id) => {
let selectedItem = id;
let findProduct = cart.find( (x) => x.id === selectedItem.id);

if (findProduct === undefined) {
    cart.push({
        id: selectedItem.id,
        item: 1,

    });
}

else {
        findProduct.item += 1;
    }

    generateCartItems();
    updateCart(selectedItem.id);
    localStorage.setItem('cartData', JSON.stringify(cart));

};

let removeFromCart = (id) => {
let selectedItem = id;
let findProduct = cart.find((x) => x.id === selectedItem.id);

if (findProduct === undefined) return;

else if (findProduct.item === 0) return;
else{
    findProduct.item -= 1;

    }

updateCart(selectedItem.id);
cart = cart.filter((x)=>x.item !== 0);
generateCartItems();
localStorage.setItem('cartData', JSON.stringify(cart));
};

let updateCart = (id) => {
let findProduct = cart.find((x)=> x.id === id);
document.getElementById(id).innerHTML = findProduct.item;

calculation();
totalAmount();

};


let removeItem = (id) => {
    let selectedItem = id;
    cart = cart.filter( (x) => x.id !== selectedItem.id);
    generateCartItems();
    totalAmount();
    calculation();
    localStorage.setItem('cartData', JSON.stringify(cart));

};

let clearCart = () => {
    cart = [];
    generateCartItems();
    calculation();
    localStorage.setItem('cartData', JSON.stringify(cart));
}

let totalAmount = (x) => {

    if (cart.length !==0) {
        let amount = cart.map((x) => {
            let {item, id} = x;
            let search = shopItemsData.find((y)=> y.id === id) || [];
            return item * search.price;
        }).reduce((x,y)=> x + y, 0); // total amount
        label.innerHTML = `
        <h2> Total amount: $${amount}</h2>
        <button class="checkout">Checkout</button>
        <button onclick="clearCart()" class="removeAll">Clear All</button>
        `;
        //console.log(amount);
    } else return;

};

totalAmount();
// NEED TO UPDATE THE CART VALUE UPON CLOSING OR REMOVING AN ITEM