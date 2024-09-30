import {createproduct, likeitem,myproducts} from "./main/products.js"
createproduct(document.getElementById("products-show"), myproducts);
likeitem(document.getElementById("products-show"), myproducts);