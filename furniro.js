import {createproduct, likeitem,myproducts} from "./main/products.js"
myproducts.length = 8
createproduct(document.getElementById("products-show"), myproducts);
likeitem();