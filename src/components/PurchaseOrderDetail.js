import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const PurchaseOrderDetail = () => {
  const [purchaseOrder, setPurchaseOrder] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    // TODO: Fetch purchase order details from API
    // For now, we'll use dummy data
    const dummyData = {
      id: id,
      createdDate: new Date('2023-05-01').toLocaleDateString(),
      creator: 'John Doe',
      approver: 'Jane Smith',
      supplier: 'Supplier Co.',
      expectedDeliveryDate: new Date('2023-05-15').toLocaleDateString(),
      skus: [
        { sku: 'SKU001', productName: 'Product 1', quantity: 10 },
        { sku: 'SKU002', productName: 'Product 2', quantity: 20 },
        { sku: 'SKU003', productName: 'Product 3', quantity: 15 },
      ]
    };
    setPurchaseOrder(dummyData);
  }, [id]);

  if (!purchaseOrder) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Purchase Order Detail</h2>
      <Card>
        <div className="p-grid">
          <div className="p-col-6">
            <p><strong>Purchase Order ID:</strong> {purchaseOrder.id}</p>
            <p><strong>Created Date:</strong> {purchaseOrder.createdDate}</p>
            <p><strong>Creator:</strong> {purchaseOrder.creator}</p>
            <p><strong>Approver:</strong> {purchaseOrder.approver}</p>
          </div>
          <div className="p-col-6">
            <p><strong>Supplier:</strong> {purchaseOrder.supplier}</p>
            <p><strong>Expected Delivery Date:</strong> {purchaseOrder.expectedDeliveryDate}</p>
          </div>
        </div>
      </Card>
      <h3>SKUs</h3>
      <DataTable value={purchaseOrder.skus}>
        <Column field="sku" header="SKU" />
        <Column field="productName" header="Product Name" />
        <Column field="quantity" header="Quantity" />
      </DataTable>
    </div>
  );
};

export default PurchaseOrderDetail;