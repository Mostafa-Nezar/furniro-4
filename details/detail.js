import {createproduct,myproducts,likeitem} from "../main/products.js";
const stars = document.querySelectorAll('.stars input');
const ratingValue = document.getElementById('rating-value');
const vtwo =  document.querySelector(".v2")
document.addEventListener("DOMContentLoaded", () => {
    let productId = new URLSearchParams(window.location.search).get('id');
    if (productId && myproducts) {
        let product = myproducts.find(p => p.id == productId);
        if (product) {
            const keyviews = `page_view_count_${product.id}`;
            const keyrateviews = `page_rate_view_count_${product.id}`;
            let views = localStorage.getItem(keyviews);
            let rateviews = localStorage.getItem(keyrateviews);
            views = (views ? parseInt(views) + 1 : 1);
            localStorage.setItem(keyviews, views);
            rateviews = (rateviews ? parseInt(rateviews) + 1 : 1);
            localStorage.setItem(keyrateviews, rateviews);
            window.onload = () =>{
                rateviews--;  
                localStorage.setItem(keyrateviews, rateviews);
            }
            let rateviewIncremented = false;  

            function incrementRateviewsOnce() {
                if (!rateviewIncremented) { 
                    rateviews++;  
                    localStorage.setItem(keyrateviews, rateviews); 
                    rateviewIncremented = true;
                }
            }
            stars.forEach((e) => {
                e.addEventListener("click", () => {
                    incrementRateviewsOnce();  
                });
            }); 
            function createRateviewsOnceFunction(stars, keyrateviews, rateviews) {
                let hasBeenCalled = false;
                return () => {
                    stars.forEach((e) => {
                        e.addEventListener("click", () => {
                            if (!hasBeenCalled && rateviews > 0) {
                                rateviews++; 
                                localStorage.setItem(keyrateviews, rateviews);
                                hasBeenCalled = true; 
                            }
                        });
                    });
                };
            }
           createRateviewsOnceFunction(stars, keyrateviews, rateviews);
            localStorage.setItem(keyviews, views);
            localStorage.setItem(keyrateviews, rateviews);
            myproducts.forEach(product => {
                product.rateviews = rateviews;
                product.views = views;
            });
            localStorage.setItem("myarr", JSON.stringify(myproducts))            
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
            document.querySelector(".comp").style.cursor=`pointer`
            document.querySelector(".comp").onclick = () =>{
            location.assign(`/compare/compare.html?id=${productId}`)
            }
            const savedRating = localStorage.getItem(`rate${product.id}`)
            if (savedRating) {
                ratingValue.textContent = savedRating;
                vtwo.textContent = " " +  savedRating + " ";
                product.rate = savedRating                
                stars.forEach(star => {
                    if (star.value === savedRating) {
                        star.checked = true;
                    }
                });
            }
            let lastSelectedRating = null;
            window.addEventListener('beforeunload', function() {
                if (lastSelectedRating !== null) {
                    let reviews = JSON.parse(localStorage.getItem(`reviews${product.id}`)) || [];
                    reviews.push(+lastSelectedRating);
                    localStorage.setItem(`reviews${product.id}`, JSON.stringify(reviews));
                    localStorage.setItem(`rate${product.id}`, lastSelectedRating);
                }
              });
            stars.forEach((star) => {
                star.addEventListener('change', function() {
                    lastSelectedRating = this.value;
                    ratingValue.textContent = lastSelectedRating;
                    vtwo.textContent = " " + lastSelectedRating + " ";
                });
            });         
            document.getElementById("add-to-cart").onclick = () => {
                let cart = JSON.parse(localStorage.getItem("cart")) || [];
                let existingProduct = cart.find(p => p.productid == product.id);

                if (existingProduct) {
                    existingProduct.quantity += 1;
                } else {
                    cart.push({ productid: product.id, quantity: 1 });
                }

                localStorage.setItem("cart", JSON.stringify(cart));
                updateCartQuantity(product.id);
                location.reload()
            };
        }
    }
    let products = myproducts
    const chunkSize = 5; 
    const startIndex = Math.floor((productId - 1) / chunkSize) * chunkSize;
    products = products.slice(startIndex, startIndex + chunkSize);    
    let listproduct = document.querySelector(".similar .row");
    createproduct(listproduct,products.filter((e) => e.id != productId))
    likeitem(listproduct,products.filter((e) => e.id != productId),myproducts)
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartItem = cart.find(p => p.productid == productId);

    if (cartItem) {
        document.querySelector(".q").textContent = cartItem.quantity;
    }
    function updateCartQuantity(productId) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let cartItem = cart.find(p => p.productid == productId);

        if (cartItem) {
            document.querySelector(".q").textContent = cartItem.quantity;
        }
    }
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
    document.querySelectorAll(".ph").forEach((e)=>{
        e.style.cursor = "pointer"
        e.addEventListener("click",(ee)=>{
            document.querySelector("#product-image").src= ee.target.getAttribute("src")
        })
    })