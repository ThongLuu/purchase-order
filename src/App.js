import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AppContent from './components/AppContent';
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
  return (
    <Router>
      <div className="app-container">
        <Header />
        <AppContent>
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
        </AppContent>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
