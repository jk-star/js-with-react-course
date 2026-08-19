# React Performance Optimization — memo, useCallback & useMemo

## 1. React में Performance Optimization

- React application में जब Parent component re-render होता है, तो उसके Child components भी सामान्यतः re-render हो सकते हैं।

छोटी application में इसका असर दिखाई नहीं देता, लेकिन अगर Child component में:**

- Complex UI हो
- Expensive calculation हो
- Data fetching हो
- Heavy rendering हो

तो unnecessary re-render performance को प्रभावित कर सकता है।

React में इस problem को solve करने के लिए तीन important concepts हैं:

1. `React.memo()`
2. `useCallback()`
3. `useMemo()`

---

## 2. Example Application

मान लेते हैं हमारे पास:

- `name` state
- `num` state
- `changeName()` function
- `changeNumber()` function
- एक `Child` component

है।

```jsx
const [name, setName] = useState("John");
const [num, setNum] = useState(0);

const changeName = () => {
    setName(name + "k");
};

const changeNumber = () => {
    setNum(num + 1);
};
```

Child को हम props भेजते हैं:

```jsx
<Child
    num={num}
    changeNumber={changeNumber}
/>
```

---

## 3. Problem — Unnecessary Child Re-render

जब `name` change होता है:

```text
name change
    ↓
Parent re-render
    ↓
Child भी re-render
```

लेकिन Child में `name` का कोई उपयोग नहीं है।

Child को केवल `num` और `changeNumber` चाहिए।

इसलिए ideal behavior यह होना चाहिए:

```text
name change
    ↓
Parent re-render
    ↓
Child के relevant props same
    ↓
Child re-render नहीं होना चाहिए
```

---

## 4. React.memo()

`React.memo()` component को unnecessary re-render से बचाने के लिए इस्तेमाल किया जाता है।

Import:

```jsx
import { memo } from "react";
```

Child component:

```jsx
const Child = memo((props) => {
    console.log("Child rendered");

    return (
        <>
            <h2>{props.num}</h2>
            <button onClick={props.changeNumber}>
                Increment Number
            </button>
        </>
    );
});
```

अब React Child के props को compare करेगा।

अगर props में कोई बदलाव नहीं हुआ, तो Child का unnecessary re-render skip किया जा सकता है।

---

## 5. Shallow Comparison

`React.memo()` props की shallow comparison करता है।

मान लीजिए:

```jsx
<Child
    num={num}
    changeNumber={changeNumber}
/>
```

यहाँ:

- `num` एक primitive value है।
- `changeNumber` एक function है।

Primitive value:

```text
10 === 10
→ true
```

लेकिन function के साथ reference important होता है।

```js
const functionA = () => {};
const functionB = () => {};

console.log(functionA === functionB);
```

Result:

```text
false
```

भले दोनों functions का code same हो।

---

## 6. Function Reference की Problem

Parent component के प्रत्येक render पर function का नया reference बन सकता है।

Conceptually:

```text
पहला render
    ↓
changeNumber → Function A

name change
    ↓
Parent re-render

दूसरा render
    ↓
changeNumber → Function B
```

भले function का काम same है:

```text
Function A ≠ Function B
```

इसलिए:

```text
React.memo()
    ↓
Props comparison
    ↓
changeNumber reference अलग
    ↓
Props changed माना गया
    ↓
Child re-render
```

यही problem `useCallback()` solve करने में मदद करता है।

---

## 7. useCallback()

`useCallback()` function reference को memoize करता है।

Syntax:

```jsx
const memoizedFunction = useCallback(() => {
    // operation
}, [dependencies]);
```

Example:

```jsx
const changeNumber = useCallback(() => {
    setNum(num + 1);
}, [num]);
```

अब React dependency के आधार पर function reference को reuse कर सकता है।

---

## 8. useCallback कैसे काम करता है?

अगर `name` change होता है:

```text
name change
    ↓
Parent re-render
    ↓
num नहीं बदला
    ↓
useCallback का dependency [num] same
    ↓
same function reference
```

और `React.memo()` के कारण Child unnecessary render से बच सकता है।

लेकिन अगर `num` change होता है:

```text
num change
    ↓
[num] dependency change
    ↓
changeNumber का नया reference
    ↓
Child re-render
```

यह expected behavior है क्योंकि Child को नया `num` भी मिल रहा है।

---

## 9. Important Correction

`useCallback()` का मतलब यह नहीं है कि function हमेशा सिर्फ एक बार load होगा।

इसका सही मतलब है:

> जब तक dependencies नहीं बदलतीं, React memoized function reference को reuse कर सकता है।

Example:

```jsx
const changeNumber = useCallback(() => {
    setNum(num + 1);
}, [num]);
```

यहाँ `[num]` dependency है।

इसलिए:

```text
num same
→ same function reference

num changed
→ new function reference
```

---

## 10. useMemo()

`useMemo()` भी memoization करता है, लेकिन इसका purpose calculated value/result को memoize करना है।

Syntax:

```jsx
const value = useMemo(() => {
    return calculation;
}, [dependencies]);
```

Example:

```jsx
const result = useMemo(() => {
    return expensiveCalculation(num);
}, [num]);
```

यहाँ calculation का result memoize होता है।

---

## 11. Expensive Calculation Example

मान लेते हैं हमारे पास बहुत बड़ा loop है:

```jsx
const result = useMemo(() => {
    let counter = 0;

    for (let i = 0; i < 100000000; i++) {
        counter++;
    }

    return counter;
}, []);
```

यह calculation expensive है।

अगर `useMemo()` नहीं होगा, तो Parent component के हर render पर calculation दोबारा चल सकती है।

```text
name change
    ↓
Parent re-render
    ↓
Expensive loop
    ↓
Calculation again
```

इससे application slow हो सकती है।

---

## 12. useMemo से Optimization

```jsx
const result = useMemo(() => {
    let counter = 0;

    for (let i = 0; i < 100000000; i++) {
        counter++;
    }

    return counter;
}, []);
```

पहली बार:

```text
Component render
    ↓
Expensive calculation
    ↓
Result memoized
```

फिर unrelated state change:

```text
name change
    ↓
Component re-render
    ↓
Dependencies नहीं बदलीं
    ↓
Cached result reuse
```

इससे expensive calculation दोबारा करने की जरूरत नहीं पड़ती।

---

## 13. useMemo में Dependencies

अगर calculation `num` पर depend करती है:

```jsx
const result = useMemo(() => {
    return expensiveCalculation(num);
}, [num]);
```

अब:

```text
name change
    ↓
num same
    ↓
Cached result


num change
    ↓
Dependency changed
    ↓
Calculation again
    ↓
New result memoized
```

इसलिए dependencies बहुत important हैं।

---

## 14. useCallback vs useMemo

सबसे important difference:

| Feature | React.memo | useCallback | useMemo |
|---|---|---|---|
| क्या memoize करता है? | Component rendering | Function reference | Calculated value |
| Main purpose | Unnecessary child render रोकना | Function reference stable रखना | Expensive calculation बचाना |
| Output | Memoized component behavior | Function | Value |
| Common use | Child component | Function prop | Expensive calculation |

याद रखने का आसान तरीका:

```text
React.memo
    ↓
Component को memoize करो


useCallback
    ↓
Function को memoize करो


useMemo
    ↓
Value / result को memoize करो
```

---

## 15. React.memo + useCallback का Combination

जब function Child को prop के रूप में भेजना हो, तब दोनों साथ उपयोगी हो सकते हैं।

```jsx
const changeNumber = useCallback(() => {
    setNum(num + 1);
}, [num]);
```

और:

```jsx
const Child = memo((props) => {
    return (
        <>
            <h2>{props.num}</h2>

            <button onClick={props.changeNumber}>
                Increment Number
            </button>
        </>
    );
});
```

Parent:

```jsx
<Child
    num={num}
    changeNumber={changeNumber}
/>
```

अब:

```text
Name Change
    ↓
Parent re-render
    ↓
num same
    ↓
changeNumber reference same
    ↓
Child render skip
```

लेकिन:

```text
Number Change
    ↓
num changed
    ↓
Child को नया num
    ↓
Child re-render
```

---

## 16. React.memo और Child State

एक important बात:

`React.memo()` Child की अपनी state changes को नहीं रोकता।

Example:

```jsx
const Child = memo(() => {
    const [count, setCount] = useState(0);

    return (
        <button onClick={() => setCount(count + 1)}>
            {count}
        </button>
    );
});
```

अगर Child की अपनी state change होती है:

```text
Child state change
    ↓
Child re-render
```

`React.memo()` इसे रोकने के लिए नहीं है।

इसलिए `React.memo()` को mainly **parent से आने वाले props के आधार पर unnecessary rendering को skip करने** के लिए समझें।

---

## 17. Three Concepts — Complete Flow

```text
                React Performance
                       │
        ┌──────────────┼──────────────┐
        ↓              ↓              ↓
   React.memo     useCallback      useMemo
        │              │              │
        ↓              ↓              ↓
   Component        Function       Value/Result
   optimization     optimization   optimization
        │              │              │
        ↓              ↓              ↓
   Props compare    Reference      Calculation
                    stable         cache
```

---

## 18. Practical Example

```jsx
import { useState, useCallback, useMemo } from "react";
import { memo } from "react";

const Child = memo(({ num, changeNumber }) => {
    console.log("Child rendered");

    return (
        <div>
            <h2>Child Number: {num}</h2>

            <button onClick={changeNumber}>
                Increment Number
            </button>
        </div>
    );
});

function App() {
    const [name, setName] = useState("John");
    const [num, setNum] = useState(0);

    const changeName = () => {
        setName(name + "k");
    };

    const changeNumber = useCallback(() => {
        setNum(num + 1);
    }, [num]);

    const expensiveResult = useMemo(() => {
        let counter = 0;

        for (let i = 0; i < 10000000; i++) {
            counter++;
        }

        return counter;
    }, []);

    return (
        <div>
            <h1>{name}</h1>

            <button onClick={changeName}>
                Change Name
            </button>

            <h2>Number: {num}</h2>

            <button onClick={changeNumber}>
                Increment Number
            </button>

            <h3>Expensive Result: {expensiveResult}</h3>

            <Child
                num={num}
                changeNumber={changeNumber}
            />
        </div>
    );
}

export default App;
```

---

## 19. कब क्या Use करें?

## `React.memo()`

जब:

- Child component बार-बार unnecessary render हो रहा हो।
- Child के props frequently change नहीं होते।
- Component expensive है।

---

## `useCallback()`

जब:

- Function को Child को prop के रूप में भेज रहे हों।
- Child `React.memo()` से wrapped हो।
- Function reference के बदलने से unnecessary render हो रहा हो।

---

## `useMemo()`

जब:

- कोई calculation expensive हो।
- Calculation बार-बार unnecessary execute हो रही हो।
- Calculation कुछ specific dependencies पर depend करती हो।

---

## 20. Important Warning

हर component पर:

```jsx
memo()
```

हर function पर:

```jsx
useCallback()
```

और हर calculation पर:

```jsx
useMemo()
```

लगाना सही नहीं है।

Memoization की भी अपनी cost होती है।

इसलिए optimization का सही approach:

```text
पहले Performance Problem identify करो
             ↓
फिर unnecessary render/calculation check करो
             ↓
फिर React.memo / useCallback / useMemo लगाओ
             ↓
फिर performance दोबारा measure करो
```

---

## 21. Interview में कैसे Explain करें?

## React.memo

> `React.memo` is used to prevent unnecessary re-rendering of a functional component when its props have not changed.

## useCallback

> `useCallback` memoizes a function reference so that the same function reference can be reused until its dependencies change.

## useMemo

> `useMemo` memoizes the result of a calculation so that an expensive calculation does not need to run again when its dependencies have not changed.

---

## 22. One-Line Revision

```text
React.memo  → Component optimization
useCallback → Function reference optimization
useMemo     → Calculated value optimization
```

## सबसे आसान याद रखने का तरीका

**memo = Component**

**useCallback = Function**

**useMemo = Value**


## 🟢 Level 1 — React.memo Basics
**Q1. Child Re-render Observe करो**

```text
एक App component बनाओ जिसमें:

name state हो
count state हो
Change Name button हो
Increment Count button हो
Child component हो

Child में: `console.log("Child Rendered");` लगाओ।
```

Task

```text
Page reload करो।
Change Name click करो।
Increment Count click करो।
Console observe करो।

**Question:**

Name बदलने पर Child क्यों re-render हो रहा है?
```

**Q2. React.memo() लगाओ**

ऊपर वाले same application में: `React.memo()` का use करो।

**Task**

Expected behavior:

```text
Page Load
→ Child Render

Name Change
→ Child Render नहीं होना चाहिए

Count Change
→ Child Render होना चाहिए
```

**Question:**
`React.memo()` ने कौन-सा unnecessary render रोका?

## 🟡 Level 2 — Shallow Comparison
Q3. Primitive Props

Child को ये props भेजो:

<Child
    name={name}
    count={count}
/>

Child को React.memo() से wrap करो।

Task

Check करो:

name change → Child render?
count change → Child render?

फिर explain करो कि React.memo() किस तरह props compare करता है।

**Q4. Object Prop की Problem**

अब Child को: `<Child user={{ name: "Jyoti", age: 28 }} />` पास करो।

Child को: `memo(Child)` से wrap करो।

**Task**

एक अलग count state बनाओ और उसे increment करो।

Observe करो:

```text
Count change
↓
Child क्यों render हो रहा है?
```

**Hint**: Object का reference check करो।

## 🟠 Level 3 — useCallback

अब असली challenge शुरू होता है।

**Q5. Function Prop Problem**

Parent:

```js
const changeNumber = () => {
    setNumber(number + 1);
};
```

Child:

`<Child changeNumber={changeNumber} />`

और Child को: `memo(Child)` से wrap करो।

**Task**

एक दूसरा state बनाओ:

`const [name, setName] = useState("");`

**अब:**

``Change Name``

करने पर Child फिर render क्यों हो रहा है?

Console से prove करो।

**Q6. useCallback() लगाओ**

ऊपर वाले question में: `useCallback()`

का use करके changeNumber को memoize करो।

**Expected:**

```text
Name Change
↓
Child render नहीं


Number Change
↓
Child render
```

**Bonus**

Dependency में पहले: `[]` लगाओ।

फिर: ``[number]`` लगाओ।

दोनों behavior compare करो।

**Question:**
`[]` और `[number]` में क्या difference आया?

![Screenshot](./image/useCallback-level3.png)

## 🔵 Level 4 — useMemo
**Q7. Expensive Calculation**

एक function बनाओ:

```js
const expensiveCalculation = () => {
    let result = 0;


    for (let i = 0; i < 100000000; i++) {
        result += i;
    }


    return result;
};
```

इसका result UI में दिखाओ।

साथ में: `const [name, setName] = useState("");`

और Change Name button बनाओ।

**Task**

Observe करो:

```text
Name Change
↓
Expensive Calculation
↓
Again execute
```

**Console में:**

```text
console.time()
console.timeEnd()
```

का use करके time check करो।

**Q8. useMemo() से Optimize करो**

अब: `useMemo()` का use करो।

**Expected:**

```text
First Render
↓
Expensive Calculation
↓
Cache Result

Name Change
↓
Cached Result
↓
Calculation दोबारा नह
```

**Question**

useMemo() यहाँ function को memoize कर रहा है या उसके result/value को?

![Screenshot](./image/useCallback-level4.png)