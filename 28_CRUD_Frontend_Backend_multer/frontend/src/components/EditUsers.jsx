import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditUsers = () => {
  const { id } = useParams(); // Get user ID from URL
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    file: null, // For file upload
  });

  // Fetch user data from API
  const fetchUserData = async () => {
    try {
      console.log("Editing user id:", id);
      const res = await axios.get(`http://localhost:8000/api/user/edit_data/${id}`);
      const data = res.data.data; // Get user data from response
      setUserData({
        username: data.username || '',
        email: data.email || '',
        password: data.password || '',
        file: data.file || null,
      });
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (id) {
      fetchUserData();
    }
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setUserData({ ...userData, file: files[0] });
    } else {
      setUserData({ ...userData, [name]: value });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('username', userData.username);
      formData.append('email', userData.email);
      formData.append('password', userData.password);
      if (userData.file) {
        formData.append('file', userData.file);
      }

      const res = await axios.put(
        `http://localhost:8000/api/user/update_data/${id}`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      console.log(res.data);
      alert("User updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Error updating user");
    }
  };

  return (
    <div>
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={userData.username || ''}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={userData.email || ''}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={userData.password || ''}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Profile Image:</label>
          <input
            type="file"
            name="file"
            onChange={handleChange}
          />
          {userData.file && typeof userData.file === 'string' && (
            <div>
              <p>Current file:</p>
              <img
                src={`http://localhost:8000/${userData.file}`}
                alt="user"
                width="100"
              />
            </div>
          )}
        </div>

        <button type="submit">Update User</button>
      </form>
    </div>
  );
};

export default EditUsers;
