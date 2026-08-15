# React `useRef` Hook

## 1. `useRef` क्या है?

- **`useRef`** React का एक Hook है जिसका उपयोग किसी DOM element का **reference** लेने या ऐसी mutable value रखने के लिए किया जाता है जिसे बदलने पर component re-render न हो।

```js
import { useRef } from "react";

const refName = useRef(null);
```

---

## 2. `useRef` से DOM Element को Reference करना

- किसी input को reference देने के लिए:

```jsx
<input ref={refName} type="text" />
```

**`अब:`**

```js
refName.current
```

- उस input DOM element को refer करेगा।

**`उदाहरण:`**

```js
console.log(refName.current);
```

- यह input element को console में दिखाएगा।

---

## 3. DOM से Value Read करना

- अगर input में user ने **`Mango`** लिखा है, तो:

```js
refName.current.value
```

- से उसकी current value मिल सकती है।

**`उदाहरण:`**

```js
const submitHandler = (e) => {
  e.preventDefault();

  console.log(refName.current.value);
};
```

- इसका फायदा यह है कि हर keypress पर state update करने की जरूरत नहीं है। Submit के समय एक साथ value पढ़ सकते हैं।

---

## 4. `useState` vs `useRef`

| **`useState`** | **`useRef`** |
|---|---|
| Value बदलने पर re-render होता है | **`.current`** बदलने पर re-render नहीं होता |
| UI को dynamically update करने के लिए useful | DOM/reference access के लिए useful |
| **`setName()`** से value update | **`refName.current`** से access |
| Controlled input बनाने में common | Uncontrolled input में useful |

---

## 5. DOM में Value Write करना

- **`useRef`** से DOM element की value को directly change भी कर सकते हैं:

```js
refName.current.value = "Apple";
```

- इससे input की value सीधे **`Apple`** हो जाएगी।

**`उदाहरण:`**

```js
const submitHandler = (e) => {
  e.preventDefault();

  refName.current.value = "Apple";
};
```

---

## 6. DOM Style Change करना

- `current` के through DOM की properties को modify कर सकते हैं।

**`उदाहरण:`**

```js
refName.current.style.color = "red";
```

- इससे input के text का color red हो जाएगा।

---

## 7. Input पर Focus करना

- **`useRef`** का बहुत common practical use है input पर focus करना।

```js
refName.current.focus();
```

**`उदाहरण:`**

```js
const submitHandler = (e) => {
  e.preventDefault();

  refName.current.focus();
};
```

- Button click करने पर input पर focus आ जाएगा।

---

## 8. `.name` और `.value` में Difference

- यह distinction बहुत important है। अगर input है:

```jsx
<input name="name" />
```

**`तो:`**

```js
refName.current.name
```

**`का result होगा:`**

```text
"name"
```

- लेकिन अगर user ने input में **`Mango`** लिखा है:

```js
refName.current.value
```

**`का result होगा:`**

```text
"Mango"
```

- इसलिए user द्वारा typed value लेने के लिए **`.value`** का इस्तेमाल करें।

**`गलत:`**

```js
setName(refName.current.name);
```

**`सही:`**

```js
setName(refName.current.value);
```

---

## 9. `defaultValue` के साथ `useRef`

- अगर हम input को **`value`** देते हैं लेकिन **`onChange`** नहीं देते, तो React warning/error दे सकता है क्योंकि input read-only हो सकता है।

- ऐसी situation में uncontrolled input के लिए:

```jsx
<input
  ref={refName}
  type="text"
  defaultValue="Tom"
/>
```

- use कर सकते हैं।

- अब user input को freely change कर सकता है और submit के समय:

```js
refName.current.value
```

से current value पढ़ सकते हैं।

---

## 10. `useRef` का Power

- **`refName.current`** से DOM element मिलने के बाद हम उस element पर कई operations कर सकते हैं:

```js
refName.current.value = "Apple";

refName.current.style.color = "red";

refName.current.focus();

refName.current.select();
```

- यानी **`useRef`** के through हम DOM element को directly access और manipulate कर सकते हैं।

---

## 11. React में Direct DOM Manipulation कब करें?

- **`useRef`** से DOM manipulation possible है, लेकिन इसका इस्तेमाल unnecessarily नहीं करना चाहिए।

- अगर application state के आधार पर UI बदलना है, तो generally `useState` बेहतर approach है।

```js
const [color, setColor] = useState("red");
```

**`और JSX:`**

```jsx
<input style={{ color }} />
```

- लेकिन जब हमें किसी DOM element पर **imperative operation** करना हो, तब **`useRef`** बहुत useful है।

**`Common examples:`**

- Input पर focus करना
- Input को select करना
- DOM value पढ़ना
- किसी DOM property को access करना
- किसी element की style या property को imperative तरीके से बदलना

---

## 12. याद रखने का आसान तरीका

- **useState → React को बताता है कि UI बदलना है।**

- **useRef → किसी value या DOM element का reference देता है।**

- सबसे important बात:

- **`useRef` की `.current` value बदलने से component re-render नहीं होता।**

- इसलिए **`useRef`** उन situations में useful है जहाँ हमें किसी value या DOM element को याद रखना/access करना है लेकिन हर change पर React को re-render कराने की जरूरत नहीं है।

---

## 13. Basic Example

```jsx
import { useRef } from "react";

function App() {
  const refName = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault();

    console.log(refName.current.value);

    refName.current.style.color = "red";
    refName.current.focus();
  };

  return (
    <>
      <h1>Tom</h1>

      <form onSubmit={submitHandler}>
        <label>Name</label>

        <input
          ref={refName}
          type="text"
          defaultValue="Tom"
        />

        <button type="submit">
          Change Name
        </button>
      </form>
    </>
  );
}

export default App;
```

## Quick Summary

1. **`useRef`** React से import होता है।
2. **`useRef(null)`** से ref create करते हैं।
3. JSX में **`ref={refName}`** देकर DOM element को attach करते हैं।
4. **`refName.current`** से DOM element मिलता है।
5. **`refName.current.value`** से input value पढ़ सकते हैं।
6. **`refName.current.value = "Apple"`** से value बदल सकते हैं।
7. **`refName.current.focus()`** से element पर focus कर सकते हैं।
8. **`.current`** बदलने पर component automatically re-render नहीं होता।
9. UI state management के लिए **`useState`** और imperative DOM operations के लिए **`useRef`** को प्राथमिकता दें।
