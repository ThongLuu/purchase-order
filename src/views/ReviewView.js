import React, { useState, useEffect } from 'react';
import PurchaseOrderTable from '../components/PurchaseOrderTable';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';

const ReviewView = () => {
  const [pendingPurchaseOrders, setPendingPurchaseOrders] = useState([]);
  const [filteredPurchaseOrders, setFilteredPurchaseOrders] = useState([]);
  const [filter, setFilter] = useState({ type: 'store', value: '' });

  useEffect(() => {
    // TODO: Fetch pending purchase orders from API
    const mockPendingPurchaseOrders = [
      {
        id: 1,
        skus: [{ sku: 'SKU001', quantity: 10 }, { sku: 'SKU002', quantity: 5 }],
        creator: 'John Doe',
        approver: '',
        supplier: 'Supplier A',
        store: 'Store 1',
        createdDate: '2023-05-01',
        expectedDeliveryDate: '2023-05-15',
      },
      {
        id: 2,
        skus: [{ sku: 'SKU003', quantity: 8 }, { sku: 'SKU004', quantity: 12 }],
        creator: 'Alice Johnson',
        approver: '',
        supplier: 'Supplier B',
        store: 'Store 2',
        createdDate: '2023-05-02',
        expectedDeliveryDate: '2023-05-16',
      },
    ];
    setPendingPurchaseOrders(mockPendingPurchaseOrders);
    setFilteredPurchaseOrders(mockPendingPurchaseOrders);
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const applyFilter = () => {
    const filtered = pendingPurchaseOrders.filter(po => 
      po[filter.type].toLowerCase().includes(filter.value.toLowerCase())
    );
    setFilteredPurchaseOrders(filtered);
  };

  const handleApprove = (purchaseOrderId) => {
    // TODO: Send approval to API
    console.log(`Approving purchase order ${purchaseOrderId}`);
    setPendingPurchaseOrders(prevOrders => 
      prevOrders.filter(po => po.id !== purchaseOrderId)
    );
    setFilteredPurchaseOrders(prevOrders => 
      prevOrders.filter(po => po.id !== purchaseOrderId)
    );
  };

  const handleReject = (purchaseOrderId) => {
    // TODO: Send rejection to API
    console.log(`Rejecting purchase order ${purchaseOrderId}`);
    setPendingPurchaseOrders(prevOrders => 
      prevOrders.filter(po => po.id !== purchaseOrderId)
    );
    setFilteredPurchaseOrders(prevOrders => 
      prevOrders.filter(po => po.id !== purchaseOrderId)
    );
  };

  const filterOptions = [
    { label: 'Store', value: 'store' },
    { label: 'Supplier', value: 'supplier' },
    { label: 'Creator', value: 'creator' },
  ];

  const actionBodyTemplate = (rowData) => {
    return (
      <>
        <Button label="Approve" className="p-button-success p-mr-2" onClick={() => handleApprove(rowData.id)} />
        <Button label="Reject" className="p-button-danger" onClick={() => handleReject(rowData.id)} />
      </>
    );
  };

  return (
    <div className="card">
      <h1>Review Purchase Orders</h1>
      <div className="p-fluid p-formgrid p-grid">
        <div className="p-field p-col-12 p-md-4">
          <Dropdown 
            name="type" 
            value={filter.type} 
            options={filterOptions} 
            onChange={handleFilterChange} 
            placeholder="Select filter type"
          />
        </div>
        <div className="p-field p-col-12 p-md-4">
          <InputText
            name="value"
            value={filter.value}
            onChange={handleFilterChange}
            placeholder={`Filter by ${filter.type}`}
          />
        </div>
        <div className="p-field p-col-12 p-md-4">
          <Button label="Apply Filter" onClick={applyFilter} className="p-button-outlined" />
        </div>
      </div>
      <PurchaseOrderTable 
        purchaseOrders={filteredPurchaseOrders} 
        additionalColumns={[
          { field: 'actions', header: 'Actions', body: actionBodyTemplate }
        ]}
      />
    </div>
  );
};

export default ReviewView;