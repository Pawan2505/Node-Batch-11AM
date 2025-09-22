## Step 1 : **add\_admin.ejs**

```ejs
<%- include("header") %>

<div class="page-wrapper">
  <div class="page-breadcrumb">
    <div class="row">
      <div class="col-12 d-flex no-block align-items-center">
        <h4 class="page-title">Form Basic</h4>
        <div class="ms-auto text-end">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active" aria-current="page">
                Library
              </li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
  </div>

  <div class="container-fluid">
    <div class="row">
      <div class="col-md-6">
        <div class="card">
          <form class="form-horizontal" method="post" action="/insertAdminData" enctype="multipart/form-data">
            <div class="card-body">
              <h4 class="card-title">Personal Info</h4>

              <!-- First Name -->
              <div class="form-group row">
                <label for="fname" class="col-sm-3 text-end control-label col-form-label">First Name</label>
                <div class="col-sm-9">
                  <input name="fname" type="text" class="form-control" id="fname" placeholder="First Name Here" />
                </div>
              </div>

              <!-- Last Name -->
              <div class="form-group row">
                <label for="lname" class="col-sm-3 text-end control-label col-form-label">Last Name</label>
                <div class="col-sm-9">
                  <input name="lname" type="text" class="form-control" id="lname" placeholder="Last Name Here" />
                </div>
              </div>

              <!-- Email -->
              <div class="form-group row">
                <label for="email" class="col-sm-3 text-end control-label col-form-label">Email</label>
                <div class="col-sm-9">
                  <input type="email" class="form-control" id="email" name="email" placeholder="Enter Email Here" />
                </div>
              </div>

              <!-- Password -->
              <div class="form-group row">
                <label for="password" class="col-sm-3 text-end control-label col-form-label">Password</label>
                <div class="col-sm-9">
                  <input type="password" class="form-control" id="password" name="password" placeholder="Password Here" />
                </div>
              </div>

              <!-- Gender -->
              <div class="form-group row">
                <label class="col-md-3">Select Gender</label>
                <div class="col-md-9">
                  <div class="form-check">
                    <input type="radio" class="form-check-input" id="customControlValidation1" name="gender" value="male" required />
                    <label class="form-check-label mb-0" for="customControlValidation1">Male</label>
                  </div>
                  <div class="form-check">
                    <input type="radio" class="form-check-input" id="customControlValidation2" name="gender" value="female" required />
                    <label class="form-check-label mb-0" for="customControlValidation2">Female</label>
                  </div>
                </div>
              </div>

              <!-- Hobbies -->
              <div class="form-group row">
                <label class="col-md-3">Hobby</label>
                <div class="col-md-9">
                  <div class="form-check mr-sm-2">
                    <input name="hobby[]" type="checkbox" class="form-check-input" id="customControlAutosizing1" value="reading" />
                    <label class="form-check-label mb-0" for="customControlAutosizing1">Reading</label>
                  </div>
                  <div class="form-check mr-sm-2">
                    <input name="hobby[]" value="cycling" type="checkbox" class="form-check-input" id="customControlAutosizing2" />
                    <label class="form-check-label mb-0" for="customControlAutosizing2">Cycling</label>
                  </div>
                  <div class="form-check mr-sm-2">
                    <input name="hobby[]" value="adventure" type="checkbox" class="form-check-input" id="customControlAutosizing3" />
                    <label class="form-check-label mb-0" for="customControlAutosizing3">Adventure</label>
                  </div>
                </div>
              </div>

              <!-- Description -->
              <div class="form-group row">
                <label for="cono1" class="col-sm-3 text-end control-label col-form-label">Message</label>
                <div class="col-sm-9">
                  <textarea class="form-control" name="description" placeholder="Enter your message here"></textarea>
                </div>
              </div>

              <!-- File Upload -->
              <div class="form-group row">
                <label class="col-md-3">File Upload</label>
                <div class="col-md-9">
                  <div class="custom-file">
                    <input type="file" class="custom-file-input" id="validatedCustomFile" name="avatar" required />
                    <label class="custom-file-label" for="validatedCustomFile">Choose file</label>
                  </div>
                </div>
              </div>

            </div>

            <!-- Submit Button -->
            <div class="border-top">
              <div class="card-body">
                <button type="submit" class="btn btn-primary">Add Admin</button>
              </div>
            </div>

          </form>
        </div>
      </div>
    </div>
  </div>
</div>

<%- include("footer") %>
```

---

## Step 2 :

```ejs
<%- include("header")%>

<!-- ============================================================== -->
<!-- End Left Sidebar - style you can find in sidebar.scss  -->
<!-- ============================================================== -->
<!-- ============================================================== -->
<!-- Page wrapper  -->
<!-- ============================================================== -->
<div class="page-wrapper">
  <!-- ============================================================== -->
  <!-- Bread crumb and right sidebar toggle -->
  <!-- ============================================================== -->
  <div class="page-breadcrumb">
    <div class="row">
      <div class="col-12 d-flex no-block align-items-center">
        <h4 class="page-title">Tables</h4>
        <div class="ms-auto text-end">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active" aria-current="page">
                Library
              </li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
  </div>
  <!-- ============================================================== -->
  <!-- End Bread crumb and right sidebar toggle -->
  <!-- ============================================================== -->
  <!-- ============================================================== -->
  <!-- Container fluid  -->
  <!-- ============================================================== -->
  <div class="container-fluid">
    <!-- ============================================================== -->
    <!-- Start Page Content -->
    <!-- ============================================================== -->
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title mb-0">Static Table</h5>
          </div>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Password</th>
                <th scope="col">Gender</th>
                <th scope="col">Hobby</th>
                <th scope="col">Description</th>
                <th scope="col">Image</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <% adminRecord.forEach((record, index) => { %>
              <tr>
                <th scope="row"><%= index + 1 %></th>
                <td><%= record.name %></td>
                <td><%= record.email %></td>
                <td><%= record.password %></td>
                <td><%= record.gender %></td>
                <td><%= record.hobby %></td>
                <td><%= record.description %></td>
                <td>
                
                  <img
                    src="<%= record.avatar %>"
                    alt="Image"
                    style="width: 50px; height: 50px"
                  />
                 
                </td>
                <td>
                  <a
                    href="/edit/<%= record.id %>"
                    class="btn btn-primary text-white"
                    >Edit</a
                  >
                  <a
                    href="/delete/<%= record.id %>"
                    class="btn btn-danger text-white"
                    >Delete</a
                  >
                </td>
              </tr>
              <% }) %>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  
  </div>

  <!-- footer -->

</div>
<%- include("footer")%>x


```



## Step 3 : **Routes**

```js
routes.get('/add_admin',adminCtl.add_admin);
routes.get('/view_admin',adminCtl.view_admin);


routes.post("/insertAdminData",Admin.uploadAdminImage, adminCtl.insertAdminData);
```

---

## Step 4 : **Controller**

```js
const Admin = require("../models/Admin");

module.exports.dashbord = (req, res) => {
  return res.render("dashboard");
};
module.exports.add_admin = (req, res) => {
  return res.render("add_admin");
};
module.exports.view_admin = async (req, res) => {
  try {
    let adminRecord = await Admin.find({});
    return res.render("view_admin", { adminRecord });
  } catch (err) {
    console.log("Error in fetching admin data:", err);
    return res.redirect("back");
  }
};
module.exports.insertAdminData = async (req, res) => {
  try {
    req.body.name = req.body.fname + " " + req.body.lname;

    req.body.avatar = "";

    if (req.file) {
      req.body.avatar = Admin.adPath + "/" + req.file.filename;
    }

    let adminRecord = await Admin.create(req.body);

    if (adminRecord) {
      console.log("Admin Record Inserted");
      return res.redirect("/add_admin");
    } else {
      console.log("Error in Inserting Admin Record!");
      return res.redirect("back");
    }
  } catch (err) {
    console.log("Error in Inserting Admin Record : ", err);
    return res.redirect("back");
  }
};
```

---


Nice 👌 let’s extend the notes with **Step 5** in the same clean format.

---

# 📒 Notes

## Step 1 : **add\_admin.ejs**

(Admin form with inputs, file upload, gender, hobby checkboxes, etc.)

---

## Step 2 : **view\_admin.ejs**

(Admin table view page — static/dynamic table structure)

---

## Step 3 : **Routes**

```js
routes.get('/add_admin', adminCtl.add_admin);
routes.get('/view_admin', adminCtl.view_admin);
```

---

## Step 4 : **Controller**

```js
module.exports.add_admin = (req, res) => {
    return res.render('add_admin');
}

module.exports.view_admin = (req, res) => {
    return res.render('view_admin');
}
```

---

## Step 5 : **Admin Model (Schema + Multer Setup)**

```js
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const imagePath = '/uploads/AdminImages';

const AdminSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    hobby: {
        type: Array,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: true
    }
});

const adminStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", imagePath));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  }
});

AdminSchema.statics.uploadAdminImage = multer({ storage: adminStorage }).single('avatar');
AdminSchema.statics.adPath = imagePath;

const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;
```

---

## Step 6 : **Server Setup (Express App)**

```js
const express = require('express');
const db = require('./config/db');
const path = require('path');

const port = 8001;
const app = express();

// Set EJS as the template engine
app.set('view engine', 'ejs');

// Static files
app.use(express.static(path.join(__dirname, 'assets')));

// Form data
app.use(express.urlencoded({ extended: true }));

// Static uploads path
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/', require('./routes/index'));

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log("Server started on port :", port);
});
```

---


