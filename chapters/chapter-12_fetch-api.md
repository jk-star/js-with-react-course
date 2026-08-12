# Chapter 12 HTTP Request + API + Fetch

## 1. सबसे पहले API क्या है?

- मान लो आपकी React website को users की information चाहिए।
- आपका React खुद database में जाकर users नहीं निकालता।
- वह Server से कहता है: "मुझे users का data चाहिए।"
- Server एक रास्ता देता है: **`API Endpoint`**
- Example: **`https://example.com/users`**

## 2. Request और Response

<code><pre>
React
  ↓
Request
  ↓
Server/API
  ↓
Response
  ↓
React
</pre></code>

**`Request`** 
- React कहता है: मुझे users का data चाहिए।

**`Response`**
- Server कहता है: ठीक है, ये लो users का data।

**यही `Request → Response` है।**

## 3. GET क्या है?
- जब हमें server से data लेना हो तो **`GET use`** करते हैं।
- **`GET = Data लेना`**
- Example: **`GET /users`**
- मतलब: Server, मुझे users का data दो।

## 4. React में request कैसे भेजेंगे?

- JavaScript में **`fetch()`** से:
<code><pre>
fetch("https://example.com/users")
</code></pre>

- बस। **`fetch()`** का काम है: इस URL पर request भेजना।

## 5. Server ने Response दिया
- अब server ने response दिया।

**इसलिए:**
<code><pre>
fetch(url)
  .then(response => {
    console.log(response);
  });
</pre></code>

- यहाँ **`response`** में server का response है।
- लेकिन अभी हमें actual user data चाहिए।

## 6. response.json() क्यों?
- Server अक्सर data JSON format में देता है।

**Example:**

<code><pre>
{
  name: "Jyoti",
  age: 28
}
</pre></code>

**इसलिए: `response.json()`**
- का मतलब: Response के JSON data को पढ़ने लायक बनाओ।

**तो:**
<code><pre>
fetch(url)
  .then(response => response.json())
</pre></code>

- अब हमें actual data मिल सकता है।

## 7. दूसरा .then() क्यों?

- पहले **`.then()`** में: **`response`** मिला। हमने उसे JSON में बदला।
- फिर दूसरे **`.then()`** में: **`data`** मिलता है।

<code><pre>
fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(data);
  });
</pre></code>

- इसे बस ऐसे याद करो:

<code><pre>
fetch()
   ↓
Response
   ↓
JSON
   ↓
Data
</pre></code>

## 8. अब React में data दिखाना है

- इसके लिए useState: **`const [data, setData] = useState(null);`**
- Initially: **`data = null`** जब API से data आया: **`setData(result);`**
- अब: **`data = API का data`** और UI में: **`<p>{data?.name}</p>`**

## 9. ?. क्या है?

- शुरुआत में: **`data = null`** अगर लिखोगे: **`data.name`** तो error आएगा।
- इसलिए: **`data?.name`** इसका मतलब: अगर data है तो name दिखाओ, नहीं है तो कुछ मत दिखाओ। बस।

| Method | Simple Meaning   |
| ------ | ---------------- |
| GET    | Data लेना        |
| POST   | नया Data बनाना   |
| PUT    | पूरा Data बदलना  |
| PATCH  | थोड़ा Data बदलना |
| DELETE | Data हटाना       |

इसे ऐसे याद करो:

<code><pre>
GET = लो
POST = बनाओ
PUT = पूरा बदलो
PATCH = थोड़ा बदलो
DELETE = हटाओ
</pre></code>

## 10. POST
- मान लो website पर नया user बनाना है। `POST /users`
**और हम भेजते हैं:**

<code><pre>
{
  name: "Jyoti",
  email: "jyoti@gmail.com"
}
</pre></code>

- मतलब: Server, नया user बना दो।
- इसलिए: **`POST = Create`**

## 11. POST में body क्या है?

- **`body`** में हम server को अपना data भेजते हैं।

<code><pre>
body: JSON.stringify({
  name: "Jyoti",
  email: "jyoti@gmail.com"
})
</pre></code>

- मतलब: यह data server को भेज रहा हूँ।

## 12. `headers` क्या है?

<code><pre>
headers: {
  "Content-Type": "application/json"
}
</pre></code>

- इसका simple meaning: Server, मैं तुम्हें JSON format में data भेज रहा हूँ।

## 13. PUT

- मान लो database में user है:
<code><pre>
Name: Jyoti
Email: abc@gmail.com
Age: 28
</code><pre>

- अब हमें उसका **`पूरा data बदलना है।`**
- तो: **`PUT`**

## 14. PATCH

- अब सिर्फ नाम बदलना है: **`Name: Jyoti → Neha`**
- बाकी email और age same रहेंगे।
- तो: **`PATCH`**

## 15. DELETE

- अब user को हटाना है: `DELETE` मतलब: इस user को delete कर दो।

## 14. Error Handling

- अब मान लो आपने सही API URL दिया: **`/users/1`** Server कहता है: **`200 OK`**
मतलब: सब ठीक है। ✅
- लेकिन आपने गलत URL दिया: **`/users/999999`** Server कहता है: **`404 Not Found`**
मतलब: मुझे यह data/resource नहीं मिला।

## 15. HTTP Status Codes
- जब हम API को request भेजते हैं, तो server response के साथ एक status code भी भेजता है। इससे हमें पता चलता है कि request का क्या हुआ।

| Status Code | Name                    | Simple Meaning                   | Example                        |
| ----------- | ----------------------- | -------------------------------- | ------------------------------ |
| **200**     | OK ✅                    | Request successfully complete    | GET करके data मिल गया          |
| **201**     | Created ✅               | नया data successfully create हुआ | POST करके नया user बनाया       |
| **400**     | Bad Request ❌           | Request में कुछ गलत है           | Required data नहीं भेजा        |
| **401**     | Unauthorized 🔐         | Authentication required/failed   | Login/token की problem         |
| **403**     | Forbidden 🚫            | Access की permission नहीं है     | Login है लेकिन permission नहीं |
| **404**     | Not Found ❌             | URL/resource नहीं मिला           | `/users/999` मौजूद नहीं        |
| **500**     | Internal Server Error ❌ | Server की तरफ problem            | Server code में error          |

## 16. .catch() क्या करता है?

- मान लो request में problem आई।

**हम कहते हैं:**

<code><pre>
.catch(error => {
  console.log(error);
});
</pre></code>

- मतलब: अगर Promise में error आए तो उसे यहाँ handle करो।

**Example:**

<code><pre>
fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.log(error);
  });
</pre></code>

## 17. async/await वाला तरीका

- **`Fetch`** को दो तरीके से लिख सकते हैं।

**`Method 1`**
<code><pre>
.then()
.then()
.catch()
</pre></code>

**`Method 2`**
<code><pre>
async
await
try
catch
</pre></code>

- दोनों का काम लगभग same है।

## 18. try/catch को ऐसे समझो

<code><pre>
try {
   // काम करो
}
catch(error) {
   // अगर problem आए तो यहाँ आओ
}
</pre></code>