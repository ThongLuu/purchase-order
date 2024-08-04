import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const PurchaseOrderTable = ({ purchaseOrders, additionalColumns = [] }) => {
  const flattenedPurchaseOrders = purchaseOrders.flatMap(po =>
    po.skus.map(sku => ({
      ...po,
      sku: sku.sku,
      quantity: sku.quantity,
    }))
  );

  return (
    <DataTable value={flattenedPurchaseOrders} className="p-datatable-sm">
      <Column field="sku" header="SKU" />
      <Column field="quantity" header="Quantity" />
      <Column field="creator" header="Creator" />
      <Column field="approver" header="Approver" />
      <Column field="supplier" header="Supplier" />
      <Column field="store" header="Store" />
      <Column field="createdDate" header="Created Date" />
      <Column field="expectedDeliveryDate" header="Expected Delivery Date" />
      {additionalColumns.map((col, index) => (
        <Column key={index} {...col} />
      ))}
    </DataTable>
  );
};

export default PurchaseOrderTable;