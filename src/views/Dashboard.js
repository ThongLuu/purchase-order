import React, { useState, useEffect } from 'react';
import PurchaseOrderTable from '../components/PurchaseOrderTable';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { MultiSelect } from 'primereact/multiselect';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [filteredPurchaseOrders, setFilteredPurchaseOrders] = useState([]);
  const [filters, setFilters] = useState({ store: '', supplier: '', creator: '', approver: '', status: [] });
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [chartView, setChartView] = useState('store'); // 'store' or 'supplier'

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
  }, []);

  const updateTotalQuantity = (orders) => {
    const total = orders.reduce((sum, order) => 
      sum + order.skus.reduce((skuSum, sku) => skuSum + sku.quantity, 0), 0);
    setTotalQuantity(total);
  };

  const updateChartData = (orders) => {
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
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const applyFilters = () => {
    const filtered = purchaseOrders.filter(po => 
      (filters.store === '' || po.store.toLowerCase().includes(filters.store.toLowerCase())) &&
      (filters.supplier === '' || po.supplier.toLowerCase().includes(filters.supplier.toLowerCase())) &&
      (filters.creator === '' || po.creator.toLowerCase().includes(filters.creator.toLowerCase())) &&
      (filters.approver === '' || po.approver.toLowerCase().includes(filters.approver.toLowerCase())) &&
      (filters.status.length === 0 || filters.status.includes(po.status))
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

  const statusOptions = [
    { label: 'Pending', value: 'Pending' },
    { label: 'Approved', value: 'Approved' },
    { label: 'Shipped', value: 'Shipped' },
    { label: 'Delivered', value: 'Delivered' },
    { label: 'Cancelled', value: 'Cancelled' }
  ];

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
            <InputText name="store" value={filters.store} onChange={handleFilterChange} placeholder="Store" />
            <InputText name="supplier" value={filters.supplier} onChange={handleFilterChange} placeholder="Supplier" />
            <InputText name="creator" value={filters.creator} onChange={handleFilterChange} placeholder="Creator" />
            <InputText name="approver" value={filters.approver} onChange={handleFilterChange} placeholder="Approver" />
            <MultiSelect name="status" value={filters.status} options={statusOptions} onChange={handleFilterChange} placeholder="Status" />
            <Button label="Apply Filters" onClick={applyFilters} className="p-button-outlined" />
          </div>
        </div>
      </div>
      <PurchaseOrderTable purchaseOrders={filteredPurchaseOrders} />
    </div>
  );
};

export default Dashboard;