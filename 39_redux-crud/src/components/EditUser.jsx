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
