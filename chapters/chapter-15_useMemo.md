# React `useMemo` --- Memoization और Performance Optimization

## 1. `useMemo` क्या है?

- **`useMemo`** React का एक Hook है जिसका उपयोग किसी **expensive calculation के result को memoize (याद) करके रखने** के लिए किया जाता है।

**इसका मुख्य उद्देश्य है:**

- अगर dependencies नहीं बदली हैं, तो calculation को दोबारा करने के बजाय पहले से stored result का उपयोग करना।

**Basic syntax:**

``` jsx
const result = useMemo(() => {
  return expensiveCalculation();
}, [dependencies]);
```

------------------------------------------------------------------------

## 2. Memoization क्या है?

**Memoization का मतलब है:**

-  किसी calculation के result को memory में store करके रखना, ताकि future में
- same calculation की जरूरत पड़ने पर उसे दोबारा calculate न करना पड़े।

**Example:**

``` jsx
const result = useMemo(() => {
  return num * 100;
}, [num]);
```

- अगर **`num`** नहीं बदला है, तो React calculation दोबारा नहीं करेगा और previous result इस्तेमाल करेगा।

**Flow:**

``` text
पहली बार
   ↓
Calculation
   ↓
Result memory में store

num नहीं बदला
   ↓
Previous result इस्तेमाल

num बदल गया
   ↓
Calculation दोबारा
   ↓
New result memory में store
```

------------------------------------------------------------------------

## 3. `useMemo` का Basic Example

``` jsx
import { useMemo, useState } from "react";

function App() {
  const [num, setNum] = useState(0);

  const result = useMemo(() => {
    console.log("Calculation running...");

    return num * 100;
  }, [num]);

  return (
    <>
      <button onClick={() => setNum(num + 1)}>
        {num}
      </button>

      <p>Result: {result}</p>
    </>
  );
}

export default App;
```

**यहाँ:**

``` jsx
[num]
```

dependency है।

- जब **`num`** बदलेगा:

``` text
num change
   ↓
useMemo calculation फिर चलेगी
   ↓
new result
```

- अगर **`num`** नहीं बदला:

``` text
useMemo calculation नहीं चलेगी
   ↓
previous result इस्तेमाल होगा
```

------------------------------------------------------------------------

## 4. Empty Dependency Array `[]`

**अगर हम लिखते हैं:**

``` jsx
const result = useMemo(() => {
  return expensiveCalculation();
}, []);
```

- तो calculation initial render पर होती है और उसके बाद dependencies नहीं बदल
सकतीं क्योंकि dependency array खाली है।

**Conceptually:**

``` text
Initial render
     ↓
Calculation
     ↓
Result store

App re-render
     ↓
Calculation नहीं
     ↓
Previous result
```

**Important**

- **`useMemo(..., [])`** का यह मतलब **नहीं** है कि पूरा component दोबारा render
नहीं होगा।

- यह केवल उस memoized calculation के result को reuse करता है।

------------------------------------------------------------------------

## 5. `[num]` Dependency

``` jsx
const result = useMemo(() => {
  return expensiveCalculation(num);
}, [num]);
```

- अब calculation केवल तब दोबारा होगी जब **`num`** बदलेगा।

``` text
num नहीं बदला
     ↓
Previous result

num बदला
     ↓
Calculation दोबारा
     ↓
New result
```

------------------------------------------------------------------------

## 6. Multiple Dependencies

- अगर calculation **`name`** और **`num`** दोनों पर depend करती है:

``` jsx
const result = useMemo(() => {
  return expensiveCalculation(name, num);
}, [name, num]);
```

**अब:**

``` text
name बदला → calculation दोबारा
num बदला  → calculation दोबारा
दोनों नहीं बदले → previous result
```

------------------------------------------------------------------------

## 7. `useMemo` और `useEffect` में Difference

दोनों के syntax में dependency array दिख सकता है, लेकिन दोनों का काम अलग है।

**`useEffect`**

``` jsx
useEffect(() => {
  console.log("Something changed");
}, [num]);
```

**इसका उद्देश्य है:**

- Dependency बदलने के बाद कोई **side effect / काम execute करना**।

**Examples:**

-   API call
-   Event listener
-   Timer
-   DOM-related side effect
-   Logging

------------------------------------------------------------------------

## `useMemo`

``` jsx
const result = useMemo(() => {
  return expensiveCalculation(num);
}, [num]);
```

**इसका उद्देश्य है:**

- Calculation के **result को memoize करना**।

------------------------------------------------------------------------

## Easy Rule

``` text
useEffect → कुछ DO करना है

useMemo   → Calculation का RESULT याद रखना है
```

------------------------------------------------------------------------

## 8. Important Correction: `useMemo` Component को Control नहीं करता

- किसी component को unnecessarily re-render होने से रोकने के लिए **`useMemo`** और
**`React.memo()`** को अलग-अलग समझना जरूरी है।

**अगर आपके पास:**

``` jsx
function Random() {
  console.log("Random rendered");

  return <div>Random</div>;
}
```

- और parent component re-render होता है:

``` text
App re-render
     ↓
<Random />
     ↓
Random भी render हो सकता है
```

- **`useMemo`** का primary purpose component rendering को control करना नहीं है।

------------------------------------------------------------------------

## 9. Component Re-render रोकने के लिए `React.memo()`

- अगर हमारा उद्देश्य child component को unnecessary re-render से बचाना है, तो
**`React.memo()`** इस्तेमाल किया जा सकता है।

``` jsx
import React from "react";

const Random = React.memo(function Random() {
  console.log("Random rendered");

  return <div>Random</div>;
});

export default Random;
```

- अब अगर parent component re-render होता है और **`Random`** को मिलने वाले props same हैं:

``` text
App re-render
      ↓
Random के props check
      ↓
Props same
      ↓
React.memo
      ↓
Random का unnecessary re-render skip
```

------------------------------------------------------------------------

## 10. `useMemo`, `React.memo` और `useEffect`

**इन तीनों को इस तरह याद रखें:**

  API              मुख्य काम
  ---------------- --------------------------------------------
  `useMemo()`      Calculation के result को memoize करना
  `React.memo()`   Component को unnecessary re-render से बचाना
  `useEffect()`    Side effect execute करना

## One-line Summary

``` text
useMemo
→ "इस calculation का result याद रखो।"

React.memo
→ "इस component को unnecessarily दोबारा render मत करो।"

useEffect
→ "Render के बाद यह काम करो।"
```

------------------------------------------------------------------------

## 11. Real-world Example

**मान लीजिए हमारे पास बहुत बड़ा array है:**

``` jsx
const products = [
  // हजारों products
];
```

**और हमें filter करना है:**

``` jsx
const filteredProducts = products.filter((product) => {
  return product.price > 1000;
});
```

- अगर component बार-बार render हो रहा है, तो filtering बार-बार हो सकती है।

**ऐसे case में:**

``` jsx
const filteredProducts = useMemo(() => {
  return products.filter((product) => {
    return product.price > 1000;
  });
}, [products]);
```

- अब जब **`products`** नहीं बदले हैं, तो filtering का result reuse किया जा सकता है।

------------------------------------------------------------------------

## 12. `useMemo` कब इस्तेमाल करें?

**`useMemo` मुख्य रूप से तब useful है जब:**

-   Calculation expensive हो
-   Large array पर filtering/sorting हो
-   Complex data transformation हो
-   Derived data बार-बार calculate हो रहा हो
-   Performance optimization की वास्तविक जरूरत हो

------------------------------------------------------------------------

## 13. हर जगह `useMemo` क्यों नहीं लगाना चाहिए?

- हर छोटी calculation के लिए **`useMemo`** लगाने की जरूरत नहीं है।

**Example:**

``` jsx
const total = price + tax;
```

- इसके लिए आम तौर पर **`useMemo`** की जरूरत नहीं है। बेकार में:

``` jsx
const total = useMemo(() => {
  return price + tax;
}, [price, tax]);
```

- लगाने से code unnecessarily complex हो सकता है।

## Rule

- पहले problem identify करें, फिर performance optimization करें।

------------------------------------------------------------------------

## 14. Final Mental Model

``` text
                 React Rendering
                       |
          +------------+------------+
          |            |            |
       useMemo      React.memo   useEffect
          |            |            |
          ↓            ↓            ↓
   Calculation      Component     Side Effect
      Result          Render
       याद             Control
      रखना
```

## सबसे जरूरी बात

**`useMemo` का primary purpose:**

- **Expensive calculation के result को memoize करना।**

- **`React.memo()` का primary purpose:**

- **Props same होने पर unnecessary child component re-render को avoid करना।**

**`useEffect()` का primary purpose:**

- **Render के बाद side effects perform करना।**
