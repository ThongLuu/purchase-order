import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './views/Dashboard';
import ReviewView from './views/ReviewView';
import UserManagement from './views/UserManagement';
import PurchaseOrderForm from './components/PurchaseOrderForm';
import PurchaseOrderList from './components/PurchaseOrderList';
import PurchaseOrderDetail from './components/PurchaseOrderDetail';
import Header from './components/Header';
import Footer from './components/Footer';
import AppContent from './components/AppContent';

import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <AppContent>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/create" element={<PurchaseOrderForm />} />
            <Route path="/list" element={<PurchaseOrderList />} />
            <Route path="/review" element={<ReviewView />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/purchase-order/:id" element={<PurchaseOrderDetail />} />
          </Routes>
        </AppContent>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
