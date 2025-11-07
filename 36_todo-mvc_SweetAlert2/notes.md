
---

### **SweetAlert2**

SweetAlert2 is a JavaScript library used to create beautiful and modern alert boxes instead of the default `alert()`.

---

### **Step 1: Create `alert.js`**

```js
document.querySelectorAll(".delete-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const form = btn.closest("form");

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
        form.submit();
      }
    });
  });
});
```

👉 Explanation:

* Select all buttons with `.delete-btn`.
* When clicked, it shows a confirmation alert using **SweetAlert2**.
* If confirmed → shows success message and submits the form.
* If canceled → nothing happens.

---

### **Step 2: Add CDN and Script in `index.ejs`**

```ejs
<!-- SweetAlert2 CDN -->
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

<!-- Custom Alert Script -->
<script src="/js/alert.js"></script>
```

👉 Explanation:

* The **CDN** link loads the SweetAlert2 library.
* The **alert.js** script runs your custom alert code.

---

