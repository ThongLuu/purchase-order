import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FileUpload } from 'primereact/fileupload';

const PurchaseOrderForm = () => {
  const [purchaseOrder, setPurchaseOrder] = useState({
    skus: [],
    creator: '',
    approver: '',
    supplier: '',
    createdDate: null,
    expectedDeliveryDate: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPurchaseOrder({ ...purchaseOrder, [name]: value });
  };

  const handleSkuChange = (newSkus) => {
    setPurchaseOrder({ ...purchaseOrder, skus: newSkus });
  };

  const addSku = () => {
    setPurchaseOrder({
      ...purchaseOrder,
      skus: [...purchaseOrder.skus, { sku: '', productName: '', quantity: 0 }],
    });
  };

  const handleFileUpload = (event) => {
    const file = event.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws);
      
      // Assuming the Excel sheet has columns: SKU, ProductName, Quantity, Supplier, ExpectedDeliveryDate
      const newPurchaseOrder = {
        ...purchaseOrder,
        skus: data.map(row => ({ sku: row.SKU, productName: row.ProductName, quantity: row.Quantity })),
        supplier: data[0].Supplier,
        expectedDeliveryDate: new Date(data[0].ExpectedDeliveryDate),
      };
      setPurchaseOrder(newPurchaseOrder);
    };
    reader.readAsBinaryString(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Submit purchase order
    console.log('Submitting purchase order:', purchaseOrder);
  };

  const handleQRScan = () => {
    // TODO: Implement QR code scanning
    console.log('QR code scan initiated');
  };

  return (
    <form onSubmit={handleSubmit} className="p-fluid">
      <h2>Create Purchase Order</h2>
      
      <div className="p-field">
        <label htmlFor="creator">Creator</label>
        <InputText id="creator" name="creator" value={purchaseOrder.creator} onChange={handleInputChange} required />
      </div>

      <div className="p-field">
        <label htmlFor="approver">Approver</label>
        <InputText id="approver" name="approver" value={purchaseOrder.approver} onChange={handleInputChange} required />
      </div>

      <div className="p-field">
        <label htmlFor="supplier">Supplier</label>
        <InputText id="supplier" name="supplier" value={purchaseOrder.supplier} onChange={handleInputChange} required />
      </div>

      <div className="p-field">
        <label htmlFor="createdDate">Created Date</label>
        <Calendar id="createdDate" name="createdDate" value={purchaseOrder.createdDate} onChange={(e) => handleInputChange({ target: { name: 'createdDate', value: e.value } })} showIcon required />
      </div>

      <div className="p-field">
        <label htmlFor="expectedDeliveryDate">Expected Delivery Date</label>
        <Calendar id="expectedDeliveryDate" name="expectedDeliveryDate" value={purchaseOrder.expectedDeliveryDate} onChange={(e) => handleInputChange({ target: { name: 'expectedDeliveryDate', value: e.value } })} showIcon required />
      </div>

      <h3>SKUs</h3>
      <DataTable value={purchaseOrder.skus} onValueChange={handleSkuChange} editMode="row" dataKey="sku">
        <Column field="sku" header="SKU" editor={(options) => <InputText value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />} />
        <Column field="productName" header="Product Name" editor={(options) => <InputText value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />} />
        <Column field="quantity" header="Quantity" editor={(options) => <InputText type="number" value={options.value} onChange={(e) => options.editorCallback(parseInt(e.target.value, 10))} />} />
      </DataTable>
      <Button label="Add SKU" icon="pi pi-plus" onClick={addSku} className="p-button-secondary" />

      <div className="p-field">
        <label htmlFor="fileUpload">Upload Excel</label>
        <FileUpload mode="basic" name="fileUpload" accept=".xlsx, .xls" maxFileSize={1000000} onUpload={handleFileUpload} />
      </div>

      <Button label="Scan QR Code" icon="pi pi-qrcode" onClick={handleQRScan} className="p-button-secondary" />

      <Button type="submit" label="Create Purchase Order" icon="pi pi-check" />
    </form>
  );
};

export default PurchaseOrderForm;