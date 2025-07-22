### 1. `console.log()` – for printing output

```js
console.log("Hello, I am learning Node.js!");
```

📝 Output:

```
Hello, I am learning Node.js!
```

---

### 2. `__dirname` – shows the current folder path

```js
console.log("Current folder path is:", __dirname);
```

📝 Output (example):

```
Current folder path is: C:\Users\Mastur\NodePractice
```

---

### 3. `__filename` – shows the current file name with full path

```js
console.log("File name is:", __filename);
```

📝 Output (example):

```
File name is: C:\Users\Mastur\NodePractice\app.js
```

---

### 4. `setTimeout()` – runs code after a delay

```js
setTimeout(() => {
  console.log("This message shows after 2 seconds");
}, 2000); // 2000 milliseconds = 2 seconds
```

📝 Output:

```
(This prints after 2 seconds delay)
This message shows after 2 seconds
```

---

### 5. `setInterval()` – runs code again and again after a delay

```js
setInterval(() => {
  console.log("Repeating every 3 seconds...");
}, 3000); // runs every 3 seconds
```

📝 Output:

```
Repeating every 3 seconds...
Repeating every 3 seconds...
(keeps going every 3 seconds)
```

