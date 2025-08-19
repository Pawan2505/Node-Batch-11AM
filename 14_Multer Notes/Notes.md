# How To Implement Multer In CRUD Project

### **Step 1: `app.js`**

Router ke niche add karo:

```js
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
```

---

### **Step 2: Routes File me Multer Setup**

```js
const multer = require('multer');

// multer start
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage }).single("image")
// multer end

routes.post('/addDetails', upload, adminCtl.addAdmin);
routes.post('/updateDetails/:id', upload, adminCtl.updateAdmin);
```

---

### **Step 3: Model**

Schema me image field add karo:

```js
image: {
  type: String,
  required: true,
}
```

---

### **Step 4: `home.ejs` (Add & View Image)**

👉 **Form me**

```html
<form enctype="multipart/form-data">
  <tr>
    <td>Image</td>
    <td><input type="file" name="image"></td>
  </tr>
</form>
```

👉 **Table me**

```html
<th>Image</th>
<td><img src="/<%= user.image %>" alt="" width="50" height="50"></td>
```

---

### **Step 5: `edit.ejs`**

```html
<form action="/updateDetails/<%= user._id %>" method="POST" enctype="multipart/form-data">
  <tr>
    <td>Image</td>
    <td>
      <input type="file" name="image">
      <img src="/<%= user.image %>" alt="" width="50" height="50">
    </td>
  </tr>
</form>
```

---

### **Step 6: Controller**

```js
const fs = require('fs');
const path = require('path');

// Add
module.exports.addAdmin = async (req, res) => {
  try {
    const { name, email, phone, gender, hobby, password, city } = req.body;
    const image = req.file ? req.file.path : "";

    await Admin.create({ name, email, phone, gender, hobby, password, city, image });
    console.log("Record added successfully.");
    res.redirect("/");
  } catch (err) {
    console.error(err);
    return res.render('404');
  }
}

// Update
module.exports.updateAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, email, phone, gender, hobby, password, city } = req.body;

    const recordUpdate = await Admin.findById(id);

    if (req.file && recordUpdate.image) {
      fs.unlinkSync(recordUpdate.image); // old image delete
    }

    const user = await Admin.findByIdAndUpdate(id, {
      name, email, phone, gender, hobby, password, city,
      image: req.file ? req.file.path : ""
    });

    if (!user) {
      console.log("User not found");
      return res.render('404');
    }

    res.redirect("/");
  } catch (err) {
    console.error(err);
    return res.render('404');
  }
}
```

---
