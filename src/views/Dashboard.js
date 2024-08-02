import React, { useState, useEffect } from 'react';
import PurchaseOrderTable from '../components/PurchaseOrderTable';

const Dashboard = () => {
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [filteredPurchaseOrders, setFilteredPurchaseOrders] = useState([]);
  const [filter, setFilter] = useState({ type: 'store', value: '' });

  useEffect(() => {
    // TODO: Fetch purchase orders from API
    const mockPurchaseOrders = [
      {
        id: 1,
        skus: [{ sku: 'SKU001', quantity: 10 }, { sku: 'SKU002', quantity: 5 }],
        creator: 'John Doe',
        approver: 'Jane Smith',
        supplier: 'Supplier A',
        store: 'Store 1',
        createdDate: '2023-05-01',
        expectedDeliveryDate: '2023-05-15',
      },
      {
        id: 2,
        skus: [{ sku: 'SKU003', quantity: 8 }, { sku: 'SKU004', quantity: 12 }],
        creator: 'Alice Johnson',
        approver: 'Bob Williams',
        supplier: 'Supplier B',
        store: 'Store 2',
        createdDate: '2023-05-02',
        expectedDeliveryDate: '2023-05-16',
      },
    ];
    setPurchaseOrders(mockPurchaseOrders);
    setFilteredPurchaseOrders(mockPurchaseOrders);
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const applyFilter = () => {
    const filtered = purchaseOrders.filter(po => 
      po[filter.type].toLowerCase().includes(filter.value.toLowerCase())
    );
    setFilteredPurchaseOrders(filtered);
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <select name="type" value={filter.type} onChange={handleFilterChange}>
          <option value="store">Store</option>
          <option value="supplier">Supplier</option>
        </select>
        <input
          type="text"
          name="value"
          value={filter.value}
          onChange={handleFilterChange}
          placeholder={`Filter by ${filter.type}`}
        />
        <button onClick={applyFilter}>Apply Filter</button>
      </div>
      <PurchaseOrderTable purchaseOrders={filteredPurchaseOrders} />
    </div>
  );
};

export default Dashboard;