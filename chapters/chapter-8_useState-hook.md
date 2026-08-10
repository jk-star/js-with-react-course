# Chapter 8 useState Hook

## बिना `useState` के problem

अगर:

<code><pre>
let name = "Mango";

const changeName = () => {
    name = "Apple";
};
</pre></code>

- तो variable की value बदल जाएगी, लेकिन React को automatically पता नहीं चलेगा कि UI को फिर से update करना है।
- इसलिए screen पर: **`Hello Mango`** ही रह सकता है।

## `useState` solution

- पहले import: `import { useState } from "react";` 
- फिर: `const [name, setName] = useState("Mango");`

इसे ऐसे समझिए:

<code><pre>
name
 ↓
current state/value
"Mango"

setName
 ↓
state बदलने वाला function
</pre></code>

और: **`useState("Mango")`** में "Mango" initial state है।

अब button:

<code><pre>
&lt;button onClick={changeName}&gt;
    Change Name
&lt;/button&gt;
</pre></code>

और function:

<code><pre>
const changeName = () => {
    setName("Apple");
};
</pre></code>

UI: `<h2>Hello {name}</h2>`

## पूरा छोटा example

<code><pre>
import { useState } from "react";

function App() {
    const [name, setName] = useState("Mango");
    const changeName = () => {
        setName("Apple");
    };
    return (
        &lt;div&gt;
            &lt;h1&gt;Hello {name}&lt;/h1&gt;
            &lt;button onClick={changeName}&gt;
                Change Name
            &lt;/button&gt;
        &lt;/div&gt;
    );
}

export default App;
</pre></code>