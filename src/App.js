import React, { Suspense, lazy, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Loading from './components/Loading';

import 'primereact/resources/primereact.min.css';
import './App.css';

const Dashboard = lazy(() => import('./views/Dashboard'));
const ReviewView = lazy(() => import('./views/ReviewView'));
const UserManagement = lazy(() => import('./views/UserManagement'));
const PurchaseOrderForm = lazy(() => import('./components/PurchaseOrderForm'));
const PurchaseOrderList = lazy(() => import('./components/PurchaseOrderList'));
const PurchaseOrderDetail = lazy(() => import('./components/PurchaseOrderDetail'));

function App() {
  const [menuOpen, setMenuOpen] = useState(true);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Router>
      <div className="app-container">
        <Header toggleMenu={toggleMenu} />
        <div className="app-content">
          <nav className={`app-nav ${menuOpen ? 'open' : ''}`}>
            <ul>
              <li><NavLink to="/" end>Dashboard</NavLink></li>
              <li><NavLink to="/create">Create Order</NavLink></li>
              <li><NavLink to="/list">Order List</NavLink></li>
              <li><NavLink to="/review">Review</NavLink></li>
              <li><NavLink to="/users">User Management</NavLink></li>
            </ul>
          </nav>
          <main className={`app-main ${menuOpen ? 'nav-open' : ''}`}>
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/create" element={<PurchaseOrderForm />} />
                <Route path="/list" element={<PurchaseOrderList />} />
                <Route path="/review" element={<ReviewView />} />
                <Route path="/users" element={<UserManagement />} />
                <Route path="/purchase-order/:id" element={<PurchaseOrderDetail />} />
              </Routes>
            </Suspense>
          </main>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
