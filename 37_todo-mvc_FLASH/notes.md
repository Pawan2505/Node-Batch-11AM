
---

### **Flash Messages**

Flash messages are used to show short temporary messages to users — like “Todo added successfully!” after adding a new item.
They disappear after being displayed once.

---

### **Step 1: Setup in `app.js`**

```js
const flash = require('connect-flash');
const session = require('express-session');

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));
app.use(flash());
```

👉 Explanation:

* `express-session` is needed for `connect-flash` to work.
* `secret` is used to sign the session ID.
* `maxAge` defines how long the session will last.
* `app.use(flash())` enables flash message support.

---

### **Step 2: In Controller**

```js
req.flash('success', 'Todo added successfully!');
const message = req.flash('success');
```

👉 Explanation:

* `req.flash('key', 'message')` is used to set a message.
* `req.flash('key')` is used to get the message.
* Example: When a todo is added, we store and later retrieve the success message.

---

### **Step 3: In `index.ejs`**

```ejs
<!-- Flash Message Section -->
<% if (message && message.length > 0) { %>
  <div class="alert success">
    <%= message %>
  </div>
<% } %>
```

👉 Explanation:

* This checks if a message exists.
* If yes, it displays the message inside a styled alert box.

---

