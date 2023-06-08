let shop = document.getElementById("shop");
let cartAmount = document.getElementById("cartAmount");
let mycart = document.getElementById("cart");

// let basket = JSON.parse(localStorage.getItem("data")) || [];




let cart = JSON.parse(localStorage.getItem("cartData")) || [];
    

let generateShop = () => {

    return (shop.innerHTML = shopItemsData
        .map((x) =>{

            let {id, productName, price, quantity, description, productImg} = x;
            let search = cart.find((x)=> x.id === id) || []

            return `
                    <div id="product-id-${id}" class="item leaf-radius">
                            <div class="imgItemContainer"> 
                                <img class="imgItem" src="${productImg}" alt="">
                            </div>
                            <div class="price-quantity">
                                <div id="price">
                                    <h2>$${price}</h2>
                                </div>
                                <div class="button">
                                    <i onclick="removeFromCart(${id})" class="bi bi-dash-square-dotted"></i>                        
                  
                                <div id=${id} class="quantity">${search.item === undefined? 0: search.item}</div>
                                    <i onclick="addToCart(${id})" class="bi bi-plus-square-dotted"></i>
                                </div>
                            </div>


                            <div class="product-content">       
                                <div class="details">
                                    <h3>${productName}</h3>
                                    <p>${description}</p>
                                </div>
                            </div>


               

                    </div>`;
            }

    ).join('\n'));

}
        
generateShop();


let calculation =()=> {
        cartAmount.innerHTML = cart.map((allItems) => allItems.item).reduce( (x , y) => x + y, 0 );
         // console.log(cart.map((allItems)=> allItems.item).reduce((x,y)=> x +y, 0));
}


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


        updateCart(selectedItem.id);
        localStorage.setItem('cartData', JSON.stringify(cart));

}

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

    localStorage.setItem('cartData', JSON.stringify(cart));
}

let updateCart = (id) => {
    let findProduct = cart.find((x)=> x.id === id);
    document.getElementById(id).innerHTML = findProduct.item;
    
    calculation();


}

calculation();
