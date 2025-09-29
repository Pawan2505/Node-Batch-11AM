**Step 1 : router**

```js
routes.get('/logout', adminCtl.logout);
```

**Step 2 : controller**

```js
module.exports.logout = (req, res) => {
  res.clearCookie("adminId");
  return res.render("SignIn");
};
```

**Step 3 : header.ejs**

```html
<a class="dropdown-item" href="/logout">
  <i class="fa fa-power-off me-1 ms-1"></i> Logout
</a>
```
