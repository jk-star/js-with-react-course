# Chapter 10 HTTP Requests

## HTTP Request क्या है?

- Frontend और backend के बीच communication का तरीका।

<code><pre>
React App
   ↓ HTTP Request
Backend / API
   ↓
Database
</pre></code>

- Backend response देता है:

<code><pre>
Database
   ↓
Backend / API
   ↓ HTTP Response
React App
</pre></code>

## मुख्य HTTP Methods

| Method     | सामान्य काम                              | Example                         |
| ---------- | ---------------------------------------- | ------------------------------- |
| **GET**    | Data लेना                                | Users की list fetch करना        |
| **POST**   | नया data बनाना                           | नया user create करना            |
| **PUT**    | Existing resource को replace/update करना | User का पूरा object update करना |
| **PATCH**  | Partial update                           | सिर्फ email बदलना               |
| **DELETE** | Data हटाना                               | User delete करना                |

**उदाहरण:**

<code><pre>
GET     /users/10       → User 10 लाओ
POST    /users          → नया User बनाओ
PUT     /users/10       → User 10 का representation update/replace करो
PATCH   /users/10       → User 10 का कुछ हिस्सा update करो
DELETE  /users/10       → User 10 हटाओ
</pre></code>

## PUT vs PATCH
- पूरा resource replace/update करना → PUT
- कुछ specific fields बदलना → PATCH

## React में request कैसे भेजेंगे?

- React खुद backend नहीं है। React से API call करने के लिए commonly:

**1. `fetch()`**

- `fetch("https://example.com/api/users")`

**2. ``Axios``**

- `axios.get("https://example.com/api/users")`

- Axios एक external library है, जबकि **`fetch`** modern browsers में built-in Web API है।

- और यहाँ से अगला practical topic naturally आएगा:

- **`fetch()`** + **`useEffect()`** → API से data fetch करके React में display करना।

यानी अब तक के दो concepts एक साथ जुड़ेंगे:

<code><pre>
Component mount
      ↓
useEffect()
      ↓
fetch()
      ↓
Backend API
      ↓
Response
      ↓
setState()
      ↓
React re-render
      ↓
Data screen पर
</pre></code>

- यही React में API integration का basic workflow है।