import { createproduct ,toggleLike} from "../main/products.js";
let myproducts = JSON.parse(localStorage.getItem("myarrlike") || localStorage.getItem("myarr"));
const arr3  = JSON.parse(localStorage.getItem("myarrlike3")) || myproducts.slice(32)
const arr2 = JSON.parse(localStorage.getItem("myarrlike2")) ||  myproducts.slice(16, -16)
let filteredArrays = [myproducts.slice(), arr2.slice(), arr3.slice()];
let [filteredArr, filteredArr2, filteredArr3] = [myproducts.slice(), arr2.slice(), arr3.slice()];
myproducts.length = 16;
const productContainers = document.querySelectorAll(".productjs");
let crarr = (x, y, z) => {
    const values = [x, y, z];
    productContainers.forEach((e, index) => {createproduct(e, values[index % values.length]);});
};
crarr(myproducts, arr2, arr3);
const toggleDropdown = (selector) => {
    document.querySelector(selector).classList.toggle("d-none");
};
document.addEventListener("click", (e) => {
    const target = e.target;
    if (target.closest(".mylist")) {
        toggleDropdown(".mydivlist");
    }
    if (target.closest(".sort")) {
        toggleDropdown(".myullet");
    }
    if (!target.classList.contains("myfilter")) {
        document.querySelector(".mydivlist").classList.add("d-none");
        document.querySelector(".myullet").classList.add("d-none");
    }
});
const resetProducts = () => {
    productContainers.forEach(container => (container.innerHTML = null));
    crarr(myproducts, arr2, arr3);
    document.querySelectorAll(".myul li, .myullet li").forEach((li) => li.classList.remove("active"));
    document.querySelectorAll(".innercontent img").forEach((e) => e.style.height = "316.85px");
};
const filterAndSort = () => {
    filteredArrays = [myproducts.slice(), arr2.slice(), arr3.slice()];
    [filteredArr, filteredArr2, filteredArr3] = filteredArrays;
    const filterValue = document.querySelector(".myul li.active")?.innerText;
    const sortValue = document.querySelector(".myullet li.active")?.innerText.toLowerCase();
    if (filterValue && filterValue !== 'refresh') {
        filteredArrays.forEach((arr, index) => {
            filteredArrays[index] = arr.filter((e) => e.price == filterValue);
        });
        [filteredArr, filteredArr2, filteredArr3] = filteredArrays;
    }
    if (sortValue) {
        const sortBy = (arr, direction) => arr.sort((a, b) => direction * a.name.localeCompare(b.name));
        const sortOrder = sortValue === "a-z" ? 1 : sortValue === "z-a" ? -1 : 0;
        if (sortOrder) {
            filteredArrays.forEach(arr => sortBy(arr, sortOrder));
        }}
    productContainers.forEach(e => e.innerHTML = null);
    crarr(filteredArr, filteredArr2, filteredArr3);
    document.querySelectorAll(".innercontent img").forEach((e) => e.style.height = "316.85px");
};
const setupFilters = (selector, callback) => {
    document.querySelectorAll(selector).forEach((li) => {
        li.classList.remove("active");
        li.addEventListener("click", function () {
            document.querySelectorAll(selector).forEach((e) => e.classList.remove("active"));
            li.classList.add("active");
            callback();
        });
    });
};
setupFilters(".myul li", filterAndSort);
setupFilters(".myullet li", filterAndSort);
document.querySelector(".myownfilter").addEventListener("click", resetProducts);
setTimeout(() => {
    document.addEventListener("click", (e) => {
            const count = document.querySelectorAll(".cont").length;
            [document.querySelector(".myshow").innerHTML, document.querySelector(".show span").innerHTML] = [count, count];
    });
}, 0);
let likeitem = (productContainers, arr, arr2, arr3) => {
    productContainers.forEach((container) => { container.innerHTML = null; });
    crarr(arr, arr2, arr3);  

    productContainers.forEach((container) => {
        container.addEventListener("click", (event) => {
            const likeElement = event.target.closest(".likex");
            if (!likeElement) return;
            event.preventDefault();

            let productId = likeElement.dataset.id;
            let myproduct = arr.find(p => p.id == productId) || arr2.find(p => p.id == productId) || arr3.find(p => p.id == productId);
            toggleLike(likeElement, myproduct, [...arr, ...arr2, ...arr3]);
        });
    });
};
likeitem(productContainers, myproducts, arr2, arr3);