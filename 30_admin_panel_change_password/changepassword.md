**Step 1:**

```html
<a class="dropdown-item" href="/changePassword">
  <i class="mdi mdi-settings me-1 ms-1"></i> Change Password
</a>
```

---

**Step 2:**

```ejs
<%- include("header")%>

<div class="page-wrapper">
  <div class="page-breadcrumb">
    <div class="row">
      <div class="col-12 d-flex no-block align-items-center">
        <h4 class="page-title">Change Password</h4>
        <div class="ms-auto text-end">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active" aria-current="page">
                Change Password
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
          <form class="form-horizontal" method="post" action="/checkChangePassword">
            <div class="card-body">
              <h4 class="card-title">Change Password</h4>

              <!-- Old Password -->
              <div class="form-group row">
                <label for="currentPass" class="col-sm-3 text-end control-label col-form-label">
                  Current Password
                </label>
                <div class="col-sm-9">
                  <input type="password" class="form-control" id="currentPass" name="currentPass" placeholder="Current Password Here" />
                </div>
              </div>

              <!-- New Password -->
              <div class="form-group row">
                <label for="newPass" class="col-sm-3 text-end control-label col-form-label">
                  New Password
                </label>
                <div class="col-sm-9">
                  <input type="password" class="form-control" id="newPass" name="newPass" placeholder="New Password Here" />
                </div>
              </div>

              <!-- Confirm New Password -->
              <div class="form-group row">
                <label for="confirmPassword" class="col-sm-3 text-end control-label col-form-label">
                  Confirm New Password
                </label>
                <div class="col-sm-9">
                  <input type="password" class="form-control" id="confirmPass" name="confirmPass" placeholder="Confirm New Password Here" />
                </div>
              </div>
            </div>

            <div class="border-top">
              <div class="card-body">
                <button type="submit" class="btn btn-primary">Change Password</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>

<%- include("footer")%>
```

---

**Step 3:**

```js
routes.get('/changePassword', checkAdminAuth, adminCtl.changePassword);
routes.post('/checkChangePassword', checkAdminAuth, adminCtl.checkChangePassword);
```

---

**Step 4:**

```js
module.exports.changePassword = (req, res) => {
  try {
    console.log("Rendering change password page...");
    let singleAdmin = req.cookies.adminId;
    if (!singleAdmin) {
      return res.redirect("/");
    }

    return res.render("changePassword", { singleAdmin });
  } catch (error) {
    console.log("Error in changePassword:", error.message);
    return res.redirect("back");
  }
};

module.exports.checkChangePassword = async (req, res) => {
  try {
    let oldPass = req.cookies.adminId.password;

    if (oldPass == req.body.currentPass) {
      if (req.body.currentPass != req.body.newPass) {
        if (req.body.newPass == req.body.confirmPass) {
          let adminId = req.cookies.adminId._id;
          await Admin.findByIdAndUpdate(adminId, {
            password: req.body.newPass,
          });
          res.clearCookie("adminId");
          return res.redirect("/");
        } else {
          console.log("New password and confirm password do not match");
          return res.redirect("/changePassword");
        }
      } else {
        console.log("New password cannot be the same as old password");
        return res.redirect("back");
      }
    }
  } catch (error) {
    console.log("Error in checkChangePassword:", error.message);
    return res.redirect("back");
  }
};
```
