import React, { useState } from 'react'
import axios from 'axios';

const AddUsers = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    file: null
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        'http://localhost:8000/api/user/insert_data',
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setFormData({ ...formData, file: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter Name"
        name="username"
        value={formData.username}
        onChange={handleChange}
      />
      <input
        type="email"
        placeholder="Enter Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="password"
        placeholder="Enter Password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
      <input type="file" name="file" onChange={handleChange} />
      <button type="submit">Add User</button>
    </form>
  );
};

export default AddUsers;
