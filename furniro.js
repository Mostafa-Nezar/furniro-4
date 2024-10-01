import { createproduct, likeitem, myproducts } from "./main/products.js";
const limitedProducts = myproducts.slice(0, 8);
createproduct(document.getElementById("products-show"), limitedProducts);
likeitem(document.getElementById("products-show"), limitedProducts, myproducts);