import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

const PurchaseOrderList = () => {
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [filters, setFilters] = useState({
    sku: '',
    productName: '',
    store: '',
    createdDate: null
  });
  const navigate = useNavigate();

  useEffect(() => {
    // TODO: Fetch purchase orders from API
    // For now, we'll use dummy data
    const dummyData = [
      { id: 1, sku: 'SKU001', productName: 'Product 1', store: 'Store A', createdDate: new Date('2023-05-01') },
      { id: 2, sku: 'SKU002', productName: 'Product 2', store: 'Store B', createdDate: new Date('2023-05-02') },
      { id: 3, sku: 'SKU003', productName: 'Product 3', store: 'Store C', createdDate: new Date('2023-05-03') },
    ];
    setPurchaseOrders(dummyData);
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
  };

  const filteredPurchaseOrders = purchaseOrders.filter(po => {
    return (
      po.sku.toLowerCase().includes(filters.sku.toLowerCase()) &&
      po.productName.toLowerCase().includes(filters.productName.toLowerCase()) &&
      po.store.toLowerCase().includes(filters.store.toLowerCase()) &&
      (filters.createdDate ? po.createdDate.toDateString() === filters.createdDate.toDateString() : true)
    );
  });

  const handleRowClick = (e) => {
    navigate(`/purchase-order/${e.data.id}`);
  };

  const dateBodyTemplate = (rowData) => {
    return rowData.createdDate.toLocaleDateString();
  };

  const handleCreatePurchaseOrder = () => {
    navigate('/create');
  };

  return (
    <div>
      <h2>Purchase Order List</h2>
      <Button label="Create Purchase Order" icon="pi pi-plus" onClick={handleCreatePurchaseOrder} className="p-button-primary" style={{ marginBottom: '20px' }} />
      <div className="p-grid p-fluid" style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <InputText placeholder="Filter by SKU" name="sku" value={filters.sku} onChange={handleFilterChange} style={{ flex: 1 }} />
        <InputText placeholder="Filter by Product Name" name="productName" value={filters.productName} onChange={handleFilterChange} style={{ flex: 1 }} />
        <InputText placeholder="Filter by Store" name="store" value={filters.store} onChange={handleFilterChange} style={{ flex: 1 }} />
        <Calendar placeholder="Filter by Created Date" name="createdDate" value={filters.createdDate} onChange={handleFilterChange} style={{ flex: 1 }} />
      </div>
      <DataTable value={filteredPurchaseOrders} onRowClick={handleRowClick}>
        <Column field="id" header="ID" />
        <Column field="sku" header="SKU" />
        <Column field="productName" header="Product Name" />
        <Column field="store" header="Store" />
        <Column field="createdDate" header="Created Date" body={dateBodyTemplate} />
      </DataTable>
    </div>
  );
};

export default PurchaseOrderList;