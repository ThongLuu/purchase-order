import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Dashboard from './views/Dashboard';
import ReviewView from './views/ReviewView';
import UserManagement from './views/UserManagement';
import PurchaseOrderForm from './components/PurchaseOrderForm';
import PurchaseOrderList from './components/PurchaseOrderList';
import PurchaseOrderDetail from './components/PurchaseOrderDetail';

import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="app-nav">
          <ul>
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/create">Create Purchase Order</Link></li>
            <li><Link to="/list">Purchase Order List</Link></li>
            <li><Link to="/review">Review Purchase Orders</Link></li>
            <li><Link to="/users">User Management</Link></li>
          </ul>
        </nav>

        <main className="app-main">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/create" element={<PurchaseOrderForm />} />
            <Route path="/list" element={<PurchaseOrderList />} />
            <Route path="/review" element={<ReviewView />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/purchase-order/:id" element={<PurchaseOrderDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
