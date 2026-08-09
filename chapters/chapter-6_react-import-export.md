
# Chapter 6 React

## Import / Export क्यों?
- जब एक JavaScript file की कोई चीज़—जैसे **variable, function, object या component**—दूसरी file में use करनी हो, तब `export` और `import` काम आते हैं।

**मान लीजिए structure है:**

<code><pre>
app/
├── index.js
└── components/
    └── work.js
</pre></code>

## 1. Default Export

`work.js`:

<code><pre>
const worker = {
    name: "John",
    age: 25
};

export default worker;
</pre></code>

`index.js`:

`import worker from "./components/work";`

**Default export की खास बात: import करते समय नाम बदल सकते हैं।**

`import employee from "./components/work";`

- एक module में एक ही default export हो सकता है।

## 2. Named Export

`work.js`:

<code><pre>
export const data = 32;

export const event = () => {
    console.log("Hello");
};
</pre></code>

अब `index.js` में:

`import { data, event } from "./components/work";`

यहाँ `{ }` बहुत important हैं।

- Named exports में normally वही exported names use करने होते हैं।

`export const data = 32;`

तो:

`import { data } from "./components/work";`

## Named Import को Rename करना

- अगर `event` को `evt` नाम से use करना है:

`import { event as evt } from "./components/work";`

`evt();`

यहाँ:

event → **original name**
evt → **local नया नाम**

## 3. Import Everything

`import * as user from "./components/work";`

अब:

<code><pre>
console.log(user.data);

user.event();
</pre></code>

- `user` यहाँ एक namespace object जैसा काम कर रहा है।

## Default vs Named — सबसे जरूरी Difference

**Default:**

`export default worker;`

**Import:**

`import worker from "./work";`

- Curly braces नहीं।

**Named:**

`export const data = 32;`

**Import:**

`import { data } from "./work";`

- Curly braces चाहिए।

**इसे बस ऐसे याद रखें:**

**Default → { }** नहीं

**Named → { }**

## Relative Paths

## `./`

- मतलब: `Current folder` 
- अगर `index.js` यहाँ है:

<code><pre>
app/
├── index.js        ← आप यहाँ हैं
└── components/
    └── work.js
</pre></code>

- और `index.js` से `work.js` चाहिए:

`import worker from "./components/work";`

- पढ़िए: **current folder → components → work**

## `../`

- मतलब: **एक folder ऊपर**

- अगर आप यहाँ हैं:

<code><pre>
app/
├── index.js
└── components/
    └── work.js     ← आप यहाँ हैं
</pre></code>

- और `work.js` से `index.js` चाहिए:

`import something from "../index";`

पढ़िए: **components से एक folder ऊपर → app → index**

<code><pre>
./   = current directory
../  = parent directory / एक level ऊपर
../../ = दो levels ऊपर
</pre></code>

**उदाहरण:**

<code><pre>
src/
├── App.js
└── components/
    └── Header/
        └── Header.js
</pre></code>

**`App.js` से `Header.js` :**

`import Header from "./components/Header/Header";`

**`Header.js` से `App.js` जाना हो:**

`import App from "../../App";`

क्योंकि:

<code><pre>
Header.js
   ↓ ../
components/Header → components
   ↓ ../
components → src
   ↓
App.js
</pre></code>

## JSX (JavaScript)
- JSX JavaScript का syntax extension है जिससे हम HTML-like syntax में React UI describe कर सकते हैं। Build tooling JSX को browser-compatible JavaScript में transform करती है।