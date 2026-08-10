# Chapter 9 useEffect Hook

## useEffect का basic syntax

<code><pre>
useEffect(() => {
    console.log("Running useEffect");
}, []);
</pre></code>

- `useEffect` में मुख्यतः दो चीजें होती हैं:
1. Effect function
2. Dependency array

## 1. Dependency array नहीं दिया

<code><pre>
useEffect(() => {
    console.log("Running");
});
</pre></code>

- इसका मतलब: हर render के बाद effect चलेगा।

- अगर `name` और `num` दोनों state हैं, तो दोनों में change होने पर component re-render होगा और effect फिर चलेगा।

## 2. Empty dependency array `[]`

<code><pre>
useEffect(() => {
    console.log("Running");
}, []);
</pre></code>

इसका मतलब: Component के initial mount के बाद effect चलेगा।

इसलिए सामान्य तौर पर:

<code><pre>
Page/Component mount
       ↓
useEffect
       ↓
effect runs
</pre></code>

- बाद में `name` या `num` change होने पर यह effect दोबारा नहीं चलेगा।

## 3. सिर्फ `name` dependency

<code><pre>
useEffect(() => {
    console.log("Name changed");
}, [name]);
</pre></code>

**अब:**

<code><pre>
name change → useEffect चलेगा ✅
num change  → useEffect नहीं चलेगा ❌
</pre></code>

- और पहली बार component mount होने पर भी effect run होगा।

## 4. `name` और `num` दोनों

<code><pre>
useEffect(() => {
    console.log("Something changed");
}, [name, num]);
</pre></code>

- अब दोनों में से कोई भी change होगा:

<code><pre>
name change → effect
num change  → effect
</pre></code>

## अब सबसे important: `return`
- आपने जो दूसरा हिस्सा बताया, वह **`cleanup function`** है।
<code><pre>
useEffect(() => {
    console.log("Effect");

    return () => {
        console.log("Cleanup");
    };
}, [name]);
</pre></code>

- यहाँ **`return`** वाला function cleanup function है।
- इसे ऐसे मत याद रखिए कि “return हमेशा पहले चलता है।”

सही sequence है:

## Initial render

<code><pre>
Component render
      ↓
Effect runs
</pre></code>

- पहली बार cleanup नहीं होता, क्योंकि उससे पहले कोई previous effect नहीं है।

## अगली बार dependency change

- मान लीजिए **`name`** बदल गया:

<code><pre>
Previous effect का cleanup
          ↓
New render
          ↓
New effect
</pre></code>

- **यानी:**

<code><pre>
Cleanup
   ↓
Effect
</pre></code>

- इसीलिए आपने console में पहले: **`returning function`**

- और उसके बाद: **`running useEffect`** देखा।

## Cleanup का practical use

- Cleanup बहुत useful है जब आपने कोई ऐसी चीज शुरू की हो जिसे बाद में रोकना हो:

    - `setInterval`
    - `setTimeout`
    - event listeners
    - subscriptions
    - WebSocket connections
    - कुछ async-related cleanup

**उदाहरण:**
<code><pre>
useEffect(() => {
    const timer = setInterval(() => {
        console.log("Running...");
    }, 1000);

    return () => {
        clearInterval(timer);
    };
}, []);
</pre></code>

- यहाँ component unmount होने पर interval cleanup हो जाएगा।

## useEffect को ऐसे याद रखें:

<code><pre>
useEffect(
    WHAT TO DO,
    WHEN TO DO IT
)
</pre></code>

**उदाहरण:**

<code><pre>
useEffect(() => {
    console.log("Name changed");
}, [name]);
</pre></code>

**WHAT**: `console.log()`

**WHEN**: `name` change होने पर + initial mount

## useEffect + Cleanup का पूरा flow

अगर:

<code><pre>
useEffect(() => {
    console.log("Running useEffect");

    return () => {
        console.log("Cleanup");
    };
}, [num]);
</pre></code>

- तो तीन situations हैं।

## 1. Component पहली बार mount हुआ

<code><pre>
Render
  ↓
Running useEffect
</pre></code>

- पहली बार cleanup नहीं चलेगा।

## 2. num change हुआ

- पहले पुराने effect का cleanup:

<code><pre>
Cleanup
  ↓
नया render/effect
  ↓
Running useEffect
</pre></code>

इसलिए console में:

<code><pre>
Cleanup
Running useEffect
</pre></code>

## 3. Component unmount हो गया
- यानी component DOM/UI से हट गया:
<code><pre>
Component unmount
      ↓
Cleanup
</pre></code>

- इस case में नया `Running useEffect` नहीं चलेगा, क्योंकि component ही हट चुका है।