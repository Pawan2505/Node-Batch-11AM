# 📒 Notes

## Step 0 : **Action Buttons (Edit & Delete in Table Row)**

```ejs
<td>
  <a href="/editAdmin/<%= record._id %>">
    <i class="far fa-edit"></i>
  </a>
  <a href="/deleteAdmin/<%= record._id %>">
    <i class="fas fa-trash-alt"></i>
  </a>
</td>
```

---

## Step 1 : **edit\_admin.ejs**

(Full form for editing admin — pre-filled with existing data, includes gender, hobby checkboxes, description, avatar preview, and update button.)

---

## Step 2 : **Routes (index.js)**

```js
routes.get('/editAdmin/:id', checkAdminAuth, adminCtl.editData);
routes.post('/updateAdminData/:id', checkAdminAuth, admin.upload, adminCtl.updateData);
routes.get('/deleteAdmin/:id', checkAdminAuth, adminCtl.deleteData);
```

---

## Step 3 : **Controller (admin.controller.js)**

### Edit Data

```js
module.exports.editData = async (req, res) => {
  try {
    let id = req.params.id;
    console.log(id);

    let editRecord = await Admin.findById(id);
    console.log(editRecord);

    return res.render("edit_admin", { adminData: editRecord });
  } catch (error) {
    console.log(error);
    return res.redirect("/editData");
  }
};
```

---

### Update Data

```js
module.exports.updateData = async (req, res) => {
  try {
    const id = req.params.id;
    let oldAdmin = await Admin.findById(id);

    if (!oldAdmin) {
      console.log("Admin not found");
      return res.redirect("back");
    }

    // Update name from fname and lname
    req.body.name = req.body.fname + " " + req.body.lname;

    // If new file uploaded, replace avatar
    if (req.file) {
      // Delete old avatar file
      let oldPath = path.join(__dirname, "..", oldAdmin.avatar);
      try {
        fs.unlinkSync(oldPath);
        console.log("Old image deleted");
      } catch (err) {
        console.log("Image delete error:", err.message);
      }

      // Update with new avatar path
      req.body.avatar = Admin.adPath + "/" + req.file.filename;
    } else {
      // Keep the old avatar
      req.body.avatar = oldAdmin.avatar;
    }

    await Admin.findByIdAndUpdate(id, req.body);

    console.log("Admin updated successfully");
    return res.redirect("/view_admin");
  } catch (error) {
    console.log("Error updating admin:", error.message);
    return res.redirect("back");
  }
};
```

---

### Delete Data

```js
module.exports.deleteData = async (req, res) => {
  try {
    let id = req.params.id;
    console.log("ID to delete:", id);

    let adminData = await Admin.findById(id);

    if (adminData) {
      // Delete avatar file
      let imgPath = path.join(__dirname, "..", adminData.avatar);
      console.log("Deleting file:", imgPath);

      try {
        fs.unlinkSync(imgPath);
      } catch (err) {
        console.log("Image delete failed or already removed:", err.message);
      }

      // Delete admin record
      await Admin.findByIdAndDelete(id);
      console.log("Admin deleted successfully");
      return res.redirect("/view_admin");
    } else {
      console.log("Admin not found");
      return res.redirect("back");
    }
  } catch (error) {
    console.log("Error in deleting admin: ", error.message);
    return res.redirect("back");
  }
};
```

---
