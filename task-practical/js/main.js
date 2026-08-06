import { add, subtract } from './calculator.js';

import { login, logout, checkUser } from './auth.js';

import { capitalize, currencyFormat, dateFormat } from './utils.js';

import user from "./user.js";

import { add as sum, multiply as mul } from "./math.js";

import products from "./products.js";

import { addToCart, removeFromCart, getCart } from "./cart.js";

//calculator
document.querySelector('.calculator').innerHTML = `
Add = ${add(20, 3)} <br/>
Subtract = ${subtract(20, 3)} <br/> `;

//user.js
document.querySelector('.user').innerHTML = `
Name = ${user.name} <br/>
Age = ${user.age} <br/>
City = ${user.city} <br/>
Email = ${user.email} <br/>
Active = ${user.isActive} <br/> `

//auth.js
document.querySelector('.login').innerHTML = checkUser('jyoti');

//utils.js
document.querySelector('.utility-functions').innerHTML = `
Capitalize = ${capitalize('jyoti singh')} <br/>
Currency Format = ${currencyFormat(250000)} <br/>
Date Format = ${dateFormat("2026-07-29")} <br/> `;

//math.js
console.log(sum(10, 20));
console.log(mul(10, 20));

//products.js
let productList = "";
productList += `<table><tr>
    <th>Name</th>
    <th>Price</th>
    <th>Category</th>
    <th>Stock</th>
</tr>`;
products.forEach(product => {
    productList += `
    <tr>
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td>${product.category}</td>
        <td>${product.stock}</td>
    </tr> `;
});
productList += `</table>`;
document.querySelector('.product_list').innerHTML = productList;

//cart.js
console.log(addToCart("Laptop"));
console.log(addToCart("Mobile"));
console.log(addToCart("Keyboard"));

console.log(getCart());

console.log(removeFromCart("Mobile"));

console.log(getCart());
