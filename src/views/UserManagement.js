import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', role: 'normal' });
  const [filters, setFilters] = useState({
    username: '',
    role: null
  });

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

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
  };

  const filteredUsers = users.filter(user => {
    return (
      user.username.toLowerCase().includes(filters.username.toLowerCase()) &&
      (filters.role ? user.role === filters.role : true)
    );
  });

  const actionBodyTemplate = (rowData) => {
    return <Button label="Delete" className="p-button-danger" onClick={() => handleDeleteUser(rowData.id)} />;
  };

  const roleOptions = [
    { label: 'Normal User', value: 'normal' },
    { label: 'Manager', value: 'manager' }
  ];

  return (
    <div className="card">
      <h1>User Management</h1>
      <form onSubmit={handleAddUser} className="p-fluid p-formgrid p-grid">
        <div className="p-field p-col-12 p-md-4">
          <InputText
            name="username"
            value={newUser.username}
            onChange={handleInputChange}
            placeholder="Username"
            required
          />
        </div>
        <div className="p-field p-col-12 p-md-4">
          <Dropdown
            name="role"
            value={newUser.role}
            options={roleOptions}
            onChange={handleInputChange}
            placeholder="Select Role"
          />
        </div>
        <div className="p-field p-col-12 p-md-4">
          <Button type="submit" label="Add User" />
        </div>
      </form>
      
      <div className="p-fluid p-formgrid p-grid">
        <div className="p-field p-col-12 p-md-6">
          <InputText
            name="username"
            value={filters.username}
            onChange={handleFilterChange}
            placeholder="Filter by Username"
          />
        </div>
        <div className="p-field p-col-12 p-md-6">
          <Dropdown
            name="role"
            value={filters.role}
            options={roleOptions}
            onChange={handleFilterChange}
            placeholder="Filter by Role"
          />
        </div>
      </div>

      <DataTable value={filteredUsers} className="p-datatable-sm">
        <Column field="id" header="ID" />
        <Column field="username" header="Username" />
        <Column field="role" header="Role" />
        <Column body={actionBodyTemplate} header="Action" />
      </DataTable>
    </div>
  );
};

export default UserManagement;