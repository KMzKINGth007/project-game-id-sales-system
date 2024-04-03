import axios from "axios";
import { useEffect, useState } from "react";

export default function AdminUserEdit() {
  const [users, setUser] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  const fetchUserData = async () => {
    try {
      const response = await axios.get('http://localhost:8889/user/showuser', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setUser(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserData()
  }, [])

  const handleEdit = (user) => {
    setEditingUser(user);
  }

  const handleCancelEdit = () => {
    setEditingUser(null);
  }

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:8889/user/${editingUser.id}`, editingUser, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      console.log("Edit User", response.data);

      setEditingUser(null);
      fetchUserData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const userId = parseInt(id);
      await axios.delete(`http://localhost:8889/user/${userId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      console.log("User deleted successfully");
      fetchUserData();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div>
      <h1>หน้าหลัก จัดการผู้ใช้</h1>
      <ul>
        {users.map(users => (
          <li key={users.id}>
            {editingUser && editingUser.id === users.id ? (
              <div className="justify-between w-[100%] flex my-1 border-solid border-2 min-h-[52px]">
                <input type="text" value={editingUser.username} onChange={(e) => setEditingUser({ ...editingUser, username: e.target.value })} />
                <input type="text" value={editingUser.email} onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })} />
                <input type="text" value={editingUser.line} onChange={(e) => setEditingUser({ ...editingUser, line: e.target.value })} />
                <input type="text" value={editingUser.facebook} onChange={(e) => setEditingUser({ ...editingUser, facebook: e.target.value })} />
                <button onClick={handleUpdate}>Confirm</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </div>
            ) : (
              <div className="justify-between w-[100%] flex my-1 border-solid border-2 min-h-[52px]">
                <div className="w-[200px]"><p>Username: {users.username}</p></div>
                <div className="w-[300px]">Email: <p>{users.email}</p></div>
                <div className="w-[300px]">Line: <p>{users.line}</p></div>
                <div className="w-[300px]"><p>Facebook: {users.facebook}</p></div>
                <div className="w-[100px]"><button onClick={() => handleEdit(users)}>Edit</button></div>
                <div className="w-[100px]"><button onClick={() => handleDelete(users.id)}>Delete</button></div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}