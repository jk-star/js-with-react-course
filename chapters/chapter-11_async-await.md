# Chapter 11 synchronous, asynchronous
## synchronous, asynchronous

## 1. Synchronous = लाइन से काम

- मान लो आप restaurant में गए।

**आपने कहा:**

- पहले पानी दो।
- पानी मिला → अब खाना दो।
- खाना मिला → अब bill दो।

**यानी:**

<code><pre>
काम 1
 ↓
काम 2
 ↓
काम 3
</pre></code>

**JavaScript में:**

<code><pre>
console.log("A");
console.log("B");
console.log("C");
</pre></code>

**Output:**

<code><pre>
A
B
C
</pre></code>

## 2. Asynchronous = काम शुरू करो, result बाद में आएगा

- अब आपने restaurant में खाना order किया।
- Kitchen को खाना बनाने में 20 मिनट लगेंगे।
- क्या waiter वहीं खड़ा रहेगा और बाकी कोई काम नहीं करेगा?
- नहीं। वह order दे देता है और दूसरे काम करने लगता है।

<code><pre>
Order दिया
   ↓
Kitchen में खाना बन रहा है
   ↓
Waiter दूसरे काम कर रहा है
   ↓
खाना तैयार
   ↓
Result मिला
</pre></code>

- यही asynchronous concept है।

## 3. API इसी तरह asynchronous होती है

- React से आपने backend को पूछा: "मुझे users का data दो।"
- `fetch("/users");`
- Backend को response देने में 2 seconds लग सकते हैं।
- इसलिए JavaScript उस response का इंतजार करते हुए बाकी काम कर सकती है।

## 4. Promise क्या है?
- Promise = future में मिलने वाले result का promise.
- जब आपने: `fetch("/users");`
- किया, तो users का data उसी moment नहीं मिला।
- आपको एक Promise मिला:
<code><pre>
fetch()
  ↓
Promise
  ↓
अभी pending
  ↓
कुछ समय बाद
  ↓
Data / Error
</pre></code>

## 5. await क्या करता है?

- अब आप बोलते हो: "मुझे इस API का result चाहिए। Result आने के बाद ही इस function में आगे बढ़ना।"
- **`const response = await fetch("/users");`**

- मतलब: इस function के अंदर यहाँ रुक जाओ जब तक response नहीं आता। 
- फिर: **`console.log(response);`** चलेगा।

**Important:**

- पूरी JavaScript नहीं रुकती। सिर्फ उस async function का आगे का हिस्सा wait करता है।

## 6. `async` क्यों लगाते हैं?

- अगर आप **`await`** इस्तेमाल करना चाहते हैं, तो function को **`async`** बनाते हैं:

<code><pre>
async function getUsers() {

    const response = await fetch("/users");

    console.log(response);
}
</pre></code>

बस अभी इतना याद रखें:

<code><pre>
async → इस function में asynchronous काम हो सकता है

await → इस Promise का result आने तक इस function में आगे मत बढ़ो
</pre></code>

| Concept      | Simple meaning                         |
| ------------ | -------------------------------------- |
| Synchronous  | एक काम के बाद दूसरा                    |
| Asynchronous | काम शुरू, result बाद में               |
| Promise      | Future result                          |
| `async`      | Function asynchronous काम handle करेगा |
| `await`      | Result आने तक इस function में आगे wait |

- और **`.then()`** अभी छोड़ देते हैं। पहले **`async/await`** properly समझते हैं, फिर **`.then()`** बहुत आसानी से समझ आएगा।