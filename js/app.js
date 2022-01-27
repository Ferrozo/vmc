const slides = document.querySelectorAll(".slide");
const btns = document.querySelectorAll(".navigation");
let sliders = document.querySelectorAll(".slider");
let currentSlider = 1;
let addToCart = document.querySelectorAll(".add-cart");

let products = [
    {
        name: "PC 1",
        tag: "tech1",
        price: 108,
        description: "",
        inCart: 0
    },
    {
        name: "PC 2",
        tag: "tech2",
        price: 10,
        description: "",
        inCart: 0
    },
    {
        name: "PC 3",
        tag: "tech3",
        price: 53,
        description: "",
        inCart: 0
    },
    {
        name: "PC 4",
        tag: "tech4",
        price: 108,
        inCart: 0
    },
    {
        name: "PC 5",
        tag: "tech5",
        price: 108,
        description: "",
        inCart: 0
    }
];



//slider js

let manualNav = function (manual){
    slides.forEach((slide)=>{
        slide.classList.remove("active");
    });

    btns.forEach((btn) => {
        btn.classList.remove("active");
    })

    slides[manual].classList.add("active");
    btns[manual].classList.add("active")
}

btns.forEach((btn, i)=>{
    btn.addEventListener("click", ()=>{
        manualNav(i);
        currentSlider =i;
    });
});

let repeat = function (activeClass) {
    let active = document.getElementsByClassName("active");
    let i = 1;

    let repeater = () => {
        setTimeout(function(){
            [...active].forEach((activeSlide) =>{
                activeSlide.classList.remove("active");

            });

            slides[i].classList.add("active");
            btns[i].classList.add("active");
            i++;
            if(slides.length == i){
                i = 0;
            }
            if( i >= slides.length) {
                return;
            }
            repeater();
        }, 10000);
    };
    repeater();
}

repeat();


for (let i = 0; i < addToCart.length; i++){
    addToCart[i].addEventListener("click", ()=> {
        totalCards(products[i]);
        totalCost(products[i]);
    });
}

function onLoadCartNumbers(){
    let productTotal = localStorage.getItem("totalCards");

    if( productTotal){
        document.querySelector(".cart-div span").textContent = productTotal;
    }
}

function totalCards(product){

    let productTotal = localStorage.getItem("totalCards");
    productTotal = parseInt(productTotal);

    if( productTotal ){
        localStorage.setItem("totalCards", productTotal + 1);
        document.querySelector(".cart-div span").textContent = productTotal + 1;
    } else {
        localStorage.setItem("totalCards", 1);
        document.querySelector(".cart-div span").textContent = 1;
    }

    setProducts(product);
}

function setProducts(product){

    let cartProduct = localStorage.getItem("productsInCart");
    
    cartProduct = JSON.parse(cartProduct);

    if(cartProduct != null ){

        if( cartProduct[product.tag] == undefined ){ 
            cartProduct = {
                ...cartProduct, 
                [product.tag]: product
            } 
        }

        cartProduct[product.tag].inCart += 1;

    }else {
        product.inCart = 1;
        cartProduct = {
            [product.tag]: product
        }
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartProduct));
}

function totalCost(product){
    let cartCost = localStorage.getItem("totalCost");
    if(cartCost  != null ) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    }else {
        localStorage.setItem("totalCost", product.price);
    }

}

onLoadCartNumbers();