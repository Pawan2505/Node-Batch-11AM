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
