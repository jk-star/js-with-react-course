# Chapter 1 JavaScript Basics

## What is JavaScript?

- JavaScript (JS) ek programming language hai jo websites ko interactive aur dynamic banati hai.

Simple words me:

- HTML → Website ka structure banata hai.
- CSS → Website ko design aur style deta hai.
- JavaScript (JS) → Website me functionality aur logic add karta hai.

Example

Agar kisi website par:

- Button click karne par menu open hota hai ✅
- Form submit hone se pehle validation hoti hai ✅
- Calculator answer nikalta hai ✅
- Dark Mode ON/OFF hota hai ✅
- Shopping cart me product add hota hai ✅

Ye sab JavaScript se hota hai.

## 2. Variables

<code><pre>
var name = "John";
let name2 = "Harry";
const name3 = "Mango";
</pre></code>

- var → पुराना तरीका
- let → value बाद में change कर सकते हैं
- const → variable को दुबारा assign नहीं कर सकते
Global vs Local Variables

## 3. Global vs Local Variables
- Function/block के बाहर declared variable → broadly global scope
- Function के अंदर declared variable → local scope

## 4. Variable Naming

<code><pre>
let my_name = "Jyoti";   // snake_case
let myName = "Jyoti";    // camelCase

const MAX_USERS = 100;   // constant naming convention
</pre></code>

- JavaScript में variables के लिए आमतौर पर camelCase और constants के लिए UPPER_SNAKE_CASE convention use होती है।

## 5. Data Types

**Primitive:**

<code><pre>
let name = "John";       // String
let age = 28;            // Number
let isActive = true;     // Boolean
let data = null;         // Null
let value;               // Undefined
</pre></code>

- इसके अलावा JavaScript में `BigInt` और `Symbol` भी primitive types हैं।

**Non-Primitive / Reference Types:**

<code><pre>
let fruits = ["Apple", "Mango"]; // Array

let user = {
    name: "John",
    age: 28
}; // Object
</pre></code>


## A. Strings
<code><pre>
let a = 'Hello';
let b = "Hello";
</pre></code>

- Quotes के अंदर same quote चाहिए तो escape character \ use कर सकते हैं:

<code><pre>
let text = "My name is \"John\"";
let text2 = 'It\'s JavaScript';
</pre></code>

## B. Numbers

<code><pre>
let a = 10;       // integer-like number
let b = 10.5;     // decimal
let c = 2e3;      // exponential = 2000
</pre></code>

- एक **important correction:** JavaScript में अलग `integer` और `float` data types नहीं होते। सामान्य integers और decimal values दोनों का type `number` ही होता है:

<code><pre>
console.log(typeof 10);    // "number"
console.log(typeof 10.5);  // "number"
</pre></code>


## C. Boolean

- Boolean में केवल 2 values होती हैं:

<code><pre>
let isLoggedIn = true;
let isAdmin = false;
</pre></code>

- `true` → condition सही है
- `false` → condition गलत है

Example:

<code><pre>
let age = 25;
let isAdult = age >= 18;

console.log(isAdult); // true
</pre></code>

## D. undefined

- Variable declare कर दिया लेकिन उसमें कोई value assign नहीं की:

<code><pre>
let a;

console.log(a); // undefined
</pre></code>

याद रखें:

- **undefined = value अभी assign नहीं की गई।**

## E. `null`

- जब हम **जानबूझकर** बताते हैं कि अभी कोई value नहीं है:

<code><pre>
let user = null;

console.log(user); // null
</pre></code>

## 6. Non-Primitive Data Types

- इस lecture में दो main चीजें बताई गईं:

- **Object** और **Array**

## A. Object { }

- Object में data **key : value** pair में रहता है।

<code><pre>
let fruits = {
    fruit1: "Mango",
    fruit2: "Orange"
};
</pre></code>

यहाँ:

<code><pre>
fruit1 → key
Mango  → value

fruit2 → key
Orange → value
</pre></code>

Object की value access:

- `console.log(fruits.fruit1);` या: `console.log(fruits["fruit1"]);`

## B. Array [ ]

- Array में multiple values रख सकते हैं:

`let fruits = ["Mango", "Orange", "Apple"];`

- Array में values को index से access करते हैं और indexing 0 से शुरू होती है:

<code><pre>

**Index**      **Value**
  0        Mango
  1        Orange
  2        Apple
 </pre> </code>

इसलिए:

<code><pre>
console.log(fruits[0]); // Mango
console.log(fruits[1]); // Orange
console.log(fruits[2]); // Apple
</pre> </code>
