// Main Variables
let container = document.querySelector('.container');

let cart = document.querySelector('.con-icon');
let toCartButton = document.querySelector('.to-cart')
const popupcart = document.querySelector('.popup-cart-container')


// Increment/decrement buttons selectors
let quantity = document.querySelector('#quantity-number')
let incrementButton = document.querySelector('.increment')
let decrementButton = document.querySelector('.decrement')

// shadow gallery and images selectors

let thumbnails = document.querySelectorAll('.thumbnails');
let gallery = document.querySelector('.shadow-gallery');
let expandImg = document.querySelectorAll(".expand");
let images = document.querySelectorAll(".thumbnail-img");


const next = document.querySelectorAll(".next");
const previous = document.querySelectorAll(".previous");

const vProducts = document.createElement("div")
vProducts.classList.add("value-products")

/*****==Part of the pictures and their additions==*****/
// Loop through thumbnail images
for (let i = 0; i < thumbnails.length; i++) {
    thumbnails[i].addEventListener("click", function () {
        for (let n = 0; n < thumbnails.length; n++) {
            thumbnails[n].classList.remove("active");
        }
        this.classList.add("active");
    });
}
expandImg.forEach((expand) => {
    // show img in mater image when click all images
    images.forEach((img) => {
        img.addEventListener("click", () => {
            expand.src = img.src;
        });
    });

    // Set Event listener for the next button to view next product image
    next.forEach((next) => {
        next.addEventListener("click", () => {
            currentImg = expand.src;
            let i = 0;
            while (i < images.length - 1) {
                if (currentImg === images[i].src) {
                    expand.src = images[i + 1].src;
                }
                i++;
            }
        });
    })

    // Set Event listener for the previous button to view previous product image
    previous.forEach((prev) => {
        prev.addEventListener("click", () => {
            currentImg = expand.src;
            let i = images.length - 1;
            while (i > 0) {
                if (currentImg === images[i].src) {
                    expand.src = images[i - 1].src;
                }
                i--;
            }
        });
    })

    // shadow gallery  on all content
    expand.addEventListener("click", () => {
        if (window.innerWidth <= 480) {
            gallery.style.display = "none";
        }else{
            gallery.style.display = "flex";
        }
    })
})
// delete gallery on click x mark
document.getElementById("xmark").onclick = () => {
    gallery.style.display = "none";
}

/*****==Part of the cart and their additions==*****/
// Increment button
incrementButton.addEventListener('click', () => {
    const newQuantity = (parseInt(quantity.value) || 0) + 1
    quantity.value = newQuantity
    toCartButton.setAttribute('data-item-quantity', newQuantity)
})
// Decrement button
decrementButton.addEventListener('click', () => {
    if (quantity.value > 0) {
        const newQuantity = (parseInt(quantity.value) || 0) - 1
        quantity.value = newQuantity
        toCartButton.setAttribute('data-item-quantity', newQuantity)
    }
})

toCartButton.addEventListener('click', () => {
    //  Updata products value
    quantity.setAttribute('value', quantity.value)
    console.log(quantity.value)

    // // popup Error when products = zero
    if (quantity.value <= 0) {
        const popupError = document.createElement("div")
        popupError.classList.add('popup-container')
        container.append(popupError)
        popupError.innerHTML =
            `<div class="popup">
                <span class="close-popup"><a href="#">X</a></span>
                <h2>Error in request</h2>
                <p>
                    You can't buy 0 products.
                    Please add the number of products,
                    from the counter next to button cart
                </p>
                <a href="#" class="popup-btn">ok</a>
            </div>`;

        const closeBtn = document.querySelector('.close-popup');
        const popupBtn = document.querySelector('.popup-btn');
        closeBtn.onclick = () => {
            popupError.remove();
        }
        popupBtn.onclick = () => {
            popupError.remove();
        }
    }

    // Set products value
    if (quantity.value > 0) {
        popupcart.innerHTML =
            `<h3 class="heading">Cart</h3>
        <div class="cart-content">
            <div class="cart-content-product">
                <div class="prod-img"><img src="images/image-product-1-thumbnail.jpg" alt="Product"></div>
                <div class="prod-text">
                <h6>Fall Limited Edition Sneakers</h6>
                 <div class="prod-price">$125.00 * ${quantity.value} <span>= $${125.00 * quantity.value}</span></div>
            </div>
            <div class="bin-icon">
                <i class="fa-solid fa-trash-can"></i>
            </div>
        </div>
        <button class="cart-content-btn">Checkout</button>
        </div>`;
        // delete products value when click on icon trash
        document.querySelector('.bin-icon').onclick = () => {
            quantity.value = 0
            popupcart.innerHTML =
                `<h3 class="heading">Cart</h3>
            <div class="cart-content">
                    <p>Your cart is empty.</p>
            </div>
            `
            vProducts.remove()
        }

        // popup products value
        popupcart.parentNode.appendChild(vProducts);
        vProducts.innerHTML = `<div class="value">${quantity.value}</div>`
    }
})

document.addEventListener("DOMContentLoaded", () => {
    // Show a list of links
    const list = document.querySelector('.list')
    document.querySelector('.fa-xmark').onclick = () => {
        list.classList.remove("show");
    }
    document.querySelector('.fa-align-justify').onclick = () => {
        list.classList.add("show");
    }
    // Show product cart list
    cart.onclick = () => {
        popupcart.classList.toggle("Status")
    }
})
