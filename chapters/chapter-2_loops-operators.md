# Chapter-2 Loops Operators

- Loop = किसी `operation` को बार-बार repeat करना।
- जैसे 1 से 10 तक numbers print करने हों, तो 10 बार console.log() लिखने की जगह loop लगाएंगे।

## 1. for Loop

Syntax:

<code><pre>
for (initialization; condition; increment/decrement) {
    // code
}
</pre></code>

Example:

<code><pre>
for (let i = 0; i < 10; i++) {
    console.log(i);
}
</pre></code>

## 2. while Loop
Syntax:

<code><pre>
while (condition) {
    // code
}
</pre></code>

Example:

<code><pre>
let i = 0;

while (i < 10) {
    console.log(i);
    i++;
}
</pre></code>

## 3. do...while Loop
let i = 0;

<code><pre>
do {
    console.log(i);
    i++;
} while (i < 10);
</pre></code>

- लेकिन इसका सबसे important concept है: do...while कम से कम एक बार जरूर execute होता है।

## 4. forEach() — Array पर Loop

<code><pre>
let numbers = [22, 32, 55, 16];

numbers.forEach(function(element) {
    console.log(element);
});
</code></pre>

- यहाँ forEach() array के **हर element पर function चलाता है।**

## JavaScript Operators

- Operator मतलब ऐसा symbol जो values/variables पर कोई operation perform करता है।

## 1. Arithmetic Operators

Math calculations के लिए:

<code><pre>
let a = 10;
let b = 20;

console.log(a + b); // 30  Addition
console.log(a - b); // -10 Subtraction
console.log(a * b); // 200 Multiplication
console.log(a / b); // 0.5 Division
console.log(a % b); // 10  Remainder
</pre></code>

## 2. Comparison Operators

<code><pre>
let i = 5;
console.log(i < 10); // true
</pre></code>

Main comparison operators:

<code><pre>
>     Greater than
<     Less than
>=    Greater than or equal
<=    Less than or equal
==    Loose equality
===   Strict equality
!=    Loose inequality
!==   Strict inequality
</pre></code>

## 3. == vs ===

<code><pre>
let a = 1;
let b = "1";

console.log(a == b);  // true
console.log(a === b); // false
</pre></code>

## == — Loose Equality
- Type conversion कर सकता है और फिर values compare करता है।
`1 == "1"`

## === — Strict Equality

Value + Type दोनों same होने चाहिए।

`1 === "1"` // false

## 4. Logical Operators

<code><pre>
&&   AND
||   OR
!    NOT
</pre></code>
