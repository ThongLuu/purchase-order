import React, { useState, useEffect } from 'react';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', role: 'normal' });

  useEffect(() => {
    // TODO: Fetch users from API
    const mockUsers = [
      { id: 1, username: 'john_doe', role: 'normal' },
      { id: 2, username: 'jane_smith', role: 'manager' },
    ];
    setUsers(mockUsers);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    // TODO: Send new user to API
    const newUserId = users.length + 1;
    setUsers([...users, { id: newUserId, ...newUser }]);
    setNewUser({ username: '', role: 'normal' });
  };

  const handleDeleteUser = (userId) => {
    // TODO: Send delete request to API
    setUsers(users.filter(user => user.id !== userId));
  };

  return (
    <div>
      <h1>User Management</h1>
      <form onSubmit={handleAddUser}>
        <input
          type="text"
          name="username"
          value={newUser.username}
          onChange={handleInputChange}
          placeholder="Username"
          required
        />
        <select name="role" value={newUser.role} onChange={handleInputChange}>
          <option value="normal">Normal User</option>
          <option value="manager">Manager</option>
        </select>
        <button type="submit">Add User</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;