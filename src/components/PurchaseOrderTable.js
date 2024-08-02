import React from 'react';

const PurchaseOrderTable = ({ purchaseOrders }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>SKU</th>
          <th>Quantity</th>
          <th>Creator</th>
          <th>Approver</th>
          <th>Supplier</th>
          <th>Created Date</th>
          <th>Expected Delivery Date</th>
        </tr>
      </thead>
      <tbody>
        {purchaseOrders.map((po, index) => (
          <React.Fragment key={index}>
            {po.skus.map((sku, skuIndex) => (
              <tr key={`${index}-${skuIndex}`}>
                <td>{sku.sku}</td>
                <td>{sku.quantity}</td>
                <td>{po.creator}</td>
                <td>{po.approver}</td>
                <td>{po.supplier}</td>
                <td>{po.createdDate}</td>
                <td>{po.expectedDeliveryDate}</td>
              </tr>
            ))}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default PurchaseOrderTable;