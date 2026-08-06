# Chapter 3 Conditional Statements And Functions

## JavaScript Conditional Statements

- जब हमें किसी **condition के आधार पर decide करना हो कि कौन-सा code execute होगा**, तब conditional statements use करते हैं।


## 1. if

Syntax:

<code><pre>
if (condition) {
    // code
}
</pre></code>

Example:

<code><pre>
let a = 10;
if (a === 10) {
    console.log("a is 10");
}
</pre></code>

## 2. if...else

- जब हमें कहना हो: Condition सही है तो ये करो, नहीं तो कुछ और करो।

<code><pre>
let a = 20;

if (a === 10) {
    console.log("a is 10");
} else {
    console.log("Not valid");
}
</pre></code>

Flow:

<code><pre>
    condition
          ↓
     ┌────┴────┐
    true      false
     ↓          ↓
    if         else
</pre></code>

- एक समय पर if या else में से एक ही block execute होगा।

## 3. else if

- जब multiple conditions check करनी हों:

<code><pre>
let a = 20;

if (a === 10) {
    console.log("a is 10");

} else if (a === 20) {
    console.log("a is 20");

} else {
    console.log("Not valid");
}
</pre></code>

## 4. switch Statement

- जब एक value को कई possible values से compare करना हो, तब switch useful हो सकता है।

Basic syntax:

<code><pre>
switch (expression) {

    case value1:
        // code
        break;

    case value2:
        // code
        break;

    default:
        // code
}
</pre></code>

Example:

<code><pre>
let a = 10;

switch (a) {

    case 0:
        console.log("a is 0");
        break;

    case 10:
        console.log("a is 10");
        break;

    default:
        console.log("Not a valid case");
}
</pre></code>

- switch case matching **strict comparison (===) जैसा behavior** करती है।

इसलिए:

<code><pre>
let a = "10";

switch (a) {
    case 10:
        console.log("Matched");
        break;

    default:
        console.log("Not matched");
}
</pre></code>

Output: `Not matched`

## Function क्या है?

- Function एक reusable block of code है, जो generally तभी execute होता है जब हम उसे call करते हैं।

<code><pre>
function hello() {
    console.log("Hello");
}

hello();
</pre></code>

## Parameters और Arguments

<code><pre>
function hello(value) {
    console.log("Hello " + value);
}

hello("Mango");
</pre></code>

यहाँ:

- value → **parameter**
- "Mango" → **argument**

## Function Expression

- Function को variable में भी store कर सकते हैं:

<code><pre>
const hello = function(value) {
    console.log("Hello " + value);
};

hello("Mango");
</pre></code>

- इसे function expression कहते हैं।

- यहाँ generally `const` अच्छा choice है, अगर function variable को बाद में reassign नहीं करना है।

## Arrow Function ⭐

- ES6 में arrow functions आए:

<code><pre>
const hello = (value) => {
    console.log("Hello " + value);
};

hello("Tom");
</pre></code>

## एक और बहुत जरूरी concept: return

<code><pre>
function add(a, b) {
    return a + b;
}

let result = add(10, 20);

console.log(result); // 30
</pre></code>
