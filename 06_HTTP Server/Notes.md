## Node.js HTTP Server

We’re using Node.js to create a basic **web server** – which means we’re making a small computer program that **listens on a port (like a door)** and responds to people when they visit certain **URLs (routes)**.

---

## Step-by-step Explanation of the Code

### 📁 File: `script.js`

### 🔸 1. Import Modules

```js
const http = require('http');
const fs = require('fs');
```

* `http`: Helps us create a basic server.
* `fs`: This one is for **file reading** (so we can send HTML files as responses).

---

### 🔸 2. Define Port Number

```js
const port = 8080;
```

* This is the **port number** (like a door number) on which your server will **listen**.
* You can visit your site by going to `http://localhost:8080`

---

### 🔸 3. Create Request Handler Function

```js
const requestHandler = (req, res) => {
    let fileName = '';

    switch(req.url){
        case '/':
            fileName = 'Home.html';
            break;
        case '/about':
            fileName = 'About.html';
            break;
        default:
            fileName = 'Error.html';
            break;
    }

    fs.readFile(fileName, (err, result) => {
        if (!err) {
            res.end(result);
        }
    });
}
```

* `req.url`: This gives us the **path** the user is trying to visit.

  * `/` means the **home page**
  * `/about` means the **about page**
  * anything else? Show the **error page** (404).

Then we use `fs.readFile()` to **read the HTML file** from our folder and `res.end(result)` to **send it back to the browser**.

---

### 🔸 4. Create the Server

```js
const server = http.createServer(requestHandler);
```

* We created our server and told it to use our `requestHandler` whenever someone visits.

---

### 🔸 5. Start the Server

```js
server.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log("Server Started at port :- ", port);
});
```

* This part **starts the server**.
* If any error occurs while starting, it shows an error message.
* Otherwise, it shows: `"Server Started at port :- 8080"`

---

## 🧾 Output based on URL

| URL         | File Shown   | Page Output Text      |
| ----------- | ------------ | --------------------- |
| `/`         | `Home.html`  | "This is Home Page!"  |
| `/about`    | `About.html` | "This is About Page!" |
| `/anything` | `Error.html` | "Page Not Found!"     |

---

