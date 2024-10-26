import {createproduct,myproducts,likeitem} from "../main/products.js";
let products = JSON.parse(localStorage.getItem("myarrlike")) || myproducts
products.forEach(e=>!e.size?e.size = "l":e.size)
let sizes = document.querySelectorAll(".size")
const stars = document.querySelectorAll('.stars input');
const ratingValue = document.getElementById('rating-value');
const vtwo =  document.querySelector(".v2")
document.addEventListener("DOMContentLoaded", () => {
    let productId = new URLSearchParams(window.location.search).get('id');
    if (productId && products) {
        let product = products.find(p => p.id == productId);
        if (product) {
            sizes.forEach((e)=>{
                e.addEventListener("click",()=>{
                    sizes.forEach((e)=>e.classList.remove("active"))
                    product.size = e.innerHTML
                    e.classList.add("active")
                    localStorage.setItem("myarrlike",JSON.stringify(products))
                })
                e.classList.remove("active")
                if (e.innerHTML == product.size) {
                    e.classList.add("active")
                }
            })          
            document.getElementById("light").innerHTML = product.name;
            document.getElementById("product-image").src = "../" + product.image;
            document.querySelector(".key").innerHTML=product.key
            document.getElementById("product-name").textContent = product.name;
            document.getElementById("product-description").textContent = product.describtion;
            document.getElementById("product-price").textContent = `Rs ${product.price},000.00`;
            document.querySelector(".plus").setAttribute("data-id", productId);
            document.querySelector(".minus").setAttribute("data-id", productId);
            document.querySelector(".one img").src="../" + product.image1
            document.querySelector(".two img").src="../" + product.image2
            document.querySelector(".three img").src="../" + product.image3
            document.querySelector(".four img").src="../" + product.image4
            const keyviews = `page_view_count_${product.id}`;
            let views = localStorage.getItem(keyviews) ;
            views = (views ? parseInt(views) + 1 : 1);
            product.views = views;
            let rateviewIncremented = false;
            let lastSelectedRating = null;
            let rateviews = +localStorage.getItem(`rateviews${product.id}`) || 0;
            let totalRatingValue = parseFloat(localStorage.getItem(`totalRatingValue_${product.id}`)) || 0;
            product.averagerate = parseFloat(localStorage.getItem(`averagerate${product.id}`)) || 0;
            
            // document.querySelector(".comp").href = `../compare/compare.html?id=${productId}`
            document.querySelector(".comp").addEventListener("click", () => {
                const keyviews = `page_view_count_${product.id}`;
                let views = localStorage.getItem(keyviews);
                views = (views ? parseInt(views) + 1 : 1);
                product.views = views;
                product.rateviews = rateviews;
                localStorage.setItem(keyviews, views);
                localStorage.setItem(`rateviews${product.id}`, rateviews);
                localStorage.setItem("myarrlike", JSON.stringify(products));
                rateviewIncremented = false;
                console.log(product.views);
                console.log(product.rateviews);
                console.log(product.averagerate);
            });
            
            const savedRating = localStorage.getItem(`rate${product.id}`);
            if (savedRating) {
                ratingValue.textContent = savedRating;
                vtwo.textContent = " " + savedRating + " ";
                product.rate = savedRating;
            
                stars.forEach(star => {
                    if (star.value === savedRating) {
                        star.checked = true;
                    }
                });
            }
            stars.forEach((star) => {
                star.addEventListener('change', function() {
                    rateviews++;
                    product.rateviews = rateviews;
                    localStorage.setItem(`rateviews${product.id}`, rateviews);
                    lastSelectedRating = parseFloat(this.value);
                    totalRatingValue += lastSelectedRating;
                    product.averagerate = (totalRatingValue / rateviews).toFixed(1);
                    localStorage.setItem(`rate${product.id}`, lastSelectedRating);
                    localStorage.setItem(`totalRatingValue_${product.id}`, totalRatingValue);
                    localStorage.setItem(`averagerate${product.id}`, product.averagerate);
                    ratingValue.textContent = lastSelectedRating;
                    vtwo.textContent = " " + lastSelectedRating + " ";
                    product.rate = lastSelectedRating;
                    console.log("Average Rate:", product.averagerate);
                });
            });

            document.getElementById("add-to-cart").setAttribute("data-id",product.id)
        }
    }
    let suggestions = products
    const chunkSize = 5; 
    const startIndex = Math.floor((productId - 1) / chunkSize) * chunkSize;
    suggestions = suggestions.slice(startIndex, startIndex + chunkSize);    
    let listproduct = document.querySelector(".similar .row");
    createproduct(listproduct,suggestions.filter((e) => e.id != productId))
    likeitem(listproduct,suggestions.filter((e) => e.id != productId),products)
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartItem = cart.find(p => p.productid == productId);
    if (cartItem) {
        document.querySelector(".q").textContent = cartItem.quantity;
        sizes.forEach((e)=>{
            e.addEventListener("click",()=>{
                cartItem.size = e.innerHTML
                console.log(cartItem);
                localStorage.setItem("cart",JSON.stringify(cart))
            })
        })
    }
    function updateCartQuantity(productId) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let cartItem = cart.find(p => p.productid == productId);

        if (cartItem) {
            document.querySelector(".q").textContent = cartItem.quantity;
        }
    }
    document.getElementById("add-to-cart").addEventListener("click", () => {
        updateProductQuantity(productId, 1);
    });
    document.querySelector(".plus").addEventListener("click", () => {
        updateProductQuantity(productId, 1);
    });
    document.querySelector(".minus").addEventListener("click", () => {
        updateProductQuantity(productId, -1);
    });
    function updateProductQuantity(productId, change) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let cartItem = cart.find(p => p.productid == productId);
        if (cartItem) {
            cartItem.quantity += change;
            if (cartItem.quantity < 0) {
                cart = cart.filter(p => p.productid != productId);
            }
        } else if (change > 0) {
            cart.push({ productid: productId, quantity: 1 });
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartQuantity(productId);
    }
});