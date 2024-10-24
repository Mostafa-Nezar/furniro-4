let myproducts = JSON.parse(localStorage.getItem("myarrlike")) 
console.log(myproducts);
const stars = document.querySelectorAll('.stars input');
const ratingValue = document.getElementById('rating-value');
const views = document.querySelector(".views")
const myrate = document.querySelector(".myrate")
const ratingValue2 = document.getElementById('rating-value2');
const views2 = document.querySelector(".views2")
const myrate2 = document.querySelector(".myrate2")
const elements = document.querySelectorAll('.myobj2');
const elements2 = document.querySelectorAll('.myobj3');
let myobj2 = JSON.parse(localStorage.getItem("myproduct2"))
let vv = document.querySelectorAll(".stars2 label svg path");
let objs = (obj,ele) =>{
    const data = [];
Object.entries(obj).forEach(([key, value]) => {
    if (typeof value === 'object') {
        Object.entries(value).forEach(([nestedKey, nestedValue]) => {
            data.push(nestedValue);
        });
    }
});
ele.forEach((element, index) => {
    if (index < data.length) {
        element.innerHTML = data[index];
    }});
}

if (myobj2) {
let averagerate = (localStorage.getItem(`reduced${myobj2.id}`) / localStorage.getItem(`page_rate_view_count_${myobj2.id}`)).toFixed(1)
myrate2.innerHTML = isNaN(averagerate) ? 0 : averagerate
vv.forEach((path, index) => {
    path.style.color = index < averagerate ? "#FFC700" : "lightgray";
});
views2.innerHTML=localStorage.getItem(`page_view_count_${myobj2.id}`) || 0
document.getElementById("product-imagee").src ="../" + myobj2.imagetwo;
document.getElementById("product-imagee").style.height='177px';
document.querySelector(".name2").innerHTML=myobj2.name
document.querySelector(".price2").innerHTML=`Rs ${myobj2.price},000.00`
document.querySelector(".dagain2").href=`../details/detail.html?id=${myobj2.id}`
document.querySelector(".addcopm2").setAttribute("data-id",myobj2.id)
objs(myobj2,elements2)
}
document.addEventListener("DOMContentLoaded", () => {
    let productId = new URLSearchParams(window.location.search).get('id');
    document.addEventListener("click", (e) => {
        if (!e.target.classList.contains("deleteitem") && !e.target.classList.contains("addbutton")) {
            const productId2 = e.target.dataset.id;
            const product2 = myproducts.find(p => p.id == productId2);      
                if (product2) {
                    document.getElementById("product-imagee").src ="../" + product2.imagetwo;
                    document.getElementById("product-imagee").style.height='177px';
                    document.querySelector(".name2").innerHTML=product2.name
                    document.querySelector(".price2").innerHTML=`Rs ${product2.price},000.00`
                    document.querySelector(".dagain2").href=`../details/detail.html?id=${productId2}`
                    document.querySelector(".addcopm2").setAttribute("data-id",product2.id)
                    let averagerate = (localStorage.getItem(`reduced${product2.id}`) / localStorage.getItem(`page_rate_view_count_${product2.id}`)).toFixed(1)
                    localStorage.setItem("myproduct2",JSON.stringify(product2)) 
                    objs(product2,elements2)
                    const savedRating2 = JSON.parse(localStorage.getItem(`rate${product2.id}`));
                    if (savedRating2 !== null) {
                        ratingValue2.textContent = savedRating2;
                        product2.rate = savedRating2;
                        views2.innerHTML=product2.views
                        vv.forEach((path, index) => {
                            path.style.color = index < averagerate ? "#FFC700" : "lightgray";
                        });
                        myrate2.innerHTML = averagerate
                        localStorage.setItem("myarrlike", JSON.stringify(myproducts));
                    } else {
                        ratingValue2.textContent = 0;
                        product2.rate = 0;
                        views2.innerHTML=0
                        myrate2.innerHTML = 0
                        let vv = document.querySelectorAll(".stars2 label svg path");
                        vv.forEach((path) => {
                            path.style.color = "lightgray";
                        });
                        localStorage.setItem("myarrlike", JSON.stringify(myproducts));
                    }
                    const stars2 = document.querySelectorAll(".stars2 input[type='radio']");
                    stars2.forEach(star => {
                        star.checked = star.value == savedRating2;
                    });
                }
            
    }
    });
    const ul = document.getElementById('item-list');
    myproducts.forEach(item => {
        const li = document.createElement('li');
        li.setAttribute('data-id', item.id);
        if (item.rate == undefined || item.rate == null) {
            item.rate=0
        }
        li.innerHTML=item.name
        li.id="myli"
        ul.appendChild(li);
      });

    if (productId && myproducts) {
        let product = myproducts.find(p => p.id == productId);
        views.innerHTML=localStorage.getItem(`page_view_count_${product.id}`) 
        if (product) {
            objs(product,elements)
            document.getElementById("product-image").src = "../" + product.imagetwo;
            document.querySelector(".name").innerHTML=product.name
            document.querySelector(".price").innerHTML= `Rs ${product.price},000.00`
            document.querySelector(".dagain").href=`../details/detail.html?id=${productId}`
            document.querySelector(".addcopm1").setAttribute("data-id",product.id)
            let averagerate = (localStorage.getItem(`reduced${product.id}`) / localStorage.getItem(`page_rate_view_count_${product.id}`)).toFixed(1)
            views.innerHTML=product.views
            let vv = document.querySelectorAll(".stars label svg path");
                vv.forEach((path, index) => {
                    path.style.color = index < averagerate ? "#FFC700" : "lightgray";
                });
             myrate.innerHTML = isNaN(averagerate) ? 0 : averagerate
            const savedRating = localStorage.getItem(`rate${product.id}`);
            if (savedRating) {
                ratingValue.textContent = savedRating;
                product.rate = savedRating
                localStorage.setItem("myarrlike",JSON.stringify(myproducts))
                stars.forEach(star => {
                    if (star.value === savedRating) {
                        star.checked = true;
                    }
                });
            }
            stars.forEach((star) => {
                star.addEventListener('change', function() {
                    const selectedRating = product.rate;
                    
                    ratingValue.textContent = selectedRating;
                    localStorage.setItem(`rate${product.id}`, selectedRating);
                    localStorage.setItem("myarrlike",JSON.stringify(myproducts))
                });
            });
        }
    }
});
document.querySelector("#proudctsname").onclick = () =>{
    document.querySelector("#item-list").classList.toggle("d-none")
}
document.querySelector("*").addEventListener("click",(e)=>{
        if (e.target.id != "proudctsname") {
            if (e.target.id != "myli") {
    document.querySelector("#item-list").classList.add("d-none")
            }
        }
})