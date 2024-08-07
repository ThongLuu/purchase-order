import React, { useState, useEffect, useCallback } from 'react';
import PurchaseOrderTable from '../components/PurchaseOrderTable';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [filteredPurchaseOrders, setFilteredPurchaseOrders] = useState([]);
  const [filters, setFilters] = useState({ store: '', supplier: '' });
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [chartView, setChartView] = useState('store'); // 'store' or 'supplier'

  const updateChartData = useCallback((orders) => {
    const quantities = {};
    orders.forEach(po => {
      const key = chartView === 'store' ? po.store : po.supplier;
      if (!quantities[key]) {
        quantities[key] = 0;
      }
      quantities[key] += po.skus.reduce((sum, sku) => sum + sku.quantity, 0);
    });

    const labels = Object.keys(quantities);
    const data = Object.values(quantities);

    setChartData({
      labels,
      datasets: [
        {
          label: `Total Quantity by ${chartView === 'store' ? 'Store' : 'Supplier'}`,
          data,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        },
      ],
    });
  }, [chartView]);

  useEffect(() => {
    // Generate more mock data
    const mockPurchaseOrders = Array.from({ length: 50 }, (_, index) => ({
      id: index + 1,
      skus: [
        { sku: `SKU${(index * 2 + 1).toString().padStart(3, '0')}`, quantity: Math.floor(Math.random() * 100) + 1 },
        { sku: `SKU${(index * 2 + 2).toString().padStart(3, '0')}`, quantity: Math.floor(Math.random() * 100) + 1 }
      ],
      creator: ['John Doe', 'Alice Johnson', 'Bob Williams', 'Emma Davis', 'Michael Brown'][Math.floor(Math.random() * 5)],
      approver: ['Jane Smith', 'Charlie Wilson', 'Diana Miller', 'Frank Thomas', 'Grace Lee'][Math.floor(Math.random() * 5)],
      supplier: ['Supplier A', 'Supplier B', 'Supplier C', 'Supplier D', 'Supplier E'][Math.floor(Math.random() * 5)],
      store: ['Store 1', 'Store 2', 'Store 3', 'Store 4', 'Store 5'][Math.floor(Math.random() * 5)],
      createdDate: new Date(2023, 4, Math.floor(Math.random() * 30) + 1).toISOString().split('T')[0],
      expectedDeliveryDate: new Date(2023, 5, Math.floor(Math.random() * 30) + 1).toISOString().split('T')[0],
      status: ['Pending', 'Approved', 'Shipped', 'Delivered', 'Cancelled'][Math.floor(Math.random() * 5)],
    }));
    setPurchaseOrders(mockPurchaseOrders);
    setFilteredPurchaseOrders(mockPurchaseOrders);
    updateTotalQuantity(mockPurchaseOrders);
    updateChartData(mockPurchaseOrders);
  }, [updateChartData]);

  const updateTotalQuantity = (orders) => {
    const total = orders.reduce((sum, order) => 
      sum + order.skus.reduce((skuSum, sku) => skuSum + sku.quantity, 0), 0);
    setTotalQuantity(total);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const applyFilters = () => {
    const filtered = purchaseOrders.filter(po => 
      (filters.store === '' || filters.store === 'All' || po.store === filters.store) &&
      (filters.supplier === '' || filters.supplier === 'All' || po.supplier === filters.supplier)
    );
    setFilteredPurchaseOrders(filtered);
    updateTotalQuantity(filtered);
    updateChartData(filtered);
  };

  const toggleChartView = () => {
    const newView = chartView === 'store' ? 'supplier' : 'store';
    setChartView(newView);
    updateChartData(filteredPurchaseOrders);
  };

  const storeOptions = [{ label: 'All', value: 'All' }, ...['Store 1', 'Store 2', 'Store 3', 'Store 4', 'Store 5'].map(store => ({ label: store, value: store }))];
  const supplierOptions = [{ label: 'All', value: 'All' }, ...['Supplier A', 'Supplier B', 'Supplier C', 'Supplier D', 'Supplier E'].map(supplier => ({ label: supplier, value: supplier }))];

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Total Quantity by ${chartView === 'store' ? 'Store' : 'Supplier'}`,
      },
    },
  };

  return (
    <div className="card">
      <h1>Dashboard</h1>
      <div className="p-d-flex p-jc-between p-ai-center">
        <h2>Total Quantity: {totalQuantity}</h2>
        <Button label={`View by ${chartView === 'store' ? 'Supplier' : 'Store'}`} onClick={toggleChartView} className="p-button-outlined" />
      </div>
      <div style={{ width: '100%', height: '400px', marginBottom: '20px' }}>
        <Bar options={chartOptions} data={chartData} />
      </div>
      <div className="p-fluid p-formgrid p-grid">
        <div className="p-field p-col-12">
          <div className="p-inputgroup">
            <Dropdown name="store" value={filters.store} options={storeOptions} onChange={handleFilterChange} placeholder="Select Store" />
            <Dropdown name="supplier" value={filters.supplier} options={supplierOptions} onChange={handleFilterChange} placeholder="Select Supplier" />
            <Button label="Apply Filters" onClick={applyFilters} className="p-button-outlined" />
          </div>
        </div>
      </div>
      <PurchaseOrderTable purchaseOrders={filteredPurchaseOrders} />
    </div>
  );
};

export default Dashboard;