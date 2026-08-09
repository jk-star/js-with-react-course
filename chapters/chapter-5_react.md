# Chapter 6 React

## React
- React एक open-source JavaScript library है, जिसका मुख्य use user interfaces बनाने के लिए होता है।
- React applications को छोटे reusable components में divide किया जाता है।

## Setup React Project

**1. Terminal open karo**

- Jis folder me project banana hai, wahan terminal open karo.

**2. Vite React project create karo**

`npm create vite@latest my-react-app`

**Vite kuch questions puchega:**

<code><pre>
Project name: my-react-app
Select a framework: React
Select a variant: JavaScript
</pre></code>

- Agar TypeScript nahi seekh rahi ho to JavaScript select karo.

**3. Project folder me jao**

`cd my-react-app`

**4. Dependencies install karo**

`npm install`

**5. Development server start karo**

`npm run dev`

**Terminal me kuch aisa URL milega:**

`Local: http://localhost:5173/`

**Browser me open karo:**

`http://localhost:5173/`

## Complete commands

<code><pre>
npm create vite@latest my-react-app
cd my-react-app
npm install
npm run dev
</pre></code>

**Project structure**

<code><pre>
my-react-app/
│
├── node_modules/
├── public/
│
├── src/
│   ├── assets/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── index.html
├── package.json
└── vite.config.js
</pre></code>

## DOM ( Document Object Model )
- Browser आपके HTML को JavaScript के लिए एक tree-like object structure में बदल देता है—उसी को DOM कहते हैं।

## Virtual DOM
- Virtual DOM React द्वारा UI का lightweight in-memory representation है। React updates के बाद previous और new representations को reconcile करके actual DOM में जरूरी changes apply करता है।

