# JavaScript Events And Classes

## JavaScript Events

Event का मतलब है—कोई activity होने पर JavaScript code execute करना।

जैसे user ने:

- button click किया → click
- form submit किया → submit
- input पर focus किया → focus
- input से focus हटाया → blur
- dropdown की value बदली → change

उदाहरण, button click:

<code><pre>
&lt;button onclick="hello()"&gt;Click Me&lt;/button&gt;

&lt;script&gt;
function hello() {
    alert("Hello");
}
&lt;/script&gt;
</pre></code>

Flow बहुत simple है:

- User clicks → onclick event → hello() call → alert

**Form Submit**

<code><pre>
&lt;form onsubmit="hello()"&gt;
    &lt;input type="text"&gt;
    &lt;button type="submit"&gt;Submit&lt;/button&gt;
&lt;/form&gt;
</pre></code>

- Form submit होते ही `hello()` call होगा।

## JavaScript Classes

- Class को आप एक blueprint/template समझ सकती हैं, जिससे objects बनाए जाते हैं।

Basic syntax: `class Person { }`

<code><pre>
class Person {
    constructor() {
        console.log("Constructor called");
        this.name = "John";
    }
}
</pre></code>

- constructor एक special method है जो new से object बनाते समय automatically execute होता है।

`const person1 = new Person();`

- this = जिस current object के साथ हम काम कर रहे हैं।

## Inheritance — extends

<code><pre>
class Human {
    constructor() {
        this.name2 = "Mango";
    }
}

class Person extends Human {
    constructor() {
        super();
        this.name = "John";
    }

    callName() {
        console.log(this.name + " " + this.name2);
    }
}

const person = new Person();
person.callName();
</pre></code>

Output: `John Mango`

## super() क्यों लगाया?

जब derived class में constructor लिखा हो:

<code><pre>
class Person extends Human {
    constructor() {
        this.name = "John"; // ❌
    }
}
</pre></code>

- तो this use करने से पहले parent constructor call करना जरूरी है:

<code><pre>
class Person extends Human {
    constructor() {
        super();            // ✅
        this.name = "John";
    }
}
</pre></code>

- `super()` parent class के constructor को call करता है।

## ES6+ JavaScript में भी constructor, this और super पूरी तरह valid और बहुत important हैं:

<code><pre>
class Human {
    constructor(name) {
        this.name = name;
    }
}

class Person extends Human {
    constructor(name, age) {
        super(name);
        this.age = age;
    }
}
</pre></code>
