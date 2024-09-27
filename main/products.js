fetch('../main/productlist.json')
    .then(response => response.json())
    .then(products => {
    localStorage.setItem("myarr",JSON.stringify(products[0]))        
    })
    
let myproducts = JSON.parse(localStorage.getItem("myarr"));
function createproduct(productsshow, arr) {
    arr.forEach(e => {
        const [saleLabel, isLiked , likeClass ] = [e.new ? `<div class="sale new">${e.new}</div>` : e.sale ? `<div class="sale">-${e.sale}%</div>` : `<div class="sale"></div>`, e.liked ? 'currentColor' : 'none' , e.liked ? 'red' : '' ];
        const likeButton =
        `<a class="text-white fw-bold likex ${likeClass}" data-id="${e.id}" href="#">
                <svg class="likesvgitem" data-id="${e.id}" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48">
                    <path class="pathsvgitem" fill="${isLiked}" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="5" 
                    d="M15 8C8.925 8 4 12.925 4 19c0 11 13 21 20 23.326C31 40 44 30 44 19c0-6.075-4.925-11-11-11c-3.72 0-7.01 1.847-9 4.674A10.987 10.987 0 0 0 15 8"/>
                </svg> Like
            </a>`
        const product = document.createElement("div");
        product.classList.add("col-md-6", "col-lg-4", "col-hey");
        product.innerHTML = `
            <div class="cont">
                <div class="innercontent">
                    <img width="100%" class="img-fluid" src="../${e.image}" alt="${e.name}">
                    ${saleLabel}
                </div>
                <div class="des">
                    <h4 class="fw-bold">${e.name}</h4>
                    <p class="text-black-50">${e.des}</p>
                    <div style="font-weight: 700;">Rp ${e.price}.000</div>
                </div>
                <div class="lay d-grid align-items-center">
                    <div class="text-center">
                        <button class="addbutton mb-5" data-id="${e.id}">Add To Cart</button>
                        <div class="d-flex justify-content-center">
                            <a class="text-white sharep fw-bold" href="#">
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81c1.66 0 3-1.34 3-3s-1.34-3-3-3s-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65c0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92"/>
                                </svg> Share
                            </a>
                            <a class="mx-2 text-white fw-bold hover-red" href="../details/detail.html?id=${e.id}">
                                <svg fill="#ffffff" width="24px" height="24px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.08,7l1,1,3.44-3.45L11,1,10,2l1.8,1.8H2v1.4h9.82ZM5.86,9l-1-1L1.42,11.5,4.91,15l1-1L4.1,12.2H14V10.8H4.1Z"></path>
                                </svg> Compare
                            </a>
                            ${likeButton}
                        </div>
                    </div>
                </div>
            </div>`;
            if (location.pathname == "/furniro-2/index.html") {
                product.innerHTML = `
                <div class="cont">
                    <div class="innercontent">
                        <img width="100%" class="img-fluid" src="${e.image}" alt="${e.name}">
                        ${saleLabel}
                    </div>
                    <div class="des">
                        <h4 class="fw-bold">${e.name}</h4>
                        <p class="text-black-50">${e.des}</p>
                        <div style="font-weight: 700;">Rp ${e.price}.000</div>
                    </div>
                    <div class="lay d-grid align-items-center">
                        <div class="text-center">
                            <button class="addbutton mb-5" data-id="${e.id}">Add To Cart</button>
                            <div class="d-flex justify-content-center">
                                <a class="text-white sharep fw-bold" href="#">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81c1.66 0 3-1.34 3-3s-1.34-3-3-3s-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65c0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92"/>
                                    </svg> Share
                                </a>
                                <a class="mx-2 text-white fw-bold hover-red" href="details/detail.html?id=${e.id}">
                                    <svg fill="#ffffff" width="24px" height="24px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.08,7l1,1,3.44-3.45L11,1,10,2l1.8,1.8H2v1.4h9.82ZM5.86,9l-1-1L1.42,11.5,4.91,15l1-1L4.1,12.2H14V10.8H4.1Z"></path>
                                    </svg> Compare
                                </a>
                                ${likeButton}
                            </div>
                        </div>
                    </div>
                </div>`;
            }
        productsshow.appendChild(product);
    });
}
let likeitem = () => {
   setTimeout(() => {
    let likeitems = document.querySelectorAll(".likex");
    likeitems.forEach((e) => {
        e.addEventListener("click", (ee) => {
            ee.preventDefault();
            let myproduct = JSON.parse(localStorage.getItem("myarr")).find(p => p.id == e.dataset.id); 
            myproduct.liked = !myproduct.liked;
            e.classList[myproduct.liked ? 'add' : 'remove']("red");
            e.firstElementChild.firstElementChild.setAttribute("fill", myproduct.liked ? "currentColor" : "none");            
        }); 
    });
   }, 1000);
}
export{createproduct,likeitem,myproducts}