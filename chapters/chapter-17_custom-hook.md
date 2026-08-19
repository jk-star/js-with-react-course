# React Custom Hooks

## 1. Custom Hook क्या है?

React 16.8 से Hooks आए, जिनकी मदद से हम class लिखे बिना state और React की दूसरी features का उपयोग कर सकते हैं।

React के built-in Hooks जैसे:

- `useState`
- `useEffect`
- `useRef`
- `useMemo`

के अलावा हम अपने **Custom Hooks** भी बना सकते हैं।

## Custom Hook का मुख्य उद्देश्य

अगर किसी component में कोई logic लिखा है और वही logic दूसरे components में भी चाहिए, तो उस logic को Custom Hook में निकालकर reuse किया जा सकता है।

> **Custom Hook UI को reuse नहीं करता, बल्कि logic को reuse करता है।**

---

## 2. Custom Hook की जरूरत क्यों पड़ती है?

मान लीजिए हमारे पास दो components हैं:

```text
IncrementCounter
    ↓
useState
useEffect
setInterval
+1

DecrementCounter
    ↓
useState
useEffect
setInterval
-1
```

दोनों components में लगभग पूरा logic same है। केवल operation अलग है:

- Increment → `+1`
- Decrement → `-1`

ऐसे में common logic को एक Custom Hook में रख सकते हैं।

```text
             useCounter()
                  ↓
        ┌─────────┴─────────┐
        ↓                   ↓
   Increment             Decrement
     "inc"                  "dec"
       ↓                      ↓
      +1                     -1
```

---

## 3. Custom Hook का Basic Structure

Custom Hook एक normal JavaScript function की तरह बनाया जाता है।

```js
const useCounter = () => {
    // React Hooks
    // reusable logic

    return something;
};

export default useCounter;
```

**Important**

Custom Hook का नाम `use` से शुरू होना चाहिए।

**Examples:**

```text
useCounter
useFetch
useForm
useAuth
useLocalStorage
```

---

## 4. `useCounter.js` बनाना

एक `hooks` folder बना सकते हैं:

```text
src/
│
├── components/
│
├── hooks/
│   └── useCounter.js
│
└── App.js
```

`useCounter.js` में common logic रखा जा सकता है।

```js
import { useState, useEffect } from "react";

const useCounter = (initialValue, condition) => {

    const [num, setNum] = useState(initialValue);

    useEffect(() => {

        const interval = setInterval(() => {

            setNum(prevNum =>
                condition === "inc"
                    ? prevNum + 1
                    : prevNum - 1
            );

        }, 1000);

        return () => clearInterval(interval);

    }, [condition]);

    return num;
};

export default useCounter;
```

---

## 5. Custom Hook में `useState`

Custom Hook के अंदर React के predefined Hooks इस्तेमाल कर सकते हैं।

```js
const [num, setNum] = useState(0);
```

यहाँ:

- `num` → current value
- `setNum` → value update करने वाला function
- `0` → initial value

---

## 6. Custom Hook में `useEffect`

```js
useEffect(() => {

    const interval = setInterval(() => {
        // logic
    }, 1000);

    return () => clearInterval(interval);

}, []);
```

`useEffect` के अंदर हमने `setInterval()` इस्तेमाल किया।

`1000 milliseconds = 1 second`

इसलिए हर 1 second में हमारा operation perform हो सकता है।

---

## 7. Increment Counter में Custom Hook

```js
import useCounter from "../hooks/useCounter";

const IncrementCounter = () => {

    const number = useCounter(0, "inc");

    return (
        <div>
            <h2>Increment: {number}</h2>
        </div>
    );
};

export default IncrementCounter;
```

यहाँ:

```js
useCounter(0, "inc");
```

दो values pass हुईं:

```text
0       → initial value
"inc"   → operation/condition
```

इसलिए value:

```text
0 → 1 → 2 → 3 → 4 → 5 ...
```

---

## 8. Decrement Counter में Custom Hook

```js
import useCounter from "../hooks/useCounter";

const DecrementCounter = () => {

    const number = useCounter(0, "dec");

    return (
        <div>
            <h2>Decrement: {number}</h2>
        </div>
    );
};

export default DecrementCounter;
```

यहाँ:

```js
useCounter(0, "dec");
```

`"dec"` की वजह से decrement वाला logic चलेगा।

Result:

```text
0 → -1 → -2 → -3 → -4 → -5 ...
```

---

## 9. Parameter के माध्यम से Logic Control करना

Custom Hook को parameters दिए जा सकते हैं।

```js
const useCounter = (initialValue, condition) => {
```

यहाँ:

```text
initialValue
condition
```

दो parameters हैं।

उदाहरण:

```js
useCounter(0, "inc");
```

और:

```js
useCounter(0, "dec");
```

फिर Hook के अंदर condition के हिसाब से operation decide किया जा सकता है।

```js
condition === "inc"
    ? prevNum + 1
    : prevNum - 1
```

यह ternary operator है।

इसका मतलब:

```text
अगर condition "inc" है
        ↓
     +1 करो

वरना
        ↓
     -1 करो
```

---

## 10. Custom Hook से क्या Return कर सकते हैं?

Custom Hook से कोई भी useful value return कर सकते हैं।

**केवल Value**

```js
return num;
```

फिर:

```js
const number = useCounter(0, "inc");
```

---

**Array**

```js
return [num, setNum];
```

फिर:

```js
const [number, setNumber] = useCounter();
```

---

**Object**

```js
return {
    number: num,
    setNumber
};
```

फिर:

```js
const { number, setNumber } = useCounter();
```

इसलिए Custom Hook से array या object return करना mandatory नहीं है।

---

## 11. `useState` से Connection

जब हम लिखते हैं:

```js
const [num, setNum] = useState(0);
```

तो `useState()` internally दो चीजों वाली value provide करता है:

```text
[
    currentValue,
    updateFunction
]
```

इसलिए destructuring:

```js
const [num, setNum] = useState(0);
```

इसी तरह Custom Hook भी अपनी जरूरत के अनुसार value, array या object return कर सकता है।

---

## 12. Custom Hook के अंदर दूसरे Hooks इस्तेमाल करना

यह पूरी तरह valid है:

```js
const useCounter = () => {

    const [num, setNum] = useState(0);

    useEffect(() => {
        // logic
    }, []);

    return num;
};
```

यहाँ:

```text
useCounter
    ↓
useState
useEffect
```

Custom Hook में React के दूसरे Hooks को combine करके reusable logic बनाया जा सकता है।

---

## 13. Rules of Hooks

Hooks के कुछ important rules हैं।

## Rule 1 — Hook को Top Level पर Call करें

सही:

```js
const MyComponent = () => {

    const [num, setNum] = useState(0);

    useEffect(() => {
        // logic
    }, []);

    return <h1>{num}</h1>;
};
```

गलत:

```js
if (condition) {
    useState(0);
}
```

---

## Rule 2 — Hook को Condition के अंदर नहीं रखना

गलत:

```js
if (isLoggedIn) {
    useEffect(() => {
        // logic
    }, []);
}
```

Hook को हमेशा component/custom hook के top level पर call करें।

---

## Rule 3 — Hook को Loop के अंदर नहीं रखना

गलत:

```js
for (let i = 0; i < 5; i++) {
    useState(0);
}
```

---

## Rule 4 — Hook को Nested Function के अंदर नहीं रखना

गलत:

```js
const MyComponent = () => {

    function myFunction() {
        useState(0);
    }

};
```

---

## Rule 5 — Hook को दूसरे Hook के अंदर randomly call नहीं करना

गलत:

```js
useEffect(() => {

    useState(0);

}, []);
```

लेकिन Custom Hook के top level पर दूसरे Hooks को call करना सही है:

```js
const useCounter = () => {

    const [num, setNum] = useState(0);

    useEffect(() => {
        // logic
    }, []);

    return num;
};
```

---

## 14. `use` से शुरू करना क्यों जरूरी है?

Custom Hook का नाम `use` से शुरू करने की convention है:

```text
useCounter
useFetch
useForm
useAuth
```

इससे React ecosystem और Hooks linting rules यह पहचान सकते हैं कि यह function Hook की तरह इस्तेमाल किया जा रहा है।

---

## 15. Custom Hook vs Normal Function

**Normal Function**

```js
const add = (a, b) => {
    return a + b;
};
```

यह सामान्य JavaScript function है।

**Custom Hook**

```js
const useCounter = () => {

    const [num, setNum] = useState(0);

    return num;
};
```

यह Custom Hook है क्योंकि:

- नाम `use` से शुरू है
- इसमें React Hook इस्तेमाल हो रहा है
- reusable React logic provide कर रहा है

---

## 16. DOM के बारे में Important Correction

यह कहना सही नहीं है कि:

> "हर Hook DOM में modification करता है।"

हर Hook DOM को directly manipulate नहीं करता।

**Examples:**

```text
useState  → state management
useEffect → side effects
useMemo   → memoization
useRef    → reference/value persistence
```

कुछ Hooks DOM के साथ indirectly या directly काम कर सकते हैं, लेकिन हर Hook का काम DOM manipulation नहीं है।

---

## 17. Complete Flow

Custom Hook का पूरा flow:

```text
Component
    ↓
useCounter(initialValue, condition)
    ↓
Custom Hook
    ↓
useState()
    ↓
useEffect()
    ↓
setInterval()
    ↓
condition check
    ↓
+1 या -1
    ↓
num update
    ↓
return num
    ↓
Component में display
```

---

## 18. सबसे Important Definition

> **Custom Hook एक reusable JavaScript function है जिसका नाम `use` से शुरू होता है। इसके अंदर React के built-in Hooks इस्तेमाल किए जा सकते हैं और इसका मुख्य उद्देश्य reusable logic को multiple components में share करना है।**

---

## 19. Quick Revision

| Concept | Meaning |
|---|---|
| `useState` | State manage करना |
| `useEffect` | Side effects handle करना |
| Custom Hook | Reusable logic बनाना |
| `useCounter` | हमारा Custom Hook |
| `use` prefix | Custom Hook naming convention |
| `return` | Hook से value/function/object/array देना |
| Parameters | Hook को dynamic behavior देना |
| Top Level | Hooks को यहाँ call करना चाहिए |
| `if` के अंदर Hook | ❌ |
| loop के अंदर Hook | ❌ |
| nested function में Hook | ❌ |
| Custom Hook के अंदर `useState` | ✅ |
| Custom Hook के अंदर `useEffect` | ✅ |

---

## 20. One-Line Memory Trick

**"UI reuse करने के लिए Component, Logic reuse करने के लिए Custom Hook."**


## 🟢 Level 1 — Basic Custom Hook
**Q1. useGreeting**

- एक Custom Hook useGreeting बनाइए।

**Requirements:**

```text
Hook को एक name मिले।
Hook "Hello, Jyoti" जैसी string return करे।
Component में उस returned value को <h2> में display करें।
```

**Q2. useCounter**

एक basic Custom Hook बनाइए: `const number = useCounter();`

Requirements:

```text
Initial value 0
+ button से value बढ़े
- button से value घटे
Reset button से value 0 हो जाए।

Goal: useState को component से निकालकर Custom Hook में रखना।
```

Q3. useToggle

एक Custom Hook बनाइए: `const [isOpen, toggle] = useToggle();`

Requirements:

```text
Initially → false

Click → true
Click → false
Click → true
```

इससे एक `<div>` को show/hide करें।
Practice: Custom Hook से array return करना।