# React Context API — Notes

## 1. Context API क्या है?

React Context API का उपयोग किसी value/state को deeply nested child components तक पहुँचाने के लिए किया जाता है, बिना हर intermediate component में props pass किए।

**Example Structure**

```text
App
 │
 ▼
ParentComponent
 │
 ▼
ComponentA
 │
 ▼
ComponentB
```

मान लीजिए `App` में `name = "Mango"` है और यह value केवल `ComponentB` में चाहिए।

**Props से**

```text
App
 ↓ name
Parent
 ↓ name
ComponentA
 ↓ name
ComponentB
```

यह **Prop Drilling** है।

**Context API से**

```text
App
 ↓
Provider
 ↓
Parent
 ↓
ComponentA
 ↓
ComponentB → useContext()
```

अब `Parent` और `ComponentA` को `name` को forward करने की जरूरत नहीं है।

---

## 2. Context API के मुख्य Parts

Context API में मुख्यतः ये concepts होते हैं:

1. `createContext()`
2. `Provider`
3. `value`
4. `useContext()`
5. `Consumer` — पुराना तरीका

---

## 3. Context Create करना

एक अलग file बना सकते हैं:

```text
hooks/
└── NameContext.js
```

**NameContext.js**

```jsx
import { createContext } from "react";

const NameContext = createContext();

export default NameContext;
```

यहाँ `createContext()` एक Context object create करता है।

---

## 4. Provider के Through Value देना

मान लीजिए `App.js` में:

```jsx
import NameContext from "./hooks/NameContext";
import ParentComponent from "./components/ParentComponent";

function App() {
    const name = "Mango";

    return (
        <NameContext.Provider value={name}>
            <ParentComponent />
        </NameContext.Provider>
    );
}

export default App;
```

यहाँ:

```jsx
value={name}
```

के अंदर `"Mango"` Context में provide किया गया है।

अब `Provider` के अंदर आने वाले descendant components इस value को access कर सकते हैं।

---

## 5. Context Provider का Structure

```jsx
<NameContext.Provider value={name}>
    <ParentComponent />
</NameContext.Provider>
```

इसे ऐसे समझें:

```text
NameContext.Provider
        │
        ├── ParentComponent
        │       │
        │       └── ComponentA
        │               │
        │               └── ComponentB
        │
        └── ComponentC
```

इन components में Context की value access की जा सकती है।

---

## 6. पुराना तरीका — Context Consumer

Context को access करने का पुराना तरीका `Consumer` है।

```jsx
import NameContext from "../hooks/NameContext";

function ComponentB() {
    return (
        <NameContext.Consumer>
            {(value) => {
                return <h1>Hello {value}</h1>;
            }}
        </NameContext.Consumer>
    );
}

export default ComponentB;
```

यहाँ:

```jsx
{(value) => {
    return <h1>Hello {value}</h1>;
}}
```

Context की value `value` parameter में मिलती है।

**Output**

```text
Hello Mango
```

**Consumer की समस्या**

यह syntax थोड़ा verbose और confusing लग सकता है:

```jsx
<NameContext.Consumer>
    {(value) => {
        return (...);
    }}
</NameContext.Consumer>
```

इसीलिए modern React में `useContext()` ज्यादा convenient है।

---

## 7. Modern तरीका — useContext()

`useContext` React का Hook है।

```jsx
import { useContext } from "react";
import NameContext from "../hooks/NameContext";

function ComponentC() {
    const value = useContext(NameContext);

    return <h1>Hello {value}</h1>;
}

export default ComponentC;
```

यहाँ:

```js
const value = useContext(NameContext);
```

Context की value सीधे `value` variable में मिल जाती है।

अगर Provider में:

```jsx
<NameContext.Provider value="Mango">
```

तो:

```js
const value = useContext(NameContext);
```

का result होगा:

```text
Mango
```

---

## 8. Complete Example

**Folder Structure**

```text
src/
│
├── App.js
│
├── hooks/
│   └── NameContext.js
│
└── components/
    ├── ParentComponent.js
    ├── ComponentA.js
    ├── ComponentB.js
    └── ComponentC.js
```

---

## NameContext.js

```jsx
import { createContext } from "react";

const NameContext = createContext();

export default NameContext;
```

---

## App.js

```jsx
import NameContext from "./hooks/NameContext";
import ParentComponent from "./components/ParentComponent";

function App() {
    const name = "Mango";

    return (
        <NameContext.Provider value={name}>
            <ParentComponent />
        </NameContext.Provider>
    );
}

export default App;
```

---

## ParentComponent.js

```jsx
import ComponentA from "./ComponentA";

function ParentComponent() {
    return <ComponentA />;
}

export default ParentComponent;
```

---

## ComponentA.js

```jsx
import ComponentB from "./ComponentB";
import ComponentC from "./ComponentC";

function ComponentA() {
    return (
        <>
            <ComponentB />
            <ComponentC />
        </>
    );
}

export default ComponentA;
```

---

## ComponentB.js — useContext()

```jsx
import { useContext } from "react";
import NameContext from "../hooks/NameContext";

function ComponentB() {
    const value = useContext(NameContext);

    return <h1>Hello Component B: {value}</h1>;
}

export default ComponentB;
```

---

## ComponentC.js — useContext()

```jsx
import { useContext } from "react";
import NameContext from "../hooks/NameContext";

function ComponentC() {
    const value = useContext(NameContext);

    return <h1>Hello Component C: {value}</h1>;
}

export default ComponentC;
```

**Output**

```text
Hello Component B: Mango
Hello Component C: Mango
```

ध्यान दें कि `ParentComponent` और `ComponentA` ने `name` को props के रूप में receive या forward नहीं किया।

---

## 9. Context में Object भी Pass कर सकते हैं

Context की `value` केवल string नहीं होती।

आप object भी भेज सकते हैं:

```jsx
<NameContext.Provider
    value={{
        name: "Mango",
        age: 25,
        city: "Lucknow"
    }}
>
    <ParentComponent />
</NameContext.Provider>
```

अब Component में:

```jsx
const data = useContext(NameContext);

console.log(data.name);
console.log(data.age);
console.log(data.city);
```

**Output:**

```text
Mango
25
Lucknow
```

---

## 10. Multiple Values Pass करना

Object के अंदर multiple values भी भेज सकते हैं:

```jsx
const user = {
    name: "Mango",
    age: 25,
    isLoggedIn: true
};

<NameContext.Provider value={user}>
    <ParentComponent />
</NameContext.Provider>
```

फिर:

```jsx
const user = useContext(NameContext);

return (
    <>
        <h1>{user.name}</h1>
        <p>{user.age}</p>
        <p>{user.isLoggedIn ? "Logged In" : "Logged Out"}</p>
    </>
);
```

---

## 11. Context API कब इस्तेमाल करें?

Context API का common use case है जब कोई shared value component subtree में कई जगह चाहिए और उसे बार-बार props के through pass करना inconvenient हो।

**Common Examples**

- Theme
- Dark/Light Mode
- Logged-in User
- Authentication Information
- Language
- User Preferences
- App Settings
- Shared UI State

---

## 12. Context API और Prop Drilling

**Prop Drilling**

```text
App
 │
 │ name
 ▼
Parent
 │
 │ name
 ▼
ComponentA
 │
 │ name
 ▼
ComponentB
```

Intermediate components को value की जरूरत नहीं है, फिर भी उन्हें props receive और forward करने पड़ते हैं।

**Context API**

```text
App
 │
 ▼
Provider
 │
 ▼
Parent
 │
 ▼
ComponentA
 │
 ▼
ComponentB
      │
      └── useContext()
```

ComponentB सीधे Context से value ले सकता है।

---

## 13. Context API की Important बात

Context API का मतलब यह नहीं है कि **हर global या complex state के लिए Context API ही इस्तेमाल करनी चाहिए।**

Context API shared values को component tree में उपलब्ध कराने के लिए useful है।

अगर application बहुत बड़ा है और state management काफी complex है, तो Redux जैसे dedicated state-management solutions उपयोगी हो सकते हैं।

एक practical approach:

```text
Simple local state
        ↓
useState

Complex state inside one component/subtree
        ↓
useReducer

Shared value / avoid prop drilling
        ↓
Context API

Large/complex global state management
        ↓
Redux / other state-management solution
```

---

## 14. Context API का Core Flow

याद रखने का सबसे आसान तरीका:

```text
createContext()
      ↓
Provider
      ↓
value
      ↓
useContext()
      ↓
Component में value
```

**One-line Definition**

> **Context API React में data/value को component tree के अंदर deeply nested components तक बिना बार-बार props pass किए पहुँचाने का तरीका है।**

---

## 15. Interview के लिए Important Questions

**Q1. Context API क्या है?**

React Context API component tree के अंदर shared data को बिना prop drilling के provide और consume करने का तरीका है।

**Q2. `createContext()` क्या करता है?**

एक Context object create करता है।

**Q3. Provider क्या करता है?**

Provider Context की value अपने descendant components को उपलब्ध कराता है।

**Q4. `value` prop क्यों होता है?**

जिस data को Context के through share करना है उसे `value` में pass करते हैं।

**Q5. `useContext()` क्या करता है?**

किसी Context की current value को component के अंदर access करने देता है।

**Q6. Context Consumer क्या है?**

Context की value consume करने का पुराना तरीका है।

**Q7. `useContext()` और Consumer में क्या difference है?**

`useContext()` Hook-based और generally cleaner syntax है, जबकि Consumer render-prop/function pattern का उपयोग करता है।

**Q8. Context API किस problem को solve करती है?**

मुख्यतः **Prop Drilling** को।

**Q9. क्या Context में object pass कर सकते हैं?**

हाँ।

```jsx
<NameContext.Provider value={{ name, age }}>
```

**Q10. क्या Context API Redux का replacement है?**

हर situation में नहीं। Context shared values के लिए useful है, जबकि Redux बड़े और complex state-management scenarios में अधिक structured solution दे सकता है।

---

## 16. Quick Revision

```text
createContext()
    ↓
Context बनाया

Provider
    ↓
Context को component tree में provide किया

value
    ↓
Share किया जाने वाला data

useContext()
    ↓
Child/descendant component में data access किया

Consumer
    ↓
पुराना तरीका
```

## सबसे जरूरी बात

अगर आपको:

```text
App → Parent → A → B
```

में सिर्फ `B` को data देना है और बीच के components को उस data की जरूरत नहीं है, तो बार-बार props pass करने के बजाय Context API useful हो सकती है।

**Context API = Shared Data + No Prop Drilling**


## 🟢 Level 1 — Basic Context
**Q1. Username Context**

एक NameContext बनाइए।

```text
App.js में name = "Jyoti" बनाइए।
NameContext.Provider से इसे provide करें।
ComponentB में useContext() से name प्राप्त करें।
Output करें:
Hello Jyoti

Goal: createContext → Provider → useContext
```

**Q2. Prop Drilling हटाइए**

Structure बनाइए:

```text
App
 ↓
Parent
 ↓
ComponentA
 ↓
ComponentB
```

**App में: `const username = "Jyoti";` ** 

पहले props के द्वारा ComponentB तक username पहुँचाइए।

फिर उसी application को Context API से बनाइए।

👉 Compare करें कि दोनों approaches में क्या difference है।

**Q3. Consumer से Data प्राप्त करें**

एक Context बनाइए: `ThemeContext`

Provider में value दें: `"Dark"`

फिर ComponentB में Consumer का इस्तेमाल करके output करें: `Current Theme: Dark`

Goal: पुराने Consumer syntax को समझना।

## 🟡 Level 2 — Multiple Values
**Q4. User Object Context**

Context में पूरा object provide करें:

```js
{
    name: "Jyoti",
    age: 28,
    city: "Lucknow"
}
```

ComponentB में useContext() से object प्राप्त करके दिखाएँ:

```text
Name: Jyoti
Age: 28
City: Lucknow
```

Challenge: Props का बिल्कुल इस्तेमाल नहीं करना है।

**Q5. Theme Context**

एक ThemeContext बनाइए।

दो possible values रखें:

```text
"light"
"dark"
```

App से theme provide करें।

ComponentB में theme पढ़कर:

Current Theme: Dark

दिखाएँ।

Bonus: Dark होने पर background और text का style भी बदलें।

**Q6. Language Context**

एक LanguageContext बनाइए।

```text
Languages:

English
Hindi
```

अगर language "English" है:

Hello, Welcome!

अगर "Hindi" है:

नमस्ते, स्वागत है!

ComponentB में Context के द्वारा language प्राप्त करें।


## 🔴 Level 4 — Real-world Problems
**Q10. Shopping Cart Context 🛒**

एक CartContext बनाइए।

Products:

```js
[
    { id: 1, name: "Apple", price: 100 },
    { id: 2, name: "Mango", price: 80 },
    { id: 3, name: "Banana", price: 50 }
]
```

Context में cart state रखें।

```js
Functions:

addToCart()
removeFromCart()
clearCart()
```

```text
Structure:

App
 ├── ProductList
 │      └── Product
 │
 └── Cart
```

Product को addToCart() चाहिए।

Cart को cart items चाहिए।

Props के बिना Context API से implement करें।