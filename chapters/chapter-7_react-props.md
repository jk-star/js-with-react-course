# Chapter 7

- **Props — Parent से Child Component में data भेजना।**

मान लीजिए `App.js` में `data` है:

<code><pre>
const users = [
  { name: "Tom", age: 20 },
  { name: "John", age: 25 },
  { name: "Ricky", age: 30 }
];
</pre></code>

- और `App` parent component है, जबकि `UserDetail` child component है।

## Parent से data ऐसे भेज सकते हैं:

<code><pre>
&lt;UserDetail name={users[0].name} age={users[0].age} /&gt;
&lt;UserDetail name={users[1].name} age={users[1].age} /&gt;
&lt;UserDetail name={users[2].name} age={users[2].age} /&gt;
</pre></code>

- यहाँ `name` और `age` props हैं।

## Child component में इन्हें receive करेंगे: 

<code><pre>
function UserDetail(props) {
  return (
    &lt;div&gt;
      &lt;h2&gt;{props.name}&lt;/h2&gt;
      &lt;p&gt;Age: {props.age}&lt;/p&gt;
    &lt;/div&gt;
  );
}
</pre></code>

Flow याद रखें:

<code><pre>
App.js
  ↓
&lt;UserDetail name="Tom" age={20} /&gt;
  ↓
props
  ↓
UserDetail
  ↓
props.name / props.age
</pre></code>

## Props का नाम props होना mandatory नहीं

Technically:

<code><pre>
function UserDetail(x) {
  return &lt;h1&gt;{x.name}&lt;/h1&gt;;
}
</pre></code>

- भी चलेगा।

**लेकिन convention:**

`function UserDetail(props) {`

- है, इसलिए `props` लिखना ज्यादा `readable` है।

## Modern React में अक्सर destructuring करेंगे:

<code><pre>
function UserDetail({ name, age }) {
  return (
    &lt;div&gt;
      &lt;h2&gt;{name}&lt;/h2&gt;
      &lt;p&gt;Age: {age}&lt;/p&gt;
    &lt;/div&gt;
  );
}
</pre></code>

ये:

<code><pre>
props.name
props.age
</pre></code>

- बार-बार लिखने से बचाता है।

## CSS को Component-wise रखना

- Lecture में `UserDetail.css` बनाया जा रहा है। यह organization के लिए अच्छा pattern है:

<code><pre>
components/
└── UserDetail/
    ├── UserDetail.js
    └── UserDetail.css
</pre></code>

- फिर `UserDetail.js` में:

`import "./UserDetail.css";`

और:

`<div className="border2">`

**Parent Component → props भेजता है → Child Component props receive करता है → JSX में {props.name} जैसी values render करता है।**

**मान लीजिए बार-बार ये CSS लिख रहे हैं:**

<code><pre>
&lt;div className="border"&gt;
    ...
&lt;/div&gt;
</pre></code>

`Border.js`

<code><pre>
import "./Border.css";

function Border(props) {
    return (
        &lt;div className="borderDesign"&gt;
            {props.children}
        &lt;/div&gt;
    );
}

export default Border;
</pre></code>

<code><pre>
.borderDesign {
    border: 2px inset;
    margin-bottom: 10px;
}
</code></pre>

<code><pre>
&lt;Border&gt;
    &lt;h2&gt;Hello Tom&lt;/h2&gt;
    &lt;p&gt;Age: 25&lt;/p&gt;
&lt;/Border&gt;
</pre></code>

## Composition क्या है?

- एक component के अंदर दूसरे components/content को combine करना broadly `composition` कहलाता है।

जैसे:

<code><pre>
&lt;Border&gt;
    &lt;UserDetail /&gt;
&lt;/Border&gt;
</pre></code>

- `Border` को यह जानने की जरूरत नहीं कि अंदर `UserDetail` आएगा, heading आएगी या पूरा form।

<code><pre>
&lt;div className="borderDesign"&gt;
    {props.children}
&lt;/div&gt;
</pre></code>

- इसी वजह से component reusable बनता है।

## Extra className कैसे भेजें?

- अब lecture की दूसरी problem थी।

Common border CSS: `borderDesign`

- चाहिए, लेकिन किसी particular जगह additional:  `marginBorder` भी चाहिए। 

**Parent:**

<code><pre>
&lt;Border className="marginBorder"&gt;
    &lt;h1&gt;Hello&lt;/h1&gt;
&lt;/Border&gt;
</pre></code>

`Border` component में:

<code><pre>
function Border(props) {
    let classes = "borderDesign " + props.className;

    return (
        &lt;div className={classes}&gt;
            {props.children}
        &lt;/div&gt;
    );
}
</pre></code>

`<div class="borderDesign marginBorder">`

- यानी element पर **दो CSS classes** लग गईं।

## Modern तरीके से थोड़ा cleaner

- Destructuring और template literal से यही code:

<code><pre>
function Border({ children, className = "" }) {
    return (
        &lt;div className={`borderDesign ${className}`}&gt;
            {children}
        &lt;/div&gt;
    );
}
</pre></code>

- ये ज्यादा readable है।

**अब:**

<code><pre>
&lt;Border className="marginBorder"&gt;
    &lt;UserDetail name="Tom" age={25} /&gt;
&lt;/Border&gt;
</pre></code>

- Component के opening और closing tags के बीच जो content दिया जाता है, React उसे `children` prop के रूप में component तक पहुँचाता है।