import React, { use } from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const ViewUsers = () => {
  const [users, setUsers] = useState([]);
const navigator = useNavigate();
      const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/user/view_data');
        setUsers(res.data.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };

  useEffect(() => {
    fetchUsers();
  }, [users]);

    const handleEdit = async (id) => {
        // Handle edit functionality here
        try{
            console.log(id);

            navigator(`/EditUsers/${id}`);
            
        }catch(err){
          console.log(err);
        }
    };

    const handleDelete = async (_id) => {
      // Handle delete functionality here
      try{
        console.log("Delete function is running...");
        const res = await axios.delete(`http://localhost:8000/api/user/delete_data/${_id}`);
        console.log(res.data);

      }catch(err){
        console.log(err);
      }
    };

  return (
    <div>
      <h2>All Users</h2>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            <p>Name: {user.username}</p>
            <p>Email: {user.email}</p>
            <p>Password: {user.password}</p>
            {user.file && <img src={`http://localhost:8000/${user.file}`} alt={user.username} width={100} height={100} />}
            <button onClick={() => handleEdit(user._id)}>Edit</button>
            <button  onClick={() => handleDelete(user._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ViewUsers
