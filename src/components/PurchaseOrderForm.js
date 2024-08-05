import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FileUpload } from "primereact/fileupload";
import { Message } from "primereact/message";
import { v4 as uuidv4 } from "uuid";

const PurchaseOrderForm = () => {
  const navigate = useNavigate();
  const [purchaseOrder, setPurchaseOrder] = useState({
    skus: [],
    creator: "",
    approver: "",
    supplier: "",
    createdDate: null,
    expectedDeliveryDate: null,
  });
  const [uploadStatus, setUploadStatus] = useState(null);
  const fileUploadRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPurchaseOrder({ ...purchaseOrder, [name]: value });
  };

  const handleSkuChange = (index, field, value) => {
    const updatedSkus = [...purchaseOrder.skus];
    updatedSkus[index][field] = value;
    if (field === "sku") {
      setTimeout(
        () => setPurchaseOrder({ ...purchaseOrder, skus: updatedSkus }),
        300
      );
    }
    setPurchaseOrder({ ...purchaseOrder, skus: updatedSkus });
  };

  const addSku = () => {
    setPurchaseOrder({
      ...purchaseOrder,
      skus: [
        ...purchaseOrder.skus,
        { id: uuidv4(), sku: "", productName: "", quantity: 0 },
      ],
    });
  };

  const deleteSku = (rowIndex) => {
    const updatedSkus = purchaseOrder.skus.filter(
      (_, index) => index !== rowIndex
    );
    setPurchaseOrder({ ...purchaseOrder, skus: updatedSkus });
  };

  const handleFileUpload = (event) => {
    const file = event.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: "binary" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);

        console.log("Parsed Excel data:", data);

        // Create a set of existing SKUs for faster lookup
        const existingSkus = new Set(purchaseOrder.skus.map(item => item.sku));

        // Filter out duplicate SKUs and add new ones
        const newSkus = data
          .filter(row => !existingSkus.has(row.SKU))
          .map(row => ({
            id: uuidv4(),
            sku: row.SKU,
            productName: row.ProductName,
            quantity: row.Quantity,
          }));

        const updatedPurchaseOrder = {
          ...purchaseOrder,
          skus: [...purchaseOrder.skus, ...newSkus],
          supplier: purchaseOrder.supplier || data[0].Supplier,
          expectedDeliveryDate: purchaseOrder.expectedDeliveryDate || new Date(data[0].ExpectedDeliveryDate),
        };

        setPurchaseOrder(updatedPurchaseOrder);
        setUploadStatus("success");
      } catch (error) {
        console.error("Error processing Excel file:", error);
        setUploadStatus("error");
      }
    };
    reader.readAsBinaryString(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // TODO: Replace this with actual API call to submit purchase order
      // For demonstration, we'll use a timeout to simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("Purchase order submitted successfully:", purchaseOrder);
      
      // Navigate to Purchase Order List page
      navigate("/list");
    } catch (error) {
      console.error("Error submitting purchase order:", error);
      // TODO: Handle error (e.g., show error message to user)
    }
  };

  const skuTemplate = (rowData, { rowIndex }) => (
    <InputText
      value={rowData.sku}
      onChange={(e) => handleSkuChange(rowIndex, "sku", e.target.value)}
    />
  );

  const productNameTemplate = (rowData, { rowIndex }) => (
    <InputText
      value={rowData.productName}
      onChange={(e) => handleSkuChange(rowIndex, "productName", e.target.value)}
    />
  );

  const quantityTemplate = (rowData, { rowIndex }) => (
    <InputNumber
      value={rowData.quantity}
      onValueChange={(e) => handleSkuChange(rowIndex, "quantity", e.value)}
    />
  );

  const actionTemplate = (rowData, { rowIndex }) => (
    <Button
      icon="pi pi-trash"
      className="p-button-rounded p-button-warning"
      onClick={() => deleteSku(rowIndex)}
    />
  );

  return (
    <form onSubmit={handleSubmit} className="p-fluid">
      <h2>Create Purchase Order</h2>

      <div className="p-field">
        <label htmlFor="creator">Creator</label>
        <InputText
          id="creator"
          name="creator"
          value={purchaseOrder.creator}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="p-field">
        <label htmlFor="approver">Approver</label>
        <InputText
          id="approver"
          name="approver"
          value={purchaseOrder.approver}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="p-field">
        <label htmlFor="supplier">Supplier</label>
        <InputText
          id="supplier"
          name="supplier"
          value={purchaseOrder.supplier}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="p-field">
        <label htmlFor="createdDate">Created Date</label>
        <Calendar
          id="createdDate"
          name="createdDate"
          value={purchaseOrder.createdDate}
          onChange={(e) =>
            handleInputChange({
              target: { name: "createdDate", value: e.value },
            })
          }
          showIcon
          required
        />
      </div>

      <div className="p-field">
        <label htmlFor="expectedDeliveryDate">Expected Delivery Date</label>
        <Calendar
          id="expectedDeliveryDate"
          name="expectedDeliveryDate"
          value={purchaseOrder.expectedDeliveryDate}
          onChange={(e) =>
            handleInputChange({
              target: { name: "expectedDeliveryDate", value: e.value },
            })
          }
          showIcon
          required
        />
      </div>

      <h3>SKUs</h3>
      <DataTable value={purchaseOrder.skus} dataKey="id">
        <Column field="sku" header="SKU" body={skuTemplate} />
        <Column
          field="productName"
          header="Product Name"
          body={productNameTemplate}
        />
        <Column field="quantity" header="Quantity" body={quantityTemplate} />
        <Column
          body={actionTemplate}
          headerStyle={{ width: "10%", minWidth: "8rem" }}
          bodyStyle={{ textAlign: "center" }}
        />
      </DataTable>
      <Button
        label="Add SKU"
        icon="pi pi-plus"
        onClick={addSku}
        className="p-button-secondary"
      />

      <div className="p-field">
        <label htmlFor="fileUpload">Upload Excel</label>
        <FileUpload
          ref={fileUploadRef}
          mode="basic"
          name="fileUpload"
          accept=".xlsx, .xls"
          maxFileSize={1000000}
          auto
          customUpload
          uploadHandler={handleFileUpload}
          chooseLabel="Choose Excel File"
        />
        {uploadStatus === "success" && (
          <Message
            severity="success"
            text="File uploaded and data loaded successfully"
          />
        )}
        {uploadStatus === "error" && (
          <Message severity="error" text="Error processing the Excel file" />
        )}
      </div>

      <Button type="submit" label="Create Purchase Order" icon="pi pi-check" />
    </form>
  );
};

export default PurchaseOrderForm;
