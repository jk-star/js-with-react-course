# React `useReducer` Hook — Complete Notes

## 1. `useReducer` क्या होता है?

`useReducer` React का एक Hook है जिसका उपयोग **state management** के लिए किया जाता है।

React में state manage करने के लिए मुख्य रूप से:

- `useState`
- `useReducer`

का उपयोग किया जाता है।

दोनों state management के लिए हैं, लेकिन `useReducer` तब ज्यादा useful होता है जब state update करने का logic **complex** हो जाए।

> `useReducer` को केवल global state के लिए नहीं, बल्कि component के अंदर local complex state के लिए भी use किया जा सकता है।

---

## 2. `useState` और `useReducer`

**Similarity**

दोनों का उद्देश्य state को manage करना है।

**`useState`**

Simple state के लिए अच्छा है:

```js
const [count, setCount] = useState(0);
```

State update:

```js
setCount(count + 1);
```

**`useReducer`**

Complex state logic के लिए useful है:

```js
const [state, dispatch] = useReducer(reducer, initialState);
```

State update:

```js
dispatch({ type: "increment" });
```

यहाँ state कैसे बदलेगी, इसका पूरा logic `reducer` function में रखा जाता है।

---

## 3. `useReducer` का Syntax

Basic syntax:

```js
const [state, dispatch] = useReducer(
    reducer,
    initialState
);
```

इसमें मुख्य चीजें हैं:

**`state`**

Current state को represent करता है।

**`dispatch`**

State change करने के लिए action भेजता है।

**`reducer`**

यह decide करता है कि किसी action के बाद state कैसे बदलेगी।

**`initialState`**

State की initial value।

**`init`**

एक optional third argument भी हो सकता है:

```js
const [state, dispatch] = useReducer(
    reducer,
    initialArg,
    init
);
```

`init` initial state को lazily calculate/initialize करने के लिए होता है।

> `init` का उपयोग API data fetch करने के लिए नहीं होता। API fetching के लिए सामान्यतः `useEffect` आदि का उपयोग किया जाता है।

---

## 4. Simple Counter Example

मान लीजिए हमें एक counter application बनानी है।

हमारे पास तीन buttons हैं:

- Increment
- Decrement
- Reset

**Initial State**

```js
const initialState = 0;
```

---

**Reducer Function**

```js
const reducer = (state, action) => {

    switch (action) {

        case "increment":
            return state + 1;

        case "decrement":
            return state - 1;

        case "reset":
            return initialState;

        default:
            return state;
    }
};
```

यहाँ reducer को दो arguments मिलते हैं:

```js
(state, action)
```

**`state`**

उस समय की current state।

**`action`**

`dispatch()` से भेजी गई information।

---

## 5. Component में `useReducer`

सबसे पहले import:

```js
import { useReducer } from "react";
```

फिर:

```js
const [count, dispatch] = useReducer(
    reducer,
    initialState
);
```

अब `count` में current state मिलेगी और `dispatch` state change करने के लिए इस्तेमाल होगा।

Display:

```js
<h1>Counter: {count}</h1>
```

---

## 6. Dispatch कैसे काम करता है?

Increment button:

```js
<button onClick={() => dispatch("increment")}>
    Increment
</button>
```

Decrement:

```js
<button onClick={() => dispatch("decrement")}>
    Decrement
</button>
```

Reset:

```js
<button onClick={() => dispatch("reset")}>
    Reset
</button>
```

अगर:

```js
dispatch("increment");
```

तो reducer में:

```js
action = "increment";
```

अगर:

```js
dispatch("decrement");
```

तो:

```js
action = "decrement";
```

और:

```js
dispatch("reset");
```

तो:

```js
action = "reset";
```

---

## 7. पूरा Data Flow

```text
Button Click
     ↓
dispatch("increment")
     ↓
reducer(state, action)
     ↓
action = "increment"
     ↓
switch(action)
     ↓
case "increment"
     ↓
return state + 1
     ↓
नई state
     ↓
UI re-render
```

इसे short में:

```text
dispatch → action → reducer → new state → UI
```

---

## 8. `default` Case क्यों?

Reducer में:

```js
default:
    return state;
```

इसका मतलब:

अगर कोई ऐसा action आया जिसे reducer पहचान नहीं रहा है, तो current state को वैसे ही वापस कर दो।

इससे state accidentally change नहीं होगी।

---

## 9. Object State के साथ `useReducer`

Real applications में state सिर्फ एक number नहीं होती।

मान लीजिए:

```js
const initialState = {
    counter: 0
};
```

अब state का structure है:

```js
{
    counter: 0
}
```

इसलिए अब हम सीधे:

```js
state + 1
```

नहीं कर सकते।

हमें property access करनी होगी:

```js
state.counter
```

---

## 10. Object State के साथ Reducer

```js
const reducer = (state, action) => {

    switch (action.type) {

        case "increment":
            return {
                ...state,
                counter: state.counter + 1
            };

        case "decrement":
            return {
                ...state,
                counter: state.counter - 1
            };

        case "reset":
            return {
                ...state,
                counter: initialState.counter
            };

        default:
            return state;
    }
};
```

यहाँ:

```js
state.counter
```

current counter value देता है।

---

## 11. Object Action

Complex applications में action को object के रूप में भेजना ज्यादा common है।

Increment:

```js
dispatch({
    type: "increment"
});
```

Decrement:

```js
dispatch({
    type: "decrement"
});
```

Reset:

```js
dispatch({
    type: "reset"
});
```

अब reducer में पूरा object `action` के अंदर आएगा।

उदाहरण:

```js
dispatch({
    type: "increment"
});
```

Reducer में:

```js
action = {
    type: "increment"
};
```

इसलिए हम लिखते हैं:

```js
action.type
```

---

## 12. Object Action का Flow

```text
dispatch({
    type: "increment"
})
        ↓
action
        ↓
action.type
        ↓
"increment"
        ↓
switch(action.type)
        ↓
case "increment"
        ↓
state.counter + 1
```

---

## 13. Spread Operator क्यों लगाया?

जब state object हो:

```js
{
    counter: 0,
    name: "Jyoti",
    status: true
}
```

और हमें केवल counter change करना हो, तो:

```js
return {
    ...state,
    counter: state.counter + 1
};
```

यह बाकी properties को preserve करता है।

उदाहरण:

```js
state = {
    counter: 0,
    name: "Jyoti",
    status: true
};
```

Increment के बाद:

```js
{
    counter: 1,
    name: "Jyoti",
    status: true
}
```

इसलिए object state के साथ `...state` बहुत important pattern है।

---

## 14. `useReducer` का Complete Example

```js
import { useReducer } from "react";

const initialState = {
    counter: 0
};

const reducer = (state, action) => {

    switch (action.type) {

        case "increment":
            return {
                ...state,
                counter: state.counter + 1
            };

        case "decrement":
            return {
                ...state,
                counter: state.counter - 1
            };

        case "reset":
            return {
                ...state,
                counter: initialState.counter
            };

        default:
            return state;
    }
};

function App() {

    const [state, dispatch] = useReducer(
        reducer,
        initialState
    );

    return (
        <div>

            <h1>Counter: {state.counter}</h1>

            <button
                onClick={() =>
                    dispatch({ type: "increment" })
                }
            >
                Increment
            </button>

            <button
                onClick={() =>
                    dispatch({ type: "decrement" })
                }
            >
                Decrement
            </button>

            <button
                onClick={() =>
                    dispatch({ type: "reset" })
                }
            >
                Reset
            </button>

        </div>
    );
}

export default App;
```

---

## 15. `useState` vs `useReducer`

| `useState` | `useReducer` |
|---|---|
| Simple state के लिए अच्छा | Complex state logic के लिए अच्छा |
| Direct state update | `dispatch` के through action |
| `setState()` | `dispatch()` |
| Logic component में हो सकता है | Logic reducer में organize किया जा सकता है |
| Small/simple updates | Multiple related state transitions |
| Simple values के लिए convenient | Objects/arrays और complex state transitions में useful |

---

## 16. कब `useState` इस्तेमाल करें?

अगर state simple है:

```js
const [name, setName] = useState("");
```

या:

```js
const [isOpen, setIsOpen] = useState(false);
```

या:

```js
const [count, setCount] = useState(0);
```

तो `useState` पर्याप्त है।

---

## 17. कब `useReducer` इस्तेमाल करें?

जब state logic में कई अलग-अलग actions हों:

```text
increment
decrement
reset
loading
success
error
add
remove
update
delete
```

या state object complex हो:

```js
const initialState = {
    user: null,
    loading: false,
    error: null,
    data: []
};
```

तब `useReducer` ज्यादा organized approach दे सकता है।

---

## 18. `useReducer` + `useContext`

अगर हमें state को कई components में share करना है, तो:

```text
useReducer
    +
useContext
```

का combination बहुत useful है।

Example architecture:

```text
App
 │
 ├── Context Provider
 │       │
 │       ├── state
 │       └── dispatch
 │
 ├── Component A
 │
 ├── Component B
 │
 └── Component C
```

इससे अलग-अलग components shared state और dispatch access कर सकते हैं।

---

## 19. Global State का Important Clarification

यह कहना सही नहीं है कि:

> `useReducer` हमेशा global state के लिए होता है।

सही statement:

> `useReducer` complex state logic को manage करने के लिए होता है। इसे local component state के रूप में भी इस्तेमाल किया जा सकता है और `useContext` के साथ shared/global-like state के लिए भी।

---

## 20. Redux से Relation

Redux में reducer का concept बहुत important है।

React का:

```js
useReducer()
```

और Redux:

```text
action
   ↓
reducer
   ↓
state
```

जैसे concepts share करते हैं।

लेकिन:

> `useReducer` और Redux एक ही चीज़ नहीं हैं।

Redux एक अलग state management library/ecosystem है।

---

## 21. सबसे Important Mental Model

**`useState`**

```text
State
  ↓
setState()
  ↓
New State
```

**`useReducer`**

```text
State
  ↓
dispatch(action)
  ↓
Reducer
  ↓
New State
```

सबसे important line:

> **`dispatch` बताता है कि क्या हुआ, और `reducer` decide करता है कि state कैसे बदलेगी।**

---

## 22. याद रखने का आसान तरीका

```text
useReducer
│
├── state
│
├── dispatch
│
├── reducer
│
├── initialState
│
└── action
```

और पूरा flow:

```text
User Action
     ↓
dispatch()
     ↓
action
     ↓
reducer()
     ↓
new state
     ↓
component re-render
```

## Final Summary

`useReducer` React का state management Hook है।

यह खास तौर पर तब useful होता है जब:

- state complex हो
- कई actions हों
- state object/array हो
- state update logic को अलग रखना हो
- multiple components में state share करनी हो
- `useContext` के साथ centralized state pattern बनाना हो

सबसे important concepts:

```text
useReducer(reducer, initialState)

state
dispatch
action
reducer
initialState
```

और golden rule:

```text
dispatch → action → reducer → new state
```

## 🟢 Level 1 — Basic useReducer

**Q1. Counter**

एक counter app बनाइए जिसमें:

```text
Initial count = 0
Increment button
Decrement button
Reset button
```

Condition: useState का इस्तेमाल नहीं करना है, सिर्फ useReducer।

**Q2. Increment by 5**

Counter में तीन buttons बनाइए:

```text
+1
+5
Reset
```

+5 पर click करने पर count 5 से बढ़ना चाहिए।

**Hint:**

```js
dispatch({
    type: "increment",
    payload: 5
});
```

**Q3. Decrement by custom value**

एक input बनाइए: `Enter number: [ 10 ]`

`[Decrease]`

अगर user 10 enter करता है और Decrease click करता है:

`100 → 90`

होना चाहिए।

इसमें `action.payload` का इस्तेमाल करें।

## 🟢 Level 2 — Object State

**Q4. Counter + Step**

**Initial state:**

```text
{
    count: 0,
    step: 1
}
```

**UI:**

```text
Count: 0
Step: [ 1 ]


[Increment]
[Decrement]
[Reset]

```

अगर `step 5` है: `0 → 5 → 10 → 15` होना चाहिए।

**Goal:** state.count और state.step दोनों को समझना।

**Q5. User Profile**

Initial state:

```js
{
    name: "",
    age: 0,
    city: ""
}
```

तीन input बनाइए:

```text
Name
Age
City
```text

और एक button:

Update Profile

Reducer के through object update करें।

Challenge: हर property के लिए अलग action बनाइए:

```text
SET_NAME
SET_AGE
SET_CITY
```