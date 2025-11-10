
---

# **CRUD in React JS using Redux**

### **Step 1 : Install**

```bash
npm install react-redux @reduxjs/toolkit react-router-dom bootstrap
```

---

### **Step 2 : CRUD Directory**

```
src/
│
├── components/
│   ├── AddUser.jsx
│   ├── EditUser.jsx
│   └── UserList.jsx
│
├── redux/
│   ├── actions/
│   │   └── userActions.js
│   ├── reducers/
│   │   └── userReducer.js
│   └── store.js
│
└── App.js
```

---

### **Step 3 : userActions.js**

```js
// Action Types
export const ADD_USER = 'ADD_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_USER = 'DELETE_USER';

// Action Creators
export const addUser = (user) => ({
  type: ADD_USER,
  payload: user,
});

export const updateUser = (user) => ({
  type: UPDATE_USER,
  payload: user,
});

export const deleteUser = (id) => ({
  type: DELETE_USER,
  payload: id,
});
```

---

### **Step 4 : userReducer.js**

```js
import { ADD_USER, UPDATE_USER, DELETE_USER } from '../actions/userActions';

const initialState = [
  { id: 1, name: 'Pawan Maurya', email: 'pawan@gmail.com' },
  { id: 2, name: 'Manish Mishra', email: 'manish@gmail.com' },
];

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return [...state, action.payload];

    case UPDATE_USER:
      return state.map((user) =>
        user.id === action.payload.id ? action.payload : user
      );

    case DELETE_USER:
      return state.filter((user) => user.id !== action.payload);

    default:
      return state;
  }
};

export default userReducer;
```

---

### **Step 5 : store.js**

```js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';

export const store = configureStore({
  reducer: {
    users: userReducer,
  },
});
```

---

### **Step 6 : AddUser.jsx**

```js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../redux/actions/userActions';
import { useNavigate } from 'react-router-dom';

const AddUser = () => {
  const [values, setValues] = useState({ name: '', email: '' });
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!values.name || !values.email) {
      alert('Please enter all fields!');
      return;
    }

    const newUser = {
      id: users.length + 1,
      name: values.name,
      email: values.email,
    };

    dispatch(addUser(newUser));
    navigate('/');
  };

  return (
    <div className="container mt-4">
      <h2>Add New User</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          className="form-control my-2"
          value={values.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          className="form-control my-2"
          value={values.email}
          onChange={handleChange}
        />

        <button type="submit" className="btn btn-success w-100">
          Add User
        </button>
      </form>
    </div>
  );
};

export default AddUser;
```

---

### **Step 7 : EditUser.jsx**

```js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { updateUser } from '../redux/actions/userActions';

const EditUser = () => {
  const { id } = useParams();
  const users = useSelector((state) => state.users);
  const existingUser = users.find((user) => user.id === Number(id));

  const [userData, setUserData] = useState({
    name: existingUser?.name || '',
    email: existingUser?.email || '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userData.name || !userData.email) {
      alert('Please fill out all fields!');
      return;
    }

    dispatch(updateUser({ id: Number(id), ...userData }));
    navigate('/');
  };

  return (
    <div className="container mt-4">
      <h2>Edit User</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          className="form-control my-2"
          value={userData.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          className="form-control my-2"
          value={userData.email}
          onChange={handleChange}
        />

        <button type="submit" className="btn btn-success w-100">
          Update User
        </button>
      </form>
    </div>
  );
};

export default EditUser;
```

---

### **Step 8 : UserList.jsx**

```js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteUser } from '../redux/actions/userActions';
import { Link } from 'react-router-dom';

const UserList = () => {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h2>User List</h2>
        <Link to="/add" className="btn btn-primary">Add User</Link>
      </div>
      <table className="table table-bordered mt-3">
        <thead className="table-dark">
          <tr>
            <th>ID</th><th>Name</th><th>Email</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <Link to={`/edit/${user.id}`} className="btn btn-sm btn-warning me-2">Edit</Link>
                <button onClick={() => handleDelete(user.id)} className="btn btn-sm btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
```

---

