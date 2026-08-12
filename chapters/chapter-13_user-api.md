# Chapter 13 User API

## 1. GET — Data लेना
- मान लो हमें User ID 1 का data चाहिए:

<code><pre>
fetch("https://api.example.com/users/1")
  .then(response => response.json())
  .then(data => {
    console.log(data);
  });
</pre></code>

## 2. POST — नया User बनाना 
- मान लो नया user बनाना है:
<code><pre>
fetch("https://api.example.com/users", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    name: "Jyoti",
    email: "jyoti@gmail.com"
  })
})
  .then(response => response.json())
  .then(data => {
    console.log(data);
  });
</pre></code>

## 3. PUT — पूरा User Update करना

<code><pre>
fetch("https://api.example.com/users/1", {
  method: "PUT",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    name: "Jyoti Singh",
    email: "jyoti@example.com",
    age: 28
  })
})
  .then(response => response.json())
  .then(data => {
    console.log(data);
  });
</pre></code>

## 4. PATCH — थोड़ा Data Update करना

<code><pre>
fetch("https://api.example.com/users/1", {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    email: "newemail@gmail.com"
  })
})
  .then(response => response.json())
  .then(data => {
    console.log(data);
  });
</pre></code>

## 5. DELETE — User Delete करना
- User 1 को delete करना है:
<code><pre>
fetch("https://api.example.com/users/1", {
  method: "DELETE"
})
  .then(response => response.json())
  .then(data => {
    console.log(data);
  });
</pre></code>