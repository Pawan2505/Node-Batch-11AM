## Node.js REPL (Read-Eval-Print Loop)

### What is REPL?

REPL stands for:

* **Read** – takes your input (what you type)
* **Eval** – evaluates (runs) the code
* **Print** – shows the output
* **Loop** – repeats the process

### In simple words:

REPL is like a playground in Node.js where you can try JavaScript code line-by-line. It's great for testing small bits of code.

---

### 🔹 How to use it?

1. Open **Command Prompt** or **Terminal**

2. Just type:

   ```
   node
   ```

3. Now you’re inside the REPL. Try typing:

   ```js
   2 + 3
   ```

   ➜ It will show: `5`

4. To exit REPL, type:

   ```
   .exit
   ```

---

### Useful Shortcuts in REPL:

* `.help` → shows all REPL commands
* `.clear` → clears REPL screen
* Press `↑` (up arrow) → shows previous commands

---

## Node.js Global Object

In browsers, we use `window` as the global object.
But in Node.js, it’s called **`global`**.

### Example:

```js
console.log(global)
```

This shows all the global things Node.js provides.

---

### Some Common Global Objects in Node.js:

| Feature         | Description                           |
| --------------- | ------------------------------------- |
| `console.log()` | For printing output                   |
| `__dirname`     | Shows current folder path             |
| `__filename`    | Shows current file name               |
| `setTimeout()`  | Runs code after a delay               |
| `setInterval()` | Runs code again and again after delay |

---

### 🧾 Summary:

* REPL is a quick way to test Node.js code.
* `global` is like the `window` of Node.js.