import React, { useState, useEffect } from 'react';
import PurchaseOrderTable from '../components/PurchaseOrderTable';

const ReviewView = () => {
  const [pendingPurchaseOrders, setPendingPurchaseOrders] = useState([]);

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
  }, []);

  const handleApprove = (purchaseOrderId) => {
    // TODO: Send approval to API
    console.log(`Approving purchase order ${purchaseOrderId}`);
    setPendingPurchaseOrders(prevOrders => 
      prevOrders.filter(po => po.id !== purchaseOrderId)
    );
  };

  const handleReject = (purchaseOrderId) => {
    // TODO: Send rejection to API
    console.log(`Rejecting purchase order ${purchaseOrderId}`);
    setPendingPurchaseOrders(prevOrders => 
      prevOrders.filter(po => po.id !== purchaseOrderId)
    );
  };

  return (
    <div>
      <h1>Review Purchase Orders</h1>
      <PurchaseOrderTable purchaseOrders={pendingPurchaseOrders} />
      {pendingPurchaseOrders.map(po => (
        <div key={po.id}>
          <button onClick={() => handleApprove(po.id)}>Approve</button>
          <button onClick={() => handleReject(po.id)}>Reject</button>
        </div>
      ))}
    </div>
  );
};

export default ReviewView;