**Step 1:**

```html
<!DOCTYPE html>
<html dir="ltr">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="keywords" content="wrappixel, admin dashboard, html css dashboard, web dashboard, bootstrap 5 admin, bootstrap 5, css3 dashboard, bootstrap 5 dashboard, Matrix lite admin bootstrap 5 dashboard, frontend, responsive bootstrap 5 admin template, Matrix admin lite design, Matrix admin lite dashboard bootstrap 5 dashboard template" />
    <meta name="description" content="Matrix Admin Lite Free Version is powerful and clean admin dashboard template, inpired from Bootstrap Framework" />
    <meta name="robots" content="noindex,nofollow" />
    <title>Matrix Admin Lite Free Versions Template by WrapPixel</title>
    <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon.png" />
    <link href="/css/style.min.css" rel="stylesheet" />
    <style>
      html, body {
        height: 100%;
        margin: 0;
        padding: 0;
      }
      .auth-wrapper {
        min-height: 100vh;
      }
    </style>
  </head>

  <body>
    <div class="main-wrapper">
      <div class="preloader">
        <div class="lds-ripple">
          <div class="lds-pos"></div>
          <div class="lds-pos"></div>
        </div>
      </div>
      <div class="auth-wrapper d-flex no-block justify-content-center align-items-center bg-dark">
        <div class="auth-box bg-dark border-top border-secondary">
          <div id="loginform">
            <div class="text-center pt-3 pb-3">
              <span class="db"><img src="/images/logo.png" alt="logo" /></span>
            </div>
            <form method="post" class="form-horizontal mt-3" id="loginform" action="/checkLogin">
              <div class="row pb-4">
                <div class="col-12">
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text bg-success text-white h-100" id="basic-addon1">
                        <i class="mdi mdi-account fs-4"></i>
                      </span>
                    </div>
                    <input type="email" class="form-control form-control-lg" placeholder="Email" aria-label="Username" name="email" aria-describedby="basic-addon1" required="" />
                  </div>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text bg-warning text-white h-100" id="basic-addon2">
                        <i class="mdi mdi-lock fs-4"></i>
                      </span>
                    </div>
                    <input type="password" class="form-control form-control-lg" placeholder="Password" aria-label="Password" name="password" aria-describedby="basic-addon1" required="" />
                  </div>
                </div>
              </div>
              <div class="row border-top border-secondary">
                <div class="col-12">
                  <div class="form-group">
                    <div class="pt-3">
                      <button class="btn btn-info" id="to-recover" type="button">
                        <i class="mdi mdi-lock fs-4 me-1"></i> Lost password?
                      </button>
                      <button class="btn btn-success float-end text-white" type="submit">
                        SignIn
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <script src="/libs/jquery/dist/jquery.min.js"></script>
    <script src="/libs/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
    <script>
      $(".preloader").fadeOut();
      $("#to-recover").on("click", function () {
        $("#loginform").slideUp();
        $("#recoverform").fadeIn();
      });
      $("#to-login").click(function () {
        $("#recoverform").hide();
        $("#loginform").fadeIn();
      });
    </script>
  </body>
</html>

<%- include("footer") %>
```

**Step 2:**

```javascript
routes.get('/', adminCtl.SignIn);
routes.post('/checkLogin', adminCtl.checkLogin);
```

**Step 3:** `admin.controller.js`

```javascript
module.exports.SignIn = (req,res)=>{
  return res.render('SignIn');
}

module.exports.checkLogin = async (req,res)=>{
  try{
    console.log("Checking login credentials...");
    let checkEmail = await Admin.findOne({ email: req.body.email });
    console.log(checkEmail);
    if(!checkEmail){
      console.log("Email not found");
      return res.redirect("back");
    } else {
      console.log("Email found:", checkEmail.email);
      if(checkEmail.password === req.body.password){
        console.log("Password matched");
        res.cookie("adminId", checkEmail._id, { maxAge: 24*60*60*1000 });
        return res.redirect("/dashboard");
      } else {
        console.log("Password did not match");
        return res.redirect("back");
      }
    }
  } catch(error){
    console.log("Error in checkLogin:", error.message);
    return res.redirect("back");
  }
}
```

**Step 4:**

```javascript
module.exports.checkAdminAuth = (req, res, next) => {
  if(req.cookies && req.cookies.adminId){
    return next();
  } else {
    return res.redirect("/signin");
  }
};
```
